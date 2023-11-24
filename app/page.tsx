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
    router.push("/dashboard");
  }, [router]);

  return (
    <div>
      <Header path="dashboard" />
      <div className="main-body ">
        <LeftDash path="dashboard" />
        <MiddleDash />
        <RightOnTheGo />
      </div>
    </div>
  );
}
/*
Models
- individual user
  - email
  - name
  - money owed to others
  - money owed to self
   

- transactions
  - type: 1-1 or group
  - category
  - involved users
  - date
  - total amount
  - price division
- 1-1
  - user to user 

- groups
  - multiple users

*/
"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
// const express_1 = __importDefault(require("express"));
// const app = (0, express.default)();
const mongoose = require("mongoose");

const uri =
  "mongodb+srv://samuelou510:Ll9u8509LsGrvNvB@cluster0.w0qyptv.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("mongo connected");
  } catch (error) {
    console.error(error);
  }
}
connect();

const port = 8000;
app.get("/", (req, res) => {
  res.send("HELLO FROM new!! EXPRESS");
});
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
