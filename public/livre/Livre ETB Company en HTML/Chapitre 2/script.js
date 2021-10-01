
const input = `bonjour="ok"`

let r = input.split('')
let s = []
r.forEach((e, k) => {
    let h = e
    if(h === '"'){
        h = '\"'
    }
    s[k] = h
})
let sort = s.join('')
console.log(sort);