import { useEffect, useState } from "react"
import NavBar from "../components/NavBar"
import Head from "next/head"
import FormMsg from "../components/FormMsg"
import Loader from "../components/Loader"
import UserCard from "../components/UserCard"
import axios from 'axios'
import Cookies from "js-cookie"
import BtnConfirmation from "../components/BtnConfirmation"

const LOGOUT_ADMIN_TEXT = "Vous êtes sur le point de vous deconnecter du mode administrateur. </br> Voulez-vous continuer ?"

export default function Admin(){
    const [userDatas, setUserData] = useState([])
    const [isConnect, setIsConnect] = useState(false)
    const [loader, setLoader] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [alertMsg2, setAlertMsg2] = useState({
        msg: '',
        visible: false,
        type: 'error'
    })
    const [userCards, setUserCards] = useState([])

    const parseUserData = (datas) => {
        if(!datas) return

        setUserCards([null])
        datas.forEach((elt, k) => {
            const options = {
                userId: elt._id,
                userName: elt.name,
                userMail: elt.email,
                userShop: elt.shop
            }
            let userCard = <UserCard options={options} key={elt.email}/>
            setUserCards(userCards => [userCard, ...userCards])
        })
    }

    useEffect(() => {
        const adminId = Cookies.get('adminId')
        const adminToken = Cookies.get('jwt-admin')

        if(adminId && adminToken){
            setIsConnect(true)

            const config = {
                headers: { Authorization: `Bearer ${adminToken}` }
            }

            axios.get(process.env.NEXT_PUBLIC_SV_HOST + 'admin/getall?id='+ adminId, config)
                .then(res => {
                    const datas = res.data
                    setUserData(datas)
                    parseUserData(datas)
                })
                .catch(error => {
                    throw new Error('Erreur inatendue')
                })
        }
    }, [])

    const handleForm = (e) => {
        const id = e.target.id
        if(id === 'admin-email-con'){
            setFormData(s => {return {...s, email: e.target.value}})
        }
        if(id === 'admin-pass-con'){
            setFormData(s => {return {...s, password: e.target.value}})
        }
    }
    const adminConnect = (e) => {
        e.preventDefault()
        setLoader(true)
        const data = formData

        axios.post(process.env.NEXT_PUBLIC_SV_HOST + 'admin/login', data)
            .then(res => {
                setLoader(false)
                if(res.data.token){
                    Cookies.remove('jwt')
                    Cookies.remove('userId')

                    setAlertMsg2({msg: 'Connexion réussie !', visible: true, type: 'success'})
                    Cookies.set('jwt-admin', res.data.token, { expires: 1 })
                    Cookies.set('adminId', res.data.userId, { expires: 1 })
                    window.location = '/Admin'
                }else if(res.data.messageError){
                    setAlertMsg2({msg: res.data.messageError, visible: true, type: 'error'})
                }
            })
            .catch(error => {
                setLoader('')
                setAlertMsg2({msg: 'Erreur inattendue', visible: true, type: 'error'})
            })
    }
    const submitAdminLogout = () => {
        Cookies.remove('adminId')
        Cookies.remove('jwt-admin')
        window.location = '/Admin'
    }

    return <>
        <Head>
            <title>ETB | GodMode</title>
        </Head>
        <header id="account-header">
            <NavBar/>
        </header>
        <main id="admin-container">
            
            {isConnect? 
                <section id="users-control">
                    <div className="admin-log">
                        <h2 className="mb2">Control Users</h2>
                        <BtnConfirmation type="alert" text={LOGOUT_ADMIN_TEXT} onHandleClick={submitAdminLogout}>Se déconnecter</BtnConfirmation>
                    </div>
                    <div className="users-details-container">
                        {userCards}
                    </div>
                
                </section>
            :
                <section id="Admin-connection">
                    <form action="" method="post" onSubmit={adminConnect}>
                        <label htmlFor="admin-email-con" className="mb4">Email:</label>
                        <input type="mail" id="admin-email-con" className="input-primary" onChange={handleForm} value={formData.email} placeholder="exemple@gmail.com"/>
                        <label htmlFor="admin-pass-con" className="mb4">Mot de passe:</label>
                        <input type="password" id="admin-pass-con" className="input-primary" onChange={handleForm} value={formData.password}/>
                        <FormMsg msg={alertMsg2.msg} visible={alertMsg2.visible} type={alertMsg2.type}/>
                        
                        <div>
                            <button className="btn-primary" type="submit">Se connecter</button>
                            {loader? <Loader/>: ''}
                        </div>
                    </form>
                </section>
            }
        </main>
    </>
}