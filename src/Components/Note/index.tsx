import React, { ReactNode } from 'react';

import styles from './index.module.css';

interface NoteProps {
  children: ReactNode | ReactNode[];
  color?: string;
  onClickNote?: () => void;
}

const Note = ({ children, color, onClickNote }: NoteProps) => {
  return (
    <div className={styles.container} style={{ backgroundColor: color }} onClick={onClickNote}>
      {children}
    </div>
  );
};

export default Note;
