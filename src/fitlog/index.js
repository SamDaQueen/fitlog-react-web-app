import { Provider } from "react-redux";
import { Route, Routes } from "react-router";
import store from "../redux/store";
import CurrentUserContext from "./components/current-user/current-user-context";
import Header from "./components/header";
import NavigationBar from "./components/navigation-bar";
import DetailsScreen from "./screens/details";
import ExploreScreen from "./screens/explore";
import HomeScreen from "./screens/home";
import LoginScreen from "./screens/login";
import MyPlanComponent from "./screens/my-plan";
import ProfileScreen from "./screens/profile";
import RegisterScreen from "./screens/register";

const FitLog = () => {
  return (
    <Provider store={store}>
      <CurrentUserContext>
        <div className="row">
          <Header />
          <div className="col-2 col-md-2 col-lg-1 col-xl-2">
            <NavigationBar />
          </div>
          <div className="col-10 col-md-10 col-lg-9 col-xl-8">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="home" element={<HomeScreen />} />
              <Route path="search" element={<ExploreScreen />} />
              <Route path="exercise/:id" element={<DetailsScreen />} />
              <Route path="search/:searchTerm" element={<ExploreScreen />} />
              <Route path="my-plan" element={<MyPlanComponent />} />
              <Route path="profile" element={<ProfileScreen />} />
              <Route path="login" element={<LoginScreen />} />
              <Route path="register" element={<RegisterScreen />} />
              <Route path="edit-profile" element={<h2>Hello</h2>} />
            </Routes>
          </div>
          <div className="d-sm-none d-md-none d-lg-block col-lg-2 col-xl-2">
            <h2>Right Content</h2>
          </div>
        </div>
      </CurrentUserContext>
    </Provider>
  );
};
export default FitLog;
