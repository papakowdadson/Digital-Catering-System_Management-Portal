import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const LoginPage = () => {
    const {user,setUser,setLocalUser} = useContext(UserContext)
    const navigate = useNavigate();
    const [userInput,setUserInput] = useState({'username':'','password':''})
    const {username,password} = userInput;

    const handleCahnge = (e) =>{
        e.preventDefault();
        setUserInput((prev)=>({...prev,[e.target.id]:e.target.value}))

    }

    const handleLogin = async(e) =>{
        e.preventDefault()
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/login`,userInput)
            if(response.status === 200){
                console.log('login res',response)
                setUser(response.data)
                setLocalUser(response.data)
                navigate('/orders');
            }
        } catch (error) {
            console.log('error',error)
            
        }

    }

    return (
        <div className="h-svh flex">
            <form onSubmit={handleLogin} className="Rounded border flex flex-col m-auto w-6/12 h-2/6 p-2 max-w-96">
                <p className="font-semibold text-center mb-5">Login</p>
                <label htmlFor="username">Username:</label>
                <input type='text' id="username" name="username" placeholder="Enter Username" value={username} className="mb-2" onChange={handleCahnge} required/>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Enter password" value={password} className="mb-3" onChange={handleCahnge} required/>
                <input type="submit" className=" rounded bg-black text-white" />
            </form>
        </div>
    )
}

export default LoginPage;