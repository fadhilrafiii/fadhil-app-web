import { useState } from 'react';

import { deleteActivity } from 'Clients/activity/delete';

interface UseDeleteTaskFormProps {
  onDeleteTask: () => void;
}

export const useDeleteTask = ({ onDeleteTask }: UseDeleteTaskFormProps) => {
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState(false);

  const actionDeleteTask = () => setIsOpenConfirmationModal(true);

  const actionConfirmDeleteTask = async (taskId: string) =>
    await deleteActivity(taskId).then(() => {
      onDeleteTask();
      setIsOpenConfirmationModal(false);
    });

  const actionCloseDeleteConfirmationModal = () => setIsOpenConfirmationModal(false);

  return {
    isOpenConfirmationModal,
    actionDeleteTask,
    actionConfirmDeleteTask,
    actionCloseDeleteConfirmationModal,
  };
};
