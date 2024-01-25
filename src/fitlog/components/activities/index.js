import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { findAllActivitiesThunk } from "../../../services/activities/activities-thunk";
import PaginationComponent from "../../pagination";
import ActivityCard from "./activity-card";
import NewActivityComponent from "./new-activity";

const ActivityList = () => {
  const { activities, loading } = useSelector((state) => state.activities);

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const start = (page - 1) * 10;
  const end = start + itemsPerPage;

  const paginatedActivities = activities.slice(start, end);

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);

  const loadActivities = () => {
    dispatch(findAllActivitiesThunk());
  };

  const handlePageChange = (selectedPage) => {
    setPage(selectedPage);
  };

  useEffect(() => {
    loadActivities();
  }, [dispatch]);

  return (
    <div className="mt-4 mb-4">
      <h4>Activities from our users!</h4>
      {!currentUser && <div>Please login to post an activity!</div>}
      <div className="list-group">
        {currentUser && <NewActivityComponent />}
        {loading && <li className="list-group-item">Loading...</li>}
        {!loading && activities.length > 0 && (
          <PaginationComponent
            count={activities.length}
            page={page}
            itemsPerPage={itemsPerPage}
            handlePageChange={handlePageChange}
          />
        )}
        {!loading &&
          paginatedActivities.map((activity) => (
            <Link
              to={`/profile/${activity.username}`}
              className="no-decoration"
            >
              <ActivityCard activity={activity} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ActivityList;
