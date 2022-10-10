import React, { useCallback, useMemo, useState } from 'react';

import { Dayjs } from 'dayjs';

import Button, { ButtonTheme, ButtonType } from 'Components/Button';
import Icon from 'Components/Icon';
import ConfirmationModal, { ConfirmationModalType } from 'Components/Modal/ConfirmationModal';

import { TASK_SECTION_OPTIONS_LABEL } from 'Shared/Constants/Task';
import dayjs from 'Shared/Helpers/datetime';
import { IconName } from 'Shared/Types/Icon';
import { Task } from 'Shared/Types/Task';

import ChooseSectionModal from './ChooseSectionModal';
import TaskCalendar from './TaskCalendar';
import CreateTaskModal from './TaskFormModal/CreateTaskModal';
import EditTaskModal from './TaskFormModal/EditTaskModal';
import TaskSlider from './TaskSlider';
import { getTasksByDate, useCalendarTaskList, useDeleteTask, useSectionTaskList } from './utils';

import styles from './index.module.css';

const ToDo = () => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const { section, sectionTasks, triggerFetch: triggerFetchSectionTasks } = useSectionTaskList();
  const { calendarTasks, triggerFetch: triggerFetchCalendarTasks } = useCalendarTaskList({
    month: currentDate.month(),
    year: currentDate.year(),
  });
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [isChooseSectionTaskModalOpen, setIsChooseSectionTaskModalOpen] = useState(false);
  const [openedTaskId, setOpenedTaskId] = useState<string | null>(null);

  const setCurrentYear = (year: number) => setCurrentDate((prev: Dayjs) => prev.year(year));

  const setCurrentMonth = (month: number) => {
    setCurrentDate((prev: Dayjs) => prev.month(month));
  };

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
    triggerFetchSectionTasks();
    triggerFetchCalendarTasks();
    actionCloseCreateTaskModal();
  };

  const onMonthOrYearChange = () => triggerFetchCalendarTasks();

  const actionClickTask = useCallback(async (taskId: string) => {
    setOpenedTaskId(taskId);
    setIsEditTaskModalOpen(true);
  }, []);

  const openedTask = useMemo(() => {
    const currentMonthYear = `${currentDate.month()}-${currentDate.year()}`;
    return (
      sectionTasks.find((task: Task) => task._id === openedTaskId) ||
      (calendarTasks[currentMonthYear]?.length > 0 &&
        calendarTasks[currentMonthYear].find((task: Task) => task._id === openedTaskId))
    );
  }, [calendarTasks, currentDate, openedTaskId, sectionTasks]);

  const currentMonth = currentDate.month();
  const currentYear = currentDate.year();
  const currentCalendarTasks = useMemo(() => {
    const currentMonthTasks = calendarTasks[`${currentMonth}-${currentYear}`] || [];
    const prevMonthTasks = calendarTasks[`${(currentMonth - 1) % 12}-${currentYear}`] || [];
    const nextMonthTasks = calendarTasks[`${(currentMonth + 1) % 12}-${currentYear}`] || [];

    const tasksByDate = getTasksByDate([
      ...prevMonthTasks,
      ...currentMonthTasks,
      ...nextMonthTasks,
    ]);

    return tasksByDate;
  }, [calendarTasks, currentMonth, currentYear]);

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
          <TaskCalendar
            currentDate={currentDate}
            setMonth={setCurrentMonth}
            setYear={setCurrentYear}
            onMonthOrYearChange={onMonthOrYearChange}
            currentData={currentCalendarTasks}
          />
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
