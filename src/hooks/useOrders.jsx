import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { OrdersData } from "../data";
import { UserContext } from "../context/userContext";

const useOrders = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [allOrder, setAllOrders] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log("access token", user.accessToken);
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/orders/`,
        {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        }
      );
      if (response.status == 200) {
        setAllOrders(response.data);
        setLoading(false);
      }
      // setAllOrders(OrdersData)
      setLoading(false);
    } catch (error) {
      console.log("fetch data error", error);
      setLoading(false);
    }
  };

  const acceptOrders = (_id,message) => {
    console.log("===========filtering orders===========");
    setAllOrders((prev) =>
      prev.map((item) => {
        if (item._id === _id) {
          return { ...item, Status:message?? "accepted" };
        } else {
          return item;
        }
      })
    );
  };

  return {
    allOrder,
    setAllOrders,
    loading,
    acceptOrders,
  };
};

export default useOrders;
