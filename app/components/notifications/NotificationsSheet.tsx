"use client"
import getUnseenMessages from "@/app/actions/notifications/getUnseenMessages";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import NotificationItem from "./NotificationItem";

type Notification = {
  name: string
  image: string
  body: string
}


export function NotificationsSheet({unSeen}: any) {
  
  const [notifications, setNotifications] = useState<Notification[]>([])
    
    useEffect(() => {
      const newNotifications = unSeen.map((item: any): Notification => {
          return {
              name: item.sender.name,
              image: item?.sender?.image,
              body: item?.body 
          };
      });
      setNotifications(prevNotifications => {
          const seen = new Set(prevNotifications.map(item => JSON.stringify(item)));
          const uniqueNotifications = newNotifications.filter((item:any) => !seen.has(JSON.stringify(item)));
          return [...prevNotifications, ...uniqueNotifications];
      });
      
  }, [unSeen]);


  console.log(unSeen);
  
  

  return (
    <div className="grid grid-cols-2 relative">
        <Sheet>
          <SheetTrigger asChild>
            <div className="mx-auto flex flex-col my-10">
            {  notifications.length > 0 && 
              <span className="text-[12px] mx-auto my-[-29px] text-blue-500">
                {notifications.length}
              </span>
            }
              <IoIosNotificationsOutline className="" color={notifications.length > 0 ? "gray" : "gray"} size={35} />
            </div>
          </SheetTrigger>
          <SheetContent className="" side={"left"}>
            <SheetHeader className="">
                <SheetTitle>Notifications</SheetTitle>
            </SheetHeader>
            <SheetClose className="absolute top-1 right-2">
              <AiOutlineCloseCircle size={33} color="white"/>
            </SheetClose>
            <SheetDescription className="items-center text-center flex justify-center py-[30px] flex-col">
                {
               notifications.length === 0 && <p className="text-2xl">No new notifications</p>
                }
                {
                  notifications.map((item) => {
                    return <NotificationItem name={item.name} image={item.image} body={item.body}/>
                  })
                }
            </SheetDescription>
            <SheetFooter>
            </SheetFooter>
          </SheetContent>
        </Sheet>
    </div>
  );
}
