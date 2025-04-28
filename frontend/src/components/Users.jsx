import { useEffect, useState } from "react";
import { Button } from "./Button";
import   axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {PropTypes}  from 'prop-types'

export const Users = () => {
    const { filter : initialFilter } = useParams();
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState(initialFilter || "");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`);
                setUsers(response.data.user);
                // console.log(response.data.user)
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchData();

        return () => {};
    }, [filter]); 

    return (
        <>
            <div className="font-bold mt-6 text-lg">Users</div>
            <div className="my-2">
                <input
                    onChange={(e) => setFilter(e.target.value)}
                    value={filter}
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-2 py-1 border rounded border-slate-200"
                />
            </div>
            <div>
                {users.map(user => (
                    <User key={user._id} user={{ ...user, id: user._id }} />

                ))}
            </div>
        </>
    );
};


function User({ user }) {
    const navigate = useNavigate();

    // Check if the user object is valid
    if (!user) {
        return <div>Loading...</div>; // Or return null or a fallback UI
    }

    return (
        <div className="flex justify-between items-center rounded-2xl shadow-sm bg-opacity-10 bg-gray-400 my-6 p-4">
        
            <div className="flex items-center space-x-4">
                
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstName ? user.firstName[0] : "?"}  {/* Safely accessing firstName */}
                    </div>
                </div>

                <div className="text-sm md:text-base font-medium">
                    {user.firstName} {user.lastName}
                </div>
            </div>

            {/* Send Money Button - Push to right */}
            <div className="ml-auto">
                {/* On desktop and larger screens, show "Send Money" */}
                <Button
                    onClick={() => {
                        navigate(`/send?id=${user._id}&name=${user.firstName}`);
                        console.log(user._id, 'Send Money', user.firstName);

                    }}
                    label="Send Money"
                    className="w-auto hidden md:block"
                />
                {/* On mobile view, show send arrow icon */}
                <div className="block md:hidden text-2xl text-gray-600 cursor-pointer" onClick={() => {
                    navigate(`/send?id=${user._id}&name=${user.firstName}`);
                    
                }}>

                </div>
            </div>
        </div>
    );
}

User.propTypes = {
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string, 
    }).isRequired,
  };
  

    