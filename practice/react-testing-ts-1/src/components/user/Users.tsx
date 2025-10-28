import { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => setUsers(data.map((user: { name: string }) => user.name)))
      .catch(() => setError('Error to fetch Data'));
  }, []);

  return (
    <div>
      <h1>sers</h1>
      {error && <h2>{error}</h2>}
      <ul>
        {users.map((user, i) => (
          <li key={i}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
