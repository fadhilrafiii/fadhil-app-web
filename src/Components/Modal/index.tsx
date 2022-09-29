import React, { ReactNode } from 'react';

import Button, { ButtonTheme, ButtonType } from 'Components/Button';

import styles from './index.module.css';

interface ModalProps {
  children: ReactNode | ReactNode[];
  title: string;
  isOpen: boolean;
  shouldHideHeader?: boolean;
  primaryButtonTitle?: string;
  secondaryButtonTitle?: string;
  onCloseModal: () => void;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
}

const Modal = ({
  title,
  children,
  isOpen,
  shouldHideHeader,
  primaryButtonTitle,
  secondaryButtonTitle,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  onCloseModal,
}: ModalProps) => {
  if (!isOpen) return null;

  const handleClickPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.modalOverlay} onClick={onCloseModal}>
      <div className={styles.modalContainer} onClick={handleClickPropagation}>
        {!shouldHideHeader && (
          <div className={styles.modalHeader}>
            <h2>{title}</h2>
            <span className={styles.closeModalButton} onClick={onCloseModal} role="button">
              &#10006;
            </span>
          </div>
        )}
        <div className={styles.modalBody}>{children}</div>
        <div className={styles.modalFooter}>
          {secondaryButtonTitle && onSecondaryButtonClick && (
            <Button
              theme={ButtonTheme.Destructive}
              buttonType={ButtonType.Outlined}
              onClick={onSecondaryButtonClick}
            >
              {secondaryButtonTitle}
            </Button>
          )}
          {primaryButtonTitle && onPrimaryButtonClick && (
            <Button
              theme={ButtonTheme.Primary}
              buttonType={ButtonType.Filled}
              onClick={onPrimaryButtonClick}
            >
              {primaryButtonTitle}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
