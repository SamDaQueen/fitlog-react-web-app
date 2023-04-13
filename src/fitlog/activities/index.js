import React from "react";
import { useSelector } from "react-redux";
import ActivityCard from "./activity-card";

const ActivityList = () => {
  const activities = useSelector((state) => state.activities);
  const loading = false;
  return (
    <div className="mt-4">
      <h4>Activities from our users!</h4>
      {loading && <li className="list-group-item">Loading...</li>}
      {!loading &&
        activities.map((activity) => <ActivityCard activity={activity} />)}
    </div>
  );
};

export default ActivityList;
