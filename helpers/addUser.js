const fs = require('fs').promises

export const addUser = async (userId) => {
    try {
        const source = await fs.readFile('./data/users.json', 'utf-8');
        const data = source ? JSON.parse(source) : []; // handle logic with empty files
        const newUser = { userId, visitCounts: 1 };
        data.push(newUser);
        await fs.writeFile('./data/users.json', JSON.stringify(data, null, 4))
    } catch (error) {
        console.error(error.message)
    }
}