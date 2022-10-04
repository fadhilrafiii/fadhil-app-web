import React, { useCallback, useMemo, useState } from 'react';

import Button, { ButtonTheme, ButtonType } from 'Components/Button';
import Icon from 'Components/Icon';
import ConfirmationModal, { ConfirmationModalType } from 'Components/Modal/ConfirmationModal';

import { TASK_SECTION_OPTIONS_LABEL } from 'Shared/Contants/Task';
import { IconName } from 'Shared/Types/Icon';
import { Task } from 'Shared/Types/Task';

import ChooseSectionModal from './ChooseSectionModal';
import AllTask from './TaskCalendar';
import CreateTaskModal from './TaskFormModal/CreateTaskModal';
import EditTaskModal from './TaskFormModal/EditTaskModal';
import TaskSlider from './TaskSlider';
import { useDeleteTask, useTaskList } from './utils';

import styles from './index.module.css';

const ToDo = () => {
  const { section, tasks, sectionTasks, triggerFetchTasks } = useTaskList();
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [isChooseSectionTaskModalOpen, setIsChooseSectionTaskModalOpen] = useState(false);
  const [openedTaskId, setOpenedTaskId] = useState<string | null>(null);

  const actionOpenChooseSectionTaskModal = () => setIsChooseSectionTaskModalOpen(true);
  const actionCloseChooseSectionTaskModal = () => setIsChooseSectionTaskModalOpen(false);
  const actionOpenCreateTaskModal = () => setIsCreateTaskModalOpen(true);
  const actionCloseCreateTaskModal = () => {
    setIsCreateTaskModalOpen(false);
    setOpenedTaskId(null);
  };
  const actionCloseEditTaskModal = () => {
    setIsEditTaskModalOpen(false);
    setOpenedTaskId(null);
  };
  const onChangeDataCallback = () => {
    triggerFetchTasks();
    actionCloseCreateTaskModal();
  };

  const actionClickTask = useCallback(async (taskId: string) => {
    setOpenedTaskId(taskId);
    setIsEditTaskModalOpen(true);
  }, []);

  const openedTask = useMemo(
    () => tasks.find((task: Task) => task._id === openedTaskId),
    [openedTaskId, tasks],
  );

  const {
    isLoading: isLoadingDeleteTask,
    isOpenConfirmationModal,
    actionDeleteTask,
    actionConfirmDeleteTask,
    actionCloseDeleteConfirmationModal,
  } = useDeleteTask({ onDeleteTask: onChangeDataCallback });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1>To Do</h1>
            <h5 className={styles.subtitle}>Manage your work here!</h5>
          </div>
          <div className={styles.headerButtonGroup}>
            <Button
              buttonType={ButtonType.Filled}
              theme={ButtonTheme.Secondary}
              onClick={actionOpenChooseSectionTaskModal}
            >
              <Icon name={IconName.Filter} />
              Choose Section
            </Button>
            <Button
              buttonType={ButtonType.Filled}
              theme={ButtonTheme.Primary}
              onClick={actionOpenCreateTaskModal}
            >
              <Icon name={IconName.Add} />
              Add New Task
            </Button>
          </div>
        </div>
        <br />
        <div className={styles.content}>
          <TaskSlider
            title={TASK_SECTION_OPTIONS_LABEL[section]}
            tasks={sectionTasks}
            onClickTask={actionClickTask}
          />
          <AllTask />
        </div>
      </div>
      <CreateTaskModal
        isOpen={isCreateTaskModalOpen}
        onCloseModal={actionCloseCreateTaskModal}
        onCreateTask={onChangeDataCallback}
      />
      <ChooseSectionModal
        isOpen={isChooseSectionTaskModalOpen}
        onCloseModal={actionCloseChooseSectionTaskModal}
      />
      {openedTask && (
        <EditTaskModal
          isOpen={isEditTaskModalOpen}
          initialData={openedTask}
          isDeletingTask={isLoadingDeleteTask}
          actionDeleteTask={actionDeleteTask}
          onCloseModal={actionCloseEditTaskModal}
          onEditTask={onChangeDataCallback}
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
