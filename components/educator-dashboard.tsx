"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { group, fetchAllGroups, fetchGroupSessions, Session, assignSessionToGroup } from "@/utils/admin"
import { Child, Evaluation, createEvaluation, deleteEvaluation, educator, fetchEducatorSessions, getChildrenByGroupId, getEducator, getEducatorEvalutationsPerChild } from "@/utils/educator";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Ban, Check, ClipboardPenLine, PlusCircle, Trash } from "lucide-react";
import { LabelInputContainer } from "./login-form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";




export function EducatorDashboard(props:{
  username : string,
  token : string | null
}) {
  const [groups, setGroups] = useState<group[]>([]);
  const [educator, setEducator] = useState<educator>();
  const [selectedGroup, setSelectedGroup] = useState<number>(0);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<number>(0);
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);


  const { register, handleSubmit, reset, control } = useForm();

  
  useEffect(() => {
    if (props.token) {
      getAllGroups()
      fetchEducator().then((educator) => {
        if (educator) {
          fetchSessionsForEducator(educator.id);
        }
      });
    }
  }, [props.token]);
  
  async function fetchEducator(){
    try {
       const educator = await getEducator(props.token, props.username);
       console.log("setting educator to", educator)
       setEducator(educator?? undefined);
        fetchSessionsForEducator(educator?.id)
       return educator;
    } catch (error: any) {
      console.error(error);
      return null; // Return null in case of an error
    }
  }

  async function fetchEducatorEvaluationsByChild(){
    console.log("fetching evaluations for ", selectedChild)
    const fetchedEvaluations = await getEducatorEvalutationsPerChild(props.token, selectedChild, educator?.id);

    console.log("returning", fetchedEvaluations)
    setEvaluations(fetchedEvaluations?? []);
  }

  async function removeEvaluation(evaluationId?: number){
    await deleteEvaluation(props.token, evaluationId)
    fetchEducatorEvaluationsByChild()
  }
  
  const fetchChildrenForGroup = async (groupId: number) => {
    console.log("fetching children for ", groupId)
    const fetchedChildren = await getChildrenByGroupId(props.token, groupId);
    setChildren(fetchedChildren?? []);
    console.log("set children to", fetchedChildren)
  };

  const fetchSessionsForEducator = async (educatorId?: number) => {
    if (educatorId) {
        console.log("fetching sessions for ", educatorId);
        const fetchedSessions = await fetchEducatorSessions(props.token, educatorId);
        setSessions(fetchedSessions ?? []);
        console.log("set sessions to", fetchedSessions);
        const groupObjects = fetchedSessions
        ?.map((session) => session.group)
        .filter((group): group is group => group !== undefined);
  
      const uniqueGroups = Array.from(
        new Set(groupObjects?.map((group) => JSON.stringify(group)))
      ).map((groupString) => JSON.parse(groupString));

        setGroups(Array.from(uniqueGroups));
        console.log("set groups to", Array.from(uniqueGroups))
    } else {
        console.log("educator is ",educator,", cannot fetch sessions");
      }
  };


async function getAllGroups(){
  try {
     const groups = await fetchAllGroups(props.token);
     setGroups(groups || []);
     return true;
  } catch (error : any) {
    return error
  }
}



