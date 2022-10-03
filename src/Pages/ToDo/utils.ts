import { useCallback, useEffect, useState } from 'react';

import { AxiosResponse } from 'axios';

import { useAppDispatch, useAppSelector } from 'Redux/hooks';
import { setAppLoading } from 'Redux/Slices/appSlice';
import { showSnackbar } from 'Redux/Slices/snackbarSlice';
import { setAllTasks, setSectionTasks, taskSelector, triggerFetch } from 'Redux/Slices/taskSlice';

import { deleteTask } from 'Clients/task/delete';
import { getTasks } from 'Clients/task/list';

export const useTaskList = () => {
  const { shouldFetchData, section, sectionTasks, tasks } = useAppSelector(taskSelector);
  const dispatch = useAppDispatch();

  const getSectionTasks = useCallback(async () => {
    dispatch(setAppLoading(true));
    await getTasks({ type: section })
      .then((res: AxiosResponse) => dispatch(setSectionTasks(res.data)))
      .finally(() => dispatch(setAppLoading(false)));
  }, [dispatch, section]);

  const getAllTasks = useCallback(async () => {
    dispatch(setAppLoading(true));
    await getTasks()
      .then((res: AxiosResponse) => dispatch(setAllTasks(res.data)))
      .finally(() => dispatch(setAppLoading(false)));
  }, [dispatch]);

  const triggerFetchTasks = () => dispatch(triggerFetch());

  useEffect(() => {
    if (shouldFetchData) {
      getAllTasks();
      getSectionTasks();
    }
  }, [dispatch, getAllTasks, getSectionTasks, shouldFetchData]);

  return {
    sectionTasks,
    tasks,
    triggerFetchTasks,
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
