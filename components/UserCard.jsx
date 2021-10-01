import { useState } from "react";
import ModifUserChap from "./ModifUserChap";

const isSame = (tab1, tab2) => {
    if(tab1.length !== tab2.length) {
        return false
    }else{
        let test = true
        tab1.forEach((elt, k) => {
            if(elt !== tab2[k]){
                test = false
            }
        })
        return test
    }
}

export default function UserCard({options}){
    const actualShop = []
    const actualCommand = []
    options.userShop.actualShop.forEach((elt, k) => {
        if(elt){
            actualShop.push(<span key={'chap' + k}>Chap {k+1}</span>)
        }
    })
    if(!isSame(options.userShop.command.chap, options.userShop.actualShop)){
        options.userShop.command.chap.forEach((elt, k) => {
            if(elt && !options.userShop.actualShop[k]){
                actualCommand.push(<span key={'comm'+k}>Chap {k+1}</span>)
            }
        })
    }else{
        actualCommand.push('Pas de commande pour l\'instant')
    }

    return <div className="user-card">
        <h4 className="mb4">Nom: {options.userName}</h4>
        <h4 className="mb4">Email: {options.userMail}</h4>
        <div className="shop-details">
            <h4 className="mb4">Chapitres achetés</h4>
            {actualShop.length > 0? actualShop: 'Aucun chapitre acheté'}
        </div>
        <div className="shop-details">
            <h4 className="mb4">Chapitres commandés</h4>
            <h4 className="mb4">Total: {options.userShop.command.price} €</h4>
            {actualCommand}
        </div>
        <ModifUserChap options={options}/>
    </div>
}