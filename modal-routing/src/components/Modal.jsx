import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Modal = () => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  /// disable scrolling when modal open
  const ref = useRef();
  let targetElement = null;

  useEffect(() => {
    targetElement = ref.current;

    disableBodyScroll(targetElement);
    return () => {
      if (targetElement) {
        enableBodyScroll(targetElement);
      }
    };
  }, []);
  // -------------------------------------

  const handleClick = () => {
    navigate('/');
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts/' + id);
        const data = await res.json();

        setPost(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  return (
    <div className='modalContainer' ref={ref}>
      <div className='overlay' onClick={handleClick}></div>
      <div className='modal'>
        {isLoading && <h1 style={{ textAlign: 'center' }}>Loading...........</h1>}
        {post && (
          <div className='modal_content'>
            <div>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
            <button className='btn' onClick={handleClick}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
