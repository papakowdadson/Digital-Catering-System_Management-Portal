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
      <div className="font-semibold">
        K<span className=" text-blue-400">Foods</span> 
      </div>
      <div className="w-6/12 flex justify-evenly border rounded p-2">
      {NavData.map((data) => (
        <NavLink to={data.link} className={({isActive})=> isActive? "rounded border pl-1 pr-1 font-semibold border-blue" : "pl-1 pr-1"}>
          {data.label}
        </NavLink>
      ))}
      </div>
      <div className="flex items-center">
        <p>Welcome {user.username}</p>
        <button className="p-1 rounded bg-black text-white ml-1" type="button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};
export default Nav;
