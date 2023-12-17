import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addHabit } from "../redux/features/habitSlice";

const Navbar = ({ name }) => {
  // call use dispatch hook a variable call dispatch
  const dispatch=useDispatch();
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    updateCurrentDateTime();
    const interval = setInterval(updateCurrentDateTime, 60000); // Update time every minute
    return () => clearInterval(interval);
  }, []);

  const updateCurrentDateTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
    const formattedDate = `${now.toLocaleDateString()}`;
    setCurrentDateTime(`${formattedTime} - ${formattedDate}`);
  };
  // function for add habit 
  const handleSave=()=>{
    const habitName=document.getElementById("habitName").value;
    dispatch(addHabit(habitName));
    alert("Your habit added successfully");
    document.getElementById("habitName").value="";
  }

  return (
    <>
      <div className="navbar">
        <h3>{currentDateTime}</h3>
        <div className="company-logo">
        <h3>Animosity Tracker</h3>
        </div>
        <div className="right-nav">
          <h5>{name}</h5>
          <button
            className="addhabit-btn"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            <i className="fa-solid fa-plus"></i> Add Habits
          </button>
        </div>
      </div>

      {/* modal for add habit form */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                New Habit
              </h5>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  NAME
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="habitName"
                  placeholder="Enter habit name"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
