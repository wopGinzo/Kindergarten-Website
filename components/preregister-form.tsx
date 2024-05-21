"use client";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/utils/cn";
import { Controller, useForm } from "react-hook-form";

import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useRouter } from "next/navigation";

export function PreRegisterForm() {
  const router = useRouter();
  const { register, handleSubmit, control, watch } = useForm();
  const [planPrice, setPlanPrice] = React.useState(0);
  const [preRegistrationFee, setPreRegistrationFee] = React.useState(0);

  const selectedPlan = watch("plan");
  const selectedSchedule = watch("schedule");

  React.useEffect(() => {
    const calculatePrices = () => {
      switch (selectedPlan) {
        case "KINDERGARTEN":
          if (selectedSchedule === "FULL_DAY") {
            setPlanPrice(10000);
            setPreRegistrationFee(2000);
          } else if (selectedSchedule === "HALF_DAY") {
            setPlanPrice(5000);
            setPreRegistrationFee(1000);
          }
          break;
        case "PRESCHOOL":
          if (selectedSchedule === "FULL_DAY") {
            setPlanPrice(8000);
            setPreRegistrationFee(1600);
          } else if (selectedSchedule === "HALF_DAY") {
            setPlanPrice(4000);
            setPreRegistrationFee(800);
          }
          break;
        case "TODDLER":
          if (selectedSchedule === "FULL_DAY") {
            setPlanPrice(10000);
            setPreRegistrationFee(2000);
          } else if (selectedSchedule === "HALF_DAY") {
            setPlanPrice(5000);
            setPreRegistrationFee(1000);
          }
          break;
        default:
          setPlanPrice(0);
          setPreRegistrationFee(0);
      }
    };

    if (selectedPlan && selectedSchedule) {
      calculatePrices();
    }
  }, [selectedPlan, selectedSchedule]);

  const onSubmit = (formData: any) => {
    sessionStorage.setItem('preRegisterData', JSON.stringify(formData));
    router.push(`/preregister/payment`);
  };




  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Prodigy Kindergarten
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Fill out the informations below in order to join our community!
      </p>

      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input {...register("firstname")} id="firstname" placeholder="John" type="text" required/>
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input {...register("lastname")} id="lastname" placeholder="Doe" type="text" required/>
          </LabelInputContainer>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="childfirstname">Child's First name</Label>
            <Input {...register("childfirstname")} id="childfirstname" placeholder="Jane" type="text" required/>
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="childlastname">Child's Last name</Label>
            <Input {...register("childlastname")} id="childlastname" placeholder="Doe" type="text" required/>
          </LabelInputContainer>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer className="mb-4">
                <Label htmlFor="relationship">Relationship</Label>
                <Controller
              name="relationship"
              control={control}
              defaultValue="mother"
              render={({ field }) => (
                <Select         value={field.value}
        onValueChange={field.onChange} defaultValue="mother">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="mother" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mother"> Mother </SelectItem>
                    <SelectItem value="father"> Father </SelectItem>
                    <SelectItem value="uncle"> Uncle </SelectItem>
                    <SelectItem value="aunt"> Aunt </SelectItem>
                    <SelectItem value="grandparent"> Grandparent </SelectItem>
                    <SelectItem value="guardian"> Guardian </SelectItem>
                    <SelectItem value="sibling"> Sibling </SelectItem>
                </SelectContent>
                </Select>
              )}
            />

            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
            <Label htmlFor="age">Child Age</Label>
            <Input {...register("age")} id="age" type="number" min={3} max={12} required/>
            </LabelInputContainer>
        </div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer className="mb-4">
                <Label htmlFor="plan">Desired Plan</Label>
                <Controller
                  name="plan"
                  control={control}
                  rules={{ required: true }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Plan" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="TODDLER"> Toddler Plan </SelectItem>
                    <SelectItem value="PRESCHOOL"> Preschool Plan </SelectItem>
                    <SelectItem value="KINDERGARTEN"> Kindergarten Plan </SelectItem>
                        </SelectContent>
                      </Select>
                      {error?.type === 'required' && (
                        <p className="text-red-500">This field is required</p>
                      )}
                    </>
                  )}
                />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
                <Label htmlFor="schedule">Desired Schedule</Label>
                <Controller
                  name="schedule"
                  control={control}
                  rules={{ required: true }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Schedule" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="HALF_DAY"> Half Day Schedule </SelectItem>
                    <SelectItem value="FULL_DAY"> Full Day Schedule </SelectItem>
                        </SelectContent>
                      </Select>
                      {error?.type === 'required' && (
                        <p className="text-red-500">This field is required</p>
                      )}
                    </>
                  )}
                />
            </LabelInputContainer>
        </div>
        <span className="text-center justify-self-center">
          {planPrice==0?
          (
          <>
          Select your desired plan and schedule to retrieve the price!
          </>
          )
          :
            (
            <>
            Your monthly subscription fees will be : {planPrice} DZD, <br/>
            including a {preRegistrationFee}  DZD pre-registration fee.
            </>
            )
          }
        </span>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input {...register("email")} id="email" placeholder="johndoe@example.dz" type="email" required/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input {...register("password")} id="password" placeholder="••••••••" type="password" required/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            {...register("phone")} id="phone"
            placeholder="+213"
            type="text"
            // pattern="\+213[0-9]{9}"
            onKeyDown={(e) => {
              const target = e.target as HTMLInputElement;
              const validKeyForPayment = [
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "Backspace",
              ];

              if (!validKeyForPayment.includes(e.key)) {
                e.preventDefault();
              }
              const currentValue = target.value.replace(/\D+/g, '');
              if (currentValue.length >= 10 && e.key != "Backspace") {
                e.preventDefault();
              }
            }}

            
            />
        </LabelInputContainer>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Proceed to payment &rarr;
          <BottomGradient />
        </button>


      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
