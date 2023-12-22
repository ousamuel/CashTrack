"use client";
import React, { useContext, useState, useEffect } from "react";
import { Image, Button, Link, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Context } from "./providers";

type FormData = {
  email: string;
  password: string;
  name: string;
  newEmail: string;
  newPassword: string;
  confirm: string;
};
export default function Login() {
  const router = useRouter();
  const { user, loginUser, logOut, wrongLogin, setWrongLogin, BACKEND_API } =
    useContext(Context);
  const [invalidNewEmail, setInvalidNewEmail] = useState<boolean>(false);
  const [loggingIn, setLoggingIn] = useState<boolean>(true);
  const [notMatchingPass, setNotMatchingPass] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onLogInSubmit: SubmitHandler<FormData> = async (data) => {
    const success = await loginUser(data);
    if (success) {
      window.location.href = "/dashboard";
    }
  };
  const onSignUpSubmit: SubmitHandler<FormData> = async (data) => {
    const success = await signUpUser(data);
    if (success) {
      window.location.href = "/dashboard";
    }
  };
  // console.log(user);
  const testimonials: string[] = [
    '"This saved me and my friends a billion dollars" - Anonymous',
    '"My girlfriend used to always yell at me about paying for my friends before I found CashTrack!" - Josh',
  ];

  const signUpUser = async function (input: { [key: string]: string }) {
    console.log(input);
    if (input.newPassword.localeCompare(input.confirm) != 0) {
      setNotMatchingPass(true);
      return false;
    }
    try {
      const response: any = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}users`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: input.name,
          email: input.newEmail,
          _password: input.newPassword,
        }),
      });
      if (!response.ok) {
        if (response.status == 401) {
          console.log(401);
          setInvalidNewEmail(true);
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return true
    } catch (error: any) {
      console.error("error:", error.message);
      return false;
    }
  };
  return (
    <div className="login-body flex flex-col sm:flex-row">
      <div className="flex flex-1 flex-col items-center align-center">
        <p className="login-title text-[70px] sm:hidden">CashTrack</p>

        <Image
          width={300}
          src="svgs/logo.svg"
          className="mb-4 hidden sm:flex"
        />
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
      <div className="flex flex-1 flex-col items-center ">
        <p className="login-title text-[80px] hidden sm:flex">CashTrack</p>

        {loggingIn ? (
          // LOG IN FORM

          <div className="w-11/12 sm:w-3/4 mt-2 mb-5 sm:mt-0">
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
                  reset();
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
                  {...register("name", { required: true, minLength: 2 })}
                />
                {errors.newEmail || invalidNewEmail ? (
                  <p className="flex text-red-500 justify-start w-[90%]">
                    Please enter a valid email.
                  </p>
                ) : null}
                <Input
                  className={
                    errors.newEmail || invalidNewEmail
                      ? "input-form-wrong"
                      : "input-form"
                  }
                  placeholder="Email"
                  {...register("newEmail", {
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    required: true,
                  })}
                />
                {errors.newPassword ? (
                  <p className="flex text-red-500 justify-start w-[90%]">
                    Password must be at least 6 characters
                  </p>
                ) : null}
                <Input
                  type="password"
                  className={
                    errors.newPassword || notMatchingPass
                      ? "input-form-wrong"
                      : "input-form"
                  }
                  placeholder="Password"
                  {...register("newPassword", {
                    minLength: 6,
                    required: true,
                  })}
                />
                {notMatchingPass ? (
                  <p className="flex text-red-500 justify-start w-[90%]">
                    Passwords must match
                  </p>
                ) : null}
                <Input
                  type="password"
                  className={
                    notMatchingPass ? "input-form-wrong" : "input-form"
                  }
                  placeholder="Confirm Password"
                  {...register("confirm", {
                    required: true,
                    minLength: 6,
                  })}
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
                onClick={() => {
                  setLoggingIn(true);
                  reset();
                }}
              >
                Already registered? Log in now
              </Button>
            </div>
          </div>
        )}
        <Image width={300} src="svgs/logo.svg" className="mb-4 sm:hidden" />

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
