"use client";

import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { initiatePayment, preRegister, PreRegisterData } from "@/utils/preregister";

const stripePromise = loadStripe("pk_test_51PFypMH3kOr3AVMZlFWmBn3NNoWxBkbClsMrCGN0jFe6ecKYv4fvQawuCMdbagLSk4wHlVeE9kDbwfLV6KJyKGXI00BhYy9tQO");


export default function Payment() {
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const queryParams = new URLSearchParams(window.location.search);
  const formData: PreRegisterData | null = JSON.parse(
    sessionStorage.getItem('preRegisterData') || 'null'
  );
  const preRegisterData: PreRegisterData = formData as PreRegisterData;
  console.log(preRegisterData)
  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        let planId;
        console.log(preRegisterData.plan, preRegisterData.schedule)
        switch (preRegisterData.plan) {
            case "TODDLER":
                if (preRegisterData.schedule === "HALF_DAY") {
                    planId =  "price_1PGkwgH3kOr3AVMZ0vWNtGL9";
                }
                planId =  "price_1PHRf7H3kOr3AVMZjHopVpdI";
                break;
            case "PRESCHOOL":
    
                if (preRegisterData.schedule === "HALF_DAY") {
                    planId =  "price_1PHRftH3kOr3AVMZXHX0meYi";
                }
                planId =  "price_1PHRgvH3kOr3AVMZUFafp702";
                break;
            case "KINDERGARTEN":
    
                if (preRegisterData.schedule === "HALF_DAY") {
                    planId =  "price_1PHRhoH3kOr3AVMZjEp7o0qV";
                }
                planId =  "price_1PHRiHH3kOr3AVMZK36HpIUy";
                break;
            default:
                planId =  "";
                break;
        }
        const secret = await initiatePayment(planId);
        setClientSecret(secret);

      } catch (error) {
        console.error("Error during payment or pre-registration:", error);
      }
    };

    fetchClientSecret();
  }, []);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePaymentSuccess = async () => {
    await preRegister(preRegisterData);

    console.log("pre-registered with success")
    setPaymentSuccess(true);

};

  return paymentSuccess? (
    <div className="h-full w-full pt-20 flex items-center justify-center flex-col">
      <h1 className="text-6xl p-20" >{`Welcome aboard, ${preRegisterData.firstname}!`}</h1>
      <h1 className="text-3xl" >{`You have pre-registered, ${preRegisterData.childfirstname} on a ${preRegisterData.plan} plan successfully.`}!</h1>
    </div>
  ) : clientSecret ? (
    <div className="h-full w-full pt-20">
        <EmbeddedCheckoutProvider stripe={stripePromise} options={{
            clientSecret: clientSecret,
            onComplete: handlePaymentSuccess
        }}>
        <EmbeddedCheckout
        
        />
    
        </EmbeddedCheckoutProvider>
    </div>
  ) : (
    <div>Loading...</div>
  );
}