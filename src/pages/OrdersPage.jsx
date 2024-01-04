import CustomOrdersTable from "../features/Orders/components/CustomeOrdersTable";
import useOrders from "../hooks/useOrders";

const OrdersPage = ()=>{
    const {allOrder,
        setAllOrders,
        loading} = useOrders()

    const acceptOrder = () =>{

    }

    return (
        <div>   
            <CustomOrdersTable data={allOrder} loading={loading} myFunction={acceptOrder} actionText={'Accept'}/>
        </div>
    )
    
}

export default OrdersPage;