import React, {ChangeEvent} from 'react';

interface FormRowSelectProps {
  name: string;
  labelText?: string;
  list: string[];
  defaultValue?: string;
}

const FormRowSelect: React.FC<FormRowSelectProps> = ({
  name,
  labelText,
  list,
  defaultValue = '',
}) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {};

  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>

      <select
        name={name}
        id={name}
        className='form-select'
        defaultValue={defaultValue}
        onChange={handleChange}>
        {list.map((itemValue) => (
          <option key={itemValue} value={itemValue}>
            {itemValue}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormRowSelect;
