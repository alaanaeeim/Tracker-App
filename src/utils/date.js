export const formatDates = (date) => {
    return date.toISOString().slice(0,10);
}

export const getDateMinusDatse = (date, days) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}