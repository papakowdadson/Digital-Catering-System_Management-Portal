import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext";

const useManagement = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [allMenu, setAllMenus] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log("access token", user.accessToken);
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/products/`,
        {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        }
      );
      if (response.status == 200) {
        setAllMenus(response.data);
        setLoading(false);
      }
      // setAllMenus(MenusData)
      setLoading(false);
    } catch (error) {
      console.log("fetch data error", error);
      setLoading(false);
    }
  };

  const updateMenu = async(_id,data) => {
    console.log("access token", user.accessToken);
    setLoading(true);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/products/${_id}`,
        {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        },data
      );
      if (response.status == 200) {
        setLoading(false);
      }
      // setAllMenus(MenusData)
      setLoading(false);
    } catch (error) {
      console.log("updating data error", error.message);
      setLoading(false);
    }
  };

  return {
    allMenu,
    setAllMenus,
    loading,
    updateMenu,
  };
};

export default useManagement;
