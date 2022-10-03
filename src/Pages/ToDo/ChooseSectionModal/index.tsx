import React, { useState } from 'react';

import Modal from 'Components/Modal';
import Select from 'Components/Select';

import { TASK_SECTION_OPTIONS } from 'Shared/Contants/Task';
import { OptionValue } from 'Shared/Types/Option';

interface FilterTaskModalProps {
  isOpen: boolean;
  onCloseModal: () => void;
}

const ChooseSectionModal = ({ isOpen, onCloseModal }: FilterTaskModalProps) => {
  const [selectedSection, setSelectedSection] = useState(TASK_SECTION_OPTIONS[0].value);

  const handleSelectSection = (value: OptionValue) => setSelectedSection(value);
  const handleSetSection = () => console.log(selectedSection);

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
        options={TASK_SECTION_OPTIONS}
        onSelectValue={handleSelectSection}
        value={selectedSection}
      />
    </Modal>
  );
};

export default ChooseSectionModal;
