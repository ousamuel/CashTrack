import React, { useContext, useState, useEffect } from "react";
import { Image } from "@nextui-org/react";
interface ExpenseAccordionItemProps {
  path: string;
  props: any;
}
const ExpenseAccordionItem: React.FC<ExpenseAccordionItemProps> = ({
  path,
  props,
}) => {
  const [month, setMonth] = useState<string>("Jan");
  useEffect(() => {
    switch (props.expense.transactionDate.getMonth()) {
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
        <p className="text-[20px] ">
          {props.expense.transactionDate.getDate()}
        </p>
      </div>

      <div className="max-w-[50px]">
        <Image
          width={35}
          src={`/ss/${props.expense.imageSrc}.png`}
          alt="icon"
        />
      </div>
      <div className="max-w-[500px] text-left flex flex-col">
        <p className="text-[16px] text-black text-left my-auto font-bold expense-title">
          {props.expense.title}
        </p>
        {path == "group-test" || !props.expense.groupName ? null : (
          <p className="mt-[3px] expense-group ">{props.expense.groupName}</p>
        )}
      </div>
      <div className="max-w-[115px] px-2 text-right">
        <p className="expense-owe">you paid</p>
        <h4 className="mt-[3px] text-[16px] text-black font-bold">$50.00</h4>
      </div>
      <div className="px-1 max-w-[135px]">
        <p className="expense-owe">you lent Jenny</p>
        <h4 className="mt-[3px] text-[16px] green font-bold">$25.00</h4>
      </div>
    </div>
  );
};
export default ExpenseAccordionItem;
