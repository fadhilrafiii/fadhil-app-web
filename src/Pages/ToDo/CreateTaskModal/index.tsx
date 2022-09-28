import React, { useState } from 'react';

import Modal from 'Components/Modal';
import TextInput from 'Components/TextInput';

import { ActivityField } from 'Shared/Types/Activity';

import styles from './index.module.css';

interface CreateTaskModalProps {
  isOpen: boolean;
  onCloseModal: () => void;
}

const CreateTaskModal = ({ isOpen, onCloseModal }: CreateTaskModalProps) => {
  const [taskEntry, setTaskEntry] = useState<ActivityField>({
    name: '',
    description: '',
    priority: null,
    deadline: undefined,
    difficulty: null,
    schedule: undefined,
    prerequisites: [],
    subTask: [],
    isHabit: false,
  });

  const handleChangeTextInputField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTaskEntry((prev: ActivityField) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { name, description } = taskEntry;

  return (
    <Modal
      isOpen={isOpen}
      onCloseModal={onCloseModal}
      title="Create Task"
      primaryButtonTitle="Create"
      secondaryButtonTitle="Cancel"
      onPrimaryButtonClick={console.log}
      onSecondaryButtonClick={onCloseModal}
    >
      <div className={styles.inputEntry}>
        <label>Name</label>
        <TextInput value={name} name="name" onChange={handleChangeTextInputField} isFullwidth />
      </div>
      <div className={styles.inputEntry}>
        <label>Description</label>
        <TextInput
          value={description}
          name="description"
          numOfLines={3}
          onChange={handleChangeTextInputField}
          isFullwidth
        />
      </div>
    </Modal>
  );
};

export default CreateTaskModal;
