import "./SubHeading.css";
import { motion } from "framer-motion";
const SubHeading = ({ text }) => {
    return (
        <motion.div
        initial={{scaleY:0}}
        whileInView={{scaleY:1}}
        viewport={{ once: false }}
        transition={{ease: "easeIn", duration: 0.25}}
        >
        <div className='subhead'>
            <h1>{text}</h1>
        </div>
        </motion.div>
    );
}

export default SubHeading;
