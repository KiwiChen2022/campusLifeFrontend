import React, { useState, useEffect } from 'react';
import {getfriends} from "../../api/apply"

const Friend = () => {
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState('');

  const handleAddFriend = () => {
    setFriends([...friends, newFriend]);
    setNewFriend('');
  }

  useEffect(() => {
    getfriends().then(res => {//setFriends(res.data);
        const test = res.data;
        console.log(res.data)
        console.log(typeof(res.data))
        const names = []
        test.map(t => names.push(t.username))
        setFriends(names);
                            }
    );
    console.log(friends);
  },[])

  return (
    <div>
      <h2>Friends</h2>
      <ul>
        {friends.map((friend, index) => (
          <li key={index}>{friend}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Add a new friend"
          value={newFriend}
          onChange={(e) => setNewFriend(e.target.value)}
        />
        <button onClick={handleAddFriend}>Add Friend</button>
      </div>
    </div>
  );
};

export default Friend;
