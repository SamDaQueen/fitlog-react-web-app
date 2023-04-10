import { Route, Routes } from "react-router";
import ExploreComponent from "./explore";
import Header from "./header";
import HomeComponent from "./home";
import NavigationBar from "./navigation-bar";
import ProfileComponent from "./profile";

const FitLog = () => {
  return (
    <div className="row">
      <Header />
      <div className="col-2 col-md-2 col-lg-1 col-xl-2">
        <NavigationBar />
      </div>
      <div className="col-10 col-md-10 col-lg-9 col-xl-8">
        <Routes>
          <Route index element={<HomeComponent />} />
          <Route path="home" element={<HomeComponent />} />
          <Route path="explore" element={<ExploreComponent />} />
          <Route path="profile" element={<ProfileComponent />} />
          <Route path="edit-profile" element={<h2>Hello</h2>} />
        </Routes>
      </div>
      <div className="d-sm-none d-md-none d-lg-block col-lg-2 col-xl-2">
        <h2>Right Content</h2>
      </div>
    </div>
  );
};
export default FitLog;
