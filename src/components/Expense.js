import React, { useState, useEffect } from "react";
import OneExpense from "./OneExpense";
import "../style/Expense.css";

function Expense() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalIncomeInput, setTotalIncomeInput] = useState(0);
  const [toggleAddExpenseForm, setToggleAddExpenseForm] = useState(false);
  const [oneExpenseInfo, setOnceExpenseInfo] = useState({});
  const [allExpenses, setAllExpenses] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("totalIncome")) {
      let prevIncome = JSON.parse(localStorage.getItem("totalIncome"));
      setTotalIncome(prevIncome);
    } else {
      localStorage.setItem("totalIncome", JSON.stringify(0));
    }
    if (localStorage.getItem("allExpenses")) {
      let prevAllExpenses = JSON.parse(localStorage.getItem("allExpenses"));
      setAllExpenses(prevAllExpenses);
    } else {
      localStorage.setItem("allExpenses", JSON.stringify([]));
    }
  }, []);
  const handleSubmitTotalIncome = () => {
    setTotalIncome(totalIncomeInput);
    localStorage.setItem("totalIncome", JSON.stringify(totalIncomeInput));
    setTotalIncomeInput(0);
  };
  const handleAddNewExpense = (e) => {
    e.preventDefault();
    if (totalIncome - oneExpenseInfo.amountOfMoney > 0) {
      setAllExpenses([...allExpenses, oneExpenseInfo]);
      setToggleAddExpenseForm(false);

      setTotalIncome(totalIncome - oneExpenseInfo.amountOfMoney);
      localStorage.setItem(
        "totalIncome",
        JSON.stringify(totalIncome - oneExpenseInfo.amountOfMoney)
      );
      localStorage.setItem(
        "allExpenses",
        JSON.stringify([...allExpenses, oneExpenseInfo])
      );
      console.log("hi");
    } else {
      alert("Out of the budget");
      setToggleAddExpenseForm(false);
    }
  };
  const handleDeleteExpense = (index) => {
    let newArr = [...allExpenses];
    setTotalIncome(totalIncome + newArr[index].amountOfMoney);
    localStorage.setItem(
      "totalIncome",
      JSON.stringify(totalIncome + newArr[index].amountOfMoney)
    );

    newArr.splice(index, 1);
    setAllExpenses(newArr);
    localStorage.setItem("allExpenses", JSON.stringify(newArr));
  };
  return (
    <div>
      {totalIncome != 0 ? (
        <div className="expenseShowPage">
          <div className="expenseShowPageContainer">
            <button
              onClick={() => {
                setTotalIncome(0);
                setAllExpenses([]);
                localStorage.setItem("totalIncome", JSON.stringify(0));
                localStorage.setItem("allExpenses", JSON.stringify([]));
              }}
            >
              Reset your income
            </button>
            <h1>You have {totalIncome} jd</h1>
            <button
              onClick={() => setToggleAddExpenseForm(!toggleAddExpenseForm)}
            >
              add Expense
            </button>
            {toggleAddExpenseForm && (
              <form onSubmit={(e) => handleAddNewExpense(e)}>
                <input
                  type="text"
                  placeholder="shopping,pay rent ...."
                  onChange={(e) =>
                    setOnceExpenseInfo({
                      ...oneExpenseInfo,
                      expenseDescription: e.target.value,
                    })
                  }
                  required
                />
                <input
                  type="number"
                  placeholder="500"
                  onChange={(e) =>
                    setOnceExpenseInfo({
                      ...oneExpenseInfo,
                      amountOfMoney: Number(e.target.value),
                    })
                  }
                  required
                />
                <button>Add New Expense</button>
              </form>
            )}
            {allExpenses.map((data, index) => {
              return (
                <OneExpense
                  data={data}
                  key={index}
                  index={index}
                  handleDeleteExpense={handleDeleteExpense}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="expenseWelcomePage">
          <div className="expenseWelcomePageContainer">
            <h3>Enter Your Monthly Income</h3>
            <form onSubmit={handleSubmitTotalIncome}>
              <input
                type="number"
                placeholder="500"
                value={totalIncomeInput}
                onChange={(e) => setTotalIncomeInput(Number(e.target.value))}
              ></input>
              <button>submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Expense;
