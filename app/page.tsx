import {ExclamationTriangleIcon} from "@heroicons/react/24/outline";
import StartNewChat from "../components/StartNewChat";
function page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-2 text-white">
      <h1 className="text-5xl font-bold mb-20">ChatGPT</h1>

      <div className="flex-col space-x-2 text-center">
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <ExclamationTriangleIcon className="h-8 w-8" />
            <h2>Warning!</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">"May occasionally generate incorrect information"</p>
            <p className="infoText">"May occasionally produce harmful instructions or biased content"</p>
            <p className="infoText">"Limited knowledge of world and events after 2021"</p>
            <StartNewChat />
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
