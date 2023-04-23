const UserCard = ({ user }) => {
  return (
    <div className="row">
      <div className="col-lg-6 col-md-5">
        <div className="row">
          <div className="col-xl-3 col-sm-6">
            <strong>Username:</strong>
          </div>
          <div className="col-xl-9 col-sm-6">{user.username}</div>
        </div>
        <div className="row">
          <div className="col-xl-3  col-sm-6">
            <strong>First Name:</strong>
          </div>
          <div className="col-xl-9  col-sm-6">{user.firstName}</div>
        </div>
        <div className="row">
          <div className="col-xl-3 col-sm-6">
            <strong>Last Name:</strong>
          </div>
          <div className="col-xl-9 col-sm-6">{user.lastName}</div>
        </div>
      </div>
      <div className="col-lg-6 col-md-7">
        <div className="row">
          <div className="col-xl-3 col-md-4 col-sm-6">
            <strong>Email:</strong>
          </div>
          <div className="col-xl-9 col-md-8 col-sm-6">{user.email}</div>
        </div>
        <div className="row">
          <div className="col-xl-3 col-md-4 col-sm-6">
            <strong>Birthdate:</strong>
          </div>
          <div className="col-xl-9 col-md-8 col-sm-6">{user.birthdate}</div>
        </div>
        <div className="row">
          <div className="col-xl-3 col-md-4 col-sm-6">
            <strong>Role:</strong>
          </div>
          <div className="col-xl-9 col-md-8 col-sm-6">{user.role}</div>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
