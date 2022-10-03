import { useCallback, useEffect, useState } from 'react';

import { AxiosResponse } from 'axios';

import { setAppLoading } from 'Redux/Slices/appSlice';
import { showSnackbar } from 'Redux/Slices/snackbarSlice';

import { deleteActivity } from 'Clients/activity/delete';
import { getListActivities } from 'Clients/activity/list';

import { Activity } from 'Shared/Types/Activity';
import { FetchData } from 'Shared/Types/FetchData';

import { useAppDispatch } from './../../Redux/hooks';

export const useActivitiesList = () => {
  const dispatch = useAppDispatch();

  const [allActivities, setAllActivities] = useState<FetchData<Activity[]>>({
    shouldFetchData: true,
    data: [],
  });

  const getAllActivitiesList = useCallback(async () => {
    dispatch(setAppLoading(true));
    await getListActivities()
      .then((res: AxiosResponse) => {
        setAllActivities({
          shouldFetchData: false,
          data: res.data,
        });
      })
      .finally(() => dispatch(setAppLoading(false)));
  }, [dispatch]);

  const triggerFetchAllActivities = () =>
    setAllActivities((prev: FetchData<Activity[]>) => ({ ...prev, shouldFetchData: true }));

  useEffect(() => {
    if (allActivities.shouldFetchData) {
      getAllActivitiesList();
    }
  }, [allActivities.shouldFetchData, dispatch, getAllActivitiesList]);

  return {
    allActivities: allActivities.data,
    triggerFetchAllActivities,
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
    await deleteActivity(taskId)
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
