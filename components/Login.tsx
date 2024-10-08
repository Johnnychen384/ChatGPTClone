'use client'
import {signIn} from "next-auth/react";
import Image from "next/image";

function Login() {
  return (
    <div className="bg-[#ffffff] h-screen flex flex-col items-center justify-center text-center">
      <Image 
        src="/ChatGPT-Logo.jpeg"
        width={300}
        height={300}
        alt="logo"
      />
      <button onClick={() => signIn('google')} className="text-black font-bold text-3xl animate-pulse">Click Here To Sign In</button>
    </div>
  )
}

export default Login
