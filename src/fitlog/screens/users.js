import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { findAllUsers } from "../../services/users/users-service";
import UserCard from "../components/users/users-card";

const UsersScreen = () => {
  const usersList = useSelector((state) => state.users.users);

  const [users, setUsers] = useState(usersList);

  const { currentUser } = useSelector((state) => state.users);

  let admin = false;
  if (currentUser) {
    admin = currentUser.role === "ADMIN";
  }

  const dispatch = useDispatch();

  const findUsers = async () => {
    const users = await findAllUsers();
    console.log(users);
    setUsers(users);
  };

  useEffect(() => {
    findUsers();
  }, [dispatch]);

  return (
    <div>
      {!admin && <h3>Not Authorized</h3>}
      {admin && (
        <>
          <h1>Users</h1>
          <div className="list-group">
            {users.map((user, index) => (
              <Link
                key={index}
                to={"/profile/" + user.username}
                className="list-group-item"
              >
                <UserCard user={user} />{" "}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default UsersScreen;
