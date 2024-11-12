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











