import { Link,NavLink } from "react-router-dom";
import { NavData } from "../data";

const Nav = () => {
  return (
    <div className="flex justify-between pt-2 mb-2 pl-2 pr-2">
      <div>
        K Foods
      </div>
      <div>
      {NavData.map((data) => (
        <NavLink to={data.link} className={({isActive})=> isActive? "rounded border pl-1 pr-1 font-semibold border-blue" : "pl-1 pr-1"}>
          {data.label}
        </NavLink>
      ))}
      </div>
      <div>
        Login / out
      </div>
    </div>
  );
};
export default Nav;
