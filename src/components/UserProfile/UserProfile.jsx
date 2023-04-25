import React, { useState, useEffect } from "react";
import { getUser, updateUser } from "../../api/user";
import styles from "./UserProfile.module.css";

import { FaUserCircle } from "react-icons/fa";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    getUser().then((res) => {
      setUser(res.data);
      setPassword(res.data.password);
    });
  }, []);

  const handleSave = async () => {
    await updateUser({ password });
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className={styles.userProfile}>
      {user.image ? (
        <img src={user.image} alt={user.username} />
      ) : (
        <FaUserCircle size={100} />
      )}
      {isEditing ? (
        <>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <h2>{user.username}</h2>
          {user.password && <p>Password: {'*'.repeat(user.password.length)}</p>}
          <button onClick={handleEdit}>Edit Password</button>
        </>
      )}
    </div>
  );
};

export default UserProfile;
