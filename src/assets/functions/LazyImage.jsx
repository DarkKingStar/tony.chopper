import React, { useRef, useEffect, useState } from 'react';

const LazyImage = ({ src, alt }) => {
  const imgRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (<><img ref={imgRef} src={isVisible ? src : ''} alt={alt} /></>);
};

export default LazyImage;
