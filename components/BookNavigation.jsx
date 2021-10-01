import { useEffect, useState } from "react"
import Link from "next/link"
import bookData from "../script/book-data"

const reduseString = (st, max) => {
    let ss = st.split('')
    let appss = ''
    if(ss.length > max){
        const sustract = ss.slice(0, max + 1)
        appss = sustract.join('')
        appss += ' ...'
    }else{
        appss = ss.join('')
    }
    return appss
}

export default function BookNavigation ({ onBookDataChange }) {
    const data = bookData
    const [navChap, setNavChap] = useState([])

    const toggleExpandChap = (e) => {
        const parent = e.target.parentNode
        if(parent.classList.contains('expand-chap')){
            parent.classList.remove('expand-chap')
        }else{
            document.querySelectorAll('.expand-chap').forEach(elt => {
                if(elt.classList.contains('expand-chap')){
                    elt.classList.remove('expand-chap')
                }
            })
    
            parent.classList.add('expand-chap')
        }
    }
    const toggleExpandSub = (e) => {
        const parent = e.target.parentNode
        if(parent.classList.contains('expand-sub')){
            parent.classList.remove('expand-sub')
        }else{
            document.querySelectorAll('.expand-sub').forEach(elt => {
                if(elt.classList.contains('expand-sub')){
                    elt.classList.remove('expand-sub')
                }
            })
    
            parent.classList.add('expand-sub')
        }
    }

    useEffect(() => { 
        setNavChap([null]) //reseting the navChap state
        data.chap.forEach((chap, k) => {
            let subTitle = []
            chap.content.forEach((sub, j) => {
                const subSubTitle = []
                if(sub.hasSubTitle){
                    sub.subTitles.forEach((ssub, i) => {
                        const appliTitle = reduseString(ssub.title, 50)
                        const subSub = <a key={'subsub'+ssub.id} onClick={(e) => {
                            e.preventDefault()
                            const link = (k+1)+"-"+(j+1)+"-"+(i+1)
                            onBookDataChange(link)
                        }}>{appliTitle}</a>
                        subSubTitle.push(subSub)
                    })
                }
                const applySub = reduseString(sub.title, 50)
                subTitle.push(<div  key={'sub-chap'+j} className="sub-chap">
                        {sub.hasSubTitle?<span className="expander" onClick={toggleExpandSub}></span>: ''}
                        <a onClick={(e) => {
                            e.preventDefault()
                            const link = (k+1)+"-"+(j+1)
                            toggleExpandSub(e)
                            onBookDataChange(link)
                        }}>{applySub}</a>
                        <div>
                            {subSubTitle}
                        </div>
                </div>)
            })
            let chapDiv = <div key={'chap-'+ (k+1)} className="chapter-nav">
                <span className="expander" onClick={toggleExpandChap}></span>
                <h4 className="mb4" onClick={(e) => {
                    const link = ""+(k+1)+""
                    toggleExpandChap(e)
                    onBookDataChange(link)
                    }}>
                        Chap {k+1}: {chap.title}
                </h4>
                <div className="sub-chapter-nav">
                    {subTitle}
                </div>
            </div>
            setNavChap(navChap => {
                return [...navChap, chapDiv]
            })
        })

    }, [])
    
    return <div>
        <h4 className="mb4" onClick={(e) => {onBookDataChange('0')}}>Présentation</h4>
        {navChap}
    </div>
}