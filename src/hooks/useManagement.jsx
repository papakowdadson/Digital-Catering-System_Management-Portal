import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { toast } from "react-toastify";

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
        console.log("fetch product data", response.data);
        setAllMenus(response.data);
      }
    } catch (error) {
      console.log("fetch product error", error);
      toast.error(`${error.message}`, {
        position: toast.POSITION.TOP_LEFT,
      });
    } finally {
      setLoading(false);
    }
  };

  const updateMenu = async (_id, data) => {
    console.log("access token", user.accessToken);
    console.log("_id", _id);

    const updatableFeild = {
      price: data.price,
      img: data.img,
    };
    console.log("data", updatableFeild);

    setLoading(true);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/products/${_id}`,
        updatableFeild,
        {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        },
        
      );
      if (response.status == 200) {
        const newMenu = allMenu.map((menu)=>menu._id==_id?{...menu,...updatableFeild}:menu)
        console.log('newmunu',newMenu)
        setAllMenus(newMenu);
        toast.success("Menu Updated !", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      // setAllMenus(MenusData)
    } catch (error) {
      console.log("updating data error", error.message);
      toast.error(`${error.message}`, {
        position: toast.POSITION.TOP_LEFT,
      });
    } finally {
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
