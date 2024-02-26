import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Homepage = () => {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await res.json();

        setPosts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      {isLoading && <h1 style={{ textAlign: 'center' }}>Loading...........</h1>}

      <ul style={{ textAlign: 'center', listStyle: 'none' }}>
        {posts?.map((item) => (
          <li key={item.id} style={{ padding: '.2rem' }}>
            <Link to={`/posts/${item.id}`} state={{ prevLocation: location }}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Homepage;
