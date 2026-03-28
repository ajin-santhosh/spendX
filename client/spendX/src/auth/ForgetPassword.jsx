import React from "react";
import { GalleryVerticalEnd, RefreshCwIcon } from "lucide-react";

import TempPassgenerate from "./TempPassGenerate";
import TempPassVerify from "./TempPassVerify";
import NewPassCreate from "./NewPassCreate";

import { useState } from "react";

function ForgetPassword() {
  const [step, setStep] = useState(1);
  return (
    <>
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <a href="#" className="flex items-center gap-2 font-medium">
              <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-4" />
              </div>
              spendX.com
            </a>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              {
                <>
                  {step === 1 && <TempPassgenerate onNext={() => setStep(2)} />}

                  {step === 2 && (
                    <TempPassVerify
                      onNext={() => setStep(3)}
                      // onBack={() => setStep(1)}
                    />
                  )}
                  {step === 3 && (
                    <NewPassCreate
                    // onNext={() => setStep(3)}
                    // onBack={() => setStep(2)}
                    />
                  )}
                </>
              }
            </div>
          </div>
        </div>
        <div className="bg-muted relative hidden lg:block">
          <img
            src="/Spend X (1).png"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
