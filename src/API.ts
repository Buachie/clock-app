import axios from "axios"

export type TimeData = {
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

export type Location = {
    ip: string,
    country_code: string,
    country_name: string,
    region_code:  string,
    region_name: string,
    city: string,
    zip_code: string,
    time_zone: string,
    latitude: string,
    longitude: string,
    metro_code: number
}


export const fetchTimeData = async() => {
    const endpoint:string = 'https://worldtimeapi.org/api/ip';
    const data:any = await(await fetch(endpoint)).json();
    //console.log(data);
    return data as TimeData; 
}

export const fetchQuote = async() => {
    const endpoint:string = 'https://api.quotable.io/random';
    const data:any = await(await fetch(endpoint)).json();
    return data as Quote;
}

export const fetchLocation = async() => {
    const endpoint:string = 'https://freegeoip.app/json/';
    //const data:any = await fetch(endpoint);
    const data = axios.get(endpoint)
        .then ((res) => {
            return res.data
        })
    //console.log(data);
    return data as unknown as Location;
}