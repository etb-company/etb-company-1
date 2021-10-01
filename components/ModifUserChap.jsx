import BtnConfirmation from '../components/BtnConfirmation'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import FormMsg from './FormMsg';

function strRandom(o) {
    var a = 10,
        b = 'abcdefghijklmnopqrstuvwxyz',
        c = '',
        d = 0,
        e = ''+b;
    if (o) {
      if (o.startsWithLowerCase) {
        c = b[Math.floor(Math.random() * b.length)];
        d = 1;
      }
      if (o.length) {
        a = o.length;
      }
      if (o.includeUpperCase) {
        e += b.toUpperCase();
      }
      if (o.includeNumbers) {
        e += '1234567890';
      }
    }
    for (; d < a; d++) {
      c += e[Math.floor(Math.random() * e.length)];
    }
    return c;
  }

export default function ModifUserChap({options}){
    const CONFIRM_CODE = "Vous allez generer un code pour cet utilisateur </br> Voulez-vous confirmer ?"

    const actualChop = options.userShop.actualShop
    const actualCommand = options.userShop.command.chap
    const [newActualChop, setNewActualChop] = useState({table: [...actualChop]})
    let checkbox = []

    const [code, setCode] = useState('')
    const [copyed, setCopyed] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)
    const [confGeneration, setConfGeneration] = useState({state: false, msg: '', type: 'success'})

    useEffect(() => {
        const c = strRandom({
            includeUpperCase: true,
            includeNumbers: true,
            length: 15
        });
        setCode(c)
        /**verif if is empty */
        let isEmp = false
        newActualChop.table.forEach((elt, k) => {
            if(elt && !actualChop[k]){
                setIsEmpty(true)
                isEmp = true
            }
        })
        if(!isEmp){
            setIsEmpty(false)
        }
        /**verif if is empty */
    }, [newActualChop])
    
    const copyToClipboard = () => {
        navigator.permissions.query({name: "clipboard-write"}).then(result => {
            if (result.state == "granted" || result.state == "prompt") {
                navigator.clipboard.writeText(code).then(function() {
                    /* clipboard successfully set */
                    setCopyed(true)
                    const time = setTimeout(() => {
                        setCopyed(false)
                        clearTimeout(time)
                    }, 2000)
                }, function() {
                    /* clipboard write failed */
                })
            }
        });
    }

    actualCommand.forEach((elt, k) => {
        if(elt && !actualChop[k]){
            const ch = <div key={k}>
                <input type="checkbox" 
                    name="" id={"admin-check-"+ k} 
                    value={newActualChop.table[k]} 
                    onChange={(e) => {
                        let r = [...newActualChop.table]
                        r[k] = e.target.checked
                        setNewActualChop({...newActualChop, table: r})
                    }}
                />
                <label htmlFor={"admin-check-"+ k}><span>Chap {k+1}</span></label>
            </div>
            checkbox.push(ch)
        }
    })
    const submitCode = () => {
        const data = {
            userId: options.userId,
            code: code,
            chap: newActualChop.table
        }
        const adminId = Cookies.get('adminId')
        const adminToken = Cookies.get('jwt-admin')

        if(adminId && adminToken){
            const config = {
                headers: { Authorization: `Bearer ${adminToken}` }
            }

            axios.put(process.env.NEXT_PUBLIC_SV_HOST + 'admin/addcode?id='+ adminId, data, config)
                .then(res => {
                    setConfGeneration({...confGeneration, msg: res.data.message, state: true})
                    const time = setTimeout(() => {
                        setConfGeneration({...confGeneration, msg: '', state: false})
                        clearTimeout(time)
                    }, 4000)
                })
                .catch(error => {
                    setConfGeneration({...confGeneration, msg: 'Erreur inatendue', state: true, type: 'error'})
                    const time = setTimeout(() => {
                        setConfGeneration({...confGeneration, msg: '', state: false})
                        clearTimeout(time)
                    }, 4000)
                })
        }else{
            Cookies.remove('adminId')
            Cookies.remove('jwt-admin')
            window.location = '/Admin'
        }
    }

    return <div>
        <div className="upgrade-chop">
            <h4 className="mb4">Ajouter des chapitres</h4>
            {checkbox.length > 0? checkbox: 'Pas de chapitre à ajouter'}
        </div>
        <div className="user-code">
            <div>
                <span>{isEmpty? code: 'Sélectionner un chapitre'}</span>
                <span onClick={copyToClipboard}>{!copyed?<Image src="/img/copy.svg" width={35} height={35} alt="Copier"/>: <Image src="/img/copy-succes.svg" width={45} height={45} alt="Copier!"/>}</span>
            </div>
            <BtnConfirmation state={isEmpty} type="Succes" text={CONFIRM_CODE} onHandleClick={submitCode}>Generer</BtnConfirmation>
            <FormMsg msg={confGeneration.msg} visible={confGeneration.state} type={confGeneration.type}/>
        </div>
    </div>
}