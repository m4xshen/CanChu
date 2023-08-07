interface Props {
  id: string;
  name: string;
  label: string;
  type: string;
  error: boolean;
  placeholder?: string;
}

function Input({ id, name, label, type, error, placeholder }: Props) {
  return (
    <label className="mt-8 flex w-4/5 max-w-xs flex-col gap-2">
      {label}
      <input
        id={id}
        name={name}
        className={`h-10 w-full rounded-md border ${
          error ? 'border-red-500' : 'border-[#5458F7]'
        } px-3 outline-none`}
        placeholder={placeholder}
        type={type}
      />
    </label>
  );
}

Input.defaultProps = {
  placeholder: '',
};

export default Input;
