import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { SignIn } from "./pages/SignIn"
import { SignUp } from "./pages/SignUp"
import { Appbar } from "./components/Appbar";
import TrackExpense from "./pages/TrackExpense";

function App() {
  return (
    
    <BrowserRouter>
    <Appbar />
      <Routes>
        
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<SendMoney />} />
        <Route path ="/expense"  element={<TrackExpense/>} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;