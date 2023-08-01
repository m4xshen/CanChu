import { forwardRef } from 'react';

interface Props {
  label: string;
  type: string;
  placeholder?: string;
}

const Input = forwardRef<any, Props>((props, ref) => {
  const { label, type, placeholder } = props;
  return (
    <label className="mt-8 flex w-4/5 max-w-xs flex-col gap-2">
      {label}
      <input
        ref={ref}
        className="h-10 w-full rounded-md border border-[#5458F7] px-3 outline-none"
        placeholder={placeholder}
        type={type}
      />
    </label>
  );
});

Input.defaultProps = {
  placeholder: '',
};

export default Input;
