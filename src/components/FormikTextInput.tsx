import { Field, ErrorMessage, useField } from 'formik';
import cx from 'classnames';

type TextInputProps = JSX.IntrinsicElements['input'] & {
  name: string;
  label: string;
  placeholder?: string;
  className?: string;
};

export default function FormikTextInput({ name, label, className = '', ...restProps }: TextInputProps) {
  const [field, meta] = useField(name);
  const hasError = meta.touched && meta.error;
  const lableClasses = cx('text-sm text-gray-700', hasError && 'text-red-500');
  const inputClasses = cx(
    className,
    'rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mt-1',
    hasError && '!border-red-500 focus:ring-red-300 text-red-500'
  );

  return (
    <div className="relative pb-5">
      <label>
        <span className={lableClasses}>{label}</span>
        <Field {...field} {...restProps} className={inputClasses} />
      </label>
      <ErrorMessage name={name} component="p" className="absolute mt-0.5 text-red-500 text-xs" />
    </div>
  );
}
