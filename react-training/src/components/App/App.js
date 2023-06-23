import './App.css';
import React, {useEffect, useState} from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFeatched] = useState(false);

  async function fetchUsers () {
    try {
      setLoading(true)
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const usersData = await res.json();

      setUsers(usersData);
      setLoading(false);
      setFeatched(true);
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <ul>
      {loading ? (
          <div>
            Loading user....
          </div>
      ) : (
          <React.Fragment>
            {users.map(user => {
              return (
                  <li>
                    {user.name}
                  </li>
              )
            })}
          </React.Fragment>
      )}
      {fetched && <div>
        Done fetching
      </div>}
    </ul>
  );
}

export default App;
