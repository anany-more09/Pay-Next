import { useEffect} from "react";
import { useNavigate } from "react-router-dom";

import { Balance } from "../components/Balance";
import { Users } from "../components/Users";


export const Dashboard = () => {
    const navigate = useNavigate();
    // const [value, setValue] = useState();
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        
        if (!token) {
            navigate("/signin");
        }
    }, [navigate]);
    // useEffect(() => {
         
    //         const getBalance =  async () => {

    //             try{
    //                 const fetchBalance = await axios.get('http://localhost:3000/api/v1/acount/getbalance');
    //                 setValue(fetchBalance.data.balance)
    //                 console.log(value, ": This is your value") 
    //             }
    //             catch(error)
    //             {
    //                 console.log("Balance not found", error)
    //             }
           
    //          }
    //      getBalance();
    //      return () => {}
       

    // })

  
    return (
        <div>
        
            <div className="my-8 mx-4">
                <Balance value={'100,000'} />
                <Users />
            </div>
        </div>
    );
};











