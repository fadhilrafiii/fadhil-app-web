import React from 'react';

import { Activity } from 'Shared/Types/Activity';

import Task from '../Task';

import styles from './index.module.css';

interface TaskSliderProps {
  title?: string;
  tasks: Activity[];
  emptyTaskText?: string;
  onClickTask: (taskId: string) => void;
}

const TaskSlider = ({
  title,
  tasks,
  emptyTaskText = 'No task for this section',
  onClickTask,
}: TaskSliderProps) => {
  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <br />
      <div className={styles.taskSlider}>
        {tasks.length > 0 ? (
          tasks.map((task: Activity) => (
            <Task key={task._id} task={task} onClickTask={onClickTask} />
          ))
        ) : (
          <div className={styles.emptyTask}>{emptyTaskText}</div>
        )}
      </div>
    </div>
  );
};

export default TaskSlider;
