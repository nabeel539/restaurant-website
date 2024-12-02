/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import "./EditItemModal.css";

const EditItemModal = ({ url, foodId, onClose, fetchList }) => {
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
    image: null,
    currentImage: null,
  });

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await axios.get(`${url}/api/food/edit/${foodId}`);
        console.log(response.data);
        if (response.data.success) {
          const food = response.data.food;
          setData({
            name: food.name,
            description: food.description,
            price: food.price,
            category: food.category,
            image: null, // Initialize with null for new image upload
            currentImage: food.image, // Save current image to display it
          });
        } else {
          toast.error("Failed to load food item data.");
        }
      } catch (error) {
        toast.error("Something went wrong while fetching data.");
      }
    };

    fetchFoodData();
  }, [url, foodId]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onFileChangeHandler = (e) => {
    setData({ ...data, image: e.target.files[0] });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    if (data.image) {
      formData.append("image", data.image);
    } else {
      formData.append("image", data.currentImage); // If no new image, retain the current image
    }

    try {
      const response = await axios.post(
        `${url}/api/food/edit/${foodId}`,
        formData
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
        onClose();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update food item.");
    }
  };

  return (
    <div className="EditItem-popup">
      <form className="EditItem-popup-container" onSubmit={onSubmitHandler}>
        <div className="EditItem-popup-title">
          <h3>Update Item</h3>
          <IoClose size={20} onClick={onClose} />
        </div>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={
                data.image
                  ? URL.createObjectURL(data.image)
                  : `${url}/images/${data.currentImage}`
              }
              alt="file upload"
            />
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            hidden
            onChange={onFileChangeHandler}
          />
        </div>
        <div className="EditItem-popup-inputs">
          <input
            name="name"
            type="text"
            placeholder="Item Name"
            value={data.name}
            onChange={onChangeHandler}
            required
          />
          <textarea
            name="description"
            placeholder="Item Description"
            value={data.description}
            onChange={onChangeHandler}
            rows="4"
            required
          />
          <input
            name="price"
            type="number"
            placeholder="Item Price"
            value={data.price}
            onChange={onChangeHandler}
            required
          />
          <select
            name="category"
            value={data.category}
            onChange={onChangeHandler}
          >
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Deserts">Deserts</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
            <option value="Pure Veg">Pure Veg</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>
          </select>
        </div>
        <div className="EditModal-Btn-Container">
          <button
            type="button"
            className="EditModal-close-btn"
            onClick={onClose}
          >
            Cancel
          </button>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default EditItemModal;
