import React, { useState, useEffect } from "react";
import { getUser, updateUser } from "../../api/user";
import styles from "./UserProfile.module.css";

import { FaUserCircle } from "react-icons/fa";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    getUser().then((res) => {
      setUser(res.data);
      setUsername(res.data.username);
      setPassword(res.data.password);
      setImage(res.data.image);
    });
  }, []);

  const handleSave = async () => {
    await updateUser({ username, password, image });
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
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <h2>{user.username}</h2>
          {user.password && <p>Password: {'*'.repeat(user.password.length)}</p>}
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
    </div>
  );
};






export default UserProfile;
