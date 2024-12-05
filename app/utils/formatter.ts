import { format } from 'timeago.js';

export const formatNumbers = (num: number) => {
    const formatter = Intl.NumberFormat('en', { notation: 'compact' });
    const formattedNumber = formatter.format(num);
    return formattedNumber;
}
export const formatDate = (date: string) => {
    const formattedDate = format(date);
    return formattedDate;
}