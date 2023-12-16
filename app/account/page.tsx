"use client";
import { useContext } from "react";
import Header from "../header";
import { Context } from "../providers";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Image,
  Tooltip,
} from "@nextui-org/react";
export default function Account() {
  const { user } = useContext(Context);

  {
    /* <Header path="all-expenses" /> */
  }
  return (
    <div className="h-screen flex flex-col">
      <div className="pt-[30px] w-full flex justify-center relative bg-[#2c9984] h-[120px] lg:h-[170px]">
        {" "}
        <div>
          <Image
            className="rounded-full border-4 border-white 
            -translate-y-[-12px] lg:-translate-y-[-28px] 
            w-[120px] lg:w-[170px]"
            src="https://www.boredpanda.com/blog/wp-content/uploads/2021/03/url-1.jpg"
          />
          <Image
            className="rounded-full bg-gray-300 p-1 border z-1000 
            -translate-x-[-90px] -translate-y-[20px] lg:-translate-x-[-130px]
            w-[25px] lg:w-[35px]
            cursor-pointer hover:bg-gray-400
          "
            src="/svgs/edit.svg"
          />
        </div>
      </div>
      <div className="grow pt-[40px] lg:pt-[55px] text-center">
        <h3 className="font-bold">Name</h3>
        <h2>email@email.com</h2>

        <div className="flex justify-evenly">
          <div>My information</div>
          <div>random</div>
        </div>
      </div>
    </div>
  );
}

{
  /* {user ? (
 
) : null} */
}
