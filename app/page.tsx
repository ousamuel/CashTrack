"use client";
import React, { useContext, useState, useEffect } from "react";
import { Image, Button, Link, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { Context } from "./providers";

type FormData = {
  email: string;
  password: string;
};
export default function Login() {
  const router = useRouter();
  const { user, loginUser, logOut } = useContext(Context);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => loginUser(data);
  // useEffect(() => {
  //   {
  //     user ? router.push("/dashboard") : null;
  //   }
  // },[user]);
  console.log(user);
  return (
    <div>
      <div className="input-box">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="email"
            {...register("email", {
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              required: true,
            })}
          />
          {errors.email && <span className="pl-1">Incorrect email format</span>}
          <input placeholder="password" {...register("password")} />
          <Button className="text-5xl border-solid" disableRipple type="submit">
            login
          </Button>
        </form>
        <Button
          className="text-5xl border-solid"
          disableRipple
          onClick={logOut}
        >
          log OUT
        </Button>
      </div>
    </div>
  );
}
