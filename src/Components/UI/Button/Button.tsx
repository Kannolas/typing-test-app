import {FunctionComponent, ComponentPropsWithRef} from 'react'
import c from './Button.module.css'

interface ButtonProps extends ComponentPropsWithRef<'button'>{
    btnText:string;
}

const Button:FunctionComponent<ButtonProps> = ({btnText, ...props})=>{
    return(
        <button 
        className={c['custom-button']}
        {...props}
        >
            {btnText}
        </button>
    )
} 

export default Button