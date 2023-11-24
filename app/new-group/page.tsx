import React from "react";
import {
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Link,
  Input,
} from "@nextui-org/react";
import Header from "../header";
export default function NewGroup() {
  return (
    <div>
      <Header path=''/>
      <div className="justify-center flex flex-col items-center pt-[70px] sm:flex-row">
        <div className="flex flex-col mx-7 mb-7">
          <Image className="mb-4" width={200} src="/images/splitwise.png" />
          <Input className="max-w-[200px]" type="file" />
        </div>
        <div className="flex flex-col text-center sm:text-left">
          <hr className="sm:hidden mb-3"></hr>
          <h2 className="uppercase text-[16px] mb-3">Start a new group</h2>
          <h1>My group shall be called...</h1>
          <Input
            className="border rounded-md text-[30px] py-1"
            placeholder="Lunch Bandits"
          />
          <hr className="my-4"></hr>
          <h2 className="uppercase text-[16px]">Group members</h2>
          <Button className='btn-free btn-orange w-fit text-[20px] px-4 mt-2'>Save</Button>
        </div>
      </div>
    </div>
  );
}
