import React, { useState } from 'react';

import Modal from 'Components/Modal';
import Select from 'Components/Select';

import { useAppDispatch } from 'Redux/hooks';
import { setSection } from 'Redux/Slices/taskSlice';

import { TASK_SECTION_OPTIONS, TASK_SECTION_OPTIONS_LABEL } from 'Shared/Constants/Task';
import { OptionValue } from 'Shared/Types/Option';
import { TaskSectionEnum } from 'Shared/Types/Task';

interface FilterTaskModalProps {
  isOpen: boolean;
  onCloseModal: () => void;
}

const ChooseSectionModal = ({ isOpen, onCloseModal }: FilterTaskModalProps) => {
  const dispatch = useAppDispatch();
  const [selectedSection, setSelectedSection] = useState<TaskSectionEnum>(TaskSectionEnum.Today);

  const handleSelectSection = (value: OptionValue) => setSelectedSection(value as TaskSectionEnum);
  const handleSetSection = () => {
    dispatch(setSection(selectedSection));
    onCloseModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Choose Task Section"
      onCloseModal={onCloseModal}
      primaryButtonTitle="Choose"
      onPrimaryButtonClick={handleSetSection}
      secondaryButtonTitle="Cancel"
      onSecondaryButtonClick={onCloseModal}
    >
      <Select
        selectedLabel={TASK_SECTION_OPTIONS_LABEL[selectedSection]}
        options={TASK_SECTION_OPTIONS}
        onSelectValue={handleSelectSection}
        value={selectedSection}
      />
    </Modal>
  );
};

export default ChooseSectionModal;
