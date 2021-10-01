
export default function FormMsg({msg = '', visible = false, type = 'success'}){

    return <div className={visible === true? 'form-message-container form-alert': 'form-message-container'}
                style={type === 'error'? {color: 'var(--error-color)'}: {color: 'var(--success-color)'}}>
        <div className="form-message"
                style={type === 'error'? {borderBottom: '5px solid var(--error-color)'}: {borderBottom: '5px solid var(--success-color)'}}>
            {msg}
        </div>
        {type === 'error'? 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" id="warning">
                <path d="M14.93 13.38L8.43 2.12A.5.5 0 008 1.88a.5.5 0 00-.43.25l-6.5 11.25a.5.5 0 00.43.76h13a.5.5 0 00.43-.76zM7.5 6.5c0-.07.06-.13.13-.13h.75c.06 0 .12.06.12.13v2.88c0 .06-.06.12-.12.12h-.75a.13.13 0 01-.13-.13V6.5zM8 12a.75.75 0 010-1.5.75.75 0 010 1.5z" fill="currentColor"></path>
            </svg>
        : 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="check">
                <path d="M12 2a10.01 10.01 0 000 20 10.01 10.01 0 000-20zm-2 14.41l-3.71-3.7 1.41-1.42 2.3 2.3 5.3-5.3 1.4 1.42-6.7 6.7z" fill="currentColor"></path>
            </svg>
        }
    </div>
}