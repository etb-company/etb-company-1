import NavBar from "../components/NavBar"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import Footer from "../components/Footer"
import intersectionOb from "../script/intersectionObserver"
import FormMsg from "../components/FormMsg"
import axios from 'axios'
import Cookies from 'js-cookie'
import Loader from "../components/Loader"
import StepCours from "../components/StepCours"
import ChapterPresent from "../components/ChapterPresent"
import BtnConfirmation from "../components/BtnConfirmation"
import CodeValidator from "../components/CodeValidator"

const stepsData = [
    {
        name: "Inscrivez vous",
        complited: false
    },
    {
        name: "Commandez le livre et obtenez un code d'acces",
        complited: false
    },
    {
        name: "Entrez votre code d'acces pour debloquer le document",
        complited: false
    },
    {
        name: "Accedez au livre dans la rubrique correspondante",
        complited: false
    }
]
const SUPP_TEXT = "Vous êtes sur le point de supprimer votre compte. Toutes vos informations seront perdues ainsi que vos données de payement. </br> Voulez-vous confirmer ?"
const LOGOUT_TEXT = "Vous êtes sur le point de vous deconnecter. </br> Voulez-vous continuer ?"
const COMMAND_TEXT = "Validez votre commande et notre service client vous contactera dans les plus brefs delais </br> Voulez-vous confirmer la commande ?"

