import { useNavigate } from "react-router-dom";
export const Appbar = () => {
 
    const navigate = useNavigate();
     
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4 md:show">
            PayTM App
        </div>
        <div>
            <button className="bg-gray-700 text-center rounded-lg p-1 px-2 mt-2 text-white "
                  onClick={()=>{
                        localStorage.removeItem("token");
                        navigate("/signin");
                  }}>logout</button>
                </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    U
                </div>
            </div>
        </div>
    </div>
}