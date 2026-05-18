import React from "react";
import { Mail, KeyRound, User } from "lucide-react";
import EmailVerifyPage from "./EmailVerifyPage";
import OtpVerifyPage from "./OtpVerifyPage";
import RegisterPageForm from "./RegisterPageForm";
import { useState } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
function RegisterPage() {
  const stepUI = {
    1: { label: "Email Verification", icon: Mail, percent: 5 },
    2: { label: "OTP Verification", icon: KeyRound, percent: 50 },
    3: { label: "Registration", icon: User, percent: 90 },
  };
  const [step, setStep] = useState(1);

  return (
    <div className="w-full max-w-sm ">
      <div className="px-3 py-10">
        <Field >
          {/* Header */}
          <FieldLabel
            htmlFor="progress-upload"
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              {(() => {
                const Icon = stepUI[step].icon;
                return <Icon size={18} className="text-blue-600" />;
              })()}

              <span className="font-medium">{stepUI[step].label}</span>
            </div>

            <span className="text-sm text-gray-500">
              {stepUI[step].percent}%
            </span>
          </FieldLabel>

          {/* Progress Bar */}
          <Progress
            value={stepUI[step].percent}
            id="progress-upload"
            className="mt-2"
          />
        </Field>
      </div>
      <div>
        {
          <>
            {step === 1 && <EmailVerifyPage onNext={() => setStep(2)} />}

            {step === 2 && (
              <OtpVerifyPage
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
              />
            )}
            {step === 3 && (
              <RegisterPageForm
                // onNext={() => setStep(3)}
                onBack={() => setStep(2)}
              />
            )}
          </>
        }
      </div>
    </div>
  );
}

export default RegisterPage;
