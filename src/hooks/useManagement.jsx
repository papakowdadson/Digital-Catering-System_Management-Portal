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
      }
    } catch (error) {
      toast.error(`${error.message}`, {
        position: toast.POSITION.TOP_LEFT,
      });
    } finally {
      setLoading(false);
    }
  };

  const updateMenu = async (_id, data) => {

    const updatableFeild = {
      title: data.title,
      price: data.price,
      img: data.img,
    };

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
        setAllMenus(newMenu);
        toast.success("Menu Updated !", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      // setAllMenus(MenusData)
    } catch (error) {
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
