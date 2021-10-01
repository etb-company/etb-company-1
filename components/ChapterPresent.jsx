import { useEffect } from "react"
import intersectionOb from "../script/intersectionObserver"

const ChapterPresent = () => {
    const data = [
        {
          title: 'Chapitre 1',
          content: 'L\'équivalence est la valorisation de vos études secondaires suivies à l\'étranger et conditionne votre accès aux études supérieures en Belgique. Dans ce guide, vous saurez comment constituer vous même votre equivalence.',
          chapName: 'Equivalence'
        },
        {
          title: 'Chapitre 2',
          content: 'Il est primordial d\'obtenir une admission en rapport avec les études suivies dans votre pays d\'origine. Dans ce guide, vous aurez toutes les informations sur les écoles supérieures  belges, les conditions d\'admission et la constitution du dossier d\'inscription.',
          chapName: 'Admission'
        },
        {
          title: 'Chapitre 3',
          content: 'Une fois admis dans une école supérieure belge, vous devez prouver que vous possédez les moyens financiers suffisants pour suivre vos études en belgique. Les différents moyens et les conditions à remplir seront listés et expliqués dans ce guide.',
          chapName: 'Couverture financière'
        },
        {
          title: 'Chapitre 4',
          content: 'Cette étape représente 90% des refus de visa étudiants vers la Belgique mais grâce au guide de Etbcompany, nous vous montreront comment répondre dans les détails en étant clair et précis afin de réussir votre interview.',
          chapName: 'Campus Belgique'
        },
        {
          title: 'Chapitre 5',
          content: 'Étape finale de la procédure qui consiste à déposer votre dossier à l\'ambassade de Belgique de votre pays d\'origine. Dans ce livre, vous aurez la constitution du dossier selon votre admission, votre niveau d\'admission et votre nationalité',
          chapName: 'Demande de VISA'
        }
      ]

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
      intersectionOb()
    }, [])
    
    const chap = []
    data.forEach((elt, k) => {
      let p = <div key={k} className={"chapter-div "+ "reveal-right-"+k}>
        <div className="chapter-div-top">
          <span></span>
          <h4 className="mb4">{elt.title}</h4>
        </div>
        <h4 className="mb4">{elt.chapName}</h4>
        <p className="mb4">{elt.content}</p>
      </div>
      chap.push(p)
    })
  
    return chap
  }

  export default ChapterPresent