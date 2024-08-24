import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { toast } from "react-toastify";

const ManagementPage = () => {
  const { user } = useContext(UserContext);
  const [product, setProduct] = useState({
    title: "",
    desc: "",
    img: "",
    categories: ["Breakfast"],
    size: "Small",
    color: "black",
    price: "",
    owner: "",
  });

  const handleCheckboxChange = (e) => {
    const { name, checked, value } = e.target;
    setProduct((prev) => {
      const newCategories = [...prev.categories];
      const newSize = prev.size;

      if (name === "categories") {
        if (checked) {
          newCategories.push(value);
        } else {
          const index = newCategories.indexOf(value);
          if (index > -1) {
            newCategories.splice(index, 1);
          }
        }
        return { ...prev, categories: newCategories };
      }

      if (name === "size") {
        return { ...prev, size: checked ? value : "" };
      }

      return prev;
    });
  };

  const { title, desc, img, categories, size, color, price } = product;

  const handleChange = (e) => {
    e.preventDefault();
    console.log(`${[e.target.id]} :${e.target.value}`);
    if (e.target.type == "checkbox") {
      handleCheckboxChange(e);
    } else {
      setProduct((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }
  };

  const handleAddDish = async (e) => {
    e.preventDefault();
    console.log(product);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/products/create`,
        product,
        {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        }
      );
      if (response.status === 200) {
        console.log("add res", response);
        toast.error("Couldn't Add Dish", {
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
          owner: "admin",
        });
      }
    } catch (error) {
      toast.error("Couldn't Add Dish", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log("error", error);
    }
  };

  return (
    <div className="pt-1 pr-1 pl-1 flex flex-col">
      <p className="text-center font-medium">Add a dish</p>
      <form onSubmit={handleAddDish} className="flex flex-col w-6/12 m-auto">
        <div className="flex flex-col mb-2">
          <label htmlFor="title">Dish Name</label>
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={handleChange}
            placeholder="Enter dish name"
            class="border focus:border-black outline-none px-4 py-2 rounded-lg"
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
            class="border focus:border-black outline-none px-4 py-2 rounded-lg"
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
              id="categories"
              type="checkbox"
              value="Breakfast"
              name="categories"
              checked={categories.includes("Breakfast")}
              onChange={handleChange}
            />
            <label className="ml-2">Breakfast</label>
          </div>
          <div className="flex mr-3">
            <input
              id="categories"
              type="checkbox"
              name="categories"
              value="Lunch"
              checked={categories.includes("Lunch")}
              onChange={handleChange}
            />
            <label className="ml-2">Lunch</label>
          </div>
          <div className="flex mr-3">
            <input
              id="categories"
              type="checkbox"
              value="Supper"
              name="categories"
              checked={categories.includes("Supper")}
              onChange={handleChange}
            />
            <label className="ml-2">Supper</label>
          </div>
        </div>
        <p>Select Dish Size</p>
        <div className="flex mb-2">
          <div className="flex mr-3">
            <input
              id="size"
              type="checkbox"
              value="Small"
              name="size"
              checked={size === "Small"}
              onChange={handleChange}
            />
            <label className="ml-2">Small</label>
          </div>
          <div className="flex mr-3">
            <input
              id="size"
              type="checkbox"
              value="Large"
              name="size"
              checked={size === "Large"}
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
            class="border focus:border-black outline-none px-4 py-2 rounded-lg"
            required
          />
        </div>
        <input
          type="submit"
          value="Add Dish"
          className=" rounded-lg bg-black text-white p-3 mt-4"
        />
      </form>
      
      <p className="text-center font-medium mb-2 mt-2">Store Listing</p>
      <p className="text-center font-medium">Coming Soon</p>

    </div>
  );
};
export default ManagementPage;
