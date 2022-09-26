import React from 'react';

interface LoadingSpinnerProps {
  color?: string;
  radius?: number;
  strokeWidth?: number;
}

const LoadingSpinner = ({ color = '#fff', radius = 20, strokeWidth = 8 }: LoadingSpinnerProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{ margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto' }}
      width={radius}
      height={radius}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        r={2 * radius}
        strokeWidth={strokeWidth}
        stroke={color}
        strokeDasharray="50.26548245743669 50.26548245743669"
        fill="none"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          keyTimes="0;1"
          values="0 50 50;360 50 50"
        ></animateTransform>
      </circle>
    </svg>
  );
};

export default LoadingSpinner;
