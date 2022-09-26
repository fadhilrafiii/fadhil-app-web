import React from 'react';

import AllTask from './AllTask';
import { MOCK_TASKS } from './constants';
import TaskSlider from './TaskSlider';

import styles from './index.module.css';

const ToDo = () => {
  return (
    <div className={styles.container}>
      <h1>To Do</h1>
      <h5 className={styles.subtitle}>Manage your work here!</h5>
      <br />
      <div className={styles.content}>
        <div className={styles.contentHeader}>
          <TaskSlider title="Today Task" tasks={MOCK_TASKS} />
          <TaskSlider title="Recommended Task" tasks={MOCK_TASKS} />
        </div>
        <AllTask />
      </div>
    </div>
  );
};

export default ToDo;
