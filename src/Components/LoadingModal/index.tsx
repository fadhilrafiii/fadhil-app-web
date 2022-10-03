import React from 'react';

import Lottie from 'react-lottie';

import lottieLoadingAnimation from './loading-animation.json';

import styles from './index.module.css';

interface LoadingModalProps {
  isOpen: boolean;
}

const LoadingModal = ({ isOpen }: LoadingModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.loadingContainer}>
          <Lottie
            className={styles.loadingSpinner}
            options={{
              loop: true,
              autoplay: true,
              animationData: lottieLoadingAnimation,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              },
            }}
          />
        </div>
        <h2 className={styles.loadingText}>
          Loading<span>.</span>
          <span>.</span>
          <span>.</span>
        </h2>
      </div>
    </div>
  );
};

export default LoadingModal;
