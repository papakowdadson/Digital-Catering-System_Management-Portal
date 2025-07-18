import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { user, setUser, setLocalUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({ username: "", password: "" });
  const { username, password } = userInput;

  useEffect(() => {
    user && navigate("/orders");
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setUserInput((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/auth/login`,
        userInput
      );
      if (response.status === 200) {
        setUser(response.data);
        setLocalUser(response.data);
        navigate("/orders");
      }
    } catch (error) {
      toast.error("Error Signing in", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="flex h-screen">
      <form
        onSubmit={handleLogin}
        className="rounded-lg border flex flex-col m-auto w-full p-4 min-w-96 max-w-xl"
      >
        <p className="font-semibold text-center mb-5">Welcome Back, Login</p>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter Username"
          value={username}
          className="mb-2 p-2 border rounded-lg"
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter password"
          value={password}
          className="mb-3 p-2 border rounded-lg"
          onChange={handleChange}
          required
        />
        <input
          type="submit"
          className=" rounded-lg bg-black text-white p-3 mt-4"
        />
      </form>
    </div>
  );
};

export default LoginPage;
