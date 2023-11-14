const addZero = v => v < 10 ? `0${v}` : v 


export const convertDate = (d,type = 'full') => {
    console.log(d)
    let date = new Date(d)

    return type == 'full' ? `${addZero(date.getHours())}:${addZero(date.getMinutes())} 
    ${addZero(date.getDate())}/${addZero(date.getMonth() + 1)}/${date.getFullYear()}`
    : type == 'date' ? `${addZero(date.getDate())}/${addZero(date.getMonth() + 1)}/${date.getFullYear()}`
    : ''
}