const onEvaluationSubmit = async (data: any) => {
    try {
      data = {...data,
        childId: selectedChild,
        educatorId:educator?.id}
      console.log(data)
      const response = await createEvaluation(props.token, data)
      reset()
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  };

const onSessionSubmit = async (data: any) => {
  try {
    console.log(data)
    const response = await assignSessionToGroup(props.token, data)
    // reset()
    return response
  } catch (error) {
    console.log(error)
  }
};

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        {/* <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Products</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>All Products</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="/placeholder-user.jpg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header> */}
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="scheduling">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
                <TabsTrigger value="evaluations">Evaluations</TabsTrigger>
                <TabsTrigger value="absences">Absences</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                {/* <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Archived
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" variant="outline" className="h-8 gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button>
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Product
                  </span>
                </Button> */}
                Welcome, {props.username  }
              </div>
            </div>

            <TabsContent value="scheduling">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader className="flex flex-row justify-between">
                  <div className="flex-col">
                    <CardTitle>Scheduling</CardTitle>
                    <CardDescription>
                      Manage schedules and sessions for Prodigy Kindergarten.
                    </CardDescription>
                  </div>


                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Time</TableHead>
                        {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
                          (day) => (
                            <TableHead key={day}>{day}</TableHead>
                          )
                        )}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    {Array.from({ length: 12 }, (_, i) => `${i + 8}:00`).map((timeAM) => (
                        <TableRow key={timeAM}>
                        <TableCell>{timeAM}</TableCell>
                        {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                            <TableCell key={`${timeAM}-${day}`}>
                            {sessions
                                .filter((session) => session.time === timeAM && session.day === day)
                                .map((session) => `Group ${session.group?.id}`)
                                .join(", ") || "-"}
                            </TableCell>
                        ))}
                        </TableRow>
                    ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing sessions for Group {selectedGroup}
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="evaluations">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader className="flex flex-row justify-between">
                  <div className="flex-col">
                    <CardTitle>Evaluations</CardTitle>
                    <CardDescription>
                      Evaluate your students.
                    </CardDescription>
                </div>

                <div>
                    <Select
                        onValueChange={(value) => {
                        setSelectedGroup(parseInt(value));
                        fetchChildrenForGroup(parseInt(value));
                        }}
                        defaultValue="1"
                    >
                        <SelectTrigger className="w-\[180px\]" onClick={() => getAllGroups()}>
                        <SelectValue placeholder="Select Group" />
                        </SelectTrigger>
                        <SelectContent>
                        {groups?.map((group) => (
                            <SelectItem key={group.id} value={`${group.id}`}>
                            Group {group.id}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                </div>

                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="hidden md:table-cell">Age</TableHead>
                        <TableHead className="hidden md:table-cell">Plan & Schedule</TableHead>
                        <TableHead className="hidden md:table-cell">Evaluations</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {children? children.map((child) => (
                            <TableRow key={child.id}>
                              <TableCell className="font-medium">{child.name}</TableCell>
                              <TableCell className="hidden md:table-cell">{child.age}</TableCell>
                              <TableCell>
                                <Badge variant="outline">
                                {
                                (() => {
                                  switch (child.plan) {
                                    case "TODDLER":
                                      return "Toddler";
                                    case "PRESCHOOL":
                                      return "Toddler";
                                    case "KINDERGARTEN":
                                      return "Toddler";
                                    default:
                                      return child.plan;
                                  }
                                })()

                                }  
                                </Badge>
                                  
                                <Badge variant="outline">

                                  {
                                    (() => {
                                      switch (child.schedule) {
                                        case "HALF_DAY":
                                          return "Half-Day";
                                        case "FULL_DAY":
                                          return "Full-Day";
                                        default:
                                          return child.schedule;
                                      }
                                    })()
                                  }
                                </Badge>
                                
                              </TableCell>
                              <TableCell className="flex items-center gap-4">
                                {/* <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Toggle menu</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu> */}
                                <Popover>
                                    <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setSelectedChild(child.id)
                                            fetchEducatorEvaluationsByChild()
                                        }}
                                    >
                                        Evaluations
                                    </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full">
                                    <div className="grid gap-4">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                <TableCell className="font-medium">Mark</TableCell>
                                                <TableCell className="font-medium">Comment</TableCell>
                                                <TableCell className="font-medium"></TableCell>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                            {evaluations.map((evaluation) => (
                                                <TableRow key={evaluation.id}>
                                                <TableCell>{evaluation.mark}</TableCell>
                                                <TableCell>{evaluation.comment}</TableCell>
                                                <TableCell>
                                                    <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => {
                                                        removeEvaluation(evaluation.id);
                                                    }}
                                                    >
                                                    <Trash />
                                                    </Button>
                                                </TableCell>
                                                </TableRow>
                                            ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                    </PopoverContent>
                              </Popover>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => {
                                        setSelectedChild(child.id)
                                    }}
                                  >
                                    <ClipboardPenLine />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full">
                                  <div className="grid gap-4">
                                    {child.id && (
                                    <form className="my-4" onSubmit={handleSubmit(onEvaluationSubmit)}>
                                        <LabelInputContainer className="mb-4 flex-row items-center gap-x-4 justify-between w-full">
                                            <Label htmlFor="mark">Mark</Label>
                                            <Input {...register('mark')} id="mark" placeholder="10" type="text" />
                                        </LabelInputContainer>
                                        <LabelInputContainer className="mb-4 flex-row items-center gap-x-4 justify-between w-full">
                                            <Label htmlFor="comment">Comment</Label>
                                            <Input {...register('comment')} id="comment" placeholder="Excellent" type="text" />
                                        </LabelInputContainer>

                                        <Button variant="outline" className="justify-self-center w-full" size="icon" type="submit" >
                                                    <Check/>
                                        </Button>
                                    </form>
                                    )}
                                  </div>
                                </PopoverContent>
                              </Popover>
                              </TableCell>
                            </TableRow>
                          ))
                        : null}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-{children?.length}</strong> of <strong>{children?.length}</strong>{" "}
                    children
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="absences">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader className="flex flex-row justify-between">
                  <div className="flex-col">
                    <CardTitle>Staff</CardTitle>
                    <CardDescription>
                      Manage staff members of Prodigy Kindergarten.
                    </CardDescription>

                  </div>
                  <div className="flex gap-x-4 items-center">
            
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="hidden md:table-cell">Subject</TableHead>
                        <TableHead className="hidden md:table-cell">Phone Number</TableHead>
                        <TableHead className="hidden md:table-cell">Email</TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
           
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-</strong> of <strong></strong>{" "}
                    pre-registrations
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
