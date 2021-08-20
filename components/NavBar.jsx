import Link from 'next/link'

export default function NavBar(){

    return <nav id="nav-bar-container">
        <article id="nav-bar">
            <Link href="/">
                <a className="logo"><span>ETB <p>Company</p></span></a>
            </Link>
            <div className="aside-nav">
                <Link href="/">
                    <a>Accueil</a>
                </Link>
                <Link href="#">
                    <a>Livre</a>
                </Link>
                <Link href="#">
                    <a>Contact</a>
                </Link>
            </div>
        </article>
    </nav>
}