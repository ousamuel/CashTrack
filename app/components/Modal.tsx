import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
export default function Modal() {
  return (
    <div className="modal flex ">
      <div className="modal-div">
        <div className="modal-top">
          <p>Add an expense</p>
          <p className="cursor" onClick={() => setModal("close")}>
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
            onClick={() => setModal("close")}
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
  );
}
