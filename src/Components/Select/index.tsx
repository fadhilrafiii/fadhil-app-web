import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Icon from 'Components/Icon';
import TextInput, { TextInputSize } from 'Components/TextInput';

import { Colors } from 'Shared/Types/Colors';
import { IconName } from 'Shared/Types/Icon';
import { Option, OptionValue } from 'Shared/Types/Option';

import styles from './index.module.css';

interface SelectProps {
  selectedLabel?: string;
  value?: OptionValue;
  isSearchable?: boolean;
  options: Option[];
  onSelectValue: (value: OptionValue) => void;
}

const Select = ({
  selectedLabel,
  value,
  isSearchable = false,
  options,
  onSelectValue,
}: SelectProps) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>();

  const handleSyncSearchInputWithValue = useCallback(async () => {
    if (selectedLabel) setSearchInput(selectedLabel);
    else setSearchInput(value?.toString() || '');
  }, [value, selectedLabel]);

  useEffect(() => {
    if (value) handleSyncSearchInputWithValue();
  }, [handleSyncSearchInputWithValue, value]);

  const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchInput(value);
  };

  const handleOpenDropdown = () => {
    setIsDropdownOpen(true);
    inputRef.current?.focus();
  };

  const handleCloseDropdown = () => {
    setIsDropdownOpen(false);
    inputRef.current?.blur();
  };

  const actionToggleDropdown = () => {
    if (isDropdownOpen) handleCloseDropdown();
    else handleOpenDropdown();
  };

  const actionClickOption = (option: Option) => {
    setSearchInput(option.label);
    onSelectValue(option.value);
    setIsDropdownOpen(false);
  };

  const showOptions = useMemo(
    () =>
      options.filter((option: Option) => {
        const pattern = new RegExp(searchInput, 'gi');
        return !isSearchable || pattern.test(option.label) || pattern.test(option.value.toString());
      }),
    [isSearchable, options, searchInput],
  );

  return (
    <div className={styles.container} onBlur={handleCloseDropdown} tabIndex={0}>
      <div
        className={styles.inputContainer}
        onClick={!isSearchable ? actionToggleDropdown : () => null}
      >
        <TextInput
          className={styles.input}
          value={searchInput}
          inputSize={TextInputSize.Small}
          disabled={!isSearchable}
          isFullwidth
          onChange={handleChangeSearchInput}
          onFocus={handleOpenDropdown}
        />
        <span className={styles.toggle} onClick={actionToggleDropdown}>
          <Icon
            name={isDropdownOpen ? IconName.ArrowDropUp : IconName.ArrowDropDown}
            color={Colors.GreyDark}
            size={28}
          />
        </span>
      </div>
      {isDropdownOpen && (
        <div className={styles.optionContainer}>
          <div className={styles.options}>
            {options.length === 0 ? (
              <div className={styles.emptyOptions}>No Options Available</div>
            ) : (
              <div className={styles.optionList}>
                {showOptions.map((option: Option) => (
                  <div
                    className={styles.optionItem}
                    key={option.label}
                    onClick={() => actionClickOption(option)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
