'use client';
import { motion } from 'framer-motion';

const AnimatedSVG = () => {
  // Variantes para dibujar y desdibujar
  const drawVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: 'spring', duration: 2, bounce: 0 },
        opacity: { duration: 0.5 },
      },
    },
  };

  return (
    <motion.div
      variants={{
        rest: { scale: 1 },
        pulse: {
          scale: 1.05,
          transition: { duration: 0.6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
        },
      }}
      initial='rest'
      animate='pulse'
      style={{ display: 'inline-block' }}
    >
      <svg
        width='150'
        height='150'
        viewBox='0 0 229 229'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip0_99_12)'>
          <rect x='-6' y='-6' width='240' height='240' stroke='black' />
          <motion.path
            d='M138 138L90 90'
            stroke='#FACC14'
            strokeWidth='15'
            strokeLinecap='round'
            strokeLinejoin='round'
            variants={drawVariants}
            initial='hidden'
            animate='visible'
            exit='fade'
          />
          <motion.path
            d='M180.57 208.85C176.82 212.602 171.733 214.71 166.429 214.711C161.124 214.711 156.037 212.605 152.285 208.855C148.534 205.105 146.425 200.018 146.425 194.714C146.424 189.409 148.53 184.322 152.28 180.57L134.61 198.25C130.859 202.002 125.77 204.109 120.465 204.109C115.16 204.109 110.072 202.002 106.32 198.25C102.569 194.499 100.461 189.41 100.461 184.105C100.461 178.8 102.569 173.712 106.32 169.96L169.96 106.32C173.712 102.569 178.8 100.461 184.105 100.461C189.41 100.461 194.499 102.569 198.25 106.32C202.002 110.072 204.109 115.16 204.109 120.465C204.109 125.77 202.002 130.859 198.25 134.61L180.57 152.28C184.322 148.53 189.409 146.424 194.714 146.425C200.018 146.425 205.105 148.534 208.855 152.285C212.605 156.037 214.711 161.124 214.711 166.429C214.71 171.733 212.602 176.82 208.85 180.57L180.57 208.85Z'
            stroke='#FACC14'
            strokeWidth='15'
            strokeLinecap='round'
            strokeLinejoin='round'
            variants={drawVariants}
            initial='hidden'
            animate='visible'
            exit='fade'
          />
          <motion.path
            d='M209 209L195 195'
            stroke='#FACC14'
            strokeWidth='15'
            strokeLinecap='round'
            strokeLinejoin='round'
            variants={drawVariants}
            initial='hidden'
            animate='visible'
            exit='fade'
          />
          <motion.path
            d='M33 33L19 19'
            stroke='#FACC14'
            strokeWidth='15'
            strokeLinecap='round'
            strokeLinejoin='round'
            variants={drawVariants}
            initial='hidden'
            animate='visible'
            exit='fade'
          />
          <motion.path
            d='M58.04 121.68C54.2885 125.431 49.2004 127.539 43.895 127.539C38.5896 127.539 33.5015 125.431 29.75 121.68C25.9985 117.928 23.891 112.84 23.891 107.535C23.891 102.23 25.9985 97.1415 29.75 93.39L47.43 75.72C45.5725 77.5769 43.3674 79.0497 40.9406 80.0544C38.5138 81.0591 35.913 81.576 33.2865 81.5755C27.982 81.5746 22.8952 79.4665 19.145 75.715C17.2881 73.8574 15.8153 71.6523 14.8106 69.2256C13.8059 66.7988 13.289 64.198 13.2895 61.5715C13.2904 56.267 15.3985 51.1802 19.15 47.43L47.43 19.15C51.1802 15.3985 56.267 13.2904 61.5715 13.2895C64.198 13.289 66.7988 13.8059 69.2256 14.8106C71.6523 15.8153 73.8574 17.2881 75.715 19.145C77.5725 21.0019 79.0462 23.2065 80.0517 25.6329C81.0573 28.0593 81.575 30.66 81.5755 33.2865C81.576 35.913 81.0591 38.5138 80.0544 40.9406C79.0497 43.3674 77.5769 45.5725 75.72 47.43L93.39 29.75C97.1415 25.9985 102.23 23.891 107.535 23.891C112.84 23.891 117.928 25.9985 121.68 29.75C125.431 33.5015 127.539 38.5896 127.539 43.895C127.539 49.2004 125.431 54.2885 121.68 58.04L58.04 121.68Z'
            stroke='#FACC14'
            strokeWidth='15'
            strokeLinecap='round'
            strokeLinejoin='round'
            variants={drawVariants}
            initial='hidden'
            animate='visible'
            exit='fade'
          />
        </g>
        <rect x='-5.5' y='-5.5' width='239' height='239' stroke='black' />
        <defs>
          <clipPath id='clip0_99_12'>
            <rect x='-6' y='-6' width='240' height='240' fill='white' />
          </clipPath>
        </defs>
      </svg>
    </motion.div>
  );
};

export default AnimatedSVG;
