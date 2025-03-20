import { format } from 'timeago.js';

export const formatDate = (date: string) => {
    const formattedDate = format(date);
    return formattedDate;
}

export const formatDuration = (duration: string) => {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

    const hours = match![1] ? match![1].padStart(2, '0') : '00';
    const minutes = match![2] ? match![2].padStart(2, '0') : '00';
    const seconds = match![3] ? match![3].padStart(2, '0') : '00';

    return hours !== '00' ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
}

export const formatNumbers = (num: number) => {
    const formatter = Intl.NumberFormat('en', { notation: 'compact' });
    const formattedNumber = formatter.format(num);
    return formattedNumber;
}