import React from "react";
import { GalleryVerticalEnd } from "lucide-react";
import EmailVerifyPage from "./EmailVerifyPage";
import OtpVerifyPage from "./OtpVerifyPage";
import RegisterPageForm from "./RegisterPageForm";
import ThemeToggle from "@/components/ThemeToggle";
import { useState } from "react";
function RegisterPage() {

  const [step, setStep] =useState(1)
  return (
    <div> 
       <div className="flex w-full items-center p-5">
            <a href="#" className="flex items-center gap-2 font-medium">
              <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-4" />
              </div>
              spendX
            </a>
            <ThemeToggle />
          </div>
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
         
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-sm ">
               {
                <>
               
                {
                  step === 1 &&(
              <EmailVerifyPage onNext={() => setStep(2)} />

                  )
                }
                
                {
                  step === 2 &&(
              <OtpVerifyPage 
              onNext={() => setStep(3)} 
              // onBack={() => setStep(1)}
              />

                  )
                }
                {
                  step === 3 &&(
              <RegisterPageForm 
              // onNext={() => setStep(3)} 
              onBack={() => setStep(2)}
              />

                  )
                }
                
                 </>
               }

            </div>
          </div>
        </div>
        <div className=" relative hidden lg:block">
          <img
            src="https://res.cloudinary.com/djqxrh1gk/image/upload/v1776871980/Spend_X_1_-Photoroom_wrhzma.png"
            className="absolute inset-0 h-full w-full object-cover dark:hidden"
          />
          <img
            src="https://res.cloudinary.com/djqxrh1gk/image/upload/v1776871258/Dark_Spend_X-Photoroom_richbe.png"
            className="absolute inset-0 h-full w-full object-cover hidden dark:block"
          />
        </div>
      </div>
      </div>
  );
}

export default RegisterPage;
