import CodeValidator from "./CodeValidator";


export default function ErrorBookPage({children, isInternetError}) {

    return <div>
        <h1 className="mb1">Oops !</h1>
        <p className="mb4">{children}</p>
        {!isInternetError? <CodeValidator/>: ''}
    </div>
}