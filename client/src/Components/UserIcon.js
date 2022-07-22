const UserIcon = ({ name }) => {
  return (
    <div
      className="userIcon d-flex justify-content-center align-items-center my-2"
      style={{ backgroundColor: "#451A81", color: "white" }}
      title={name}
    >
      {name[0]}
    </div>
  );
};

export default UserIcon;
