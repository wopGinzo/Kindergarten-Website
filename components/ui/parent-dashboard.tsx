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
import { Child, Evaluation, educator, fetchEducatorSessions, getEducator, getEvaluationsByChildId } from "@/utils/educator";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { Button } from "./button";
import Link from "next/link";
import { AbsenceDto, addAbsence, getChild, getChildAbsences } from "@/utils/parent";
import { LabelInputContainer } from "../login-form";
import { Label } from "./label";
import { Input } from "./input";
import { CalendarIcon, CalendarX2, Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Calendar } from "./calendar";
import { cn } from "@/lib/utils";
import { format } from "util";




export function ParentDashboard(props:{
  username : string,
  token : string | null
}) {
  const [groups, setGroups] = useState<group[]>([]);
  const [child, setChild] = useState<Child>();
  const [group, setGroup] = useState<number>(0);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [absences, setAbsences] = useState<AbsenceDto[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  
  useEffect(() => {
    if (props.token) {
      fetchChild().then((child) => {
        if (child) {
          fetchSessionsForChild(group);
        }
      });
    }
  }, [props.token]);
  
  async function fetchChild(){
    try {
       const child = await getChild(props.token, props.username);
       console.log("setting child to", child)
       setChild(child?? undefined);
       console.log("setting group to", child?.groupId)
       setGroup(child?.groupId?? 0)
        fetchSessionsForChild(child?.groupId)
        fetchEvaluationsByChild(child?.id)
        fetchAbsencesByChild(child?.id)
       return child;
    } catch (error: any) {
      console.error(error);
      return null; 
    }
  }

  async function fetchAbsencesByChild(childId?: number){
    console.log("fetching absences for ", childId)
    const fetchedAbsences = await getChildAbsences(props.token, childId);

    console.log("setting absences ", fetchedAbsences)
    setAbsences(fetchedAbsences?? []);
  }



  async function fetchEvaluationsByChild(childId?: number){
    console.log("fetching evaluations for ", childId)
    const fetchedEvaluations = await getEvaluationsByChildId(props.token, childId);

    console.log("setting evaluations ", fetchedEvaluations)
    setEvaluations(fetchedEvaluations?? []);
  }


  const fetchSessionsForChild = async (groupId: number | undefined) => {
    console.log("fetching sessions for ", groupId)
    const fetchedSessions = await fetchGroupSessions(props.token, groupId);
    setSessions(fetchedSessions?? []);
    console.log("set sessions to", fetchedSessions)
  };

  const onJustificationSubmit = async (data: any) => {
    try {
    data = {...data,
        childId:child?.id,
        startDate: startDate?.toISOString().split('T')[0],
        endDate: endDate?.toISOString().split('T')[0],}
      console.log(data)
      const response = await addAbsence(props.token, data)
      fetchAbsencesByChild(child?.id)
      reset()
      return response
    } catch (error) {
      console.log(error)
    }
  };
  

const { register, handleSubmit, reset, control } = useForm();


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
          <Tabs defaultValue="general">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
                <TabsTrigger value="evaluations">Evaluations</TabsTrigger>
                <TabsTrigger value="absences">Absences</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
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
            <TabsContent value="general">
            <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader className="flex flex-row justify-between">
                  <div className="flex-col">
                    <CardTitle>General</CardTitle>
                    <CardDescription>
                      General informations about your child.
                    </CardDescription>
                  </div>


                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-10">

                        <h1 className="text-2xl">Localise your child.</h1>

                        <Link href={"https://my.findmykids.org/"}>
                            <button type="reset" className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                Follow your child!
                            </button>
                        </Link>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
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
                    {Array.from({ length: 12 }, (_, i) => `${i + 8}:00 AM`).map((timeAM) => (
                        <TableRow key={timeAM}>
                        <TableCell>{timeAM}</TableCell>
                        {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                            <TableCell key={`${timeAM}-${day}`}>
                            {sessions
                                .filter((session) => session.time === timeAM && session.day === day)
                                .map((session) => `${session.moduleName}`)
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
                    Showing sessions for Group {group}
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
             
                </div>

                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableCell className="font-medium">Teacher</TableCell>
                            <TableCell className="font-medium">Mark</TableCell>
                            <TableCell className="font-medium">Comment</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {evaluations.map((evaluation) => (
                            <TableRow key={evaluation.id}>
                                <TableCell>{evaluation.educator.name}</TableCell>
                                <TableCell>{evaluation.mark}</TableCell>
                                <TableCell>{evaluation.comment}</TableCell>

                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-{evaluations?.length}</strong> of <strong>{evaluations?.length}</strong>{" "}
                    children
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="absences">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader className="flex flex-row justify-between">
                  <div className="flex-col">
                    <CardTitle>Justifications</CardTitle>
                    <CardDescription>
                      Manage your child's absences and justifications.
                    </CardDescription>

                  </div>
                  <div className="flex gap-x-4 items-center">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button className="flex gap-x-4"
                            variant="outline"
                            onClick={() => {

                            }}
                            >
                            Report Justification  <CalendarX2 />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full">
                            <div className="grid gap-4">
                                    <form className="gap-4 flex flex-col justify-center items-center" onSubmit={handleSubmit(onJustificationSubmit)}>
                                    <LabelInputContainer className="mb-4 flex-row items-center gap-x-4 justify-between w-full">
                                        <Label htmlFor="description">Description</Label>
                                        <Input {...register('description')} id="description" placeholder="Description" type="text" />
                                    </LabelInputContainer>
                                    <LabelInputContainer className="mb-4 flex-row items-center gap-x-4 justify-between w-full">
                                        <Label htmlFor="justification">Justification</Label>
                                        <Input {...register('justification')} id="justification" placeholder="Justification" type="text" />
                                    </LabelInputContainer>
                                    <div className="grid gap-2">
                                        

                                        
                                        <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                            id="date"
                                            variant={"outline"}
                                            className={cn(
                                                "w-[300px] justify-start text-left font-normal",
                                                !startDate && !endDate && "text-muted-foreground"
                                            )}
                                            >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {startDate && endDate
                                            ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                                            : startDate
                                            ? `${startDate.toLocaleDateString()}`
                                            : "Pick a date"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full p-0" align="start">
                                            <Calendar
                                            initialFocus
                                            mode="range"
                                            defaultMonth={startDate || endDate}
                                            selected={{ from: startDate, to: endDate }}
                                            onSelect={(range) => {
                                                setStartDate(range?.from);
                                                setEndDate(range?.to);
                                            }}
                                            numberOfMonths={1}
                                            />
                                        </PopoverContent>
                                        </Popover>
                                    </div>

                                    <Button variant="outline" className="justify-self-center w-full" size="icon" type="submit" >
                                        <Check/>
                                    </Button>
                                </form>
                            </div>
                        </PopoverContent>
                        </Popover>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden md:table-cell">Starting Date</TableHead>
                        <TableHead className="hidden md:table-cell">Ending Date</TableHead>
                        <TableHead className="hidden md:table-cell">Justification</TableHead>
                        <TableHead className="hidden md:table-cell">Description</TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    {absences.map((absences) => (
                            <TableRow key={absences.id}>
                                <TableCell>{absences.startDate}</TableCell>
                                <TableCell>{absences.endDate?? "-"}</TableCell>
                                <TableCell>{absences.justification}</TableCell>
                                <TableCell>{absences.description}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                  Showing <strong>1-{absences?.length}</strong> of <strong>{absences?.length}</strong>{" "}
                    absences
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
