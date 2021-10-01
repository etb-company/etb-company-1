import NavBar from "../components/NavBar"
import Image from 'next/image'
import Link from "next/link"
import Head from "next/head"
import BtnSouscription from "../components/BtnSouscription"
import { useEffect } from "react"
import Slider from "react-slick"
import Footer from "../components/Footer"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ChapterPresent from "../components/ChapterPresent"

const SkillOption = ({children, title, image, className}) =>{
  return <article className={className}>
    <Image src={image} width={70} height={70} alt={title}/>
    <h3 className="mb3">{title}</h3>
    <p className="mb4">{children}</p>
  </article>
}
const CarouElt = ({children, name, img}) => {
  return <div className="carou-elt">
    <div className="test-img-cont"><Image src={img} width={100} height={100} alt={name} className="img-carou"/></div>
    <p className="mb4">{children}</p>
    <h4 className="mb4">{name}</h4>
  </div>
}

export default function Home() {
  const settings = {
    accessibility: true,
    arrows: false,
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
    ]
  }
  
  return <>
  <Head>
      <title>ETB | Accueil</title>
  </Head>
  <main>
    <header id="header">
      <NavBar/>
      <article className="header-text">
        <h1 className="mb1 reveal-top-1">Etude en Belgique <br/>Guide complet</h1>
        <p className="mb4 reveal-top-2">Vous souhaitez obtenir facilement votre visa d’étude pour la Belgique mais vous n’avez aucune connaissance sur la procédure à suivre pour réussir votre entretien ainsi que constituer vos dossiers, alors ce livre est fait pour vous.</p>
        <BtnSouscription className="reveal-top-3">SOUSCRIRE</BtnSouscription>
      </article>
    </header>
    <section id="skill">
      <div className="skill-top">
        <h2 className="mb2 reveal-top-0">Tout ce que vous devez savoir dans un seul livre</h2>
        <p className="mb4 reveal-top-1">Le guide complet de A à Z pour l’immigration en Belgique </p>
      </div>
      <div className="skill-options">
        <SkillOption title="Fiabilité" image="/img/efficacity.svg">Des méthodes sûres et légales. Votre sécurité est notre première priorité   </SkillOption>
        <SkillOption title="Efficacité" image="/img/efficacity.svg">Toutes les informations et astuces importantes à connaitre sur l’immigration</SkillOption>
        <SkillOption title="Rapidité" image="/img/efficacity.svg">Des méthodes testées et approuvées pour une rapidité garantie </SkillOption>
      </div>
    </section>
    <section id="book-description">
      <article>
        <h2 className="mb2 reveal-right-0">Description du livre</h2>
        <p className="mb4 reveal-right-1">Ce livre est divisé en 5 chapitres disponibles individuellement à l’achat. Ces 5 chapitres à savoir « L’équivalence », « « L’admission », « La prise en charge », « Campus Belgique » et « Demande de Visa » sont destinées à vous donner toutes les informations nécessaires à connaitre pour l’immigration en Belgique. Toutes les procédures telles que l’obtention du visa sont détaillées avec le plus grand soin dans ce livre.</p>
      </article>
    </section>
    <section id="chapter-details">
      <img src="/img/book.png" alt="book" className="reveal-left-0"/>
      <div className="chapter-details-container">
        <ChapterPresent/>
      </div>
    </section>
    <section id="testimony">
      <h2 className="mb2">Témoignages</h2>
      <div className="owl-carousel">
        <Slider {...settings}>
          <CarouElt img="/img/t1.png" name="Julien Obingo">Grace à ETB-Company J’ai pu obtenir un visa étudiant pour la haute école Bruxelles-Brabant où je fréquente depuis 2 ans.</CarouElt>
          <CarouElt img="/img/t2.png" name="Thea Navelie">Apres mon baccalauréat le guide complet de ETB-Company m’a permis de constituer personnellement mes dossiers pour la Belgique. </CarouElt>
          <CarouElt img="/img/t3.png" name="Justin Yongoa">Avec ma licence professionnelle en réseau, ETB-Company m’a facilité l’obtention d’un travail en plein temps en Belgique </CarouElt>
          <CarouElt img="/img/t4.png" name="Aristide Kenfack">Apres l’obtention de mon Master 2 en biochimie à l’université de Yaoundé 1, ETB-Company m’a guidé dans le processus d’inscription en thèse en Belgique.</CarouElt>
        </Slider>
      </div>
    </section>
    <Footer/>
  </main>
  </>
}
