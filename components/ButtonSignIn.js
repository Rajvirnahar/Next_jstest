"use client"

import { signIn } from "next-auth/react";
import config from "@/config";
                
const SigninButton = () => {
  return (
    <button
    className="btn btn-gradient animate-shimmer w-full max-w-xs space-y-3"
      onClick={() => signIn(undefined, { callbackUrl: config.auth.callbackUrl })}
    >
      Sign up for 3 free credits
    </button>
    
  );
};

                
export default SigninButton;