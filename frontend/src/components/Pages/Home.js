import React, { useEffect, useState } from 'react';
import userService from '../../services/user';
import authService from '../../services/auth';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading state
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (currentUser && currentUser.token) { // Check if currentUser and token are valid
          const userList = await userService.getUsers(currentUser.token);
          setUsers(userList);
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false); // Set loading to false after fetching users
      }
    };

    fetchUsers();
  }, [currentUser]); // Include currentUser in the dependency array

  const handleDelete = async (id) => {
    try {
      await userService.deleteUser(id, currentUser.token);
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Render loading state while fetching data
  }

  return (
    <div>
      <h2>Home</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name} - {user.mobileNumber}
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
