import React, { useState } from 'react';

import Button, { ButtonTheme, ButtonType } from 'Components/Button';
import Icon from 'Components/Icon';
import TextInput, { TextInputSize } from 'Components/TextInput';

import { Colors } from 'Shared/Types/Colors';
import { IconName } from 'Shared/Types/Icon';

import styles from './index.module.css';

interface SubTaskFieldProps {
  subTask: string[];
  actionAddSubTask: (newSubTask: string) => void;
  actionRemoveSubTask: (taskIndex: number) => void;
}

const SubTaskField = ({ subTask, actionAddSubTask, actionRemoveSubTask }: SubTaskFieldProps) => {
  const [inputSubTask, setInputSubTask] = useState('');

  const handleChangeInputSubTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSubTask(e.target.value);
  };

  const actionEnterSubTaskInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      actionAddSubTask(inputSubTask);
      setInputSubTask('');
    }
  };

  const actionClickAddSubTaskButton = () => {
    actionAddSubTask(inputSubTask.trim());
    setInputSubTask('');
  };

  return (
    <div className={styles.subtask}>
      {subTask.length === 0 ? (
        <div className={styles.noSubTask}>No subtask currently</div>
      ) : (
        <ul>
          {subTask.map((task: string, index: number) => (
            <li key={index}>
              <div className={styles.subTaskItem}>
                {task}{' '}
                <span
                  className={styles.removeSubTaskIcon}
                  onClick={() => actionRemoveSubTask(index)}
                >
                  <Icon name={IconName.Close} color={Colors.Destructive} size={18} />
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
      {subTask.length < 3 && (
        <>
          <TextInput
            name="inputSubTask"
            value={inputSubTask}
            inputSize={TextInputSize.Small}
            onChange={handleChangeInputSubTask}
            onKeyDown={actionEnterSubTaskInput}
            className={styles.inputSubTask}
          />
          <Button
            theme={ButtonTheme.Primary}
            buttonType={ButtonType.Outlined}
            className={styles.addSubTaskButton}
            onClick={actionClickAddSubTaskButton}
            disabled={inputSubTask.trim().length === 0}
          >
            <Icon name={IconName.Add} color={Colors.Primary} size={18} />
            Add
          </Button>
        </>
      )}
    </div>
  );
};

export default SubTaskField;
