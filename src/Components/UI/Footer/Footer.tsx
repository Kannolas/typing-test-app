import {FunctionComponent} from 'react'
import c from './Footer.module.css'

const Footer: FunctionComponent = ()=>{
    return (
        <footer className={c.footer}>
            <p className={c['footer-text']}>Made by Pokorsky Ivan © 2023</p>
        </footer>
    )
}

export default Footer;