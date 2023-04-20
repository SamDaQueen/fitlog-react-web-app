import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { profileThunk } from "../../../services/users/users-thunks";

const CurrentUserContext = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profileThunk())
      .unwrap()
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return children;
};
export default CurrentUserContext;
