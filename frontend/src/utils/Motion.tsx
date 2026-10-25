import { motion } from "framer-motion";
import { childrenType } from "../types/common.types";
const Motion = ({ children }: childrenType) => {
  return <motion.div >{children}</motion.div>;
};

export default Motion;
