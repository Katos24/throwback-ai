import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      console.log('Scroll position:', window.pageYOffset);
      setVisible(window.pageYOffset > 100);
    };
    window.addEventListener('scroll', onScroll);
    console.log('Scroll event listener attached');
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  console.log('ScrollToTop button visible');

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        padding: 10,
        backgroundColor: 'blue',
        color: 'white',
        borderRadius: 5,
        border: 'none',
        cursor: 'pointer',
        zIndex: 1000,
      }}
    >
      Scroll Up
    </button>
  );
}
