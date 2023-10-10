import React, { useRef, useEffect, useState } from 'react';
import "./SubHeading.css";

const SubHeading = ({ text }) => {
    const subheadRef = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                } else {
                    setIsInView(false);
                }
            });
        });

        observer.observe(subheadRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div className={`subhead ${isInView ? 'animate' : ''}`} ref={subheadRef}>
            <h1>{text}</h1>
        </div>
    );
}

export default SubHeading;
