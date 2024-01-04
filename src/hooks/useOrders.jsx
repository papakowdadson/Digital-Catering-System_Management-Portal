import { useEffect, useState } from "react"
import axios from "axios";
import { OrdersData } from "../data";


const useOrders = () =>{
    const [loading,setLoading] = useState(true)
    const [allOrder,setAllOrders] = useState([]);

    useEffect(()=>{
        fetchData();
    },[])

    const fetchData = async() => {
        setLoading(true)
        try {
        //     const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/orders/`);
        // if(response.status==200){
        //     setAllOrders(response.data)
        //     setLoading(false)
        // }
        setAllOrders(OrdersData)
        setLoading(false);
        } catch (error) {
            setLoading(false)  
        }
        
    }

    return {
        allOrder,
        setAllOrders,
        loading,
    }

}

export default useOrders;