import React from 'react';
import { useController, useFormContext, Control } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

interface CustomSelectProps {
  name: string;
  control: Control<any>;
  defaultValue?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  name,
  control,
  defaultValue,
  placeholder,
  options,
}) => {
  const { field } = useController({
    name,
    control,
    defaultValue,
  });

  return (
    <Select value={field.value} onValueChange={field.onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};