import React, { useState } from 'react';

import Button, { ButtonTheme, ButtonType } from 'Components/Button';
import Icon from 'Components/Icon';

import { IconName } from 'Shared/Types/Icon';

import AllTask from './AllTask';
import { MOCK_TASKS } from './constants';
import CreateTaskModal from './CreateTaskModal';
import TaskSlider from './TaskSlider';

import styles from './index.module.css';

const ToDo = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const actionOpenCreateModal = () => setIsCreateModalOpen(true);
  const actionCloseCreateModal = () => setIsCreateModalOpen(false);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1>To Do</h1>
            <h5 className={styles.subtitle}>Manage your work here!</h5>
          </div>
          <Button
            buttonType={ButtonType.Filled}
            theme={ButtonTheme.Primary}
            onClick={actionOpenCreateModal}
          >
            <Icon name={IconName.Add} />
            Add New Task
          </Button>
        </div>
        <br />
        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <TaskSlider title="Today Task" tasks={MOCK_TASKS} />
            <TaskSlider title="Recommended Task" tasks={MOCK_TASKS} />
          </div>
          <AllTask />
        </div>
      </div>
      <CreateTaskModal isOpen={isCreateModalOpen} onCloseModal={actionCloseCreateModal} />
    </>
  );
};

export default ToDo;
