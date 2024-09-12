import React, {
    useState,
  } from "react";
  import { Modal, Button, Input } from "rsuite";
  import { toast } from "react-toastify";
  import axios from "axios";
  import { v4 as uuidv4, } from "uuid";

  
  const CustomPaymentModal = ({ open, handleOpen, data,myFunction}) => {
    const [isVerified,setisVerified] = useState(false);
    const [input,setInput]=useState({number:''});
    const [isLoading, setIsLoading] = useState(false);
    const [uniqueId, setUniqueId] = useState("");
  
    console.log('modal img',data.amount)
    const { id, amount} = data;
    const {number} = input;
    
    const handleMenuOpen = () => {
      handleOpen('','');
    };
  
    const handleVerification = async(e) => {
       e.preventDefault();
       setIsLoading(true);
       const data = { "externalId": uniqueId};
       try {
        const paymentResponse = await axios.post(
          `${process.env.REACT_APP_PAYMENT_URL}/payment/verifyPayment`,
          data
        );
        if (paymentResponse.status == 200) {
          setisVerified(false);
          toast.success("Payment successfull,", {
            position: toast.POSITION.TOP_RIGHT,
          });
          myFunction(id,'paid')
          handleMenuOpen();
        } else {
        setisVerified(false);
          toast.error("Error verifying payment", {
            position: toast.POSITION.TOP_RIGHT,
          });
          handleMenuOpen(); 
        }
      } catch (error) {
        console.log('Server error',error)
        setTimeout(() => {
        }, 3000);
        toast.error(`${error.response.data.reason}`??'Please approve payment', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }finally{
        setIsLoading(false);
      }
    };

    const handlePayment = async() =>{
        setIsLoading(true);
        const _uid = uuidv4();
        console.log('uuid',_uid);
        setUniqueId(_uid);

        const data = {
            "amount": amount,
            "currency": "GHS",
            "XReferenceId": _uid,
            "externalId": _uid,
            "payer": {
              "partyIdType": "MSISDN",
              "partyId": "233"+number.slice(1, number.length),
            },
            "payerMessage": "K Food Payment",
          };

        console.log('data',data)

          try {
            const paymentResponse = await axios.post(
              `${process.env.REACT_APP_PAYMENT_URL}/payment/makePayment`,
              data
            );
            if (paymentResponse.status == 200) {
              setisVerified(true);
              console.log("Payment initiation response",paymentResponse.data)
              toast.success("Payment initiated, Complete transaction offline using my approvals", {
                position: toast.POSITION.TOP_RIGHT,
              });
            } else {
              toast.error("Error Initiating payment", {
                position: toast.POSITION.TOP_RIGHT,
              });
              setIsLoading(false);
            }
          } catch (error) {
            setTimeout(() => {
            }, 3000);
            toast.error("Server Error Initiating payment", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }finally{
            setIsLoading(false);
          }
    }
  
    const handleChange = (id, value) => {
        setInput((prev) => ({ ...prev, [id]: value }));
    };
  
    return (
      <>
        <div>
          <Modal open={open} onClose={handleMenuOpen}>
            <Modal.Header>
              <Modal.Title>{"Trigger Payment"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form className="flex flex-col">
                <p className="mb-4">{`Total Order cost GHS ${data.amount}`}</p>
                <label htmlFor="number">Phone number</label>
                <Input
                  value={number}
                  id="number"
                  type="text"
                  name="number"
                  onChange={(value) => handleChange("number", value)}
                  required={true}
                  placeholder={"0XXXXXXXXX"}
                /> 
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={isVerified?handleVerification:handlePayment} appearance="primary">
                {isLoading?"Processing":isVerified?"Verify Payment":"Make Payment"}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </>
    );
  };
  
  export default CustomPaymentModal;
  