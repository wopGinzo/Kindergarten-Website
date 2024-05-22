"use client";
import { Button } from "@/components/ui/button"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react";
import { Message, MessageDto, fetchConversation, fetchMessagesByAdminId, fetchMessagesByParentId, sendMessage } from "@/utils/chat";
import { admin, getAdmin, getAllParents } from "@/utils/admin";
import { getParent, parent } from "@/utils/parent";

export default function ChatComponent(props:{
    role: string,
    username : string,
    token : string | null
  }) {
    const [messages, setMessages] = useState<MessageDto[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [sender, setSender]= useState<"ADMIN"|"PARENT">();
    const [admin, setAdmin]=useState<number>()
    const [parent, setParent]=useState<number>()
    const [penpals, setPenpals]=useState<parent[] | admin[] | (admin|undefined)[]>()

    useEffect(() => {
        if (props.token) {
            if (props.role=="ADMIN") {
                setSender("ADMIN")
                fetchAdmin().then((admin) => setAdmin(admin?.id));
                fetchAllParents().then((parents) => setPenpals(parents?? undefined));


            }
            if (props.role=="PARENT") {
                setSender("PARENT")
                fetchParent().then((parent) => setParent(parent?.id));
            }
          }
        }, [props.token]);

        useEffect(() => {

            fetchMessages()
            }, [parent, admin]);
           
            const handlePenpalClick = (penpal: any) => {
                if (sender === "ADMIN") {
                    setParent((prevParent) => (isParent(penpal) ? penpal.id : undefined));
                console.log(parent)

                } else if (sender === "PARENT") {
                    setAdmin((prevAdmin) => (isAdmin(penpal) ? penpal.id : undefined));
                console.log(admin)

                }
              };
           
    async function fetchAllParents(){
        try {
            const parents = await getAllParents(props.token);
            console.log("setting penpals to", parents)
            setPenpals(parents?? undefined);
            return parents;
        } catch (error: any) {
            console.error(error);
            return null;
        }
        }
          
        function isParent(obj: any): obj is parent {
            return 'name' in obj && 'phoneNumber' in obj;
          }
          
          function isAdmin(obj: any): obj is admin {
            return 'nom' in obj;
          }
async function fetchParentConversations(parent: parent | null){
    try {
        console.log("fetching messages for parent", parent)
        const oldMessages = await fetchMessagesByParentId(props.token, parent?.id);
        console.log("messages for parent are",oldMessages)
        const admins = oldMessages?.map((message: Message) => message.admin);
        const uniqueAdmins = Array.from(new Set(admins?.map(admin => admin?.id))).map(id => admins?.find(admin => admin?.id === id));

        console.log("setting penpals to", uniqueAdmins)
        setPenpals(uniqueAdmins?? []);
        return uniqueAdmins;
    } catch (error: any) {
        console.error(error);
        return null;
    }
}

  async function fetchAdmin(){
    try {
       const admin = await getAdmin(props.token, props.username);
       console.log("setting admin to", admin)
       setAdmin(admin?.id);
       return admin;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  }

  async function fetchParent(){
    try {
       const parent = await getParent(props.token, props.username);
       console.log("setting parent to", parent)
       setParent(parent?.id);
       fetchParentConversations(parent)

       return parent;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  }

    const fetchMessages = async () => {
    if (parent && admin) {
        const fetchedMessages = await fetchConversation(props.token, admin, parent);
        if (fetchedMessages) {
        setMessages(fetchedMessages);
            console.log(fetchedMessages)
    }else{

            console.log("could not fetch messages for",admin , parent)
        }
        }else{
        console.log("ids are empty for",admin, parent)
        }

    }
  
    const handleSendMessage = async () => {
        if (inputValue.trim() === "") {
          return; // Don't send an empty message
        }
      
        const messageDto: MessageDto = {
          parentId: parent || 0, // Replace with appropriate value if parent is undefined
          adminId: admin || 0, // Replace with appropriate value if admin is undefined
          content: inputValue,
          sender: sender === "ADMIN" ? "ADMIN" : "PARENT",
          timestamp: new Date().toISOString(), // Add the current timestamp
          id: 0, // The server will assign the ID
        };
      
        const sentMessage = await sendMessage(props.token, messageDto);
      
        if (sentMessage) {
          setMessages((prevMessages) => [...prevMessages, sentMessage]);
          setInputValue("");
          fetchMessages()
        } else {
          console.error("Failed to send message");
        }
      };

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-center px-4 py-2 border-b">
        {/* <h1 className="text-4xl font-semibold text-center">Chat</h1> */}
        {/* <Button size="sm" variant="outline">
          Leave Chat
        </Button> */}
      </header>
      <div className="flex h-full pb-10">
        <aside className="min-w-64 p-4 h-full  gap-8 ">
            <h2 className="text-4xl font-semibold mb-4">Users</h2>
            <div className="flex flex-col gap-10 h-full overflow-y-scroll -z-50 max-h-[70vh]">
                {penpals &&
                penpals.map((penpal) => (
                    <div className="flex items-center gap-4 cursor-pointer" key={penpal?.id}       onClick={() => handlePenpalClick(penpal)}>
                    <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarFallback>JL</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">{isAdmin(penpal) && <p>Admin {penpal.id}</p>}</p>
                        <p className="text-sm text-muted-foreground">
                        {penpal?.name} 

                        </p>
                        {isParent(penpal) && (
                        <p>
                            {isParent(penpal) && penpal.email} - {isParent(penpal) && penpal.phoneNumber}

                        </p>
                        )}
                    </div>
                    </div>
                ))}
            </div>
        </aside>
        <main className="flex-1 overflow-y-auto p-4 space-y-4 w-full">
            {messages.map((message) => (
                <div
                key={message.id}
                className={`flex ${
                    message.sender === sender ? "justify-end" : "justify-start"
                }`}
                >
                <Avatar className="shrink-0">
                    <AvatarImage alt="User Avatar" src="/placeholder-avatar.jpg" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div
                    className={`p-2 rounded-lg ml-2 ${
                    message.sender === sender
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 dark:bg-gray-800"
                    }`}
                >
                    <p className="text-sm">{message.content}</p>
                </div>
                </div>
            ))}
            </main>
    </div>

<footer className="flex items-center space-x-2 p-2 border-t z-0 w-1/2 place-self-end">
  <Input className="flex-1 w-full min-w-96" placeholder="Type a message" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
  <Button size="sm" variant="outline" 
  onClick={handleSendMessage}
  >
    Send
  </Button>
</footer>
    </div>
  )
}