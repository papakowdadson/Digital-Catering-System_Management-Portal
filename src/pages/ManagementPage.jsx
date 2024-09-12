import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { toast } from "react-toastify";
import useManagement from "../hooks/useManagement";
import CustomManagementTable from "../features/Management/components/CustomeManagementTable";
import CustomMenuModal from "../features/Management/components/customMenuModal";

const ManagementPage = () => {
  const { user } = useContext(UserContext);
  const { allMenu, loading } = useManagement();

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleOpen = () => {
    setShowModal((prev) => !prev);
  };

  const displayModal = (id) => {
    const newData = allMenu.filter((menu) => menu._id == id)[0];

    setModalData(newData);
    setShowModal((prev) => !prev);
  };

  const [product, setProduct] = useState({
    title: "",
    desc: "",
    img: "",
    categories: ["Breakfast"],
    size: "Small",
    color: "black",
    price: "",
  });

  const { title, desc, img, categories, size, color, price } = product;

  const handleCheckboxChange = (e) => {
    const { name, checked, value } = e.target;
    setProduct((prev) => {
      if (name === "categories") {
        const newCategories = checked
          ? [...prev.categories, value]
          : prev.categories.filter((category) => category !== value);
        return { ...prev, categories: newCategories };
      }
      if (name === "size") {
        return { ...prev, size: checked ? value : "" };
      }
      return prev;
    });
  };

  const handleChange = (e) => {
    if (e.target.type == "checkbox") {
      handleCheckboxChange(e);
    } else {
      setProduct((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }
  };

  const handleAddDish = async (e) => {
    e.preventDefault();

    const data = {
      "name": title,
      "description": desc,
      "image": img,
      "category": categories,
      "size": size,
      "color": color,
      "price": price,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/products/create`,
        data,
        {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Dish Added", {
          position: toast.POSITION.TOP_CENTER,
        });
        setProduct({
          title: "",
          desc: "",
          img: "",
          categories: "Breakfast",
          size: "Small",
          color: "black",
          price: "",
        });
      }
    } catch (error) {
      toast.error(`${error.message}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="pt-1 pr-1 pl-1 flex flex-col">
      <p className="text-center font-medium">Add a dish</p>
      <form
        onSubmit={handleAddDish}
        className="flex flex-col w-full max-w-5xl m-auto"
      >
        <div className="flex flex-col mb-2">
          <label htmlFor="title">Dish Name</label>
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={handleChange}
            placeholder="Enter dish name"
            className="border focus:border-black outline-none px-4 py-2 rounded-lg"
            required
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="desc">Dish Describtion</label>

          <input
            id="desc"
            type="text"
            name="desc"
            value={desc}
            onChange={handleChange}
            placeholder="Enter dish description"
            className="border focus:border-black outline-none px-4 py-2 rounded-lg"
            required
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="img">Dish Image URL</label>

          <input
            name="img"
            id="img"
            type="text"
            value={img}
            onChange={handleChange}
            placeholder="Enter image url"
            class="border focus:border-black outline-none px-4 py-2 rounded-lg"
            required
          />
        </div>
        <p>Select Dish Category</p>
        <div className="flex mb-2">
          <div className="flex mr-3">
            <input
              id="breakfast"
              type="checkbox"
              value="Breakfast"
              name="categories"
              checked={product.categories.includes("Breakfast")}
              onChange={handleChange}
            />
            <label className="ml-2">Breakfast</label>
          </div>
          <div className="flex mr-3">
            <input
              id="lunch"
              type="checkbox"
              name="categories"
              value="Lunch"
              checked={product.categories.includes("Lunch")}
              onChange={handleChange}
            />
            <label className="ml-2">Lunch</label>
          </div>
          <div className="flex mr-3">
            <input
              id="supper"
              type="checkbox"
              value="Supper"
              name="categories"
              checked={product.categories.includes("Supper")}
              onChange={handleChange}
            />
            <label className="ml-2">Supper</label>
          </div>
        </div>
        <p>Select Dish Size</p>
        <div className="flex mb-2">
          <div className="flex mr-3">
            <input
              id="small"
              type="checkbox"
              value="Small"
              name="size"
              checked={product.size === "Small"}
              onChange={handleChange}
            />
            <label className="ml-2">Small</label>
          </div>
          <div className="flex mr-3">
            <input
              id="large"
              type="checkbox"
              value="Large"
              name="size"
              checked={product.size === "Large"}
              onChange={handleChange}
            />
            <label className="ml-2">Large</label>
          </div>
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="price">Dish Price</label>

          <input
            id="price"
            type="number"
            value={price}
            onChange={handleChange}
            placeholder="Enter Price"
            className="border focus:border-black outline-none px-4 py-2 rounded-lg"
            required
          />
        </div>
        <input
          type="submit"
          value="Add Dish"
          className=" rounded-lg bg-black text-white p-3 mt-4"
        />
      </form>

      <p className="text-center font-medium mb-2 mt-10">Store Listing</p>
      <CustomManagementTable
        data={allMenu}
        loading={loading}
        actionText="Edit"
        myFunction={displayModal}
      />
      <CustomMenuModal
        open={showModal}
        handleOpen={handleOpen}
        data={modalData}
        setData={setModalData}
      />
    </div>
  );
};
export default ManagementPage;
