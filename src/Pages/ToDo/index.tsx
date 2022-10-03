import React, { useCallback, useMemo, useState } from 'react';

import Button, { ButtonTheme, ButtonType } from 'Components/Button';
import Icon from 'Components/Icon';
import ConfirmationModal, { ConfirmationModalType } from 'Components/Modal/ConfirmationModal';

import { Activity } from 'Shared/Types/Activity';
import { IconName } from 'Shared/Types/Icon';

import AllTask from './AllTask';
import CreateTaskModal from './TaskFormModal/CreateTaskModal';
import EditTaskModal from './TaskFormModal/EditTaskModal';
import { useDeleteTask } from './TaskFormModal/utils';
import TaskSlider from './TaskSlider';
import { useActivitiesList } from './utils';

import styles from './index.module.css';

const ToDo = () => {
  const { allActivities, triggerFetchAllActivities } = useActivitiesList();
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [openedTaskId, setOpenedTaskId] = useState<string | null>(null);

  const actionOpenCreateTaskModal = () => setIsCreateTaskModalOpen(true);
  const actionCloseCreateTaskModal = () => {
    setIsCreateTaskModalOpen(false);
    setOpenedTaskId(null);
  };
  const actionCloseEditTaskModal = () => {
    setIsEditTaskModalOpen(false);
    setOpenedTaskId(null);
  };
  const submitFormCallback = () => {
    triggerFetchAllActivities();
    actionCloseCreateTaskModal();
  };

  const actionClickTask = useCallback(async (taskId: string) => {
    setOpenedTaskId(taskId);
    setIsEditTaskModalOpen(true);
  }, []);

  const openedTask = useMemo(
    () => allActivities.find((task: Activity) => task._id === openedTaskId),
    [allActivities, openedTaskId],
  );

  const {
    isOpenConfirmationModal,
    actionDeleteTask,
    actionConfirmDeleteTask,
    actionCloseDeleteConfirmationModal,
  } = useDeleteTask({ onDeleteTask: triggerFetchAllActivities });

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
            onClick={actionOpenCreateTaskModal}
          >
            <Icon name={IconName.Add} />
            Add New Task
          </Button>
        </div>
        <br />
        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <TaskSlider title="Today Task" tasks={allActivities} onClickTask={actionClickTask} />
            <TaskSlider title="Recommended Task" tasks={[]} onClickTask={actionClickTask} />
          </div>
          <AllTask />
        </div>
      </div>
      <CreateTaskModal
        isOpen={isCreateTaskModalOpen}
        onCloseModal={actionCloseCreateTaskModal}
        onCreateTask={submitFormCallback}
      />
      {openedTask && (
        <EditTaskModal
          isOpen={isEditTaskModalOpen}
          initialData={openedTask}
          actionDeleteTask={actionDeleteTask}
          onCloseModal={actionCloseEditTaskModal}
          onEditTask={submitFormCallback}
        />
      )}
      {openedTask && (
        <ConfirmationModal
          isOpen={isOpenConfirmationModal}
          confirmType={ConfirmationModalType.Danger}
          title="Delete Task"
          body="Are you sure want to delete this task?"
          onConfirm={() => actionConfirmDeleteTask(openedTask._id)}
          onCloseModal={actionCloseDeleteConfirmationModal}
        />
      )}
    </>
  );
};

export default ToDo;
