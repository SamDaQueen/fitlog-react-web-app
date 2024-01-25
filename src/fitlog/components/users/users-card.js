import React, { useEffect, useState } from "react";
import {
  createTrainerUser,
  deleteTrainerUserByUserId,
  findTrainerByUserId,
} from "../../../services/trainers/trainer-service";

const UserCard = ({ user, trainers }) => {
  const [selectedTrainer, setSelectedTrainer] = useState("");

  const handleTrainerSelection = async (trainerId) => {
    if (trainerId === selectedTrainer) {
      return;
    }
    if (trainerId === "") {
      await deleteTrainerUserByUserId(user._id);
      setSelectedTrainer("");
      return;
    }
    setSelectedTrainer(trainerId);
    await createTrainerUser({ userId: user._id, trainerId });
  };

  const findTrainer = async () => {
    const trainer = await findTrainerByUserId(user._id);
    setSelectedTrainer(trainer.trainerId._id);
  };

  const date = new Date(user.birthdate);

  useEffect(() => {
    findTrainer();
  }, []);

  return (
    <div className="list-group-item">
      <div className="row ">
        <div className="col-lg-6 col-md-5">
          <div className="row">
            <div className="col-xl-3 col-sm-6">
              <strong>Username:</strong>
            </div>
            <div className="col-xl-9 col-sm-6">{user.username}</div>
          </div>
          <div className="row">
            <div className="col-xl-3  col-sm-6">
              <strong>First Name:</strong>
            </div>
            <div className="col-xl-9  col-sm-6">{user.firstName}</div>
          </div>
          <div className="row">
            <div className="col-xl-3 col-sm-6">
              <strong>Last Name:</strong>
            </div>
            <div className="col-xl-9 col-sm-6">{user.lastName}</div>
          </div>
        </div>
        <div className="col-lg-6 col-md-7">
          <div className="row">
            <div className="col-xl-3 col-md-4 col-sm-6">
              <strong>Email:</strong>
            </div>
            <div className="col-xl-9 col-md-8 col-sm-6">{user.email}</div>
          </div>
          <div className="row">
            <div className="col-xl-3 col-md-4 col-sm-6">
              <strong>Birthdate:</strong>
            </div>
            <div className="col-xl-9 col-md-8 col-sm-6">
              <span className="text-muted">
                {date.toLocaleString("en-US", {
                  month: "long",
                  day: "numeric",
                })}
                , {date.getFullYear()}
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-3 col-md-4 col-sm-6">
              <strong>Role:</strong>
            </div>
            <div className="col-xl-9 col-md-8 col-sm-6">{user.role}</div>
          </div>
          {user.role === "USER" && (
            <div className="row">
              <div className="col-xl-3 col-md-4 col-sm-6">
                <strong>Trainer:</strong>
              </div>
              <div className="col-xl-9 col-md-8 col-sm-6">
                <select
                  className="form-select"
                  value={selectedTrainer}
                  onChange={(e) => handleTrainerSelection(e.target.value)}
                >
                  <option value="">Select Trainer</option>
                  {trainers.map((trainer) => (
                    <option key={trainer._id} value={trainer._id}>
                      {trainer.username}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default UserCard;
