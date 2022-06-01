import React from 'react';
import cx from 'classnames';

type ButtonProps = React.PropsWithChildren<
  { className?: string; variant?: 'primary' | 'secondary' | 'ternary' } & React.ButtonHTMLAttributes<HTMLButtonElement>
>;

export default function Button({
  className = '',
  variant = 'primary',
  children,
  ...props
}: ButtonProps): React.ReactElement {
  const classes = cx(
    className,
    ' text-center font-medium',
    variant === 'primary' &&
      'px-5 py-2.5 text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:outline-none focus:ring-indigo-300 rounded-lg',
    variant === 'secondary' && 'text-indigo-600 hover:text-indigo-700 underline',
    variant === 'ternary' &&
      'px-5 py-2.5 text-red-500 border-red-500 border hover:border-red-600 hover:text-red-600 focus:ring-2 focus:outline-none focus:ring-red-300 rounded-lg'
  );

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
