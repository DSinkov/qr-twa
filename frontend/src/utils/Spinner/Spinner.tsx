import React from 'react';
import styles from './Spinner.module.scss';

const Spinner = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <span className={styles.container}>
      <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='22 22 44 44' {...props}>
        <circle
          className={styles.spinner}
          cx={44}
          cy={44}
          r={20.2}
          fill='none'
          strokeWidth={3.6}
          stroke='currentColor'
          strokeDasharray='80px,200px'
        />
      </svg>
    </span>
  );
};

export default Spinner;
