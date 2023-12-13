"use client";
import React, { useContext, useState, useEffect } from "react";
import { Image, Button, Link, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { Context } from "./providers";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirm: string;
};
export default function Login() {
  const router = useRouter();
  const { user, loginUser, logOut, wrongLogin, setWrongLogin } =
    useContext(Context);
  const [loggingIn, setLoggingIn] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onLogInSubmit: SubmitHandler<FormData> = (data) => {
    loginUser(data);
    router.push("/dashboard");
  };
  const onSignUpSubmit: SubmitHandler<FormData> = (data) => {
    loginUser(data);
    router.push("/dashboard");
  };
  // useEffect(() => {
  //   {
  //     user ? router.push("/dashboard") : null;
  //   }
  // },[user]);
  console.log(user);
  const testimonials: string[] = [
    '"This saved me and my friends a billion dollars" - Anonymous',
    '"My girlfriend used to always yell at me about paying for my friends before I found CashTrack!" - Josh',
  ];
  return (
    <div className="login-body flex flex-col sm:flex-row">
      <div className="flex flex-1 flex-col items-center align-center">
        <p className="login-title text-[70px] sm:hidden">CashTrack</p>

        <Image width={300} src="svgs/logo.svg" className="mb-4" />
        <h4 className="text-[20px] text-center w-4/5 sm:w-[65%]">
          Never worry about owing money to the wrong person again!
        </h4>
        {/* <hr className='my-2 w-3/4 dark:text-gray-200'/> */}
        <hr className="my-6 w-[65%] h-[1.5px] border-0 bg-[#90DFAA] hidden sm:flex" />
        <strong className="text-black uppercase hidden text-[20px] sm:flex ">
          Testimonials
        </strong>
        {testimonials.map((testimonial) => {
          return (
            <h3
              key={testimonial}
              className="italic w-1/2 text-center mt-3 hidden sm:flex"
            >
              {testimonial}
            </h3>
          );
        })}
      </div>
      <div className="flex flex-1 flex-col items-center align-center">
        <p className="login-title text-[80px] hidden sm:flex">CashTrack</p>

        {loggingIn ? (
          // LOG IN FORM

          <div className="w-11/12 sm:w-3/4 mt-10 mb-5 sm:mt-0">
            <div className="input-box bg-white rounded-md flex flex-col items-center">
              <h1>Log In</h1>
              <form
                className="w-full items-center flex flex-col"
                onSubmit={handleSubmit(onLogInSubmit)}
              >
                {errors.email && !wrongLogin ? (
                  <p className="flex text-red-500 justify-start w-[90%]">
                    Please enter a valid email.
                  </p>
                ) : null}
                {wrongLogin ? (
                  <p className="flex text-red-500 justify-start w-[90%]">
                    Incorrect email/password
                  </p>
                ) : null}
                <Input
                  className={
                    errors.email || wrongLogin
                      ? "input-form-wrong"
                      : "input-form"
                  }
                  placeholder="Email"
                  {...register("email", {
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    required: true,
                  })}
                />
                {errors.password ? (
                  <p className="flex text-red-500 justify-start w-[90%]">
                    Password is required
                  </p>
                ) : null}
                <Input
                  type="password"
                  className={
                    wrongLogin || errors.password
                      ? "input-form-wrong"
                      : "input-form"
                  }
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                <Button
                  className="btn btn-green mt-2"
                  disableRipple
                  type="submit"
                >
                  Log In
                </Button>
              </form>

              <Button
                className="btn btn-orng mt-2"
                disableRipple
                type="button"
                onClick={() => {
                  setLoggingIn(false);
                }}
              >
                Not registered? Make an account here
              </Button>
            </div>
          </div>
        ) : (
          // SIGN UP FORM
          <div className="w-11/12 sm:w-3/4 mt-6 mb-5 sm:mt-0">
            <div className="input-box bg-white rounded-md flex flex-col items-center">
              <h1>Sign Up</h1>
              <form
                className="w-full flex flex-col items-center"
                onSubmit={handleSubmit(onSignUpSubmit)}
              >
                {errors.name ? (
                  <p className="flex text-red-500 justify-start w-[90%]">
                    Please enter a valid name.
                  </p>
                ) : null}
                <Input
                  className={errors.name ? "input-form-wrong" : "input-form"}
                  placeholder="Name"
                  {...register("name")}
                />
                {errors.email ? (
                  <p className="text-red-500 justify-start">
                    Please enter a valid email.
                  </p>
                ) : null}
                <Input
                  className={errors.email ? "input-form-wrong" : "input-form"}
                  placeholder="Email"
                  {...register("email", {
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    required: true,
                  })}
                />
                {errors.password ? (
                  <p className="text-red-500 justify-start">
                    Incorrect password.
                  </p>
                ) : null}
                <Input
                  type="password"
                  className={
                    errors.password ? "input-form-wrong" : "input-form"
                  }
                  placeholder="Password"
                  {...register("password")}
                />
                <Input
                  type="password"
                  className={errors.confirm ? "input-form-wrong" : "input-form"}
                  placeholder="Confirm Password"
                  {...register("confirm")}
                />
                <Button
                  className="btn btn-green mt-2"
                  disableRipple
                  type="submit"
                >
                  Sign Up
                </Button>
              </form>

              <Button
                className="btn btn-orng mt-2"
                disableRipple
                type="button"
                onClick={() => setLoggingIn(true)}
              >
                Already registered? Log in now
              </Button>
            </div>
          </div>
        )}
        <strong className="text-black text-[20px] uppercase sm:hidden">
          Testimonials
        </strong>
        {testimonials.map((testimonial) => {
          return (
            <h3
              key={testimonial}
              className="italic w-3/4 text-center mt-3 sm:hidden"
            >
              {testimonial}
            </h3>
          );
        })}
      </div>
    </div>
  );
}
