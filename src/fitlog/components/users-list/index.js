import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { findUsersByExerciseId } from "../../../services/exercises/exercises-service";
import "../exercises/index.css";

const UsersList = ({ id }) => {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const users = await findUsersByExerciseId(id);
    setUsers(users);
  };

  useEffect(() => {
    loadUsers();
  }, [id]);

  return (
    <>
      <div className="card mt-3">
        <div className="card-header">
          <h5 className="mb-0">In plans of</h5>
        </div>
        {users.length === 0 && <div className="card-body">No users found</div>}
        {users.length > 0 && (
          <div className="list-group">
            {users.map((user) => (
              <Link
                to={`/profile/${user.username}`}
                className="no-decoration"
                key={user._id}
              >
                <div className="card-body pt-2 pb-2">
                  {user.firstName} {user.lastName} (@{user.username})
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default UsersList;
