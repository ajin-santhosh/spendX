import React from "react";
import EmailVerifyPage from "./EmailVerifyPage";
import OtpVerifyPage from "./OtpVerifyPage";
import RegisterPageForm from "./RegisterPageForm";
import { useState } from "react";
function RegisterPage() {

  const [step, setStep] =useState(1)
  return (
   
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
          
  );
}

export default RegisterPage;
