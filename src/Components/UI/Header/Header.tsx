import { FunctionComponent } from 'react';
import c from './Header.module.css'
import logo from '../../../assets/imgs/logo.png'

const Header: FunctionComponent = ()=>{
    return(
        <header className={c.header}>
            <div className={c['header-container']}>
                <img src={logo} className="header-logo" width={'100px'}></img>
                <div className={c['header-text']}>Typing Test App</div>
            </div>
        </header>
    )
}

export default Header