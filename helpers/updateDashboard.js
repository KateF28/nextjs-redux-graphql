const fs = require('fs').promises

export const getNews = async () => {
    try {
        const newsSource = await fs.readFile('./data/news.json', 'utf-8');
        const newsData = JSON.parse(newsSource)
        return newsData.map(el => ({...el, dateOfReceiving: new Date(Date.now()).toLocaleDateString()}))
    } catch (error) {
        console.error("err", error.message)
    }
}

export const getDiscounts = async () => {
    const discountsSource = await fs.readFile('./data/discounts.json', 'utf-8');
    const discountsData = JSON.parse(discountsSource)
    return discountsData.map(el => ({...el, dateOfReceiving: new Date(Date.now()).toString()}))
}

export const getCars = async () => {
    const carsSource = await fs.readFile('./data/cars.json', 'utf-8');
    const carsData = JSON.parse(carsSource)
    return carsData.map(el => ({...el, dateOfReceiving: new Date(Date.now()).toString()}))
}