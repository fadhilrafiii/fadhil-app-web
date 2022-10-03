import React from 'react';

import Button, { ButtonTheme, ButtonType } from 'Components/Button';
import Icon from 'Components/Icon';

import { Colors } from 'Shared/Types/Colors';
import { IconName } from 'Shared/Types/Icon';

import styles from './index.module.css';

export enum ConfirmationModalType {
  Danger = 'danger',
  Warning = 'warning',
}

interface ConfirmationModalProps {
  isOpen: boolean;
  confirmType?: ConfirmationModalType;
  title: string;
  body: string;
  confirmButtonTitle?: string;
  onConfirm: () => void;
  onCloseModal: () => void;
}

const ConfirmationModal = ({
  isOpen,
  confirmType,
  title,
  body,
  onConfirm,
  onCloseModal,
  confirmButtonTitle = 'Yes',
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onCloseModal}>
      <div className={styles.confirmationModalContainer}>
        <div className={styles.confirmationHeader}>
          {confirmType && (
            <Icon
              name={IconName.Exclamation}
              color={
                confirmType === ConfirmationModalType.Danger ? Colors.Destructive : Colors.Warning
              }
              size={32}
            />
          )}
          <h2>{title}</h2>
        </div>
        <p>{body}</p>
        <div className={styles.confirmationModalButton}>
          <div className={styles.rightButtonFooter}>
            <Button
              theme={ButtonTheme.Destructive}
              buttonType={ButtonType.Outlined}
              onClick={onCloseModal}
            >
              Cancel
            </Button>
            <Button
              theme={
                confirmType === ConfirmationModalType.Danger
                  ? ButtonTheme.Destructive
                  : ButtonTheme.Primary
              }
              buttonType={ButtonType.Filled}
              onClick={onConfirm}
            >
              {confirmButtonTitle}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
