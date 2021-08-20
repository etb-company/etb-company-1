import NavBar from "../components/NavBar"
import Image from 'next/image'
import { useEffect } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const SkillOption = ({children, title, image}) =>{
  return <article>
    <Image src={image} width={70} height={70} alt={title}/>
    <h3 className="mb3">{title}</h3>
    <p className="mb4">{children}</p>
  </article>
}
const ChapterPresent = ({data}) => {

  useEffect(() => {
    const divs = document.querySelectorAll('.chapter-div')
    divs.forEach(div => {
      div.addEventListener('click', function(e){
        if(div.classList.contains('expand-div')){
          document.querySelectorAll('.expand-div').forEach(el => {
            el.classList.remove('expand-div')
          })
        }else{
          document.querySelectorAll('.expand-div').forEach(el => {
            el.classList.remove('expand-div')
          })
          this.classList.add('expand-div')
        }
      })
    })
  }, [])
  
  const chap = []
  data.forEach((elt, k) => {
    let p = <div key={k} className="chapter-div">
      <div className="chapter-div-top">
        <span></span>
        <h4 className="mb4">{elt.title}</h4>
      </div>
      <p className="mb4">{elt.content}</p>
    </div>
    chap.push(p)
  })

  return chap
}
const CarouElt = ({children, name, img}) => {
  return <div className="carou-elt">
    <Image src={img} width={100} height={100} alt={name} className="img-carou"/>
    <p className="mb4">{children}</p>
    <h4 className="mb4">{name}</h4>
  </div>
}

export default function Home() {
  const chapterData = [
    {
      title: 'Chapitre 1',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque ex earum aliquam vero asperiores consequuntur hic delectus expedita itaque animi.'
    },
    {
      title: 'Chapitre 2',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque ex earum aliquam vero asperiores consequuntur hic delectus expedita itaque animi.'
    },
    {
      title: 'Chapitre 3',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque ex earum aliquam vero asperiores consequuntur hic delectus expedita itaque animi.'
    },
    {
      title: 'Chapitre 4',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque ex earum aliquam vero asperiores consequuntur hic delectus expedita itaque animi.'
    },
    {
      title: 'Chapitre 5',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque ex earum aliquam vero asperiores consequuntur hic delectus expedita itaque animi.'
    }
  ]
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
  
  return <main>
    <header id="header">
      <NavBar/>
      <article className="header-text">
        <h1 className="mb1">Etude en Belgique <br/>Guide complet</h1>
        <p className="mb4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex quos temporibus explicabo quidem accusamus autem, temporibus explicabo quidem accusamus autem</p>
        <button className="btn-primary">SOUSCRIRE</button>
      </article>
    </header>
    <section id="skill">
      <div className="skill-top">
        <h2 className="mb2">Tout ce que vous devez savoir dans un seul livre</h2>
        <p className="mb4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique rerum mollitia aperiam in iusto odio nam minus molestias soluta! Dignissimos doloribus, rem totam blanditiis</p>
      </div>
      <div className="skill-options">
        <SkillOption title="Fiabilité" image="/img/efficacity.svg">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam obcaecati dolore</SkillOption>
        <SkillOption title="Efficacité" image="/img/efficacity.svg">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam obcaecati dolore</SkillOption>
        <SkillOption title="Rapidité" image="/img/efficacity.svg">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam obcaecati dolore</SkillOption>
      </div>
    </section>
    <section id="book-description">
      <article>
        <h2 className="mb2">Description du livre</h2>
        <p className="mb4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptate perferendis sequi quod consequuntur fugiat cupiditate numquam voluptates autem totam consectetur reprehenderit harum hic quaerat expedita odit placeat laudantium enim repellendus quibusdam, minus vitae voluptatum dolores! Perferendis inventore dicta quisquam ullam placeat quos. Aliquam nesciunt modi nam qui quos, totam dicta illo voluptates? Neque sequi error animi. Maxime cum eos doloribus delectus. Placeat odit animi fugit aut aliquid dignissimos nam!</p>
      </article>
    </section>
    <section id="chapter-details">
      <img src="/img/book.png" alt="book" />
      <div className="chapter-details-container">
        <ChapterPresent data={chapterData}/>
      </div>
    </section>
    <section id="testimony">
      <h2 className="mb2">Témoignages</h2>
      <div className="owl-carousel">
        <Slider {...settings}>
          <CarouElt img="/img/t1.png" name="Paul">1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda voluptate incidunt nesciunt necessitatibus dolore architecto.</CarouElt>
          <CarouElt img="/img/t1.png" name="Paul">2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda voluptate incidunt nesciunt necessitatibus dolore architecto.</CarouElt>
          <CarouElt img="/img/t1.png" name="Paul">3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda voluptate incidunt nesciunt necessitatibus dolore architecto.</CarouElt>
          <CarouElt img="/img/t1.png" name="Paul">4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda voluptate incidunt nesciunt necessitatibus dolore architecto.</CarouElt>
          <CarouElt img="/img/t1.png" name="Paul">5 Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda voluptate incidunt nesciunt necessitatibus dolore architecto.</CarouElt>
        </Slider>
      </div>
    </section>
    <footer id="footer">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Est voluptate hic recusandae tenetur eligendi animi, labore iste velit vero maiores dicta expedita distinctio magnam harum accusamus, culpa nihil odit optio soluta minima a at adipisci rerum corrupti! Fuga, asperiores possimus. Quod illo repellat modi voluptatum atque, aliquam dolorem eius similique consequuntur amet minima nisi. Repellendus ad sint minus voluptatem, vero asperiores aspernatur saepe? Sequi labore voluptatum ut, possimus odit reiciendis, similique voluptatem exercitationem accusantium enim adipisci praesentium nostrum, mollitia ea eum doloribus quo ab quaerat ipsa at quidem porro numquam inventore iusto. Est et animi laborum rerum eligendi quasi iusto doloribus quos numquam dolorem consequatur neque ab eveniet quis at molestiae, veniam assumenda sed sequi? Veritatis, eveniet reiciendis. Minima sequi nisi fuga praesentium sit, cupiditate quasi doloribus facere maxime et aut, hic quas nam, ea distinctio maiores voluptatibus! Repudiandae error porro sapiente accusantium alias excepturi natus, sed repellendus, mollitia, inventore consectetur! Voluptas adipisci similique iusto provident minima dolorem accusantium, vel ut. Perferendis non vero exercitationem expedita voluptatem quae accusantium pariatur laudantium mollitia quis, blanditiis minus explicabo asperiores laborum eum! Fuga qui quaerat neque unde, aut quis omnis possimus sit perspiciatis ad. Veritatis quae nisi cum et illum nesciunt culpa aperiam!
    </footer>
  </main>
}
