import React from "react";
import {Button } from "@nextui-org/react";
export default function ExpenseSettle() {
  return (
    <div className="text-[15px]">
      <Button disableRipple className="btn btn-orange" radius="lg">
        Add an expense
      </Button>
      <Button disableRipple className="btn btn-green" radius="lg">
        Settle up
      </Button>
    </div>
  );
}
