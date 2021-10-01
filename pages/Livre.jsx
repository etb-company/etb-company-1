import Head from 'next/head'
import { useEffect , useRef, useState } from 'react'
import NavBar from '../components/NavBar'
import BookNavigation from '../components/BookNavigation'
import BookContainer from '../components/BookContainer'
import bookData from '../script/book-data'
import axios from 'axios'
import Cookies from 'js-cookie'
import Spiner from '../components/Spiner'

const parseAction = (st) => {
    let toSt = st.split('-')
    const ret = toSt.map(elt => {
        return parseInt(elt)
    })
    return ret
}
const removeMenu = () => {
    const livre = document.getElementById('livre')
    if(livre.classList.contains('menu-on')){
        livre.classList.remove('menu-on')
        livre.classList.add('menu-off')
    }
}

export default function Livre(){
    const book = useRef(null)
    const [dataPage, setDataPage] = useState(bookData.description)
    const [isReqLoading, setIsReqLoading] = useState(false)
    const [isError, setIsError] = useState({
        getError: false,
        internetError: false
    })
    const [isShortScreen, setIsShortScreen] = useState(false)
    let chapState = ['', '', '', '', '']

    useEffect(() => {
        const nav = document.querySelector('#book-nav')

        const WIDTH = 1000
        const rect = nav.getBoundingClientRect()
        const top = rect.top + window.scrollY
        const hg = rect.top
        nav.style.height = `calc(100vh - ${hg}px)`

        window.addEventListener('scroll', function(){
            const scrollClass = nav.classList.contains('fixed')
            const h = nav.getBoundingClientRect().top
            if(window.scrollY > top && !scrollClass){
                nav.classList.add('fixed')
            }else if(window.scrollY <= top && scrollClass){
                nav.classList.remove('fixed')
            }
            nav.style.height = `calc(100vh - ${h}px)`
        })
        function onReseise () {
            if(book !== null && window.location.pathname === '/Livre'){
                const winWidth = document.querySelector('body').getBoundingClientRect().width
                if(winWidth > WIDTH + rect.width * 2){ /*]infinite, 1000[*/
                    setIsShortScreen(false)
                    book.current.style.marginLeft = ((winWidth - WIDTH) / 2) + 'px'
                    book.current.style.marginRight = ((winWidth - WIDTH) / 2) + 'px'
                }else if(winWidth <= WIDTH + rect.width * 2 && winWidth > 800){ /*[1000, 800[*/
                    setIsShortScreen(false)
                    book.current.style.marginLeft = rect.width + 'px'
                    book.current.style.marginRight = '0px'
                }else{ /*[800, 0]*/
                    setIsShortScreen(true)
                    book.current.style.marginLeft = '10px'
                    book.current.style.marginRight = '10px'
                }
            }
        }
        window.onresize = onReseise
        onReseise()
        return function(){
            window.removeEventListener('onresize', onReseise)
        }
    }, [])

    const bookDataChange = (action) => {
        if(action === '0'){
            removeMenu()
            setIsError({...isError, getError: false, internetError: false})
            setDataPage(bookData.description)
            return
        }
        const cood = parseAction(action)
        
        if(chapState[cood[0] - 1] !== '' && chapState[cood[0] - 1] !== null){ //chapitre present
            setIsError({...isError, getError: false, internetError: false})
            setDataPage(chapState[cood[0] - 1])
            removeMenu()
            window.location = '#chap' + action
        }else if(chapState[cood[0] - 1] === ''){//pas de chapitre
            const userId = Cookies.get('userId')
            const token = Cookies.get('jwt')
            if(userId && token){
                setDataPage('')
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                setIsReqLoading(true)
                axios.get(process.env.NEXT_PUBLIC_SV_HOST+'book/chap?id='+userId+'&ch='+(cood[0]), config)
                    .then(d => {
                        if(d.data.messageError){
                            setIsError({...isError, getError: true, internetError: false})
                            setDataPage(d.data.messageError)
                            setIsReqLoading(false)
                        }else{
                            const resData = d.data
                            setIsReqLoading(false)
                            chapState[cood[0] - 1] = resData.content
                            setDataPage(resData.content)
                            setIsError({...isError, getError: false, internetError: false})
                            const timer = setTimeout(() => {
                                removeMenu()
                                window.location = '#chap' + action
                                clearTimeout(timer)
                            }, 1000)
                        }
                        
                    })
                    .catch(error => {
                        setIsReqLoading(false)
                        setIsError({...isError, getError: true, internetError: true})
                        setDataPage('Une erreur est survenue. Vérifiez votre connexion internet.')
                    })
            }else{
                setIsError({...isError, getError: true, internetError: true})
                setDataPage('Vous n\'êtes pas connecté. Veuillez vous connecter pour consulter ce chapitre.')
            }
        }
    }

    const spinerOptions = {
        speed: 1.8,
        width: 80,
        borderWidth: 10,
        circleColor: 'rgba(201, 201, 201)',
        spinerColor: '#2978D3',
        length: 35
    }
    const handleOpenMenu = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const livre = document.getElementById('livre')
        if(livre.classList.contains('menu-off')){
            livre.classList.remove('menu-off')
            livre.classList.add('menu-on')
        }else if(livre.classList.contains('menu-on')){
            livre.classList.remove('menu-on')
            livre.classList.add('menu-off')
        }
    }

    return <>
        <Head>
            <title>ETB | Livre</title>
        </Head>
        <header id="book-header">
            <NavBar/>
        </header>
        <main id="livre" className="menu-off">
            <section className="navigation" id="book-nav" style={isShortScreen? {display: 'none'}: {}}>
                <BookNavigation onBookDataChange={bookDataChange}/>
            </section>
            <section className="book-container" ref={book}>
                {!isReqLoading? <BookContainer data={dataPage} isError={isError}/>: ''}
                {isReqLoading? <div className="spiner-container">
                    <Spiner options={spinerOptions}/>
                </div>:''}
            </section>
            {isShortScreen? <div id="btn-menu" onClick={handleOpenMenu}>
                <span></span>
                <span></span>
            </div>: ''}
        </main>
    </>
}