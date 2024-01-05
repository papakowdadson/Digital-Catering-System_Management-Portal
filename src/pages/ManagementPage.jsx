import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext";

const ManagementPage = () => {
    const {user} = useContext(UserContext)
  const [product, setProduct] = useState({
    title: "",
    desc: "",
    img: "",
    categories: "",
    size: "",
    color: "black",
    price: "",
    owner: "",
  });

  const { title, desc, img, categories, size, color, price } = product;

  const handleChange = (e) => {
    e.preventDefault();
    console.log(`${[e.target.id]} :${e.target.value}`);
    setProduct((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleAddDish = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/products/create`,
        product,{
            headers: {
              Authorization: "Bearer " + user.accessToken,
            },
          }
      );
      if (response.status === 200) {
        console.log("add res", response);
        setProduct({
          title: "",
          desc: "",
          img: "",
          categories: "",
          size: "",
          color: "black",
          price: "",
          owner: "",
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="pt-1 pr-1 pl-1 flex flex-col">
      <p className="text-center">Add a dish</p>
      <form onSubmit={handleAddDish} className="flex flex-col w-6/12 m-auto">
        <div className="flex flex-col">
          <label htmlFor="title">Dish Name</label>
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={handleChange}
            placeholder="Enter dish name"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="desc">Dish Describtion</label>

          <input
            id="desc"
            type="text"
            name="desc"
            value={desc}
            onChange={handleChange}
            placeholder="Enter dish description"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="img">Dish Image URL</label>

          <input
            name="img"
            id="img"
            type="text"
            value={img}
            onChange={handleChange}
            placeholder="Enter image url"
            required
          />
        </div>
        <p>Select Dish Category</p>
        <div className="flex">
          <div className="flex mr-1">
            <input
              id="categories"
              type="checkbox"
              value="Breakfast"
              checked={categories === "Breakfast"}
              onChange={handleChange}
            />
            <label>Breakfast</label>
          </div>
          <div className="flex mr-1">
            <input
              id="categories"
              type="checkbox"
              value="Lunch"
              checked={categories === "Lunch"}
              onChange={handleChange}
            />
            <label>Lunch</label>
          </div>
          <div className="flex mr-1">
            <input
              id="categories"
              type="checkbox"
              value="Supper"
              checked={categories === "Supper"}
              onChange={handleChange}
            />
            <label>Supper</label>
          </div>
        </div>
        <p>Select Dish Size</p>
        <div className="flex">
          <div className="flex mr-1">
            <input
              id="size"
              type="checkbox"
              value="Small"
              checked={size === "Small"}
              //   onChange={}
              onChange={handleChange}
            />
            <label>Small</label>
          </div>
          <div className="flex mr-1">
            <input
              id="size"
              type="checkbox"
              value="Large"
              checked={size === "Large"}
              //   onChange={handleChange}
              onChange={handleChange}
            />
            <label>Large</label>
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
            required
          />
        </div>
        <input
          type="submit"
          value="Add Dish"
          className="rounded bg-black text-white mt-2"
        />
      </form>
    </div>
  );
};
export default ManagementPage;
