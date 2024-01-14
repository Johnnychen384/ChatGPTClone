"use client";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { db } from "../firebase";
import toast from "react-hot-toast";
import EditButtons from "./EditButtons";


type Props = {
    chatId: string,
    docId: any,
    content: string,
    cancelEdit: () => void;
}

function EditChat({chatId, docId, content, cancelEdit}: Props) {
    const [prompt, setPrompt] = useState<string>(content);
    const {data: session} = useSession();

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!prompt) return;

        if (!db || !session || !session.user || !chatId || !docId) {
            console.error("Invalid arguments passed to doc function");
            return;
        }

        const input = prompt.trim();
        setPrompt("");

        const message = {
            text: input,
            editedAt: serverTimestamp()
        }
        
        const messageRef = doc(db, "users", session?.user?.email!, "chats", chatId, "messages", docId);
        await updateDoc(messageRef, message);

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
            cancelEdit();
        })
    }


    return (
        <div className="text-gray-400 rounded-lg text-sm w-full">
            <form className="p-1 space-x-5 flex flex-col" onSubmit={sendMessage}>
                <input type="text" 
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type your changes here..."
                value={prompt}
                className="focus:outline-none bg-transparent flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
                disabled={!session}
                />

                <EditButtons cancelEdit={cancelEdit}/>
            </form>
        </div>
    )
}

export default EditChat