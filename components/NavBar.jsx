import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function NavBar(){
    const [pathName, setPathName] = useState('/')
    useEffect(() => {
        setPathName(window.location.pathname)
    }, [pathName])

    return <nav id="nav-bar-container">
        <article id="nav-bar">
            <Link href="/">
                <a className="logo"><span>ETB <p>Company</p></span></a>
            </Link>
            <div className="aside-nav">
                <Link href="/">
                    <a className={pathName === '/'? 'active': ''}>Accueil</a>
                </Link>
                <Link href="/Livre">
                    <a className={pathName === '/Livre'? 'active': ''}>Livre</a>
                </Link>
                <Link href="/Compte">
                    <a className={pathName === '/Compte'? 'active': ''}>Compte</a>
                </Link>
            </div>
        </article>
    </nav>
}