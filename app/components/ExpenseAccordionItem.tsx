import React, { useContext, useState, useEffect } from "react";
import { Image } from "@nextui-org/react";
interface ExpenseAccordionItemProps {
  path: string;
  expense: any;
}
const ExpenseAccordionItem: React.FC<ExpenseAccordionItemProps> = ({
  path,
  expense,
}) => {
  // console.log(expense);
  const [month, setMonth] = useState<string>("Jan");
  // console.log(expense.transactionDate.slice(5, 7))
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
  return (
    <div className="expense-trigger open-down">
      <div className="max-w-[35px] mr-[5px] text-center flex flex-col justify-center inline-block">
        <p className="text-[10px] uppercase">{month} </p>
        <p className="text-[20px] ">{expense.transactionDate.slice(8, 10)}</p>
      </div>

      <div className="max-w-[50px]">
        <Image width={35} src={`/ss/receipt.png`} alt="icon" />
      </div>
      <div className="max-w-[500px] text-left flex flex-col">
        <p className="text-[16px] text-black text-left my-auto font-bold expense-title">
          {expense.title}
        </p>
        {expense.groupName ? (
          <p className="mt-[3px] expense-group ">{expense.groupName}</p>
        ) : null}
      </div>
      <div className="max-w-[115px] px-2 text-right">
        <p className="expense-owe">{expense.creator} paid</p>
        <h4 className="mt-[3px] text-[16px] text-black font-bold">
          ${expense.totalAmount.toFixed(2)}
        </h4>
      </div>
      <div className="px-1 max-w-[135px]">
        <p className="expense-owe">you lent</p>
        <h4 className="mt-[3px] text-[16px] green font-bold">
          ${expense.totalAmount.toFixed(2)} - calculate
        </h4>
      </div>
    </div>
  );
};
export default ExpenseAccordionItem;
