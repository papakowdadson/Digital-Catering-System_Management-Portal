import axios from "axios";
import CustomOrdersTable from "../features/Orders/components/CustomeOrdersTable";
import useOrders from "../hooks/useOrders";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { toast } from "react-toastify";

const OrdersPage = () => {
  const { user } = useContext(UserContext);
  const { allOrder, setAllOrders, loading, acceptOrders } = useOrders();

  const acceptOrder = async (_id) => {
    console.log("accepting Token", user.accessToken);
    console.log("accepting id", _id);
    try {
      const data = { Status: "accepted" };
      const response = await axios.put(
        `http://localhost:5000/api/orders/${_id}`,
        data,
        {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        }
      );
      if (response.status === 200) {
        // add toast
        acceptOrders(_id);
        toast.success("Order Accepted", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.log("error accepting orders");
    }
  };

  return (
    <div>
      <CustomOrdersTable
        data={allOrder}
        loading={loading}
        myFunction={acceptOrder}
        actionText={"Accept"}
      />
    </div>
  );
};

export default OrdersPage;
