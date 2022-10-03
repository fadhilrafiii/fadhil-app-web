import React, { useState } from 'react';

import DateTimePicker from 'Components/DateTimePicker';
import Icon from 'Components/Icon';
import InputEntry from 'Components/InputEntry';
import Modal from 'Components/Modal';
import RadioGroup from 'Components/RadioGroup';
import Select from 'Components/Select/Select';
import TextInput, { TextInputSize } from 'Components/TextInput';

import {
  ACTIVITY_DIFFICULTY_OPTIONS,
  ACTIVITY_PRIORITY_OPTIONS,
  ACTIVITY_TYPE_OPTIONS,
} from 'Shared/Contants/Activity';
import { Colors } from 'Shared/Types/Colors';
import { IconName } from 'Shared/Types/Icon';
import { OptionValue } from 'Shared/Types/Option';

import SubTaskField from '../SubtaskField';
import { useCreateTaskForm } from './utils';

import styles from '../index.module.css';

interface CreateTaskModalProps {
  isOpen: boolean;
  onCloseModal: () => void;
  onCreateTask: () => void;
}

const CreateTaskModal = ({ isOpen, onCloseModal, onCreateTask }: CreateTaskModalProps) => {
  const {
    taskEntries,
    handleChangeTextInputField,
    handleChangeDateTimeField,
    handleChangeSelectField,
    handleChangeRadioField,
    handleSubmitCreateTaskForm,
    actionAddSubTask,
    actionRemoveSubTask,
  } = useCreateTaskForm({ onCreateTask });

  const [showOptionalFields, setShowOptionalFields] = useState(false);

  const actionToggleShowOptionalField = () => setShowOptionalFields((prev: boolean) => !prev);

  const { name, description, difficulty, priority, subTask, schedule, deadline, isHabit } =
    taskEntries;
  console.log(deadline.value, typeof deadline.value);

  return (
    <Modal
      isOpen={isOpen}
      onCloseModal={onCloseModal}
      title="Create Task"
      primaryButtonTitle="Create"
      secondaryButtonTitle="Cancel"
      onPrimaryButtonClick={handleSubmitCreateTaskForm}
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
          value={difficulty.value}
          options={ACTIVITY_DIFFICULTY_OPTIONS}
          onSelectValue={(value: OptionValue) => handleChangeSelectField('difficulty', value)}
        />
      </InputEntry>
      <InputEntry label="Priority" required={priority.required}>
        <Select
          value={priority.value}
          options={ACTIVITY_PRIORITY_OPTIONS}
          onSelectValue={(value: OptionValue) => handleChangeSelectField('priority', value)}
        />
      </InputEntry>
      {showOptionalFields && (
        <>
          <InputEntry label="Subtasks" subLabel="Up to 3 subtasks" required={subTask.required}>
            <SubTaskField
              subTask={subTask.value}
              actionAddSubTask={actionAddSubTask}
              actionRemoveSubTask={actionRemoveSubTask}
            />
          </InputEntry>
          <InputEntry label="Schedule" required={schedule.required}>
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
          <InputEntry label="Task Type" required={isHabit.required}>
            <RadioGroup
              name="isHabit"
              options={ACTIVITY_TYPE_OPTIONS}
              isHorizontal
              selectedValue={
                isHabit.value ? ACTIVITY_TYPE_OPTIONS[0].value : ACTIVITY_TYPE_OPTIONS[1].value
              }
              className={styles.activityTypeRadio}
              onChange={handleChangeRadioField}
            />
          </InputEntry>
        </>
      )}
      <div className={styles.showOptional} role="button" onClick={actionToggleShowOptionalField}>
        {showOptionalFields ? 'Hide' : 'Show'} optional fields
        <Icon
          name={showOptionalFields ? IconName.ArrowDropUp : IconName.ArrowDropDown}
          color={Colors.GreyDark}
        />
      </div>
    </Modal>
  );
};

export default CreateTaskModal;
