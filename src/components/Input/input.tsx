import React from 'react';
import classnames from 'classnames';

type SizeType = 'lg' | 'default' | 'sm'

interface BaseInputProps {
  className?: String,
  inputSize?: SizeType,
  prepand?: String,
  append?: String,
  icon?: String,
  disabled?: Boolean,
}

type NativeInputProps = BaseInputProps & React.InputHTMLAttributes<HTMLElement>;

const Input: React.FC<NativeInputProps> = (props) => {
  const { 
    icon,
    prepand,
    append,
    disabled,
    inputSize,
    className,
    ...restProps
   } = props;

   const classes = classnames('input', className, {
     [`input-${inputSize}`]: inputSize
   })

   return (
    <input 
      className={classes} 
      {...restProps}
    />
   )
}

Input.defaultProps = {
  disabled: false
}

export default Input