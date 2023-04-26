import React, { useState, useEffect } from "react";
import { getList, addApply, getApplys, agreeFriend } from "../../api/friend";
import { getUserByUserName } from "../../api/user";
import styles from "./Friend.module.css";

function Friend() {
  const [friends, setFriends] = useState([]);
  const [applys, setApplys] = useState([]);
  const [friendUsername, setFriendUsername] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);

  useEffect(() => {
    fetchFriends();
    fetchApplys();
  }, []);

  const fetchFriends = async () => {
    const response = await getList();
    setFriends(response.data);
  };

  const fetchApplys = async () => {
    const response = await getApplys();
    setApplys(response.data);
  };

  const handleSearchUser = async () => {
    const response = await getUserByUserName({ username: friendUsername });
    setSearchedUser(response.data);
  };

  const handleAddApply = async (id) => {
    if (searchedUser) {
      await addApply({ tid: id });
      setFriendUsername("");
      setSearchedUser(null);
    }
  };

  const handleAgreeFriend = async (apply) => {
    await agreeFriend({ fid: apply.id });
    fetchFriends();
    fetchApplys();
  };

  const isUrl = (url) => {
    const pattern = new RegExp(
      '^https?:\\/\\/' // protocol (http or https)
    );
    return !!pattern.test(url);
  };
  
  
  const getImageUrl = (imageUrl) => {
    const baseUrl = "http://127.0.0.1:8081/ipfs/";
    return isUrl(imageUrl) ? imageUrl : baseUrl + imageUrl;
  };


  return (
    <div className={styles.friendContainer}>
      <h2 className={styles.title}>Friends</h2>
      <ul className={styles.friendList}>
        {friends.map((friend) => (
          <li key={friend.id} className={styles.friendListItem}>
            <img
              src={getImageUrl(friend.image)}
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
        <button className={styles.addFriendButton} onClick={handleSearchUser}>
          Search
        </button>
      </div>
      {searchedUser && (
        <div className={styles.searchResult}>
          <img
            src={getImageUrl(searchedUser.image)}
            alt={searchedUser.username}
            className={styles.friendImage}
          />
          {searchedUser.username}
          <button className={styles.addFriendButton} onClick={()=>handleAddApply(searchedUser.id)}>
            Add 
          </button>
        </div>
      )}

      <h2 className={styles.title}>New Friends</h2>
      <ul className={styles.applyList}>
        {applys.map((apply) => (
                    <li key={apply.id} className={styles.applyListItem}>
                    <img
                        src={getImageUrl(apply.image)}
                        alt={apply.username}
                        className={styles.friendImage}
                      />
                    {apply.username}
                    <button className={styles.addFriendButton} onClick={() => handleAgreeFriend(apply)}>Accept</button>
                    </li>
                    ))}
        </ul>
    </div>
);
}

export default Friend;
