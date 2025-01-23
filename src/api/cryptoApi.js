import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const fetchCurrentPrice = async (crypto) => {
    const response = await axios.get(`${BASE_URL}/simple/price?ids=${crypto}&vs_currencies=usd&include_24hr_change=true`);
    return response.data[crypto];
};

export const fetchHistoricalData = async (crypto, timeframe) => {
    const response = await axios.get(`${BASE_URL}/coins/${crypto}/market_chart?vs_currency=usd&days=${timeframe}`);
    console.log(response)
    return {
        prices: response.data.prices,
        marketCaps: response.data.market_caps,
        totalVolumes: response.data.total_volumes,
    };
};

export const fetchOverviewData = async (crypto) => {
    const response = await axios.get(`${BASE_URL}/coins/${crypto}`);
    if (response.status === 429) {
        console.warn("Status code 419: Keeping the existing value.");
        return null;
    }
    return response.data;
};