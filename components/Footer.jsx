import Link from 'next/link'
import BtnSouscription from "./BtnSouscription"

export default function Footer(){

    return <footer id="footer">
    <a className="logo reveal-top-0"><span>ETB &nbsp;<p>Company</p></span></a>
    <div className="contact reveal-right-1">
      <h3 className="mb3">Nos contacts</h3>
      <Link href="https://wa.me/237663602028?text=Je%20suis%20intéressé%20par%20votre%20livre%20à%20vendre">
        <a>
          <img src="/img/whatsapp.png" alt="Cliquez pour discuter"/>
          <p className="mb4">+237 663 602 028|+32 467 623 685</p>
        </a>
      </Link>
      <Link href="tel:+237673256597">
        <a>
          <div className="anim-phone">
            <img src="/img/phone.png" alt="Cliquez pour appeller"/>
          </div>
          <p className="mb4">+237 673 256 597|+237 657 373 431</p>
        </a>
      </Link>
      <Link href="mailto:etbcompany2000@gmail.com?subject=Demande de souscription au livre">
        <a>
          <img src="/img/mail.png" alt="Cliquez pour un mail"/>
          <p className="mb4">etbcompany2000@gmail.com</p>
        </a>
      </Link>
    </div>
    <div className="services reveal-right-2">
      <h3 className="mb3">Retrouvez</h3>
      <Link href="/Livre">
        <a className="mb4">Lire le livre</a>
      </Link>
      <Link href="/Compte">
        <a className="mb4">Compte</a>
      </Link>
      <BtnSouscription link="/Compte/#book_shop">SOUSCRIRE</BtnSouscription>
    </div>
    <div className="author reveal-right-3">
      <Link href="#">
        <a>Règles de confidentialite</a>
      </Link>
      <p className="mb4">© 2021 ETB</p>
      <div>
      <Link href="mailto:fftenepo@gmail.com">
        <a className="author-class">
          <p className="mb4">Site crée par <span id="author-name">Franklin Tenepo</span></p>
          <p className="mb4">fftenepo@gmail.com</p>
        </a>
      </Link>
      <Link href="tel:+237656680630">
        <a>
          <p>Graphisme par:</p>
          <p>Hermann Fotso</p>
        </a>
      </Link>
      </div>
    </div>
  </footer>
}