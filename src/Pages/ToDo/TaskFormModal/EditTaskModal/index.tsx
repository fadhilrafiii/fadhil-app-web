import React from 'react';

import DateTimePicker from 'Components/DateTimePicker';
import InputEntry from 'Components/InputEntry';
import Modal from 'Components/Modal';
import RadioGroup from 'Components/RadioGroup';
import Select from 'Components/Select';
import TextInput, { TextInputSize } from 'Components/TextInput';

import {
  TASK_DIFFICULTY_OPTIONS,
  TASK_PRIORITY_OPTIONS,
  TASK_TYPE_OPTIONS,
} from 'Shared/Constants/Task';
import { OptionValue } from 'Shared/Types/Option';
import { Task } from 'Shared/Types/Task';

import SubTaskField from '../SubtaskField';
import { useEditTaskForm } from './utils';

import styles from '../index.module.css';

interface EditTaskModalProps {
  initialData: Task;
  isDeletingTask?: boolean;
  isOpen: boolean;
  actionDeleteTask: () => void;
  onCloseModal: () => void;
  onEditTask: () => void;
}

const EditTaskModal = ({
  initialData,
  isDeletingTask = false,
  isOpen,
  actionDeleteTask,
  onCloseModal,
  onEditTask,
}: EditTaskModalProps) => {
  const {
    isLoading,
    taskEntries,
    handleChangeTextInputField,
    handleChangeDateTimeField,
    handleChangeSelectField,
    handleChangeRadioField,
    handleOnBlurField,
    actionClickEditTask,
    actionAddSubTask,
    actionRemoveSubTask,
  } = useEditTaskForm({ initialData, onEditTask: onEditTask });

  const { name, description, difficulty, priority, subTask, schedule, deadline, isHabit } =
    taskEntries;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onCloseModal={onCloseModal}
        title="Edit Task"
        primaryButtonTitle="Edit"
        secondaryButtonTitle="Cancel"
        leftButtonTitle="Delete"
        primaryButtonLoading={isLoading}
        leftButtonLoading={isDeletingTask}
        onPrimaryButtonClick={actionClickEditTask}
        onSecondaryButtonClick={onCloseModal}
        onLeftButtonClick={actionDeleteTask}
      >
        <InputEntry
          label="Name"
          required={name.required}
          errorMessage={name.errorMessage}
          onBlur={() => handleOnBlurField('name')}
        >
          <TextInput
            inputSize={TextInputSize.Small}
            value={name.value}
            name="name"
            onChange={handleChangeTextInputField}
            isFullwidth
          />
        </InputEntry>
        <InputEntry
          label="Description"
          required={description.required}
          errorMessage={description.errorMessage}
          onBlur={() => handleOnBlurField('description')}
        >
          <TextInput
            inputSize={TextInputSize.Small}
            numOfLines={2}
            value={description.value}
            name="description"
            onChange={handleChangeTextInputField}
            isFullwidth
          />
        </InputEntry>
        <InputEntry
          label="Difficulty"
          required={difficulty.required}
          errorMessage={difficulty.errorMessage}
          onBlur={() => handleOnBlurField('difficulty')}
        >
          <Select
            value={difficulty.value}
            options={TASK_DIFFICULTY_OPTIONS}
            onSelectValue={(value: OptionValue) => handleChangeSelectField('difficulty', value)}
          />
        </InputEntry>
        <InputEntry
          label="Priority"
          required={priority.required}
          errorMessage={priority.errorMessage}
          onBlur={() => handleOnBlurField('priority')}
        >
          <Select
            value={priority.value}
            options={TASK_PRIORITY_OPTIONS}
            onSelectValue={(value: OptionValue) => handleChangeSelectField('priority', value)}
          />
        </InputEntry>
        <InputEntry
          label="Schedule"
          required={schedule.required}
          errorMessage={schedule.errorMessage}
          onBlur={() => handleOnBlurField('schedule')}
        >
          <DateTimePicker
            name="schedule"
            value={schedule.value}
            handleChangeDateTime={(date: Date) => handleChangeDateTimeField('schedule', date)}
            format="yyyy-MM-dd"
          />
        </InputEntry>
        <InputEntry label="Deadline" required={deadline.required}>
          <DateTimePicker
            name="deadline"
            value={deadline.value}
            handleChangeDateTime={(date: Date) => handleChangeDateTimeField('deadline', date)}
            format="yyyy-MM-dd | HH:mm"
          />
        </InputEntry>
        <InputEntry label="Subtasks" subLabel="Up to 3 subtasks" required={subTask.required}>
          <SubTaskField
            subTask={subTask.value}
            actionAddSubTask={actionAddSubTask}
            actionRemoveSubTask={actionRemoveSubTask}
          />
        </InputEntry>
        <InputEntry label="Task Type" required={isHabit.required}>
          <RadioGroup
            name="isHabit"
            options={TASK_TYPE_OPTIONS}
            isHorizontal
            selectedValue={isHabit.value ? TASK_TYPE_OPTIONS[0].value : TASK_TYPE_OPTIONS[1].value}
            className={styles.taskTypeRadio}
            onChange={handleChangeRadioField}
          />
        </InputEntry>
      </Modal>
    </>
  );
};

export default EditTaskModal;
