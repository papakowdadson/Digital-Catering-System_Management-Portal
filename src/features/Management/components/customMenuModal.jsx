import React, {
  useState,
  ChangeEvent,
  useEffect,
  MouseEvent,
  useContext,
} from "react";
import { Modal, Button, Input } from "rsuite";
import { toast } from "react-toastify";
import axios from "axios";
import useManagement from "../../../hooks/useManagement";

const CustomMenuModal = ({ open, handleOpen, data,setData }) => {
  const { updateMenu } = useManagement();

  console.log('modal img',data.price)
  

  const { _id, img, title, price } = data;

  const reset = () => {
    setData({
      _id: "",
      img: "",
      title: "",
      price: "",
    });
  };

  const handleMenuOpen = () => {
    handleOpen();
    reset();
  };

  const handleUpdate = async() => {
    await updateMenu(_id, data);
    handleMenuOpen();
  };

  const handleChange = (id, value) => {
    setData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <>
      <div>
        <Modal open={open} onClose={handleMenuOpen}>
          <Modal.Header>
            <Modal.Title>{"Update Menu"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="flex flex-col">
              <div className="border rounded-xl mb-2 overflow-hidden">
                <img
                  src={img ? `${img}` : ""}
                  alt="Menu image"
                  className="h-52 w-full "
                />
              </div>

              <label htmlFor="title">Title</label>
              <Input
                value={title}
                id="title"
                type="text"
                name="title"
                onChange={(value) => handleChange("title", value)}
                required={true}
                placeholder={"Title"}
              />
              <label htmlFor="content">Image</label>
              <Input
                id="img"
                value={img}
                name="content"
                onChange={(value) => handleChange("img", value)}
                required={true}
                placeholder={"Enter imageurl"}
              />
              <label htmlFor="price">Price</label>
              <Input
                value={price}
                type="number"
                id="price"
                name="price"
                onChange={(value) => handleChange("price", value)}
                required={true}
                placeholder={"Enter price"}
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleUpdate} appearance="primary">
              {"Update"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default CustomMenuModal;
