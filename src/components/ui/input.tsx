import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  required?: boolean;
  className?: string;
  [key: string]: any;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  required = false,
  className = "",
  ...props
}) => {
  return (
    <div className="mb-1">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium mb-1.5 text-[#686868] ">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {type === "textarea" ? (
        <textarea
          name={name}
          id={name}
          placeholder={placeholder}
          value={value as string | number | undefined}
          onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
          required={required}
          rows={4}
          className={`w-full placeholder:text-[#0000004D] focus:outline-none rounded-lg p-3 border bg-[#FAFAFA] border-[#D0D5DD] ${className}`}
        />
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
          required={required}
          className={`w-full placeholder:text-[#0000004D] focus:outline-none rounded-lg p-3 border bg-[#FAFAFA] border-[#D0D5DD] ${className}`}
          {...props}
        />
      )}
    </div>
  );
};

export default Input;
