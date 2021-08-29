import React from 'react';
import { useSelect, UseSelectProps } from 'downshift';
import SVGArrow from '../Select/SVGArrow';
import { SelectOption } from '../Select/Select';
import { BaseFormFieldProps } from '../formikUtils';

import {
  SCSelectButton,
  Placeholder,
  SelectArrowSvg,
  DropdownList,
  DropdownItem,
  SelectContainer,
  SelectOptionButton,
} from './components';

type SelectButtonProps = {
  children: React.ReactNode;
  placeholder?: string;
  toggleButtonProps: any;
};

const SelectButton = React.forwardRef(
  ({ children, placeholder, ...rest }: SelectButtonProps, ref) => {
    return (
      <SCSelectButton ref={ref} {...rest}>
        {children || <Placeholder>{placeholder}</Placeholder>}
        <SelectArrowSvg>
          <SVGArrow />
        </SelectArrowSvg>
      </SCSelectButton>
    );
  }
);

type DownshiftSelectProps = {
  value?: SelectOption['value'];
  items: SelectOption[];
  initialSelectedItem?: SelectOption | null;
  handleSelectedItemChange: UseSelectProps<SelectOption>['onSelectedItemChange'];
} & BaseFormFieldProps;

const DownshiftSelect = ({
  label,
  items,
  initialSelectedItem,
  handleSelectedItemChange,
}: DownshiftSelectProps) => {
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    selectedItem,
    highlightedIndex,
    getItemProps,
    selectItem,
  } = useSelect({
    items,
    onSelectedItemChange: handleSelectedItemChange,
    itemToString: (item) => item?.value || '',
  });

  React.useEffect(() => {
    if (initialSelectedItem) {
      selectItem(initialSelectedItem);
    }
  }, [initialSelectedItem, selectItem]);

  return (
    <SelectContainer>
      {label && <label {...getLabelProps()}>{label}</label>}
      <SelectButton {...getToggleButtonProps()}>
        {selectedItem?.label}
      </SelectButton>

      <DropdownList {...getMenuProps()} isOpen={isOpen}>
        {isOpen &&
          items.map((item, index) => (
            <DropdownItem
              key={`${item.value}-${index}`}
              {...getItemProps({ index, item })}
            >
              <SelectOptionButton
                size="sm"
                active={selectedItem?.value === item.value}
                highlighted={highlightedIndex === index}
                value={item.value}
              >
                {item.label}
              </SelectOptionButton>
            </DropdownItem>
          ))}
      </DropdownList>
    </SelectContainer>
  );
};

export default DownshiftSelect;
