export default {
    db: {
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        client: 'pg',
        name: process.env.DB_NAME
    },
    port: process.env.PORT || 3000
}