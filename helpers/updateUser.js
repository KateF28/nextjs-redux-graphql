const fs = require('fs').promises

export const updateUser = async (userId, visitCounts) => {
    try {
        const source = await fs.readFile('./data/users.json', 'utf-8');
        const data = JSON.parse(source)
        const newData = data.map(el => el.userId === +userId ? {...el, visitCounts} : el)
        await fs.writeFile('./data/users.json', JSON.stringify(newData, null, 4))
    } catch (error) {
        console.error(error.message)
    }
}