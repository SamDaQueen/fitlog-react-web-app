import { Route, Routes } from "react-router";
import ExploreComponent from "./explore";
import Header from "./header";
import HomeComponent from "./home";
import MyPlanComponent from "./my-plan";
import NavigationBar from "./navigation-bar";
import ProfileComponent from "./profile";
import { Provider } from "react-redux";
import workoutsReducer from "./reducers/workouts-reducer";
import { configureStore } from "@reduxjs/toolkit";
import activitiesReducer from "./reducers/activities-reducer";

const store = configureStore({
  reducer: {
    workouts: workoutsReducer,
    activities: activitiesReducer,
  },
});

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
            <Route path="/" element={<HomeComponent />} />
            <Route path="home" element={<HomeComponent />} />
            <Route path="search/*" element={<ExploreComponent />} />
            <Route path="search/:searchTerm" element={<ExploreComponent />} />
            <Route path="my-plan" element={<MyPlanComponent />} />
            <Route path="profile" element={<ProfileComponent />} />
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
