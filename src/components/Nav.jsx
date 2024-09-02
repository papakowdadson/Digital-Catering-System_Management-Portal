import { Link,NavLink, useNavigate } from "react-router-dom";
import { NavData } from "../data";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const Nav = () => {
  const navigate = useNavigate();
  const {user,removeLocalUser} = useContext(UserContext)

  const handleLogout = ()=>{
    removeLocalUser()
    navigate('/')
  }

  return (
    user&&
    <div className="flex justify-between pt-2 mb-8 pl-2 pr-2 items-center">
      <div className="font-semibold text-2xl">
        K<span className=" text-blue-400">Foods</span> 
      </div>
      <div className="w-6/12 flex justify-evenly border rounded-lg p-2">
      {NavData.map((data,index) => (
        <NavLink key={index} to={data.link} className={({isActive})=> isActive? "rounded-lg border pl-1 pr-1 font-semibold border-blue" : "pl-1 pr-1"}>
          {data.label}
        </NavLink>
      ))}
      </div>
      <div className="flex items-center">
        <p className="mr-2 flex">Welcome,
        <p className="ml-1 text-blue-500"> {user.username}</p>
        </p>
        <button className="px-4 py-2 rounded-lg bg-black text-white ml-1" type="button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};
export default Nav;
