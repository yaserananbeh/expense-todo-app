import React from "react";

function OneExpense({ data ,index,handleDeleteExpense}) {
  return (
    <div>
      <p>{data.expenseDescription}</p>
      <p>{data.amountOfMoney}JD</p>
      <button onClick={()=>handleDeleteExpense(index)}>X</button>
    </div>
  );
}

export default OneExpense;
