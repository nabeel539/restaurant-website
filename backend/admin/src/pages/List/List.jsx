/* eslint-disable react/prop-types */
import "./List.css";
import { MdDelete, MdEditDocument } from "react-icons/md";
import { useEffect } from "react";
const List = ({ url, openEditModal, openConfirmBox, fetchList, list }) => {
  // Fetch the list when the component mounts
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <div className="list add flex-col">
        <p>All Foods List</p>
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {Array.isArray(list) && list.length > 0 ? (
            list.map((item, idx) => (
              <div key={idx} className="list-table-format">
                <img src={`${url}/images/` + item.image} alt="food" />
                <p>{item.name}</p>
                <p>{item.category ? item.category : "Unknown"}</p>
                <p>${item.price}</p>
                <p className="cursor actions">
                  <MdEditDocument
                    size={16}
                    color="#49557e"
                    spacing={20}
                    onClick={() => openEditModal(item._id)}
                  />
                  <MdDelete
                    size={16}
                    color="red"
                    onClick={() => openConfirmBox(item._id)}
                  />
                </p>
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default List;
