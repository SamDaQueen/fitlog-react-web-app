import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createActivityThunk } from "../../../services/activities/activities-thunk";

const NewActivityComponent = () => {
  let [activity, setActivity] = useState("");
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);
  const handleSubmit = () => {
    if (activity === "") {
      return;
    }
    const newActivity = {
      message: activity,
      username: currentUser.username,
      date: new Date().getTime(),
    };
    setActivity("");
    dispatch(createActivityThunk(newActivity));
  };

  return (
    <div className="row">
      <div className="col-10">
        <textarea
          value={activity}
          placeholder="Have something to share?"
          className="form-control"
          onChange={(event) => setActivity(event.target.value)}
        ></textarea>
      </div>
      <div className="col-2">
        <div>
          <button
            className="btn btn-primary float-end mt-2 ps-3 pe-3 fw-bold"
            onClick={handleSubmit}
          >
            Post
          </button>
        </div>
      </div>
      <div className="col-12">
        <hr />
      </div>
    </div>
  );
};
export default NewActivityComponent;
