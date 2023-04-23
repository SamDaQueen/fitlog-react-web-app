import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  findAllUsers,
  findUsersByRole,
} from "../../../services/users/users-service";
import UserCard from "../../components/users/users-card";

const UsersScreen = () => {
  const usersList = useSelector((state) => state.users.users);

  const [users, setUsers] = useState(usersList);
  const [trainers, setTrainers] = useState([]);

  const { currentUser } = useSelector((state) => state.users);

  let admin = false;
  if (currentUser) {
    admin = currentUser.role === "ADMIN";
  }
  const loadTrainers = async () => {
    const trainers = await findUsersByRole("TRAINER");
    setTrainers(trainers);
  };

  useEffect(() => {
    loadTrainers();
  }, []);

  const dispatch = useDispatch();

  const findUsers = async () => {
    const users = await findAllUsers();
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
              <UserCard user={user} trainers={trainers} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default UsersScreen;
