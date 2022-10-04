import React from 'react';

import Lottie from 'react-lottie';

import lottieLoading from './lottie-loading.json';

import styles from './index.module.css';

const Loading = React.memo(() => {
  return (
    <div className={styles.loadingContainer}>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: lottieLoading,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        }}
      />
      <h2 className={styles.loadingText}>Loading...</h2>
    </div>
  );
});

export default Loading;
