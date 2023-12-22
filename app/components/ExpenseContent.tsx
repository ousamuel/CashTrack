import React, { useContext, useState, useEffect } from "react";
import { Image, Button, Input } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Context } from "../providers";
type FormData = {
  title: string;
  totalAmount: number;
  // percents: number[];
  // userIds: string[];
  // distributions: DistributionType[];
};

interface ExpenseContentProps {
  expense: any;
  index: number;
  totalReturn: number;
  deleteExpenseFunction: (expenseId: string, index: number) => Promise<void>;
}
const ExpenseContent: React.FC<ExpenseContentProps> = ({
  expense,
  deleteExpenseFunction,
  index,
  totalReturn,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const { user, BACKEND_API } = useContext(Context);
  const [paymentModal, setPaymentModal] = useState<string>("close");
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [paymentAmount, setPaymentAmount] = useState<string>("");
  const [zeroPayment, setZeroPayment] = useState<boolean>(false);
  const [overPaid, setOverPaid] = useState<boolean>(false);
  const [tempPayment, setTempPayment] = useState<number>(0);
  const myDebt = expense.distributions.find(
    (dis: any) => dis.lendingUser._id == user._id
  );

  const postPayment = async function () {
    console.log(myDebt.amount);
    const postAmount = parseFloat(paymentAmount);
    if (!postAmount || postAmount <= 0) {
      setZeroPayment(true);
      console.log("less than 0");
      return 0;
    } else if (postAmount > myDebt.amount.toFixed(2)) {
      setOverPaid(true);
      console.log("overpaid");
      return 0;
    }
    try {
      await fetch(`${BACKEND_API}/expenses/payment/${expense._id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
        body: JSON.stringify({
          sender: user._id,
          title: expense.title,
          amount: postAmount,
        }),
      })
        .then((res) => (res.ok ? res.json() : console.log(res.status)))
        .then((data) => {
          setTempPayment(postAmount);
          setPaymentModal("close");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="expense-dropdown">
      {paymentModal == "open" ? (
        <div className="modal flex flex-col md:flex-row md:pb-10 ">
          <div className="modal-div min-w-[270px] max-w-[65vw] md:max-w-[45vw] max-h-[75vh] overflow-y-scroll mt-3">
            <div className="modal-top">
              <p>Make a Payment</p>

              <p className="cursor" onClick={() => setPaymentModal("close")}>
                X
              </p>
            </div>
            <div className="modal-mid flex">
              <div className="flex flex-col items-center">
                {" "}
                <h4 className="flex items-center">
                  <Image
                    width={40}
                    className="rounded-full"
                    src="https://www.boredpanda.com/blog/wp-content/uploads/2021/03/url-1.jpg"
                  />{" "}
                  <p className="ml-2 text-lg"> You owe</p>
                </h4>
                <h4 className="text-3xl orange flex items-center">
                  {/* <Image
                    width={40}
                    className="rounded-full"
                    src="/svgs/arrow-down.svg"
                  />{" "} */}
                  ${myDebt.amount.toFixed(2)}
                  {/* <Image
                    width={40}
                    className="rounded-full"
                    src="/svgs/arrow-down.svg"
                  />{" "} */}
                </h4>
                <h4 className="flex items-center">
                  <p className="mr-2 text-lg"> to {expense.creator.name}</p>
                  <Image
                    width={40}
                    className="rounded-full"
                    src="https://www.boredpanda.com/blog/wp-content/uploads/2021/03/url-1.jpg"
                  />{" "}
                </h4>{" "}
              </div>
              <div className="flex flex-col justify-between">
                <div className="flex text-xl items-center mt-4">
                  $
                  <Input
                    type="number"
                    min={0}
                    max={myDebt.amount.toFixed(2)}
                    placeholder="payment amount"
                    value={paymentAmount}
                    className={
                      overPaid || zeroPayment
                        ? "rounded-lg border border-red-400 py-3 mx-2 max-w-1/2"
                        : "rounded-lg border py-3 mx-2 max-w-1/2"
                    }
                    onChange={(e) => setPaymentAmount(e.target.value)}
                  />
                </div>
                <div className="orange text-center">
                  {zeroPayment
                    ? "Invalid amount"
                    : overPaid
                    ? "You are paying more than you owe"
                    : null}
                </div>

                <Button
                  className="btn btn-green"
                  onClick={() => setPaymentAmount(myDebt.amount.toFixed(2))}
                  disableRipple
                >
                  Settle the entire amount
                </Button>
              </div>
            </div>
            <div className="modal-bot">
              <Button
                onClick={() => setPaymentModal("close")}
                className="btn btn-gray"
                disableRipple
              >
                Cancel
              </Button>
              <Button
                className="btn btn-green"
                disableRipple
                onClick={() => postPayment()}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      ) : null}
      {openEditModal ? (
        <div className="modal">
          <div className="modal-div min-w-[270px] max-w-[65vw] md:max-w-[45vw] max-h-[75vh] overflow-y-scroll mt-3">
            <div className="modal-top">
              Edit "{expense.title}"
              <p className="cursor" onClick={() => setOpenEditModal(false)}>
                X
              </p>
            </div>

            <div className="modal-mid">2</div>
            <div className="modal-bot">
              <Button
                onClick={() => setOpenEditModal(false)}
                className="btn btn-gray"
                disableRipple
              >
                Cancel
              </Button>
              <Button
                className="btn btn-green"
                disableRipple
                // onClick={() => postPayment()}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {/* 
    asd
    asd
    as
    da
    sd */}
      <div className="flex">
        <Image className="expense-img" width={85} src={expense.imageSrc} />
        <div className="ml-3">
          <h3 className="py-[3px] flex justify-between relative">
            <p className="whitespace-nowrap	 justify-start items-center max-w-[70%]">
              {expense.title.length > 21 ? (
                <div className="whitespace-normal">
                  <p className="md:hidden">{expense.title.slice(0, 21)}</p>
                  <p className="md:hidden">{expense.title.slice(21)}</p>
                  <p className="hidden md:flex">{expense.title}</p>
                </div>
              ) : (
                expense.title
              )}
            </p>
            {expense.creator._id == user._id ? (
              <div className="flex justify-end">
                {confirmDelete ? (
                  <Button
                    className="text-sm text-white bg-red-500 px-1 rounded-md -translate-x-[0px] items-center z-1000"
                    disableRipple
                    onClick={() => deleteExpenseFunction(expense._id, index)}
                  >
                    Delete
                  </Button>
                ) : null}
                <Image
                  className="hover:cursor-pointer rounded-full"
                  width={20}
                  src="/svgs/delete.svg"
                  onClick={() => setConfirmDelete((prevState) => !prevState)}
                />
              </div>
            ) : null}
          </h3>

          <h4 className="mt-[3px] text-[20px] text-black font-bold">
            ${expense.totalAmount.toFixed(2)}
          </h4>
          <p className="text-[12px] text-[#999] my-[3px]">
            Created on{" "}
            {expense.transactionDate.slice(5, 7) +
              "/" +
              expense.transactionDate.slice(8, 10) +
              "/" +
              expense.transactionDate.slice(0, 4)}
          </p>
          {expense.creator._id == user._id ? (
            <Button
              disableRipple
              className="btn-2 btn-orange text-[13px]"
              radius="lg"
              onClick={() => setOpenEditModal(true)}
            >
              Edit expense
            </Button>
          ) : expense.users.includes(user._id) ? (
            <Button
              disableRipple
              className="btn-2 btn-green text-[13px]"
              radius="lg"
              onClick={() => {
                setPaymentAmount("");
                setPaymentModal("open");
              }}
            >
              Settle your payment
            </Button>
          ) : null}
        </div>
      </div>
      <div className="border-t flex mt-3 pt-2">
        <div className="w-1/2 pl-1">
          <p className="text-center font-extrabold text-lg">
            Cost Distribution
          </p>
          <div className="flex flex-1 mt-2">
            <Image
              className={
                expense.creator._id == user._id
                  ? "w-[40px] border-2 border-green-400 bg-green-200 rounded-full mr-2"
                  : "w-[40px] border-2 bg-green-200 rounded-full mr-2 "
              }
              radius="md"
              src="/svgs/user.svg"
            />
            <p className="flex-1 flex flex-wrap items-center text-[13px]">
              <strong>
                {expense.creator._id == user._id ? "You" : expense.creator.name}
              </strong>
              &nbsp;paid&nbsp;
              <strong>${expense.totalAmount.toFixed(2)}</strong>
              &nbsp;
              {expense.creator._id == user._id ? "and are owed" : "and is owed"}
              &nbsp;
              <strong> ${totalReturn.toFixed(2)}</strong>
            </p>
          </div>
          {expense.distributions.map((distribution: any) => {
            // console.log(distribution);
            return (
              <div key={distribution._id} className="flex flex-1 mt-2">
                <Image
                  className={
                    distribution.lendingUser._id == user._id
                      ? "w-[40px] border-2 border-[#e51212] rounded-full mr-2"
                      : "w-[40px] border-2 rounded-full mr-2"
                  }
                  radius="md"
                  src="/svgs/user.svg"
                />
                <p className="flex-1 flex flex-wrap items-center text-[13px]">
                  <strong>
                    {" "}
                    {distribution.lendingUser._id == user._id
                      ? "You"
                      : distribution.lendingUser.name}
                  </strong>
                  &nbsp;
                  {distribution.lendingUser._id == user._id ? "owe" : "owes"}
                  &nbsp;$
                  <strong className="underline">
                    {distribution.amount.toFixed(2)}
                    {/* {(
                          expense.totalAmount /
                          (expense.users.length + 1)
                        ).toFixed(2)} */}
                  </strong>
                </p>
              </div>
            );
          })}
        </div>
        <div className="w-1/2 pl-10">
          <p className="text-center font-extrabold text-lg">Payments</p>

          {expense.payments.map((payment: any) => {
            // console.log(payment);
            return (
              <div key={payment._id} className="flex flex-1 mt-2">
                <Image
                  className="w-[40px] border rounded-full mr-2"
                  radius="md"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
                <p className="flex-1 flex flex-wrap items-center text-[13px]">
                  <strong>
                    {" "}
                    {payment.sender._id == user._id
                      ? "You"
                      : payment.sender.name}
                  </strong>
                  &nbsp;paid back&nbsp;$
                  <strong className="underline">
                    {payment.amount.toFixed(2)}
                    {/* {(
                          expense.totalAmount /
                          (expense.users.length + 1)
                        ).toFixed(2)} */}
                  </strong>
                </p>
              </div>
            );
          })}

          {tempPayment ? (
            <div className="flex flex-1 mt-2">
              <Image
                className="w-[40px] border rounded-full mr-2"
                radius="md"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
              <p className="flex-1 flex flex-wrap items-center text-[13px]">
                <strong>You</strong>
                &nbsp;paid back&nbsp;$
                <strong className="underline">{tempPayment.toFixed(2)}</strong>
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ExpenseContent;
