'use client'

import { motion, AnimatePresence, Variants } from 'framer-motion';
import React from 'react';

const pageVariants: Variants = {
  initial: {
    opacity: 0,
    x: -100,
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: 100,
  },
};

const pageTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

type TransitionWrapperProps = {
  children: React.ReactNode;
};

const TransitionWrapper: React.FC<TransitionWrapperProps> = ({ children }) => {
  return (
    <AnimatePresence>
      <motion.div
        key={children ? children.toString() : 'no-key'}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default TransitionWrapper;
