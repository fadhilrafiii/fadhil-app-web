import React from 'react';

import Button, { ButtonTheme, ButtonType } from 'Components/Button';
import Icon from 'Components/Icon';
import InputEntry from 'Components/InputEntry';
import Modal from 'Components/Modal';
import Select from 'Components/Select/Select';
import { OptionValue } from 'Components/Select/types';
import TextInput, { TextInputSize } from 'Components/TextInput';

import { ACTIVITY_DIFFICULTY_OPTIONS, ACTIVITY_PRIORITY_OPTIONS } from 'Shared/Contants/Activity';
import { Colors } from 'Shared/Types/Colors';
import { IconName } from 'Shared/Types/Icon';

import { useCreateTaskForm } from './utils';

import styles from './index.module.css';

interface CreateTaskModalProps {
  isOpen: boolean;
  onCloseModal: () => void;
}

const CreateTaskModal = ({ isOpen, onCloseModal }: CreateTaskModalProps) => {
  const {
    taskEntry,
    handleChangeTextInputField,
    actionSelectOptionsField,
    actionAddSubtask,
    actionRemoveSubtask,
  } = useCreateTaskForm();

  const { name, description, difficulty, priority, subTask, inputSubTask } = taskEntry;

  const onEnterSubtaskInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') actionAddSubtask();
  };

  return (
    <Modal
      isOpen={isOpen}
      onCloseModal={onCloseModal}
      title="Create Task"
      primaryButtonTitle="Create"
      secondaryButtonTitle="Cancel"
      onPrimaryButtonClick={() => console.log(taskEntry)}
      onSecondaryButtonClick={onCloseModal}
    >
      <InputEntry label="Name" required={name.required}>
        <TextInput
          inputSize={TextInputSize.Small}
          value={name.value}
          name="name"
          onChange={handleChangeTextInputField}
          isFullwidth
        />
      </InputEntry>
      <InputEntry label="Description" required={description.required}>
        <TextInput
          inputSize={TextInputSize.Small}
          numOfLines={2}
          value={description.value}
          name="description"
          onChange={handleChangeTextInputField}
          isFullwidth
        />
      </InputEntry>
      <InputEntry label="Difficulty" required={difficulty.required}>
        <Select
          options={ACTIVITY_DIFFICULTY_OPTIONS}
          onSelectValue={(value: OptionValue) => actionSelectOptionsField('difficulty', value)}
        />
      </InputEntry>
      <InputEntry label="Priority" required={priority.required}>
        <Select
          options={ACTIVITY_PRIORITY_OPTIONS}
          onSelectValue={(value: OptionValue) => actionSelectOptionsField('priority', value)}
        />
      </InputEntry>
      <InputEntry label="Subtasks" subLabel="Up to 3 subtasks" required={subTask.required}>
        <div className={styles.subtask}>
          {subTask.value.length === 0 ? (
            <div className={styles.noSubtask}>No subtask currently</div>
          ) : (
            <ul>
              {subTask.value.map((task: string, index: number) => (
                <li key={index}>
                  <div className={styles.subTaskItem}>
                    {task}{' '}
                    <span
                      className={styles.removeSubtaskIcon}
                      onClick={() => actionRemoveSubtask(index)}
                    >
                      <Icon name={IconName.Close} color={Colors.Destructive} size={18} />
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {subTask.value.length < 3 && (
            <>
              <TextInput
                name="inputSubTask"
                value={inputSubTask.value}
                inputSize={TextInputSize.Small}
                onChange={handleChangeTextInputField}
                onKeyDown={onEnterSubtaskInput}
                className={styles.inputSubtask}
              />
              <Button
                theme={ButtonTheme.Primary}
                buttonType={ButtonType.Outlined}
                className={styles.addSubtaskButton}
                onClick={actionAddSubtask}
              >
                <Icon name={IconName.Add} color={Colors.Primary} size={18} />
                Add
              </Button>
            </>
          )}
        </div>
      </InputEntry>
    </Modal>
  );
};

export default CreateTaskModal;
