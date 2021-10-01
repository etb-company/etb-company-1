export default function BtnSouscription({className, children, link=''}){
    const handleClick = (e) => {
        if(link !== ''){
            window.location = link
        }
    }
    return <button className={'btn-primary '+ className} onClick={handleClick}>
        {children}
    </button>
}