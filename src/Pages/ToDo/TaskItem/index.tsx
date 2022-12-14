import React from 'react';

import Note from 'Components/Note';

import dayjs from 'Shared/Helpers/datetime';
import { Task } from 'Shared/Types/Task';

import { getDifficultyColor, getPriorityColor } from './utils';

import styles from './index.module.css';

interface TaskProps {
  task: Task;
  onClickTask: (taskId: string) => void;
}

const TaskItem = ({ task, onClickTask }: TaskProps) => {
  const priorityColor = getPriorityColor(task.priority);
  const difficultyColor = getDifficultyColor(task.difficulty);

  return (
    <Note color={task.color} onClickNote={() => onClickTask(task._id)}>
      <div className={styles.header}>
        <h4>{task.name}</h4>
        <p className={styles.description}>{task?.description}</p>
      </div>
      <div className={styles.body}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>SubTasks:</div>
          {task.subTask.length > 0 ? (
            <ul>
              {task.subTask.map((task: string, index: number) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
          ) : (
            <div className={styles.emptySubTask}>This task has no subtask!</div>
          )}
        </div>
        <div className={styles.bodyLastLine}>
          <div>
            <span>difficulty:</span>&nbsp;
            <span style={{ backgroundColor: difficultyColor }} className={styles.levelText}>
              {task.difficulty}
            </span>
          </div>
          <div>
            <span>priority:</span>&nbsp;
            <span style={{ backgroundColor: priorityColor }} className={styles.levelText}>
              {task.priority}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div>
          <span>Schedule: </span>&nbsp;
          <span>{task.schedule ? dayjs(task.schedule).format('YYYY/MM/DD') : 'N/A'}</span>
        </div>
        <div>
          <span>Deadline: </span>&nbsp;
          <span>{task.deadline ? dayjs(task.deadline).format('YYYY/MM/DD HH:mm') : 'N/A'}</span>
        </div>
      </div>
    </Note>
  );
};

export default TaskItem;
