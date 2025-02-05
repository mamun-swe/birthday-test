import React from 'react';
import Select, { SingleValue } from 'react-select';
import { useController, Control, FieldError } from 'react-hook-form';

interface SelectInputProps {
  name: string;
  control: Control<any>;
  defaultValue?: string | null;
  label?: string;
  placeholder?: string;
  options: { label: string; value: string | number }[];
  disabled?: boolean;
  rules?: object;
  error?: FieldError;
  onChange?: (value: string | number) => void;
}

// Select component for react-select
export const HookFormSelectInput: React.FC<SelectInputProps> = ({
  name,
  control,
  defaultValue,
  label,
  placeholder,
  options,
  disabled = false,
  rules = {},
  error,
  onChange,
}) => {
  const {
    field: { onChange: fieldOnChange, onBlur, value },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  const handleChange = (
    newValue: SingleValue<{ label: string; value: string | number }>,
  ) => {
    if (newValue) {
      fieldOnChange(newValue.value);
      if (onChange) {
        onChange(newValue.value);
      }
    }
  };

  return (
    <div>
      {label ? (
        <div>
          {error ? (
            <p className="text-sm mb-1 text-red-500">{error?.message}</p>
          ) : (
            <p className="text-sm mb-1 text-black">
              {label}
              <span className="text-red-500">
                {rules && Object.keys(rules).length > 0 && '*'}
              </span>
            </p>
          )}
        </div>
      ) : null}
      <div className="relative">
        <Select
          value={options.find((option) => option.value === value)}
          onChange={handleChange}
          onBlur={onBlur}
          options={options}
          placeholder={placeholder}
          isDisabled={disabled}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          styles={customStyles(error ? true : false)}
        />
      </div>
    </div>
  );
};

// Custom styles for react-select
const customStyles = (error: boolean): any => {
  const myStyles = {
    control: (provided: any) => ({
      ...provided,
      fontSize: 14,
      minWidth: 120,
      minHeight: 56,
      color: '#000',
      background: '#fff',
      boxShadow: 'none',
      '&:hover': { borderColor: '1px solid #fff' },
      border: error ? '1px solid red' : '1px solid #dfdfdf',
      borderRadius: 12,
      padding: '5px 8px',
    }),
  };
  return myStyles;
};
