import React from 'react';

import Lottie from 'react-lottie';

import styles from './index.module.css';

interface UnderConstructionProps {
  title?: string;
}

const UnderConstruction = ({ title }: UnderConstructionProps) => {
  return (
    <>
      {title && <h1 className={styles.title}>{title}</h1>}
      <div className={styles.container}>
        <div className={styles.lottie}>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              path: 'https://assets10.lottiefiles.com/private_files/lf30_y9czxcb9.json',
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              },
            }}
          />
        </div>
        <h2 className={styles.description}>This feature is under development!</h2>
      </div>
    </>
  );
};

export default UnderConstruction;
