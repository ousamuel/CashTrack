"use client";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/react";

interface ContextProps {
  variable: string;
}
export const Context = createContext<ContextProps | any>(null);

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const router = useRouter();
  const API = process.env.REACT_APP_API;
  const [user, setUser] = useState<User>();
  const [variable, setVariable] = useState<string>("hello");
  const [loading, setLoaing] = useState<boolean>(true);
  const [groups, setGroups] = useState<ReactNode>(null);

  useEffect(() => {

    loginUser({});
    if (!user) {
      router.push("/");
      // reroute to login page if session/user is null
    }

  }, []);
  type Expense = {
    _id: string;
    title: string;
    creator: string;
    transactionDate: string;
    totalAmount: number;
    payments: any[];
  };

  type User = {
    _id: string;
    name: string;
    email: string;
    expenses: Expense[];
    groups: string[];
    payments: any[];
    totalOwe: number;
    totalOwed: number;
    profilePicture: string;
    friends: string[];
  };

  async function loginUser(input: { [key: string]: string }) {
    // function points to /server/controllers/userController.js
    try {
      const response: any = await fetch(`http://localhost:8001/users/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: input.email,
          _password: input.password,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUser(data.user);
      router.push("/dashboard");
      // console.log("user set");
      console.log(data.user);
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  }
  async function fetchGroups() {
    try {
      const response = await fetch(`http://localhost:8001/groups`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // console.log("Groups fetched");
      // console.log(data);
      setGroups(data);
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  }
  async function logOut() {
    // function points to app.get('/logout') in /server/server.js
    try {
      const response = await fetch(`http://localhost:8001/logout`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  }

  return (
    <Context.Provider
      value={{ variable, groups, setGroups, user, setUser, loginUser, logOut }}
    >
      {children}
    </Context.Provider>
  );
}
