import { ComponentPropsWithRef } from "react";
import c from './Select.module.css'

interface SelectProps extends ComponentPropsWithRef<'select'>{
    defaultValue: string;
    options:{
        value: string,
        name: string
    }[]
}

const Select: React.FC<SelectProps> = ({defaultValue, options, ...props})=>{
    return(
        <select
        className={c['custom-select']}
        defaultValue={defaultValue}
        {...props}>
            {options.map((option)=>{
                return(
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                )
            })}
        </select>
        
    )
}

export default Select