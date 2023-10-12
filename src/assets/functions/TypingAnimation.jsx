import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TypingAnimation = ({incomingtext}) => {
  const text = incomingtext;
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(prevText => prevText + text[i]);
      i++;
      if (i === text.length-1) clearInterval(interval);
    }, 0); // Adjust the interval to control typing speed
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {displayText}
    </motion.div>
  );
};

export default TypingAnimation;
