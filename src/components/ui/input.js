import React from 'react';

const Input = ({
  label,
  name,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  required = false,
  className = '',
  ...props
}) => {
  const commonProps = {
    name,
    id: name,
    placeholder,
    value,
    onChange,
    required,
    className: `border px-4 py-2 rounded w-full ${className}`,
    ...props,
  };

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium mb-1.5 text-[#686868] font-semibold"
        >
          {label}
        </label>
      )}

      {type === 'textarea' ? (
        <textarea
          {...commonProps}
          rows={4}
          className="w-full placeholder:text-[#0000004D] focus:outline-none rounded-lg p-3 border bg-[#FAFAFA] border-[#D0D5DD]"
        />
      ) : (
        <input
          type={type}
          {...commonProps}
          className="w-full placeholder:text-[#0000004D] focus:outline-none rounded-lg p-3 border bg-[#FAFAFA] border-[#D0D5DD]"
        />
      )}
    </div>
  );
};

export default Input;
