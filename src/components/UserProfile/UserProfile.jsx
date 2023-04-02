import React from "react";
import { FaUserCircle } from "react-icons/fa";

function UserProfile() {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    status: "Online",
  };

  return (
    <div>
      <FaUserCircle size={80} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>Status: {user.status}</p>
    </div>
  );
}

export default UserProfile;
