import axios from "axios";
import CustomOrdersTable from "../features/Orders/components/CustomeOrdersTable";
import CustomPaymentModal from "../features/Orders/components/CustomPaymentModal"
import useOrders from "../hooks/useOrders";
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { toast } from "react-toastify";

const OrdersPage = () => {
  const { user } = useContext(UserContext);
  const { allOrder, setAllOrders, loading, acceptOrders } = useOrders();
  const [showModal,setShowModal] = useState(false);
  const [modalInput,setModalInput] = useState({id:"",amount:""});

  const showPaymentModal = (id,amount) =>{
    setShowModal((prev)=>!prev);
    setModalInput((prev)=>({...prev,'id':id,'amount':amount}));
  }



  const acceptOrder = async (_id,message) => {
    console.log("accepting Token", user.accessToken);
    console.log("accepting id", _id);
    try {
      const data = { Status:message?? "accepted" };
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/orders/${_id}`,
        data,
        {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        }
      );
      if (response.status === 200) {
        // add toast
        acceptOrders(_id,message);
        toast.success(`Order ${message}`, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.log("error accepting orders");
      toast.error(`${error.message}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="">
      <CustomOrdersTable
        data={allOrder}
        loading={loading}
        myFunction={acceptOrder}
        actionText={"Accept"}
        showPaymentModal={showPaymentModal}
      />
      {showModal&&<CustomPaymentModal data={modalInput} open={showModal} handleOpen={showPaymentModal} myFunction={acceptOrder} />}
    </div>
  );
};

export default OrdersPage;
