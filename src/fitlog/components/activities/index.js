import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findAllActivitiesThunk } from "../../../services/activities/activities-thunk";
import ActivityCard from "./activity-card";
import NewActivityComponent from "./new-activity";

const ActivityList = () => {
  const { activities, loading } = useSelector((state) => state.activities);

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);

  const loadActivities = async () => {
    await dispatch(findAllActivitiesThunk());
  };

  useEffect(() => {
    loadActivities();
  }, [dispatch]);

  return (
    <div className="mt-4">
      <h4>Activities from our users!</h4>
      {!currentUser && <div>Please login to post an activity!</div>}
      <div className="list-group">
        {currentUser && <NewActivityComponent />}
        {loading && <li className="list-group-item">Loading...</li>}
        {!loading &&
          activities.map((activity) => <ActivityCard activity={activity} />)}
      </div>
    </div>
  );
};

export default ActivityList;
