import styles from './header.module.css'
import logoimg from '../../assets/logo.png'
import { Link } from 'react-router-dom'

export function Header(){
    return(
        <header className={styles.container}>
            <div>
                <Link to='/'>
                    <img src={logoimg} alt='Logo Cripto'/> 
                </Link>
            </div>

        </header>
    )
}