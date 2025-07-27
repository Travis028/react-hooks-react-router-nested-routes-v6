import { useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";

function UserProfile() {
  const { id } = useParams();
  const users = useOutletContext();
  const user = users.find(u => u.id === parseInt(id));

  if (!user) {
    return (
      <div className="loading">
        <h1>Loading user profile...</h1>
      </div>
    );
  }

  if (!user.name) {
    return (
      <div className="error">
        <h1>User not found</h1>
        <p>User with ID {id} does not exist</p>
      </div>
    );
  }

  return (
    <aside className="user-profile">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>{user.role}</p>
    </aside>
  );
}

export default UserProfile;