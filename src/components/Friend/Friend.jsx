import React, { useState, useEffect } from "react";
import { getList, addApply, getApplications, agreeFriend } from "../../api/friend";
import styles from "./Friend.module.css";

function Friend() {
  const [friends, setFriends] = useState([]);
  const [applications, setApplications] = useState([]);
  const [friendUsername, setFriendUsername] = useState("");

  useEffect(() => {
    fetchFriends();
    fetchApplications();
  }, []);

  const fetchFriends = async () => {
    const response = await getList();
    setFriends(response.data);
  };

  const fetchApplications = async () => {
    const response = await getApplications();
    setApplications(response.data);
  };

  const handleAddApply = async () => {
    await addApply({ username: friendUsername });
    setFriendUsername("");
  };

  const handleAgreeFriend = async (application) => {
    await agreeFriend({ id: application.id });
    fetchFriends();
    fetchApplications();
  };

  return (
    <div className={styles.friendContainer}>
      <h2 className={styles.title}>Friends</h2>
      <ul className={styles.friendList}>
        {friends.map((friend) => (
          <li key={friend.id} className={styles.friendListItem}>
            <img
              src={friend.image}
              alt={friend.username}
              className={styles.friendImage}
            />
            {friend.username}
          </li>
        ))}
      </ul>

      <h2 className={styles.title}>Add Friend</h2>
      <div className={styles.addFriend}>
        <input
          type="text"
          className={styles.addFriendInput}
          placeholder="Username"
          value={friendUsername}
          onChange={(e) => setFriendUsername(e.target.value)}
        />
        <button className={styles.addFriendButton} onClick={handleAddApply}>Add Friend</button>
      </div>

      <h2 className={styles.title}>Friend Applications</h2>
      <ul className={styles.applicationList}>
        {applications.map((application) => (
                    <li key={application.id} className={styles.applicationListItem}>
                    {application.username}
                    <button className={styles.acceptButton} onClick={() => handleAgreeFriend(application)}>Accept</button>
                    </li>
                    ))}
        </ul>
    </div>
);
}

export default Friend;
