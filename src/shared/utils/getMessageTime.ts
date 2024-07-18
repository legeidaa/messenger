export function getMessageTime(timestamp: string) {
    const date = new Date(timestamp)
    const currentDate = new Date()
    
    const monthNames = ["Янв", "Февр", "Марта", "Апр", "Мая", "Июня", "Июля", "Авг", "Сент", "Окт", "Нояб", "Дек",];

    let resultTime = ''
    if (date.getMonth() !== currentDate.getMonth()) {
        resultTime = `${date.getDate()} ${monthNames[date.getMonth()]}`

        if (date.getFullYear() !== currentDate.getFullYear()) {
            resultTime += ` ${date.getFullYear()}`
        }
    }
    
    const testDate = new Date(date)
    const testCurrentDate = new Date(currentDate)
    if (testDate.setHours(0, 0, 0, 0) === testCurrentDate.setHours(0, 0, 0, 0)) {
        resultTime = date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
    }

    return resultTime
}