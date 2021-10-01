import { useState } from "react"
import Loader from '../components/Loader'
import Cookies from "js-cookie"
import axios from "axios"

export default function CodeValidator(){
    const [code, setCode] = useState('')
    const [req, setReq] = useState(false)
    const [reqState, setReqState] = useState(true)

    const submitCode = (e) => {
        e.preventDefault()
        const userId = Cookies.get('userId')
        const token = Cookies.get('jwt')
        if(userId && token){
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            const data ={
                code: code
            }
            setReq(true)
            axios.post(process.env.NEXT_PUBLIC_SV_HOST+'data/setcode?id='+userId, data, config)
                .then(res => {
                    setReq(false)
                    if(res.data.messageError){
                        setReqState(false)
                        const c = code
                        setCode(res.data.messageError)
                        const time = setTimeout(() => {
                            setReqState(true)
                            setCode(c)
                        }, 2000)
                    }else if(res.data.message){
                        const a = code
                        setCode(res.data.message)
                        const time = setTimeout(() => {
                            setCode(a)
                            window.location.reload()
                        }, 2000)
                    }
                })
                .catch(error => {
                    setReq(false)
                    setReqState(false)
                    const time = setTimeout(() => {
                        setReqState(true)
                    }, 2000)
                })
        }
    }
     
    return <div className="code-validator">
        <div className="loader-code">
            {req? <Loader />: ''}
        </div>
        <input 
            type="text" 
            name="Code validator" 
            id="" 
            className="input-primary" 
            placeholder="Code d'achat" 
            value={code}
            onChange={(e) => setCode(e.target.value)}
        />
        <button className={reqState? 'btn-primary': 'btn-primary alert'} disabled={!reqState} onClick={submitCode}>
            {reqState? 'Valider': 'Erreur'}
        </button>
    </div>
} 