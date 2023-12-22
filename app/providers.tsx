"use client";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/react";
import dotenv from "dotenv";

// CASHTRACK
interface ContextProps {
  variable: string;
}
export const Context = createContext<ContextProps | any>(null);

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    setWrongLogin(false);
    loginUser({});
    // if (!user) {
    //   router.push("/");
    //   // reroute to login page if session/user is null
    // }
  }, []);
  const router = useRouter();
  let BACKEND_API: any = "http://localhost:8001";
  if (process.env.NODE_ENV == "production") {
    BACKEND_API = process.env.REACT_APP_BACKEND_URL;
  }
  // console.log(process.env)
  const [user, setUser] = useState<User>();
  const [wrongLogin, setWrongLogin] = useState<boolean>(false);
  const [totalOwe, setTotalOwe] = useState<number>(0);
  const [totalOwed, setTotalOwed] = useState<number>(0);
  const [groupIds, setGroupIds] = useState<[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<[]>([]);
  const [userGroups, setUserGroups] = useState<[]>([]);
  const [userExpenses, setUserExpenses] = useState<any[]>([]);
  const [userFriends, setUserFriends] = useState<any[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [groups, setGroups] = useState<ReactNode>(null);
  const [groupExpenses, setGroupExpenses] = useState<any>([]);
  // document.addEventListener('keydown', sayHi);

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
      const response: any = await fetch(`${BACKEND_API}/users/login`, {
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
      setUserFriends(data.user.friends);
      setUserGroups(data.user.groups);
      const reversedExpenses = data.user.expenses.toReversed();
      setUserExpenses(reversedExpenses);
      let tempBorrowed = 0;
      let tempOwed = 0;
      data.user.expenses.forEach((expense: any) => {
        if (expense.creator._id == data.user._id) {
          expense.distributions.forEach((distribution: any) => {
            tempOwed += distribution.amount;
          });
          setTotalOwed(tempOwed);
        } else {
          // expense.distributions.forEach((distribution: any) => {
          //   if (distribution.lendingUser._id == data.user._id) {
          //     tempOwe += distribution.amount;
          //   }
          // });
          for (let i = 0; i < expense.distributions.length; i++) {
            if (expense.distributions[i].lendingUser._id == data.user._id) {
              tempBorrowed += expense.distributions[i].amount;
              break;
            }
          }
          for (let i = 0; i < expense.payments.length; i++) {
            if (expense.payments[i].sender._id == data.user._id) {
              tempBorrowed -= expense.payments[i].amount;
            }
          }
          setTotalOwe(tempBorrowed);
        }
      });
      console.log(data.user);
      return true;
    } catch (error: any) {
      router.push("/");
      console.error("Error:", error.message);
      return false;
    }
  }
  async function logOut() {
    // function points to app.get('/logout') in /server/server.js
    try {
      const response = await fetch(`${BACKEND_API}/logout`, {
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
  async function deleteExpense(expenseId: string, index: number) {
    try {
      const response: any = await fetch(
        `${BACKEND_API}/expenses/${expenseId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Accept: "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        console.log(response.status);
      }
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  }
  return (
    <Context.Provider
      value={{
        BACKEND_API,
        totalOwe,
        userFriends,
        setUserFriends,
        deleteExpense,
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
        setUserExpenses,
        setWrongLogin,
        wrongLogin,
      }}
    >
      {user === null ? (
        // Render a loading spinner or loading indicator
        <Spinner color="primary" />
      ) : (
        // Render the main content once the user is loaded
        children
      )}
    </Context.Provider>
  );
}
