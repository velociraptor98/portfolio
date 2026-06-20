import { forwardRef } from 'react';
import { classes } from 'utils/style';
import styles from './Monogram.module.css';

export const Monogram = forwardRef(({ className, ...props }, ref) => {
  return (
    <svg
      ref={ref}
      viewBox="0 0 48 48"
      height="30"
      width="30"
      role="img"
      aria-label="Adwityaa Jha"
      className={classes(styles.monogram, className)}
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="butt"
        strokeLinejoin="miter"
      >
        {/* Enclosing ring */}
        <circle cx="24" cy="24" r="22" />
        {/* Serif "A" */}
        <path d="M14 37 L24 11 L34 37" />
        <path d="M18.2 28 H29.8" />
        <path d="M11 37 H17" />
        <path d="M31 37 H37" />
      </g>
      {/* Accent underline that wipes in on hover/focus */}
      <rect className={styles.highlight} x="15" y="40.5" width="18" height="2" rx="1" />
    </svg>
  );
});

Monogram.displayName = 'Monogram';
