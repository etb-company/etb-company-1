import { useEffect, useRef } from "react"
import ErrorBookPage from "./ErrorBookPage"

export default function BookContainer ({ data, isError}) {
    useEffect(() => {
        const d = document.getElementById('book-container-data')
        if(!isError.getError && !isError.internetError && d !== null){
            d.innerHTML = data
        }
    }, [data, isError])

    return <div  className={isError.getError? 'error-book-container': ''}>
        {!isError.getError?<div id="book-container-data"></div>:''}
        {isError.getError? <ErrorBookPage isInternetError={isError.internetError}>{data}</ErrorBookPage>: ''}
    </div>
}