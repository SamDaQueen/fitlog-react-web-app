import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { profileThunk } from "../../../services/users/users-thunks";

const CurrentUserContext = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profileThunk());
  }, [dispatch]);

  return children;
};
export default CurrentUserContext;
