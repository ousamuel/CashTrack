import React, { useContext, useState, useEffect } from "react";
import { Image } from "@nextui-org/react";
import { Context } from "../providers";
interface ExpenseAccordionItemProps {
  path: string;
  expense: any;
  totalReturn: number;
}
const ExpenseAccordionItem: React.FC<ExpenseAccordionItemProps> = ({
  path,
  expense,
  totalReturn,
}) => {
  const [month, setMonth] = useState<string>("Jan");
  const [amountBorrowed, setAmountBorrowed] = useState<number>(0);
  const { user } = useContext(Context);
  useEffect(() => {
    switch (expense.transactionDate.slice(5, 7) - 1) {
      case 0: {
        setMonth("Jan");
        break;
      }
      case 1: {
        setMonth("Feb");
        break;
      }
      case 2: {
        setMonth("Mar");
        break;
      }
      case 3: {
        setMonth("Apr");
        break;
      }
      case 4: {
        setMonth("May");
        break;
      }
      case 5: {
        setMonth("Jun");
        break;
      }
      case 6: {
        setMonth("Jul");
        break;
      }
      case 7: {
        setMonth("Aug");
        break;
      }
      case 8: {
        setMonth("Sep");
        break;
      }
      case 9: {
        setMonth("Oct");
        break;
      }
      case 10: {
        setMonth("Nov");
        break;
      }
      case 11: {
        setMonth("Dec");
        break;
      }
    }
  }, []);
  // console.log(expense);
  // <div className="px-1 max-w-[115px] justify-end inline-block ">
  //   <p className="expense-owe w-max">and lent you</p>
  //   <h4 className="mt-[3px] text-[16px] orange font-bold w-max">
  //     {expense.distributions
  //       .find((distribution: any) => distribution.lendingUser._id == user._id)
  //       .map((dis: any) => (
  //         <div key={dis._id}>${dis.amount.toFixed(2)}</div>
  //       ))}
  //   </h4>
  // </div>;
  useEffect(() => {
    let tempBorrowed = 0;
    const involvedDistribution = expense.distributions.find(
      (distribution: any) => distribution.lendingUser._id == user._id
    );
    if (involvedDistribution) {
      tempBorrowed += involvedDistribution.amount;
      const myPayments = expense.payments.filter(
        (payment: any) => payment.sender._id == user._id
      );
      if (myPayments.length) {
        for (let i = 0; i < myPayments.length; i++) {
          tempBorrowed -= myPayments[i].amount;
        }
      }
    }
    setAmountBorrowed(tempBorrowed);
  }, []);

  return (
    <div className="expense-trigger open-down">
      <div className="max-w-[35px] mr-[5px] text-center flex flex-col justify-center inline-block">
        <p className="text-[10px] uppercase">{month} </p>
        <p className="text-[20px] ">{expense.transactionDate.slice(8, 10)}</p>
      </div>

      <div className="max-w-[50px]">
        <Image width={35} src={expense.imageSrc} alt="icon" />
      </div>
      <div className="max-w-[500px] text-left flex flex-col">
        <div className="text-[14px] md:text-[16px] text-black text-left my-auto font-bold expense-title">
          {expense.title.length > 16 ? (
            <div className="flex-wrap">
              <p className="md:hidden">{expense.title.slice(0, 15)}...</p>
              <p className="hidden md:flex lg:hidden">
                {expense.title.slice(0, 15)}...
              </p>
              <p className="hidden lg:flex">{expense.title}</p>

              {/* <p>{expense.title.slice(21)}</p> */}
            </div>
          ) : (
            expense.title
          )}
        </div>
        {path == "" && expense.group ? (
          <p className="mt-[3px] expense-group ">{expense.group.groupName}</p>
        ) : null}
      </div>
      <div className="max-w-[115px] px-2 text-right">
        <p className="expense-owe">
          {user && expense.creator._id == user._id
            ? "You"
            : expense.creator.name}{" "}
          paid
        </p>
        <h4 className="mt-[3px] text-[16px] text-black font-bold">
          ${expense.totalAmount.toFixed(2)}
        </h4>
      </div>
      {expense.creator._id == user._id ? (
        <div className="px-1 max-w-[120px] ">
          <p className="expense-owe w-max">You lent</p>
          <h4 className="mt-[3px] text-[16px] green font-bold">
            ${totalReturn.toFixed(2)}
          </h4>
        </div>
      ) : expense.distributions.find(
          (distribution: any) => distribution.lendingUser._id == user._id
        ) ? (
        <div className="px-1 max-w-[120px] justify-end inline-block ">
          <p className="expense-owe w-max">and lent you</p>
          {amountBorrowed <= 0 ? (
            <h4 className="mt-[3px] text-[16px] w-max">Settled</h4>
          ) : (
            <h4 className="mt-[3px] text-[16px] orange font-bold w-max">
              ${amountBorrowed.toFixed(2)}
            </h4>
          )}
        </div>
      ) : (
        <div className="px-1 max-w-[115px] text-[12px]">Not involved</div>
      )}
    </div>
  );
};
export default ExpenseAccordionItem;
