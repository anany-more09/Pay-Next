
import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";


export const Dashboard = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState(0);
    
    useEffect(() => {
        const token = localStorage.getItem("token");

        
        if (!token) {
            navigate("/signin");
        }
    }, [navigate]);
    useEffect(() => {
         
            const getBalance =  async () => {

                const userid = localStorage.getItem(userid)
                try{
                    const fetchBalance = await axios.get('http://localhost:3000/api/v1/acount/getbalance',
                        {
                            userid,
                        }
                    )
                    setValue(fetchBalance.data.balance)
                    console.log(fetchBalance.data.balance)
                    console.log(value, ": This is your value")
                    
                }
                catch(error)
                {
                    console.log("Balance not found", error)
                }
           
             }
         getBalance();
         return () => {} 
})

    return (
        <div>
        
            <div className="my-8 mx-4">
                <Balance value={value} />
                <Users />
            </div>
        </div>
    );
};











