import React from 'react';
import { useController, Control, FieldError } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface TextInputProps {
  name: string;
  control: Control<any>;
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  type: 'text' | 'password' | 'number';
  disabled?: boolean;
  className?: string;
  rules?: object;
  error?: FieldError;
  icon?: React.ReactNode;
  onChange?: (value: string) => void;
}

// Input component for text fields
export const HookFormTextInput: React.FC<TextInputProps> = ({
  name,
  control,
  defaultValue = '',
  label,
  placeholder,
  type,
  disabled = false,
  className = '',
  rules = {},
  error,
  icon,
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = event.target.value;
    fieldOnChange(inputValue);
    if (onChange) {
      onChange(inputValue);
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
                {rules && (rules as { required?: boolean })?.required
                  ? '*'
                  : ''}
              </span>
            </p>
          )}
        </div>
      ) : null}
      <div className="relative">
        <input
          onChange={handleChange}
          onBlur={onBlur}
          value={value}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          type={type}
          className={`w-full text-sm rounded-xl outline-none p-[17px] border border-gray-200 text-black bg-white disabled:bg-gray-100 ${
            icon ? '!pl-10' : ''
          } ${error ? '!border-red-500' : ''} ${className}`}
        />
        {icon ? (
          <div
            className={`absolute !text-lg top-1/2 transform -translate-y-1/2 left-3.5 text-gray-400 ${
              error ? '!text-red-500' : ''
            }`}
          >
            {icon}
          </div>
        ) : null}
      </div>
    </div>
  );
};

// Checkbox input component
interface CheckboxProps {
  name: string;
  control: Control<any>;
  defaultValue?: boolean;
  label?: string;
  disabled?: boolean;
  className?: string;
  rules?: object;
  error?: FieldError;
  onChange?: (checked: boolean) => void;
}

// Checkbox component using React Hook Form
export const HookFormCheckbox: React.FC<CheckboxProps> = ({
  name,
  control,
  defaultValue = false,
  label,
  disabled = false,
  className = '',
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const checked = event.target.checked;
    fieldOnChange(checked);
    if (onChange) {
      onChange(checked);
    }
  };

  return (
    <div className="flex items-center">
      <input
        id={name}
        type="checkbox"
        name={name}
        checked={value}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={disabled}
        className={`w-5 h-5 border-gray-300 rounded-md text-primary ${
          error ? 'border-red-500 focus:ring-red-500' : ''
        } ${className}`}
      />
      {label &&
        (error ? (
          <label htmlFor={name} className="ml-2 text-sm text-red-500">
            {error.message}
          </label>
        ) : (
          <label htmlFor={name} className="ml-2 text-sm text-muted">
            {label}
          </label>
        ))}
    </div>
  );
};

// Input component for date fields
interface DateInputProps {
  name: string;
  control: Control<any>;
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  rules?: object;
  error?: FieldError;
  icon?: React.ReactNode;
  onChange?: (value: string) => void;
}

export const HookFormDateInput: React.FC<DateInputProps> = ({
  name,
  control,
  defaultValue = '',
  label,
  placeholder,
  disabled = false,
  className = '',
  rules = {},
  error,
  icon,
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

  const handleChange = (date: Date | null): void => {
    if (date) {
      const dateString = date.toLocaleDateString('en-CA');
      fieldOnChange(dateString);
      if (onChange) {
        onChange(dateString);
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
        <DatePicker
          selected={value ? new Date(value) : null}
          onChange={handleChange}
          onBlur={onBlur}
          dateFormat="yyyy-MM-dd"
          placeholderText={placeholder}
          disabled={disabled}
          className={`!w-full text-sm rounded-xl outline-none p-[17px] border border-gray-200 text-black bg-white disabled:bg-gray-100 ${
            icon ? '!pl-10' : ''
          } ${error ? '!border-red-500' : ''} ${className}`}
        />
        {icon ? (
          <div
            className={`absolute !text-lg top-1/2 transform -translate-y-1/2 left-3.5 text-gray-400 ${
              error ? '!text-red-500' : ''
            }`}
          >
            {icon}
          </div>
        ) : null}
      </div>
    </div>
  );
};

// Phone number input component
interface PhoneInputFieldProps {
  name: string;
  control: Control<any>;
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  rules?: object;
  error?: FieldError;
  onChange?: (value: string) => void;
}

export const HookFormPhoneInput: React.FC<PhoneInputFieldProps> = ({
  name,
  control,
  defaultValue = '',
  label,
  placeholder,
  disabled = false,
  className = '',
  rules = {},
  error,
  onChange,
}) => {
  const {
    field: { onChange: fieldOnChange, value },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  const handleChange = (phone: string) => {
    fieldOnChange(phone);
    if (onChange) {
      onChange(phone);
    }
  };

  return (
    <div>
      {label && (
        <div>
          {error ? (
            <p className="text-sm mb-1 text-red-500">{error?.message}</p>
          ) : (
            <p className="text-sm mb-1 text-black">
              {label}
              <span className="text-red-500">
                {rules && (rules as { required?: boolean })?.required
                  ? '*'
                  : ''}
              </span>
            </p>
          )}
        </div>
      )}
      <div className="relative">
        <PhoneInput
          country="us"
          value={value}
          enableSearch
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          inputClass={`!w-full text-sm !rounded-xl !overflow-hidden !outline-none !h-[56px] pl-16 !border text-black bg-white disabled:bg-gray-100 ${
            error ? '!border-red-500' : ''
          } ${className}`}
          buttonClass={`!bg-white !rounded-l-xl ${
            error ? '!border-red-500' : ''
          }`}
        />
      </div>
    </div>
  );
};
