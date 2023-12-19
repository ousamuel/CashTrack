"use client";
import React, { useContext, useState, useEffect } from "react";
import { Image, Button, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import LeftDashComponent from "./LeftDashComponent";
interface LeftDashProps {
  path: string;
}

const LeftDash: React.FC<LeftDashProps> = ({ path }) => {
  return (
    <div className="left-container w-[200px] flex-col w-1/5 p-2 overflow-y-scroll">
      <LeftDashComponent path={path} />
    </div>
  );
};

export default LeftDash;
