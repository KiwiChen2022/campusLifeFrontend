import React, { useState, useEffect, useContext } from "react";
import { getUser, updateUser } from "../../api/user";
import styles from "./UserProfile.module.css";
import CryptoJS from "crypto-js";
import { updateUserImage } from "../../api/user";
import { FaUserCircle } from "react-icons/fa";
import UserImageContext from "../../contexts/UserImageContext";

const UserProfile = () => {
  const userUrl = useContext(UserImageContext);
  let fileInput;
  const [selectedImage, setSelectedImage] = useState(null);

  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    getUser().then((res) => {
      setUser(res.data);
    });
  }, []);

  const handleSave = async () => {
    console.log(password)
    console.log(typeof(password))
    const encryptedPassword = CryptoJS.SHA256(password).toString();
    console.log(encryptedPassword)
    await updateUser({ password: encryptedPassword });
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      alert("No image selected");
      return;
    }
    
    const formData = new FormData();
    formData.append("file", selectedImage);
  
    try {
      const response = await updateUserImage(formData);
      if (response.data) {
        setUser((prevUser) => ({ ...prevUser, image: response.data }));
      } else {
        alert("Image upload failed");
      }
    } catch (error) {
    }
    
    setSelectedImage(null);
  };

  return (
    <div className={styles.userProfile}>
      {userUrl ? (
        <img src={userUrl} alt={user.username} />
      ) : (
        <FaUserCircle size={100} />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
        ref={(input) => (fileInput = input)}
      />
      <button onClick={() => fileInput.click()}>Change Avatar</button>
      {selectedImage && <button onClick={handleImageUpload}>Upload Image</button>}
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
          <p>Password: {'*'.repeat(10)}</p>
          <button onClick={handleEdit}>Edit Password</button>
        </>
      )}
    </div>
  );
};

export default UserProfile;
