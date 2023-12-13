"use client";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/react";
// CASHTRACK
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
  const [wrongLogin, setWrongLogin] = useState<boolean>(false);
  const [totalOwe, setTotalOwe] = useState<number>(0);
  const [totalOwed, setTotalOwed] = useState<number>(0);
  const [groupIds, setGroupIds] = useState<[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<[]>([]);
  const [userGroups, setUserGroups] = useState<[]>([]);
  const [userExpenses, setUserExpenses] = useState<[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [groups, setGroups] = useState<ReactNode>(null);
  const [groupExpenses, setGroupExpenses] = useState<any>([]);

  useEffect(() => {
    setWrongLogin(false);
    loginUser({});
    // if (!user) {
    //   router.push("/");
    //   // reroute to login page if session/user is null
    // }
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
        if (response.status == 401) {
          console.log(401);
          setWrongLogin(true);
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUser(data.user);
      setUserGroups(data.user.groups);
      // settingBalances(data.user.expenses);
      setUserExpenses(data.user.expenses);
      let tempOwe = 0;
      let tempOwed = 0;
      // setTotalOwe(0);
      // setTotalOwed(0);
      data.user.expenses.forEach((expense: any) => {
        if (expense.creator._id == data.user._id) {
          expense.distributions.forEach((distribution: any) => {
            tempOwed += distribution.amount;
            // setTotalOwed(totalOwed + distribution.amount);
          });
          setTotalOwed(tempOwed);
        } else {
          expense.distributions.forEach((distribution: any) => {
            if (distribution.lendingUser._id == data.user._id) {
              tempOwe += distribution.amount;
              // setTotalOwe(totalOwe + distribution.amount);
            }
          });
          setTotalOwe(tempOwe);
        }
        // console.log(totalOwed);
        // console.log(expense._id);
      });
      console.log(data.user);
    } catch (error: any) {
      router.push("/");
      console.error("Error:", error.message);
    }
  }
  // async function fetchGroups() {
  //   try {
  //     const response = await fetch(`http://localhost:8001/groups`, {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         "Content-Type": "application/json; charset=UTF-8",
  //         Accept: "application/json",
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     // console.log("Groups fetched");
  //     // console.log(data);
  //     setGroups(data);
  //   } catch (error: any) {
  //     console.error("Error:", error.message);
  //   }
  // }
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
      value={{
        totalOwe,
        setTotalOwe,
        totalOwed,
        setTotalOwed,
        user,
        setUser,
        selectedGroup,
        setSelectedGroup,
        userGroups,
        setUserGroups,
        loginUser,
        logOut,
        groupExpenses,
        setGroupExpenses,
        userExpenses,
        setWrongLogin,
        wrongLogin,
      }}
    >
      {children}
    </Context.Provider>
  );
}
