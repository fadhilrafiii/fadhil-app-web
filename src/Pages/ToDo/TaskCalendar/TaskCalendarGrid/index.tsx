import React from 'react';

import { Task } from 'Shared/Types/Task';

import styles from './index.module.css';

interface TaskCalendarGrid {
  data: Task[];
}

const TaskCalendarGrid: React.FC<{ data: Task[] }> = ({ data }: TaskCalendarGrid) => {
  if (!data?.length) return null;

  return (
    <div className={styles.taskChipContainer}>
      {data.map((task: Task) => (
        <div key={task._id} className={styles.taskChip}>
          {task.name}
        </div>
      ))}
    </div>
  );
};

export default TaskCalendarGrid;
