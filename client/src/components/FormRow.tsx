interface UserInput {
  name: string;
  type: string;
  labelText?: string;
  defaultValue: string;
}

const FormRow: React.FC<UserInput> = ({
  type,
  name,
  labelText,
  defaultValue,
}) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className='form-input'
        defaultValue={defaultValue || ''}
        required
      />
    </div>
  );
};

export default FormRow;
