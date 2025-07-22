export default {
    db: {
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        client: 'pg',
        name: process.env.DB_NAME
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        ttl: '1d'
    },
    port: process.env.PORT || 3000,
    hashSalt: 10,
}