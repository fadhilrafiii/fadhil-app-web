import { useCallback, useEffect, useState } from 'react';

import { AxiosResponse } from 'axios';

import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { setAppLoading } from 'Redux/Slices/appSlice';
import { showSnackbar } from 'Redux/Slices/snackbarSlice';
import {
  setCalendarTasks,
  setSectionTasks,
  taskSelector,
  triggerFetchCalendarData,
  triggerFetchSectionData,
} from 'Redux/Slices/taskSlice';

import { deleteTask } from 'Clients/task/delete';
import { getTasks } from 'Clients/task/list';
import { getTasksByType } from 'Clients/task/listByType';

import dayjs from 'Shared/Helpers/datetime';
import { Task } from 'Shared/Types/Task';

export const useSectionTaskList = () => {
  const { shouldFetchSectionData, section, sectionTasks } = useAppSelector(taskSelector);
  const dispatch = useAppDispatch();

  const getSectionTasks = useCallback(async () => {
    dispatch(setAppLoading(true));
    await getTasksByType({ type: section })
      .then((res: AxiosResponse) => dispatch(setSectionTasks(res.data)))
      .finally(() => dispatch(setAppLoading(false)));
  }, [dispatch, section]);

  const triggerFetch = () => dispatch(triggerFetchSectionData());

  useEffect(() => {
    if (shouldFetchSectionData) {
      getSectionTasks();
    }
  }, [dispatch, getSectionTasks, shouldFetchSectionData]);

  return {
    section,
    sectionTasks,
    triggerFetch,
  };
};

interface UseCalendarTaskListParams {
  month: number;
  year: number;
}

export const useCalendarTaskList = ({ month, year }: UseCalendarTaskListParams) => {
  const { shouldFetchCalendarData, calendarTasks } = useAppSelector(taskSelector);
  const dispatch = useAppDispatch();

  const getTasksByMonthYear = useCallback(
    async (month?: number, year?: number) => {
      await getTasks({ month, year }).then((res: AxiosResponse) => {
        const current = `${month}-${year}`;
        const currentTasks = {
          [current]: res.data,
        };
        dispatch(setCalendarTasks(currentTasks));
      });
    },
    [dispatch],
  );

  const getCalendarTasks = useCallback(() => {
    // Fetch for current month
    getTasksByMonthYear(month, year);
    getTasksByMonthYear(month - 1, year);
    getTasksByMonthYear(month + 1, year);
    getTasksByMonthYear(month, year - 1);
    getTasksByMonthYear(month, year + 1);
  }, [getTasksByMonthYear, month, year]);

  const triggerFetch = () => dispatch(triggerFetchCalendarData());

  useEffect(() => {
    if (shouldFetchCalendarData) getCalendarTasks();
  }, [getCalendarTasks, shouldFetchCalendarData]);

  return {
    calendarTasks,
    triggerFetch,
  };
};

interface UseDeleteTaskFormProps {
  onDeleteTask: () => void;
}

export const useDeleteTask = ({ onDeleteTask }: UseDeleteTaskFormProps) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState(false);

  const actionDeleteTask = () => setIsOpenConfirmationModal(true);

  const actionConfirmDeleteTask = async (taskId: string) => {
    setIsLoading(true);
    await deleteTask(taskId)
      .then(() => {
        dispatch(
          showSnackbar({
            text: 'Success delete task!',
          }),
        );
        onDeleteTask();
        setIsOpenConfirmationModal(false);
      })
      .finally(() => setIsLoading(false));
  };

  const actionCloseDeleteConfirmationModal = () => setIsOpenConfirmationModal(false);

  return {
    isLoading,
    isOpenConfirmationModal,
    actionDeleteTask,
    actionConfirmDeleteTask,
    actionCloseDeleteConfirmationModal,
  };
};

export const getTasksByDate = (tasks: Task[]) => {
  const taskByDate: Record<string, Task[]> = {};

  for (const task of tasks) {
    const schedule = dayjs(task.schedule).format('YYYY-MM-DD');

    if (!taskByDate[schedule]) taskByDate[schedule] = [];

    taskByDate[schedule].push(task);
  }

  return taskByDate;
};
