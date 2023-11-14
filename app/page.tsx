"use client";
import React, { useContext, useState, useEffect } from "react";
import { Image, Button, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Header from "./header";
import RightOnTheGo from "./components/RightOnTheGo";
import MiddleDash from "./components/MiddleDash";
import LeftDash from "./components/LeftDash";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push('/dashboard');
  }, [router]);

  return (
    <div>
      <Header />
      <div className="main-body ">
        <LeftDash path="dashboard" />
        <MiddleDash />
        <RightOnTheGo />
      </div>
    </div>
  );
}
