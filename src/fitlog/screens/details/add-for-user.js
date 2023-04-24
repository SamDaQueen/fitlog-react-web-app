import React, { useState } from "react";
import { addToPlan } from "../../../services/plan/plan-service";

const AddForUser = ({ users, details }) => {
  const [selectedUsers, setSelectedUsers] = useState("");

  const handleUserSelect = (userId) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    selectedUsers.map(async (userId) => {
      await addToPlan(userId, details);
    });
    alert("Exercise added to their plans!");
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="mt-3">
        <div>Add this exercise to your users plans</div>
        {users &&
          users.map((user) => (
            <div key={user._id} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={user._id}
                value={user._id}
                checked={selectedUsers.includes(user._id)}
                onChange={(e) => handleUserSelect(e.target.value)}
              />
              <label className="form-check-label" htmlFor={user._id}>
                {user.username}
              </label>
            </div>
          ))}
        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    </>
  );
};
export default AddForUser;
