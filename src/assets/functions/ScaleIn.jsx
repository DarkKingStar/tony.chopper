import React from "react";
import { motion } from "framer-motion";

const ScaleIn = ({value}) => {
  return (
    <motion.div
      initial={{ scale: 0 }} 
      whileInView={{ scale: 1 }}
      viewport={{ once: false }} 
      transition={{ duration: 0.1,delay:0.3 }} 
    >
      {value}
    </motion.div>
  );
};

export default ScaleIn;
