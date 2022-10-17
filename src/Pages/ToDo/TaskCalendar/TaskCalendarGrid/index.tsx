import React from 'react';

import { Task } from 'Shared/Types/Task';

import styles from './index.module.css';

interface TaskCalendarGrid {
  data: Task[];
  actionClickData: (taskId: string) => void;
}

const TaskCalendarGrid: React.FC<{ data: Task[]; actionClickData: (taskId: string) => void }> = ({
  actionClickData,
  data,
}: TaskCalendarGrid) => {
  if (!data?.length) return null;

  return (
    <div className={styles.taskChipContainer}>
      {data.map((task: Task) => (
        <div key={task._id} className={styles.taskChip} onClick={() => actionClickData(task._id)}>
          {task.name}
        </div>
      ))}
    </div>
  );
};

export default TaskCalendarGrid;
