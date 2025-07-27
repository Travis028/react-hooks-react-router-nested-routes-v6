
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:4000/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setError(null);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading users...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h1>Error: {error}</h1>
        <p>Please check if the JSON server is running on http://localhost:4000</p>
      </div>
    );
  }

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet context={users} />
      </main>
    </>
  );
}

export default App;
