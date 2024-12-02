import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import EditItemModal from "./components/EditItemPopup/EditItemModal";
import ConfirmBoxPopup from "./components/ConfirmBoxPopup/ConfirmBoxPopup";
import axios from "axios"; // Import axios if not already

const App = () => {
  const url = "http://localhost:4000";

  const [showEditModal, setShowEditModal] = useState(false);
  const [confirmBox, setConfirmBox] = useState(false);
  const [selectedFoodId, setSelectedFoodId] = useState(null);
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.food);
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      toast.error("Failed to fetch data.");
    }
  };

  const openEditModal = (id) => {
    setSelectedFoodId(id);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedFoodId(null);
  };

  const openConfirmBox = (id) => {
    setSelectedFoodId(id);
    setConfirmBox(true);
  };

  const closeConfirmBox = () => {
    setConfirmBox(false);
    setSelectedFoodId(null);
  };

  const confirmDelete = async () => {
    if (selectedFoodId) {
      try {
        const response = await axios.post(`${url}/api/food/remove`, {
          id: selectedFoodId,
        });
        if (response.data.success) {
          toast.success(response.data.message);
          fetchList();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Failed to delete the item.");
      } finally {
        setConfirmBox(false);
        setSelectedFoodId(null);
      }
    }
  };

  return (
    <div>
      <Toaster />
      {confirmBox && (
        <ConfirmBoxPopup onClose={closeConfirmBox} onConfirm={confirmDelete} />
      )}
      {showEditModal && (
        <EditItemModal
          url={url}
          foodId={selectedFoodId}
          onClose={closeEditModal}
          fetchList={fetchList}
        />
      )}

      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route
            path="/list"
            element={
              <List
                url={url}
                openEditModal={openEditModal}
                openConfirmBox={openConfirmBox}
                fetchList={fetchList}
                list={list}
              />
            }
          />
          <Route path="/orders" element={<Orders url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
