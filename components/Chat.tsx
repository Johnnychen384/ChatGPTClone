'use client';

import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Message from "./Message";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";

type Props = {
    chatId: string;
}

function Chat({ chatId }: Props) {
    const { data: session } = useSession();
    const [messages] = useCollection(session && query(collection(db, "users", session?.user?.email!, "chats", chatId, "messages"), orderBy("createdAt", "asc")));
    return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden mt-4 w-2/3 mx-auto">
        {messages?.empty && (
            <>
                <p className="mt-10 text-center text-white">
                    Ask ChatGPT A Question By Typing Below!
                </p>
                <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce"/>
            </>
        )}

        {messages?.docs.map((message) => (
            <Message key={message.id} message={message.data()} chatId={chatId} docId={message.id}/>
        ))}
    </div>
  )
}

export default Chat