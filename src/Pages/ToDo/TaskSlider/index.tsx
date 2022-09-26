import React from 'react';

import { Activity } from 'Shared/Types/Activity';

import Task from '../Task';

import styles from './index.module.css';

interface TaskSliderProps {
  title?: string;
  tasks: Activity[];
}

const TaskSlider = ({ title, tasks }: TaskSliderProps) => {
  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <br />
      <div className={styles.taskSlider}>
        {tasks.map((task: Activity) => (
          <Task key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskSlider;