const UserInfo = ({bookD, userDatas}) => {
    const [bookData, setBookData] = useState(bookD)
    const [userData, setUserData] = useState(userDatas)
    const [price, setPrice] = useState({
        price: 100,
        rPrice: 150
    })
    const [selectedChap, setSelectedChap] = useState([true, true, true, true, true])
    const [chap, setChap] = useState('Aucun chapitre')
    const [commandInfo, setCommandInfo] = useState('Aucune commande en cour')
    const [checkbox, setCheckBox] = useState([])
    const [commandMsg, setCommandMsg] = useState({
        visible: false,
        msg: '',
        type: 'success'
    })
    
    const handleShopBook = (k, e) => {
        setSelectedChap(selectedChap => [...selectedChap.slice(0, k), !selectedChap[k], ...selectedChap.slice(k+1)])
    }

    const submitCommand = () => {
        let data = price
        data.chap = selectedChap

        const userId = Cookies.get('userId')
        const token = Cookies.get('jwt')
        if(userId && token){
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            
            axios.put(process.env.NEXT_PUBLIC_SV_HOST+'data/command?id='+userId, data, config)
                .then(res => {
                    setCommandMsg(commandMsg => {
                        return {...commandMsg, visible: true, msg: res.data.message}
                    })
                    const time = setTimeout(() => {
                        setCommandMsg(commandMsg => {
                            return {...commandMsg, visible: false, msg: ''}
                        })
                        window.location = '/Compte'
                    }, 2000)
                })
                .catch(error => {
                    setCommandMsg(commandMsg => {
                        return {...commandMsg, visible: true, msg: 'Erreur inattendue', type: 'error'}
                    })
                    const time = setTimeout(() => {
                        setCommandMsg(commandMsg => {
                            return {...commandMsg, visible: false, msg: '', type: 'success'}
                        })
                    }, 2000)
                })
        }
    }
    
    useEffect(() => {
        ///////////////////////
        if(userDatas !== null){

            let S = ''
            let cpt = 0
            selectedChap.forEach((elt, k) => {
                if(elt && !userDatas.shop.actualShop[k] && !userDatas.shop.command.chap[k]){
                    S += (k + 1) + ', '
                    cpt++
                }
            })
            let C = ''
            let cpt2 = 0
            userDatas.shop.actualShop.forEach((elt, k) => {
                if(elt){
                    C += (k + 1) + ', '
                    cpt2++
                }
            })
            /**Pour la commande */
            let R = ''
            let cpt3 = 0
            userDatas.shop.command.chap.forEach((elt, k) => {
                if(elt && !userDatas.shop.actualShop[k]){
                    R += (k + 1) + ', '
                    cpt3++
                }
            })
            if(cpt3 === 0){
                setCommandInfo('Vous n\'avez aucune commande en cour')
            }else if(cpt3 === 1){
                setCommandInfo('Vous avez déjà commandé le chapitre: '+ R)
            }else if(cpt3 === userDatas.shop.actualShop.length){
                setCommandInfo('Vous avez déjà commandé tout le livre')
            }else{
                setCommandInfo('Vous avez déjà commandé les chapitres: '+ R)
            }
            /**Pour la commande */

            if(cpt2 === 0){
                if(cpt === 0){
                    setChap('Vous ne disposez d\'aucun chapitre pour l\'intant')
                }else if(cpt === selectedChap.length){
                    setChap('Vous souhaitez acheter tout le document')
                }else{
                    setChap('Vous souhaitez acheter uniquement le(s) chapitre(s): ' + S)
                }
            }else if(cpt2 === userDatas.shop.actualShop.length){
                setChap('Vous avez déjà acheté tout le document')
            }else{
                if(cpt === 0){
                    setChap('Vous disposez du chapitre '+C+' Veillez selectionner des chapitres pour les acheter')
                }else if(cpt === selectedChap.length){
                    setChap('Vous voulez acheter le livre entier')
                }else{
                    if(cpt === 1) setChap('Vous disposez du chapitre ' + C + 'et souhaitez acheter le chapitre ' + S)
                    else setChap('Vous avez déjà acheté le chapitre ' + C + 'et souhaitez acheter les chapitres ' + S)
                }
            }
            
            ////////////////////////
            let pcalc = 0
            let rpcalc = 0
            let nbre = 0
            if(userDatas !== null)
            selectedChap.forEach((elt, k) => {
                if(elt && !userDatas.shop.actualShop[k] && !userDatas.shop.command.chap[k]){
                    rpcalc += 30
                    pcalc += 30 - (5*nbre)
                    nbre++
                }
            })
            setPrice({...price, price: pcalc, rPrice: rpcalc})
        }
    }, [selectedChap])

    useEffect(() => {
        if(userDatas !== null){
            setCheckBox([null])
            userDatas.shop.actualShop.forEach((elt, k) => {
                if(!elt && !userData.shop.command.chap[k]){
                    const p = <div key={k} className={selectedChap[k]? 'checked': 'notChecked'}>
                        <input type="checkbox" id={"ip" + k} onChange={(e) => {handleShopBook(k, e)}} checked={selectedChap[k]}/>
                        <label htmlFor={"ip" + k}>{selectedChap[k]?<div><Image src="/img/bin.svg" width={22} height={22} alt="Retirer"/></div> :<div></div>}</label>
                        <p>{"Chapitre "+ (k+1)}</p>
                    </div>
                    setCheckBox(checkbox => [...checkbox, p])
                }
            })
        }
    }, [selectedChap])

    const submitLogout = () => {
        Cookies.remove('jwt')
        Cookies.remove('userId')
        window.location = '/Compte'
    }
    const deleteUserAccount = () => {
        console.log('supprimer le compte')
    }

    return <section id="user-info">
        <article className="user-description">
            <Image src="/img/user.png" width={200} height={200} alt="user"/>
            <div>
                <p>Nom: {userDatas? userDatas.name: 'User'}</p>
                <p>Prenom: {userDatas? userDatas.firstName: 'User'}</p>
                <p>email: {userDatas? userDatas.email: 'User@gmail.com'}</p>
                <div className="user-log-btn">
                    <BtnConfirmation type="succes" text={LOGOUT_TEXT} onHandleClick={submitLogout}>Se déconnecter</BtnConfirmation>
                    <BtnConfirmation type="alert" text={SUPP_TEXT} onHandleClick={deleteUserAccount}>Supprimer le compte</BtnConfirmation>
                </div>
                <h4 className="mb4">Avez-vous déjà un code d`achat ?</h4>
                <CodeValidator/>
            </div>
        </article>
        <article className="book-shop" id="book_shop">
            <article>
                <h2 className="mb2">Espace achat</h2>
                <div>
                    <div className="schop-book-detail">
                        <Image src={'/img/book.png'} width={300} height={312} alt="book"/>
                        <div>
                            <h4>{price.rPrice !== price.price?(<span>{price.rPrice} €</span>): <br/>}</h4>
                            <h2>{price.price} €</h2>
                            <p>Economisez {price.rPrice - price.price}€</p>
                            <BtnConfirmation type="success" text={COMMAND_TEXT} onHandleClick={submitCommand} state={price.price > 0? true: false}>Commander</BtnConfirmation>
                        </div>
                    </div>
                    <div className="checks">
                        <div>
                            <p>Choisissez vos chapitres</p>
                            {checkbox}
                        </div>
                        <div>
                            <FormMsg msg={commandMsg.msg} visible={commandMsg.visible} type={commandMsg.type}/>
                        </div>
                    </div>
                </div>
                <p>{chap}</p>
                <p>{commandInfo}</p>
            </article>
            <div className="chapter-details-container">
                    <ChapterPresent/>
            </div>
        </article>
    </section>
}
const ConnectMenu = () => {
    const [step, setStep] = useState(1)
    const [stepData, setStepData] = useState(stepsData)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        passwordVerif: '',
        name: '',
        firstName: '',
        phoneNumber: '',
        city: ''
    })
    const [formData2, setFormData2] = useState({
        email: '',
        password: ''
    })
    const [alertMsg, setAlertMsg] = useState({
        msg: '',
        visible: false,
        type: 'error'
    })
    const [alertMsg2, setAlertMsg2] = useState({
        msg: '',
        visible: false,
        type: 'error'
    })
    const [loader,  setLoader] = useState('')

    const verifStep = (step, data) => {
        let emailStatus = data.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) !== null
        let passStatus = (data.password.length >= 6 && data.password === data.passwordVerif)
        let nameStatus = data.name.length > 1
        let firstNameStatus = data.firstName.length > 1
        let phoneStatus = data.phoneNumber > 0
        let cityStatus = data.city.length > 1

        if(step === 1){
            if(!emailStatus) return {status: false, message: 'Vérifier l\'email', type: 'email'}
            if(!passStatus) return {status: false, message: 'Le mot de passe est incorrecte: 6 caractères minimum', type: 'password'}
            return {status: true, message: 'ok', type: ''}
        }else if(step === 2){
            if(!nameStatus) return {status: false, message: 'Vérifier le nom !', type: 'name'}
            if(!firstNameStatus) return {status: false, message: 'Vérifier le prénom !', type: 'firstname'}
            return {status: true, message: 'ok', type: ''}
        }else{
            if(!phoneStatus) return {status: false, message: 'Vérifier le numero de téléphone !', type: 'phone'}
            if(!cityStatus) return {status: false, message: 'Vérifier le nom de la ville !', type: 'city'}
            return {status: true, message: 'ok', type: ''}
        }
    }
    const actionStep = (val) =>{
        if(val < 0){
            if(step > 1) setStep(s => s + val)
        }else{
            const verif = verifStep(step, formData)
            if(verif.status === true){
                if(step < 3) setStep(s => s + val)

                const stepSpan = document.querySelector(`.step-span-${step}`)
                stepSpan.classList.remove('step-error')
                setAlertMsg({msg: '', visible: false, type: 'error'})
            }else{
                const stepSpan = document.querySelector(`.step-span-${step}`)
                stepSpan.classList.add('step-error')
                setAlertMsg({msg: verif.message, visible: true, type: 'error'})
            }
        }
    }
    const handleForm = (e) => {
        const id = e.target.id

        switch(id){
            case 'email-ins':
                let newFormData = {...formData, email: e.target.value}
                setFormData(newFormData)
                break;
            case 'pass-ins':
                newFormData = {...formData, password: e.target.value}
                setFormData(newFormData)
                break;
            case 'pass-verif-ins':
                newFormData = {...formData, passwordVerif: e.target.value}
                setFormData(newFormData)
                break;
            case 'name-ins':
                newFormData = {...formData, name: e.target.value}
                setFormData(newFormData)
                break;
            case 'first-name-ins':
                newFormData = {...formData, firstName: e.target.value}
                setFormData(newFormData)
                break;
            case 'num-ins':
                newFormData = {...formData, phoneNumber: e.target.value}
                setFormData(newFormData)
                break;
            case 'city-ins':
                newFormData = {...formData, city: e.target.value}
                setFormData(newFormData)
                break;
        }
    }
    const handleForm2 = (e) => {
        const id = e.target.id
        if(id === 'email-con'){
            setFormData2(s => {return {...s, email: e.target.value}})
        }
        if(id === 'pass-con'){
            setFormData2(s => {return {...s, password: e.target.value}})
        }
    }
    const submitIns = (e) => {
        e.preventDefault()
        const stepSpan = document.querySelector('.step-span-3')
        const verif = verifStep(step, formData)
        if(verif.status === true){
            setAlertMsg({msg: '', visible: false, type: 'error'})
            stepSpan.classList.remove('step-error')
            setLoader('ins')
            const data = {
                email: formData.email,
                password: formData.password,
                phoneNumber: formData.phoneNumber,
                name: formData.name,
                firstName: formData.firstName,
                userCode: 'none',
                shop: {
                    actualShop: [false, false, false, false, false],
                    command: {
                        price: 0,
                        rPrice: 0,
                        chap: [false, false, false, false, false]
                    }
                }
            }
            axios.post(process.env.NEXT_PUBLIC_SV_HOST + 'user/auth/signup', data)
                .then((res) => {
                    setLoader('')
                    if(res.data.message){
                        setAlertMsg({msg: res.data.message, visible: true, type: 'success'})
                        window.location = '/Compte#inscription-menu'
                    }else if(res.data.messageError){
                        setAlertMsg({msg: res.data.messageError, visible: true, type: 'error'})
                    }
                })
                .catch((error) => {
                    setLoader('')
                    setAlertMsg({msg: 'Erreur inattendue', visible: true, type: 'error'})
                })
        }else{
            setAlertMsg({msg: verif.message, visible: true, type: 'error'})
            stepSpan.classList.add('step-error')
        }
    }
    const submitCon = (e) => {
        e.preventDefault()
        const data = formData2
        setLoader('con')
        axios.post(process.env.NEXT_PUBLIC_SV_HOST + 'user/auth/login', data)
            .then(res => {
                setLoader('')
                if(res.data.token){
                    setAlertMsg2({msg: 'Connexion réussie !', visible: true, type: 'success'})
                    Cookies.remove('adminId')
                    Cookies.remove('jwt-admin')
                    Cookies.set('jwt', res.data.token, { expires: 1 })
                    Cookies.set('userId', res.data.userId, { expires: 1 })
                    window.location = '/Compte'
                }else if(res.data.messageError){
                    setAlertMsg2({msg: res.data.messageError, visible: true, type: 'error'})
                }
            })
            .catch(error => {
                setLoader('')
                setAlertMsg2({msg: 'Erreur inattendue', visible: true, type: 'error'})
            })
    }

    return <section className="connexion-menu">
        <article className="white-background">
            <h3 className="mb3">Vous n`êtes pas connecté</h3>
            <StepCours data={stepData}/>
            <div>
                <h4 className="mb4">Veuillez vous connecter</h4>
                <Link href="/Compte#connexion-menu">
                    <a><button className="btn-primary">Connexion</button></a>
                </Link>
                <h4 className="mb4">Ou inscrivez vous</h4>
                <Link href="/Compte#inscription-menu">
                    <a><button className="btn-primary">Inscription</button></a>
                </Link>
            </div>
        </article>
        <article className="white-background" id="connexion-menu">
            <h3 className="mb3">Connexion</h3>
            <form action="" method="post" onSubmit={submitCon}>
                <label htmlFor="email-con" className="mb4">Email:</label>
                <input type="mail" id="email-con" className="input-primary" onChange={handleForm2} value={formData2.email} placeholder="exemple@gmail.com"/>
                <label htmlFor="pass-con" className="mb4">Mot de passe:</label>
                <input type="password" id="pass-con" className="input-primary" onChange={handleForm2} value={formData2.password}/>
                <FormMsg msg={alertMsg2.msg} visible={alertMsg2.visible} type={alertMsg2.type}/>
                
                <div>
                    <button className="btn-primary" type="submit">Se connecter</button>
                    {loader === 'con' ? <Loader/>: ''}
                </div>
            </form>
        </article>
        <article className="white-background" id="inscription-menu">
            <h3 className="mb3">Inscription</h3>
            <div className="completion">
                <div className="progress-bar">
                    <div style={step >= 2? {background: '#2978d3'}: {background: 'rgba(194, 194, 194, 0.5)'}}></div>
                    <div style={step > 2? {background: '#2978d3'}: {background: 'rgba(194, 194, 194, 0.5)'}}></div>
                </div>
                <span className="step-span-1">1</span>
                <span className="step-span-2">2</span>
                <span className="step-span-3">3</span>
            </div>
            <form action="" method="post" onSubmit={submitIns}>
               <div style={{transform: `translateX(${-(step - 1)*(100 / 3)}%)`}}> 
                <div className="ins-stape-1">
                    <div>            
                        <label htmlFor="email-ins" className="mb4">Email: *</label>
                        <input type="mail" id="email-ins" className="input-primary" onChange={handleForm} value={formData.email}  placeholder="exemple@gmail.com"/>
                    </div>
                    <div>
                        <label htmlFor="pass-ins" className="mb4">Mot de passe: *</label>
                        <input type="password" id="pass-ins" className="input-primary" onChange={handleForm} value={formData.password}/>
                    </div>
                    <div>
                        <label htmlFor="pass-verif-ins" className="mb4">Vérifier: *</label>
                        <input type="password" id="pass-verif-ins" className="input-primary" onChange={handleForm} value={formData.passwordVerif}/>
                    </div>
                </div>
                
                <div className="ins-stape-2">
                    <div>
                        <label htmlFor="name-ins" className="mb4">Nom: *</label>
                        <input type="text" id="name-ins" className="input-primary" onChange={handleForm} value={formData.name} placeholder="Doe"/>
                    </div>
                    <div>
                        <label htmlFor="first-name-ins" className="mb4">Prenom: *</label>
                        <input type="text" id="first-name-ins" className="input-primary" onChange={handleForm} value={formData.firstName} placeholder="John"/>
                    </div>
                </div>

                <div className="ins-stape-3">
                    <div>
                        <label htmlFor="num-ins" className="mb4">Numéro de téléphone: *</label>
                        <input type="number" id="num-ins" className="input-primary" onChange={handleForm} value={formData.phoneNumber} placeholder="+237698541236"/>
                    </div>
                    <div>
                        <label htmlFor="city-ins" className="mb4">Ville: *</label>
                        <input type="text" id="city-ins" className="input-primary" onChange={handleForm} value={formData.city} placeholder="Paris"/>
                    </div>
                    <div>
                        <button className="btn-primary" type="submit">S`inscrire</button>
                        {loader === 'ins'? <Loader/>: ''}
                    </div>
                </div>
                </div>
            </form>
            <FormMsg msg={alertMsg.msg} visible={alertMsg.visible} type={alertMsg.type}/>
            <div className="btn-form-naviguation">
                {step > 1? <button onClick={() => {actionStep(-1)}}><span></span>Precédent</button> : <span></span>}
                {step < 3? <button onClick={() => {actionStep(1)}}>Suivant <span></span></button> : <span></span>}
            </div>
        </article>
    </section>
}

export default function Compte(){
    const [isConnect, setConnect] = useState(false)
    const [userData, setUserData] = useState(null)
    useEffect(() => {
        const userId = Cookies.get('userId')
        const token = Cookies.get('jwt')
        if(userId && token){
            setConnect(true)
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            axios.get(process.env.NEXT_PUBLIC_SV_HOST+'data/get?id='+userId, config)
                .then(d => {
                    if(d.data !== null){
                        setUserData(d.data)
                    }else{
                        Cookies.remove('userId')
                        Cookies.remove('jwt')
                        window.location = '/Compte'
                    }
                })
                .catch(error => {
                    setUserData(null)
                })
        }else setConnect(false)
    },[])  
    const bookData = {
        totalPrice: 100,
        rPrice: 150,
        data: [
            {
                img: '/img/book.png',
                price: 30,
                rPrice: 10
            },
            {
                img: '/img/book.png',
                price: 30,
                rPrice: 10
            },
            {
                img: '/img/book.png',
                price: 30,
                rPrice: 10
            },
            {
                img: '/img/book.png',
                price: 30,
                rPrice: 10
            },
            {
                img: '/img/book.png',
                price: 30,
                rPrice: 10
            },
        ] 
    }
    
    return(<>
        <Head>
            <title>ETB | Compte</title>
        </Head>
        <header id="account-header">
            <NavBar/>
        </header>
        <main id="account-main">
            {isConnect && userData !== null? <UserInfo bookD={bookData} userDatas={userData}/> : <ConnectMenu />}
        </main>
        <Footer/>
    </>)
}
