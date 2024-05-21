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
import { Child, educator, fetchEducatorSessions, getEducator } from "@/utils/educator";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { Button } from "./button";
import Link from "next/link";
import { getChild } from "@/utils/parent";




export function ParentDashboard(props:{
  username : string,
  token : string | null
}) {
  const [groups, setGroups] = useState<group[]>([]);
  const [child, setChild] = useState<Child>();
  const [group, setGroup] = useState<number>(0);
  const [sessions, setSessions] = useState<Session[]>([]);


  
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
       return child;
    } catch (error: any) {
      console.error(error);
      return null; 
    }
  }


  const fetchSessionsForChild = async (groupId: number | undefined) => {
    console.log("fetching sessions for ", groupId)
    const fetchedSessions = await fetchGroupSessions(props.token, groupId);
    setSessions(fetchedSessions?? []);
    console.log("set sessions to", fetchedSessions)
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
                    {Array.from({ length: 12 }, (_, i) => `${i + 8}:00 PM`).map((timePM) => (
                        <TableRow key={timePM}>
                        <TableCell>{timePM}</TableCell>
                        {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                            <TableCell key={`${timePM}-${day}`}>
                            {sessions
                                .filter((session) => session.time === timePM && session.day === day)
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
                    Showing sessions for Group {group}
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
