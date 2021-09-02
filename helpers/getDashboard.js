const fs = require('fs').promises
const path = require('path')

export const getNews = async () => {
    try {
        const newsSource = await fs.readFile(path.resolve('data/news.json'), 'utf-8');
        const newsData = JSON.parse(newsSource)
        return newsData.map(el => ({...el, dateOfReceiving: new Date(Date.now()).toLocaleDateString()}))
    } catch (error) {
        console.error(error.message)
    }
}

export const getDiscounts = async () => {
    try {
        const discountsSource = await fs.readFile(path.resolve('data/discounts.json'), 'utf-8');
        const discountsData = JSON.parse(discountsSource)
        return discountsData.map(el => ({...el, dateOfReceiving: new Date(Date.now()).toString()}))
    } catch (error) {
        console.error(error.message)
    }
}

export const getCars = async () => {
    try {
        const carsSource = await fs.readFile(path.resolve('data/cars.json'), 'utf-8');
        const carsData = JSON.parse(carsSource)
        return carsData.map(el => ({...el, dateOfReceiving: new Date(Date.now()).toString()}))
    } catch (error) {
        console.error(error.message)
    }
}