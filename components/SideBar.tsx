'use client'
import { signOut, useSession } from "next-auth/react";
import NewChat from "./NewChat";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import ChatRow from "./ChatRow";


function SideBar() {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(session && query(collection(db, "users", session.user?.email!, "chats"), orderBy("createdAt", "asc")));

  return (
    <div className="p-2 flex flex-col h-screen">
        <div className="flex-1">
            <NewChat />

            {chats?.docs.map(chat => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
        </div>

        {session && (
          <img src={session.user?.image!} 
          onClick={() => signOut()}
          alt="Profile Picture" 
          className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50"/>
        )}
    </div>
  )
}

export default SideBar