import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Balance } from "../Components/Balance";
import { Users } from "../Components/Users";
import { useState } from "react";

export const Dashboard = () => {
    const navigate = useNavigate();
    const [balance, setBalance] = useState()

    useEffect(() => {
        const token = localStorage.getItem("token");
        // Need to add auth check!
        if (!token) {
            navigate("/signin");
        }
    }, [navigate]);

  
    return (
        <div>
            <Appbar />
            <div className="m-8">
                <Balance value={"10,000"} />
                <Users />
            </div>
        </div>
    );
};











// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Appbar } from "../components/Appbar";
// import { Balance } from "../Components/Balance";
// import { Users } from "../Components/Users";
// import { useState } from "react";
// import axios from "axios"; // Import axios

// export const Dashboard = () => {
//     const navigate = useNavigate();
//     const [balance, setBalance] = useState(null); // Initialize state for balance

//     useEffect(() => {
//         const token = localStorage.getItem("token");
        
//         // Check if token exists
//         if (!token) {
//             navigate("/signin");
//         } else {
//             // Fetch balance from the backend
//             const fetchBalance = async () => {
//                 try {
//                     const response = await axios.get("http://localhost:3000/api/v1/user/balance", {
//                         headers: {
//                             Authorization: `Bearer ${token}`
//                         }
//                     });
//                     setBalance(response.data.balance); // Set balance state
//                 } catch (error) {
//                     console.error("Error fetching balance:", error);
//                 }
//             };

//             fetchBalance(); // Call fetchBalance function
//         }
//     }, [navigate]);

//     return (
//         <div>
//             <Appbar />
//             <div className="m-8">
//                 <Balance value={balance !== null ? balance : "Loading..."} /> {/* Display loading or balance */}
//                 <Users />
//             </div>
//         </div>
//     );
// };
