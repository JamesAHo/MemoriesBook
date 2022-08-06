const bcrypt = require('bcrypt');

const PasswordSecurity = async (req , res ) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
    } catch {
        return res.status(400).json({ error: 'Invalid password' });

    }
}

module.exports = { PasswordSecurity }

