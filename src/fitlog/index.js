import { Provider } from "react-redux";
import { Route, Routes } from "react-router";
import store from "../redux/store";
import CurrentUserContext from "./components/current-user/current-user-context";
import Header from "./components/header";
import NavigationBar from "./components/navigation-bar";
import EditProfile from "./edit-profile";
import DetailsScreen from "./screens/details";
import ExploreScreen from "./screens/explore";
import HomeScreen from "./screens/home";
import LoginScreen from "./screens/login";
import ProfileScreen from "./screens/profile";
import RegisterScreen from "./screens/register";
import UsersScreen from "./screens/users/users";

const FitLog = () => {
  return (
    <Provider store={store}>
      <CurrentUserContext>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-1 col-lg-2">
              <NavigationBar />
            </div>
            <div className="col-11 col-lg-10 ps-5 ps-lg-1">
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="home" element={<HomeScreen />} />
                <Route path="search" element={<ExploreScreen />} />
                <Route path="details/:id" element={<DetailsScreen />} />
                <Route path="search/:searchTerm" element={<ExploreScreen />} />
                <Route path="profile" element={<ProfileScreen />} />
                <Route path="profile/:username" element={<ProfileScreen />} />
                <Route path="users" element={<UsersScreen />} />
                <Route path="login" element={<LoginScreen />} />
                <Route path="register" element={<RegisterScreen />} />
                <Route path="edit-profile" element={<EditProfile />} />
                <Route
                  path="edit-profile/:username"
                  element={<EditProfile />}
                />
              </Routes>
            </div>
          </div>
        </div>
      </CurrentUserContext>
    </Provider>
  );
};
export default FitLog;
