import React from 'react';

import Note from 'Components/Note';

import { Activity } from 'Shared/Types/Activity';

import { getDifficultyColor, getPriorityColor } from './utils';

import styles from './index.module.css';

interface TaskProps {
  task: Activity;
}

const Task = ({ task }: TaskProps) => {
  const priorityColor = getPriorityColor(task.priority);
  const difficultyColor = getDifficultyColor(task.difficulty);

  return (
    <Note>
      <div className={styles.header}>
        <h4>{`This is task ${task?.name}`}</h4>
      </div>
      <div className={styles.body}>
        <p className={styles.description}>{task?.description}</p>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Subtasks:</div>
          {task.subTask.length > 0 ? (
            <ul>
              {task.subTask.map((task: string, index: number) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
          ) : (
            <div className={styles.emptySubtask}>This task has no subtask!</div>
          )}
        </div>
        <div className={styles.bodyLastLine}>
          <div>
            <span>difficulty:</span>&nbsp;
            <span style={{ color: difficultyColor, fontWeight: 700, textDecoration: 'underline' }}>
              {task.difficulty}
            </span>
          </div>
          <div>
            <span>priority:</span>&nbsp;
            <span style={{ color: priorityColor, fontWeight: 700, textDecoration: 'underline' }}>
              {task.priority}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div>
          <span>Schedule: </span>&nbsp;
          <span>{task.schedule?.toLocaleString()}</span>
        </div>
        <div>
          <span>Deadline: </span>&nbsp;
          <span>{task.schedule?.toLocaleString()}</span>
        </div>
      </div>
    </Note>
  );
};

export default Task;
