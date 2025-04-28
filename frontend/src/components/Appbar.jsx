import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import logo from '../assets/logo-paynext-Photoroom.png'

export const Appbar = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <div className="sticky top-0 shadow h-14 flex justify-between items-center bg-white z-50 px-4 md:px-8">
                {/* App Title */}
                <div className="w-16">
                    <img src={logo} alt="" />
                </div>

                {/* Desktop Navigation Buttons */}
                <div className="hidden md:flex space-x-4">
                    
                    <Button 
                       label={'Dashboard'}
                       onClick={() => navigate('/dashboard')}
                    />

                    
                     <Button 
                       label={'expense'}
                       onClick={() => navigate('/expense')}
                    />

                     <Button 
                        label={'Logout'}
                        onClick={() => {
                        localStorage.removeItem("token")
                        navigate('/signin')
                       }}
                    />
                </div>

                {/* User Icon for Desktop */}
                <div className="hidden md:flex items-center space-x-2">
                    <div className="flex flex-col justify-center h-full mr-4">Hello</div>
                    <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mt-1 mr-2">
                        <div className="flex flex-col justify-center h-full text-xl">U</div>
                    </div>
                </div>

                {/* Hamburger Menu for Mobile */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-gray-700 focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-8 h-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="md:hidden flex flex-col items-center space-y-4 bg-white shadow-lg py-4">
                    <Button onClick={() => navigate('/dashboard')} 
                            label={'Dashboard'}
                        />
                    <Button onClick={() => {
                        localStorage.removeItem("token")
                        navigate("/signin")}} 
                        label={"Logout"}
                    />
                    <Button onClick={() => navigate('/expense')}
                            label={'Track Expense'} 
                    />
                </div>
            )}
        </>
    );
};
