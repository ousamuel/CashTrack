import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
export default function ExpenseSettle() {
  const [expenseModal, setExpenseModal] = useState<string>("close");
  const [settleModal, setSettleModal] = useState<string>("close");

  return (
    <div className="text-[15px]">
      {expenseModal == "open" ? (
        <div className="modal flex ">
          <div className="modal-div">
            <div className="modal-top">
              <p>Add an expense</p>
              <p className="cursor" onClick={() => setExpenseModal("close")}>
                X
              </p>
            </div>
            <div className="modal-mid">
              <p>With you and:</p>
              <Input
                className="w-fit"
                placeholder="Enter names or emaasdasdasdasils"
              />
            </div>
            <div className="modal-bot">
              <Button
                onClick={() => setExpenseModal("close")}
                className="btn btn-gray"
                disableRipple
              >
                Cancel
              </Button>
              <Button className="btn btn-green" disableRipple>
                Save
              </Button>
            </div>
          </div>
        </div>
      ) : null}
      {settleModal == "open" ? (
        <div className="modal flex ">
          <div className="modal-div">
            <div className="modal-top">
              <p>Add an expense</p>
              <p className="cursor" onClick={() => setSettleModal("close")}>
                X
              </p>
            </div>
            <div className="modal-mid justify-center flex-col ">
              <p className="text-center text-gray-500 text-[16px]">
                Select a payment method
              </p>
              <Button
                className="mx-auto mt-2 btn-free btn-green w-[290px] text-[16px]"
                disableRipple
              >
                Cash payment
              </Button>
              <Button
                className="font-bold mx-auto mt-3 btn-free btn-lblue w-[290px] text-[16px] italic"
                disableRipple
              >
                Venmo
              </Button>
            </div>
            <div className="modal-bot">
              <Button
                onClick={() => setSettleModal("close")}
                className="btn btn-gray"
                disableRipple
              >
                Cancel
              </Button>
              <Button className="btn btn-green" disableRipple>
                Save
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      <Button
        onClick={() => setExpenseModal("open")}
        disableRipple
        className="btn btn-orange"
        radius="lg"
      >
        Add an expense
      </Button>
      <Button
        onClick={() => setSettleModal("open")}
        disableRipple
        className="btn btn-green"
        radius="lg"
      >
        Settle up
      </Button>
    </div>
  );
}
