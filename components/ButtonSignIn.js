"use client"

import { signIn } from "next-auth/react";
import config from "@/config";
                
const SigninButton = () => {
  return (
    <button
    className="btn btn-block w-full max-w-xs space-y-3"
    style={{
      backgroundColor: 'rgb(50, 61, 214)'
    }}
      onClick={() => signIn(undefined, { callbackUrl: config.auth.callbackUrl })}
    >
     Start designing - 2 free credits
    </button>
    
  );
};

                
export default SigninButton;