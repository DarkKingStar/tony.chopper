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
    }, { threshold: 0.5 });

    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (<><img ref={imgRef} src={isVisible ? src : 'https://w0.peakpx.com/wallpaper/567/864/HD-wallpaper-blur-iphone-blurred.jpg'} alt={alt} /></>);
};

export default LazyImage;
