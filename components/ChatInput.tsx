"use client";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid"
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { db } from "../firebase";
import toast from "react-hot-toast";


type Props = {
    chatId: string;
}

function ChatInput({chatId}: Props) {
    const [prompt, setPrompt] = useState<string>("");
    const {data: session} = useSession();

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!prompt) return;

        const input = prompt.trim();
        setPrompt("");

        const message: Message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image! || `https://ui-avatars.com/api/?name={$session?.user?.name}`,

            }
        }

        await addDoc(collection(db, "users", session?.user?.email!, "chats", chatId, "messages"), message);

        const notification = toast.loading("ChatGPT is thinking....");

        await fetch('/api/askQuestions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: input, chatId, session
            })
        }).then(() => {
            toast.success("ChatGPT has responded!", {
                id: notification
            })
        })
    }


    return (
        <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm w-2/3 mx-auto mb-10">
            <form className="p-5 space-x-5 flex" onSubmit={sendMessage}>
                <input type="text" 
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Message ChatGPT...."
                value={prompt}
                className="focus:outline-none bg-transparent flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
                disabled={!session}
                />

                <button type="submit" disabled={!prompt || !session} className="bg-[#343541] hover:opacity-50 text-white font-bond px-4 py-2 rounded disabled:cursor-not-allowed">
                    <PaperAirplaneIcon className="h-4 w-5 -rotate-45"/>
                </button>
            </form>
        </div>
    )
}

export default ChatInput