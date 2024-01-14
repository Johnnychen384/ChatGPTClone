import { DocumentData } from 'firebase/firestore'
import React, { useState } from 'react'
import { PencilIcon } from "@heroicons/react/24/outline";
import EditButtons from './EditButtons';
import EditChat from './EditChat';


type Props = {
    message: DocumentData,
    docId: any,
    chatId: string;
};

function Message({message, docId, chatId}: Props,) {
    const isChatGPT = message.user.name === "ChatGPT";
    const [editNow, setEditNow] = useState(false);
    const cancelEdit = () => {
        setEditNow(!editNow);
    }
    return (
        <div className={`py-5 text-white ${isChatGPT && "bg-[#434654]"}`}>
            <div className='flex space-x-5 px-10 max-w-2xl mx-auto'>
                <img src={message.user.avatar} alt="" className='h-8 w-8'/>
                {!editNow ? 
                    <p className='pt-1 text-sm'>
                        {message.text.content || message.text}
                    </p> 
                :
                    <EditChat chatId={chatId} docId={docId} content={message.text} cancelEdit={cancelEdit}/>
                }
            </div>
            
            {!isChatGPT && 
                (!editNow &&
                    (<div className='flex space-x-5 px-20 max-w-2xl mx-auto opacity-0 hover:opacity-100'>
                        <PencilIcon className="h-7 w-7 pl-3 mt-1 cursor-pointer" onClick={() => setEditNow(!editNow)}/>
                    </div>) 
                )
            }
            
            
        </div>
    )
}

export default Message