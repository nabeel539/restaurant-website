/* eslint-disable react/prop-types */
import { IoClose } from "react-icons/io5";
import "./ConfirmBoxPopup.css";

const ConfirmBoxPopup = ({ onClose, onConfirm }) => {
  //   const onClose = () => {};

  return (
    <div className="ConfirmBox">
      <div className="ConfirmBox-container">
        <div className="ConfirmBox-title">
          <h3>Delete Item</h3>
          <IoClose size={20} onClick={onClose} />
        </div>
        <h4>Do you really want to Delete this Item ?</h4>
        <div className="ConfirmBox-Btn-Container">
          <button type="button" className="close-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBoxPopup;
