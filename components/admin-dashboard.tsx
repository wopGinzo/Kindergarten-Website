"use client";
import Image from "next/image"
import Link from "next/link"
import {
  Ban,
  Check,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  RefreshCcw,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { PreRegistration, fetchPreRegistrations, validatePreRegistration, deletePreRegistration, staffForm, fetchStaff, addStaffMember, fetchAvailableGroups, group, assignChildToGroup, fetchAllGroups, fetchGroupSessions, Session, assignSessionToGroup } from "@/utils/admin"
import PreRegister from "@/app/preregister/page"
import { useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Label } from "./ui/label";
import { Controller, useForm } from "react-hook-form";
import { LabelInputContainer } from "./login-form";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface User {
  id: number;
  sub: string;
  email: string;
  roles: string[];
}

async function getSpecGroups(token: string | null, plan: string, schedule: string) {
  const  groups  = await fetchAvailableGroups(token, plan, schedule)
  console.log(groups)
  return groups
}


export function AdminDashboard(props:{
  user : string,
  token : string | null
}) {
  const [preRegistrations, setPreRegistrations] = useState<PreRegistration[] | null>(null);
  const [staff, setStaff] = useState<staffForm[] | null>(null);
  const [availableGroups, setAvailableGroups] = useState<group[]>([]);
  const [groups, setGroups] = useState<group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<number>(0);
  const [sessions, setSessions] = useState<Session[]>([]);


  const refreshPreRegistration = () =>{
    if (props.token) {
      fetchPreRegistrations(props.token).then((data) => {
        if (data) {
          setPreRegistrations(data);
        }
      });
    }
  }
  
  
  useEffect(() => {
    if (props.token) {
      fetchPreRegistrations(props.token).then((data) => {
        if (data) {
          setPreRegistrations(data);
        }
      });
      fetchStaff(props.token).then((data) => {
        if (data) {
          setStaff(data);
        }
      });
      getAllGroups()
      fetchSessionsForGroup(1);

    }
  }, [props.token]);
  
  const fetchSessionsForGroup = async (groupId: number) => {
    console.log("fetching sessions for ", groupId)
    const fetchedSessions = await fetchGroupSessions(props.token, groupId);
    setSessions(fetchedSessions?? []);
    console.log("set sessions to", fetchedSessions)
  };

async function refreshGroups(plan: string, schedule: string){
  const groups = await getSpecGroups(props.token, plan, schedule);
  setAvailableGroups(groups || []);
}
async function getAllGroups(){
  try {
     const groups = await fetchAllGroups(props.token);
     setGroups(groups || []);
     return true;
  } catch (error : any) {
    return error
  }
}

async function acceptPreRegistration(token?: string | null, preRegistration?: PreRegistration, selectedGroup?: number) {
  if (!preRegistration || !preRegistration.id || !token) throw new Error("Can't validate non-existing pre-registration");
  console.log("validating child to group ", selectedGroup)
  const response = await validatePreRegistration(preRegistration, token)

  const assignmentSuccessful = await assignChildToGroup(token,response, selectedGroup);
  console.log("child assigned to group? ",assignmentSuccessful)



  const deleteResponse = await deletePreRegistration(preRegistration.id, token)
  console.log(deleteResponse)
  refreshPreRegistration()


}
async function refusePreRegistration(token: string | null, preRegistrationId?: number){
  if (!preRegistrationId || !token) throw new Error("Can't refuse non-existing pre-registration");

  const response = await deletePreRegistration(preRegistrationId, token)
  console.log(response)
  refreshPreRegistration()


}

const { register, handleSubmit, reset, control } = useForm();


const onStaffSubmit = async (data: any) => {
  try {
    data = {...data,
      groupId:selectedGroup}
    console.log(data)
    const response = await addStaffMember(data, props.token)
    fetchStaff(props.token).then((data) => {
      if (data) {
        setStaff(data);
      }
    });
    reset()
    return response.status
  } catch (error) {
    console.log(error)
  }
};
const onSessionSubmit = async (data: any) => {
  try {
    console.log(data)
    const response = await assignSessionToGroup(props.token, data)
    fetchSessionsForGroup(data.groupId)
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
          <Tabs defaultValue="preregister">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="preregister">Pre-Register</TabsTrigger>
                <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
                <TabsTrigger value="staff">Staff</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
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
                Welcome, {props.user}
              </div>
            </div>
            <TabsContent value="preregister">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader className="flex flex-row justify-between">
                  <div className="flex-col">
                    <CardTitle>Pre-Register</CardTitle>
                    <CardDescription>
                      Manage pre-registeration requests that Prodigy Kindergarten has received.
                    </CardDescription>

                  </div>
                  <Button variant="outline" size="icon" onClick={()=>{
                    refreshPreRegistration()
                                }}>
                                  <RefreshCcw/>
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Parent Name</TableHead>
                        <TableHead>Child Name</TableHead>
                        <TableHead className="hidden md:table-cell">Age</TableHead>
                        <TableHead className="hidden md:table-cell">Plan & Schedule</TableHead>
                        <TableHead className="hidden md:table-cell">Phone Number</TableHead>
                        <TableHead className="hidden md:table-cell">Email</TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {preRegistrations? preRegistrations.map((preRegistration) => (
                            <TableRow key={preRegistration.id}>
                              <TableCell className="font-medium">{preRegistration.name}</TableCell>
                              <TableCell className="hidden md:table-cell">{preRegistration.childName}</TableCell>
                              <TableCell className="hidden md:table-cell">{preRegistration.age}</TableCell>
                              <TableCell>
                                <Badge variant="outline">
                                {
                                (() => {
                                  switch (preRegistration.plan) {
                                    case "TODDLER":
                                      return "Toddler";
                                    case "PRESCHOOL":
                                      return "Toddler";
                                    case "KINDERGARTEN":
                                      return "Toddler";
                                    default:
                                      return preRegistration.plan;
                                  }
                                })()

                                }  
                                </Badge>
                                  
                                <Badge variant="outline">

                                  {
                                    (() => {
                                      switch (preRegistration.schedule) {
                                        case "HALF_DAY":
                                          return "Half-Day";
                                        case "FULL_DAY":
                                          return "Full-Day";
                                        default:
                                          return preRegistration.schedule;
                                      }
                                    })()
                                  }
                                </Badge>
                                
                              </TableCell>
                              <TableCell className="hidden md:table-cell">{preRegistration.phone}</TableCell>
                              <TableCell className="hidden md:table-cell">{preRegistration.email}</TableCell>
                              <TableCell>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => {
                                      refreshGroups(preRegistration.plan, preRegistration.schedule)
                                    }}
                                  >
                                    <Check />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full">
                                  <div className="grid gap-4">
                                    {availableGroups.length > 0 && (
                                      <form className="gap-4 flex flex-col justify-center items-center">
                                        <Label>Select a group for a {preRegistration.plan.toLowerCase()} plan,
                                        on a {preRegistration.schedule.replace("_"," ").toLowerCase()} schedule.</Label>
                                        <RadioGroup
                                          value={selectedGroup.toString()}
                                          onValueChange={(value) => setSelectedGroup(parseInt(value))}
                                        >
                                          {availableGroups.map((group) => (
                                            <div key={group.id} className="flex items-center">
                                              <RadioGroupItem
                                                value={group.id ? group.id.toString() : "not available"}
                                              />
                                              <span className="ml-2">
                                                Group {group.id}
                                              </span>
                                            </div>
                                          ))
                                          }
                                        </RadioGroup>
                                        <Button
                                          type="submit"
                                          variant="outline"
                                          className="flex gap-x-4"
                                          onClick={async (e) => {
                                            e.preventDefault();
                                            await acceptPreRegistration(props.token, preRegistration, selectedGroup);

                                          }}
                                        >
                                          <Check /> Assign
                                        </Button>
                                      </form>
                                    )}
                                  </div>
                                </PopoverContent>
                              </Popover>

                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  refusePreRegistration(props.token, preRegistration.id);
                                }}
                              >
                                <Ban />
                              </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        : null}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-{preRegistrations?.length}</strong> of <strong>{preRegistrations?.length}</strong>{" "}
                    pre-registrations
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
                  <div className="flex-col">
                    <Select
                      onValueChange={(value) => {
                        setSelectedGroup(parseInt(value));
                        fetchSessionsForGroup(parseInt(value));
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
                  <div className="flex gap-x-4 items-center">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button size="sm" className="h-8 gap-1">
                          <PlusCircle className="h-3.5 w-3.5" />
                          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Add Session
                          </span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full">
                        <div className="grid gap-4">
                        <form className="my-4" onSubmit={handleSubmit(onSessionSubmit)}>

                          <LabelInputContainer className="mb-4 flex-row items-center gap-x-4 justify-between w-full">
                            <Label htmlFor="module">Module Name</Label>
                            <Input {...register('moduleName')} id="moduleName" placeholder="Name" type="text" />
                          </LabelInputContainer>
                          <LabelInputContainer className="mb-4 flex-row items-center gap-x-4 justify-between w-full">
                            <Label htmlFor="time">Time</Label>
                            <Input {...register('time')} id="time" placeholder="8:00 AM" type="text" />
                          </LabelInputContainer>
                          <LabelInputContainer className="mb-4 flex-row items-center gap-x-4 justify-between w-full">
                            <Label htmlFor="day">Day</Label>
                            <Input {...register('day')} id="day" placeholder="Sunday" type="text" />
                          </LabelInputContainer>
                          <LabelInputContainer className="mb-4 flex-row items-center gap-x-4 justify-between w-full">
                            <Label htmlFor="educator">Educator</Label>
                            <Controller name="educatorId" control={control}
                          render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger className="w-[220px]">
                                <SelectValue placeholder="Select Educator" />
                              </SelectTrigger>
                              <SelectContent>
                                {staff?.map((member) => (
                                  <SelectItem key={member.id} value={`${member.id}`}>
                                    {member.name}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                          )}
                        />

                          </LabelInputContainer>
                          <LabelInputContainer className="mb-4 flex-row items-center gap-x-4 justify-between w-full">
                            <Label htmlFor="educator">Group</Label>
                            <Controller
                          name="groupId"
                          control={control}
                          render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger className="w-[220px]">
                                <SelectValue placeholder="Select group" />
                              </SelectTrigger>
                              <SelectContent>
                              {groups?.map((group) => (
                                <SelectItem key={group.id} value={`${group.id}`}>
                                  Group {group.id}
                                </SelectItem>
                              ))}
                            </SelectContent>
                            </Select>
                          )}
                        />

                          </LabelInputContainer>
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
                          {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
                            (day) => (
                              <TableCell key={`${timeAM}-${day}`}>
                                {sessions?.find(
                                  (session) =>
                                    session.time === timeAM &&
                                    session.day === day
                                )?.moduleName || "-"}
                              </TableCell>
                            )
                          )}
                        </TableRow>
                      ))}
                      {Array.from({ length: 12 }, (_, i) => `${i + 8}:00 PM`).map((timePM) => (
                        <TableRow key={timePM}>
                          <TableCell>{timePM}</TableCell>
                          {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
                            (day) => (
                              <TableCell key={`${timePM}-${day}`}>
                                {sessions?.find(
                                  (session) =>
                                    session.time === timePM &&
                                    session.day === day
                                )?.moduleName || "-"}
                              </TableCell>
                            )
                          )}
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
            <TabsContent value="events">
                <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader>
                    <CardTitle>Events</CardTitle>
                    <CardDescription>View and manage upcoming events.</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Event Name</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>
                            <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">
                            Open House
                            </TableCell>
                            <TableCell>
                            2023-08-01
                            </TableCell>
                            <TableCell>
                            10:00 AM - 12:00 PM
                            </TableCell>
                            <TableCell>
                            Prodigy Kindergarten
                            </TableCell>
                            <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            </TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>
                    </CardContent>
                    <CardFooter>
                    <div className="text-xs text-muted-foreground">
                        Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                        events
                    </div>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="payments">
            <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                <CardTitle>Customer Payments</CardTitle>
                <CardDescription>View and manage payments made by customers.</CardDescription>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Parent Name</TableHead>
                        <TableHead>Child Name</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>
                        <span className="sr-only">Actions</span>
                        </TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">
                        Mohamed Dib
                        </TableCell>
                        <TableCell>
                        Salaheddine Dib
                        </TableCell>
                        <TableCell>
                        $500.00
                        </TableCell>
                        <TableCell>
                        2023-07-12 10:42 AM
                        </TableCell>
                        <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                            >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
                </CardContent>
                <CardFooter>
                <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    payments
                </div>
                </CardFooter>
            </Card>
            </TabsContent>
            <TabsContent value="staff">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader className="flex flex-row justify-between">
                  <div className="flex-col">
                    <CardTitle>Staff</CardTitle>
                    <CardDescription>
                      Manage staff members of Prodigy Kindergarten.
                    </CardDescription>

                  </div>
                  <div className="flex gap-x-4 items-center">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button size="sm" className="h-8 gap-1">
                          <PlusCircle className="h-3.5 w-3.5" />
                          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Add Member
                          </span>
                        </Button>   
                      </PopoverTrigger>
                      <PopoverContent className="w-full">
                        <div className="grid gap-4">
                        <form className="my-4" onSubmit={handleSubmit(onStaffSubmit)}>

                          <LabelInputContainer className="mb-4 flex-row items-center gap-x-4 justify-between w-full">
                            <Label htmlFor="name">Name</Label>
                            <Input {...register('name')} id="name" placeholder="Member" type="text" />
                          </LabelInputContainer>
                          <LabelInputContainer className="mb-4 flex-row items-center gap-x-4 justify-between w-full">
                            <Label htmlFor="email">Email Address</Label>
                            <Input {...register('email')} id="email" placeholder="Member" type="email" />
                          </LabelInputContainer>
                          <LabelInputContainer className="mb-4 flex-row items-center gap-x-4 justify-between w-full">
                            <Label htmlFor="password">Password</Label>
                            <Input {...register('password')} id="password" placeholder="••••••••" type="password" />
                          </LabelInputContainer>
                          <LabelInputContainer className="mb-4 flex-row items-center gap-x-4 justify-between w-full">
                            <Label htmlFor="subject">Subject</Label>
                            <Input {...register('subject')} id="subject" placeholder="Subject" type="text" />
                          </LabelInputContainer>
                          <LabelInputContainer className="mb-4 flex-row items-center gap-x-4 justify-between w-full">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              {...register("phoneNumber")} id="phone"
                              placeholder="+213"
                              type="text"
                              // pattern="\+213[0-9]{9}"
                              onKeyDown={(e) => {
                                const target = e.target as HTMLInputElement;
                                const validKeyForPayment = [
                                  "0",
                                  "1",
                                  "2",
                                  "3",
                                  "4",
                                  "5",
                                  "6",
                                  "7",
                                  "8",
                                  "9",
                                  "Backspace",
                                ];

                                if (!validKeyForPayment.includes(e.key)) {
                                  e.preventDefault();
                                }
                                const currentValue = target.value.replace(/\D+/g, '');
                                if (currentValue.length >= 10 && e.key != "Backspace") {
                                  e.preventDefault();
                                }
                              }}

                              
                              />
                          </LabelInputContainer>
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
                        <TableHead>Name</TableHead>
                        <TableHead className="hidden md:table-cell">Subject</TableHead>
                        <TableHead className="hidden md:table-cell">Phone Number</TableHead>
                        <TableHead className="hidden md:table-cell">Email</TableHead>
                        {/* <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead> */}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {staff? staff.map((member) => (
                            <TableRow key={member.id}>
                              <TableCell className="font-medium">{member.name}</TableCell>
                              <TableCell className="hidden md:table-cell">{member.subject}</TableCell>

                              <TableCell className="hidden md:table-cell">{member.phoneNumber}</TableCell>
                              <TableCell className="hidden md:table-cell">{member.email}</TableCell>


                              {/* <TableCell>
                                <Button variant="outline" size="icon" onClick={()=>{
                                }}>
                                  <Check/>
                                </Button>
                                <Button variant="outline" size="icon" onClick={()=>{

                                }}>
                                  <Ban/>
                                </Button>
                              </TableCell> */}
                              
                            </TableRow>
                          ))
                        : null}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-{staff?.length}</strong> of <strong>{staff?.length}</strong>{" "}
                    members
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
