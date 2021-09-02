const fs = require('fs').promises
const path = require('path')

export const updateUser = async (userId, visitCounts) => {
    try {
        const source = await fs.readFile(path.resolve('data/users.json'), 'utf-8');
        const data = JSON.parse(source)
        const newData = data.map(el => el.userId === userId ? {...el, visitCounts} : el)
        await fs.writeFile(path.resolve('data/users.json'), JSON.stringify(newData, null, 4))
    } catch (error) {
        console.error(error.message)
    }
}