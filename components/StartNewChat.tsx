'use client'
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { db } from "../firebase";

function StartNewChat() {
  const router = useRouter()
  const {data: session} = useSession();

  const createNewChat = async() => {
    const doc = await addDoc(collection(db, "users", session?.user?.email!, "chats"), {
      userId: session?.user?.email!,
      createdAt: serverTimestamp()
    })

    router.push(`/chat/${doc.id}`)
  };

  return (
    <div className="border-gray-700 border chatRow text-white" onClick={createNewChat}>
      <p>Click Here To Start A Chat!</p>
    </div>
  )
}

export default StartNewChat
