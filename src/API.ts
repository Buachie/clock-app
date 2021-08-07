export type Location = {
    abbreviation: string;
    client_ip: string;
    datetime: string;
    day_of_week: number;
    day_of_year: string;
    dst: boolean;
    dst_from: string;
    dst_offset: number;
    dst_until: string;
    raw_offset: number;
    timezone: string;
    unixtime: number;
    utc_datetime: string;
    utc_offset: string;
    week_number: number;
}

export type Quote = {
    _id: string,
    content: string,
    author: string, 
    authorSlug: string,
    length: number,
    tags: string[]
}

export const fetchLocation = async() => {
    const endpoint:string = 'http://worldtimeapi.org/api/ip';
    const data:any = await(await fetch(endpoint)).json();
    //console.log(data);
    return data as Location; 
}

export const fetchQuote = async() => {
    const endpoint:string = 'https://api.quotable.io/random';
    const data:any = await(await fetch(endpoint)).json();
    return data as Quote;
}