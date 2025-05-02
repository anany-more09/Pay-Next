import { useState, useEffect } from 'react';
import { Input } from '../components/Input';
import { useNavigate } from 'react-router-dom';

export default function Track() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }

    const storedIncome = localStorage.getItem("income");
    const storedExpense = localStorage.getItem("expense");
    const storedSaving = localStorage.getItem("saving");
    const storedCategory = JSON.parse(localStorage.getItem("category")) || { food: 0, travel: 0, other: 0 };
    const storedExpenseList = JSON.parse(localStorage.getItem("expenseList")) || [];

    setIncome(storedIncome ? parseFloat(storedIncome) : 0);
    setExpense(storedExpense ? parseFloat(storedExpense) : 0);
    setSaving(storedSaving ? parseFloat(storedSaving) : 0);
    setCategory(storedCategory);
    setExpenseList(storedExpenseList);
  }, [navigate]);

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [saving, setSaving] = useState(0);
  const [category, setCategory] = useState({ food: 0, travel: 0, other: 0 });
  const [selectedCategory, setSelectedCategory] = useState('');
  const [incomeValue, setIncomeValue] = useState('');
  const [expenseValue, setExpenseValue] = useState('');
  const [expenseList, setExpenseList] = useState([]);
  const [description, setDescription] = useState('');
  
  function handleClick(e) {
    e.preventDefault(); 
    const operation = e.target.value;

    if (operation === 'income') {
      const newIncome = income + parseFloat(incomeValue);
      setIncome(newIncome);
      localStorage.setItem("income", newIncome);
      setSaving(newIncome - expense);
      localStorage.setItem("saving", newIncome - expense);
    }

    if (operation === 'expense') {
      const newExpense = expense + parseFloat(expenseValue);
      if (!selectedCategory) {
        alert("Please select a category.");
        return;
      }

      setExpense(newExpense);
      localStorage.setItem("expense", newExpense);

      if (!isNaN(income - newExpense)) {
        setSaving(income - newExpense);
        localStorage.setItem("saving", income - newExpense);

        if (newExpense > income) {
          alert("You are out of money");
        }
      }

      if (selectedCategory) {
        setCategory(prev => {
          const newCategory = { ...prev, [selectedCategory]: prev[selectedCategory] + parseFloat(expenseValue) };
          localStorage.setItem("category", JSON.stringify(newCategory));
          return newCategory;
        });

        const item = `${selectedCategory} : ₹${+(expenseValue)}, Details: ${description}`;
        setExpenseList(prev => {
          const updatedList = [...prev, item];
          localStorage.setItem("expenseList", JSON.stringify(updatedList));
          return updatedList;
        });
      }
    }

    setExpenseValue('');
    setIncomeValue('');
    setDescription('');
  }

  function handleClear() {
    const userToken = localStorage.getItem("token");
  
    localStorage.clear();
  
    if (userToken !== null) {
      localStorage.setItem("token", userToken); 
    }
  
    console.log("Cleared all data except 'token'");
    window.location.reload()
  }
  
  return (
    <div className="min-h-screen bg-[#f8f9fa] p-6 flex flex-col items-center">
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl">
        {/* Left Section */}
        <div className="bg-white border border-[#dee2e6] rounded-2xl shadow-md p-6 w-full lg:w-2/3">
          <h2 className="text-center text-xl md:text-2xl font-bold text-[#212529] py-3 rounded-xl mb-6 bg-[#e9ecef]">
            Expense Tracker
          </h2>

          {/* Income Section */}
          <div className="mb-6">
            <Input
              placeholder="Income"
              value={incomeValue}
              onChange={(e) => setIncomeValue(e.target.value)}
            />
            <button
              value="income"
              onClick={handleClick}
              className="mt-2 w-full md:w-auto bg-[#343a40] text-white px-4 py-2 rounded hover:bg-[#23272b] mx-6"
            >
              Add Income
            </button>

            <button
      value="clear"
      onClick={handleClear}
      className="mt-2 w-full md:w-auto bg-[#343a40] text-white px-4 py-2 rounded hover:bg-[#23272b]"
    >
      Clear Expense Data
    </button>
          </div>

          {/* Expense Section */}
          <div className="flex flex-col gap-4">
      

        
          <div className="w-full flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
  {/* Expense Input */}
  <Input
    placeholder="Expense"
    value={expenseValue}
    onChange={(e) => setExpenseValue(e.target.value)}
    className="w-full md:w-2/3"
  />

  {/* Category Dropdown */}
  <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    className="border border-[#ced4da] px-4 py-2 rounded-2xl w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition duration-300 ease-in-out appearance-none"
    required
  >
    <option value="">Select Category</option>
    <option value="food">Food</option>
    <option value="travel">Travel</option>
    <option value="other">Other</option>
  </select>
</div>

            <Input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button
              value="expense"
              onClick={handleClick}
              className="bg-[#343a40] text-white px-4 py-2 rounded hover:bg-[#23272b]"
            >
              Add Expense
            </button>
          </div>

          {/* Totals */}
          <div className="border mt-8 rounded-xl bg-[#f1f3f5] p-4 flex flex-col sm:flex-row justify-between text-center gap-4">
            <h2 className="font-bold text-green-600">Income: ₹{income}</h2>
            <h2 className="font-bold text-red-500">Expenses: ₹{expense}</h2>
            <h2 className="font-bold text-blue-600">Saving: ₹{saving}</h2>
          </div>

          {/* Categories */}
          <div className="border mt-6 rounded-xl bg-[#f1f3f5] p-4 flex flex-col sm:flex-row justify-between text-center gap-4">
            <h2 className="font-bold">Food: ₹{category.food}</h2>
            <h2 className="font-bold">Travel: ₹{category.travel}</h2>
            <h2 className="font-bold">Other: ₹{category.other}</h2>
          </div>
        </div>

        {/* Right Section: Expense List */}
        <div className="bg-white border border-[#dee2e6] rounded-2xl shadow-md p-4 w-full lg:w-1/3 h-fit max-h-[500px] overflow-y-auto">
          <h2 className="text-center text-lg font-bold text-[#dc3545] bg-[#e9ecef] py-2 rounded-xl mb-4 mt-3">
            Expense List
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
            {expenseList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}