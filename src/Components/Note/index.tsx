import React, { ReactNode } from 'react';

import styles from './index.module.css';

interface NoteProps {
  children: ReactNode | ReactNode[];
  color?: string;
}

const Note = ({ children, color }: NoteProps) => {
  return (
    <div className={styles.container} style={{ backgroundColor: color }}>
      {children}
    </div>
  );
};

export default Note;
