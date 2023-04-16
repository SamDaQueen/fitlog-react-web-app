import { Provider } from "react-redux";
import { Route, Routes } from "react-router";
import store from "../redux/store";
import DetailsScreen from "./details";
import ExploreScreen from "./explore";
import Header from "./header";
import HomeScreen from "./home";
import LoginScreen from "./login";
import MyPlanComponent from "./my-plan";
import NavigationBar from "./navigation-bar";
import ProfileScreen from "./profile";

const FitLog = () => {
  return (
    <Provider store={store}>
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
            <Route path="edit-profile" element={<h2>Hello</h2>} />
          </Routes>
        </div>
        <div className="d-sm-none d-md-none d-lg-block col-lg-2 col-xl-2">
          <h2>Right Content</h2>
        </div>
      </div>
    </Provider>
  );
};
export default FitLog;
