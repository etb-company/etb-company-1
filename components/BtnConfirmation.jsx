
const BtnConfirmation = ({children, type, onHandleClick, text, state = true}) => {
    const getTop = () => {
        const scroll = window.scrollY
        const height = window.innerHeight

        return (scroll)
    }


    const loadBtnBox = () => {
        const btnRemoveBox = document.querySelector('#btn-remove-box')
        const btnConfirmBox = document.querySelector('#btn-confirm-box')
        const crossBtn = document.querySelector('#cross')

        btnRemoveBox.addEventListener('click', function(e){
            e.preventDefault()
            const body = document.querySelector('body')
            body.classList.remove('bluring')
            
            const box = document.querySelector('#alert-box')
            box.remove()
        }, {once: true})
        btnConfirmBox.addEventListener('click', function(e){
            e.preventDefault()
            const body = document.querySelector('body')
            body.classList.remove('bluring')

            onHandleClick()
            const box = document.querySelector('#alert-box')
            box.remove()
        })
        crossBtn.addEventListener('click', function(e){
            e.preventDefault()
            const body = document.querySelector('body')
            body.classList.remove('bluring')
            
            const box = document.querySelector('#alert-box')
            box.remove()
        }, {once: true})
    }

    const btnConfirmClick = (e) => {
        e.preventDefault()
        const body = document.querySelector('body')
        const contentDiv = `<div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#2978d3" viewBox="0 0 16 16" id="info">
                    <path fill="#2978d3" d="M8.93 6.59l-2.29.29-.08.38.45.08c.3.07.35.17.29.47l-.74 3.47c-.2.9.1 1.31.8 1.31.55 0 1.18-.25 1.47-.6l.09-.41c-.2.18-.5.25-.69.25-.27 0-.37-.2-.3-.54l1-4.7zM8 5.5a1 1 0 100-2 1 1 0 000 2z"></path>
                </svg>
                <h3 class="mb2">Alert</h3>
            </div>
            <div>
                <h4 class="mb4">${text}</h4>
                <div>
                    <button class="btn-primary" id="btn-remove-box">Annuler</button>
                    <button class="${type === 'alert'? 'btn-primary alert': 'btn-primary'}" id="btn-confirm-box">Confirmer</button>
                </div>
            </div>
            <div id="cross"></div>
        </div>`

        body.classList.add('bluring')
        body.insertAdjacentHTML('beforeend', `<div id="alert-box" style="top: ${getTop()}px;">${contentDiv}</div>`)
        loadBtnBox()
    }

    return <>
        <button className={type === 'alert'? 'btn-primary alert': 'btn-primary'} onClick={btnConfirmClick} disabled={!state}>{children}</button>
    </>
}
 
export default BtnConfirmation;