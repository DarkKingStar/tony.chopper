import React from "react";
import { motion } from "framer-motion";

const FadeInFromLeft = ({value}) => {
  return (<>
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.2, delay: 0.3 }} 
    >
      {value}
    </motion.div>
  </>
  );
};

export default FadeInFromLeft;
