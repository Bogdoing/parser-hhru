import { Pool } from 'pg'
 
// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL + "?sslmode=require",
// })

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'StatsHH',
  password: 'postgres',
  port: 5432, // или порт, указанный в вашей настройке PostgreSQL
});

pool.connect((err) => {
    if (err) throw err
    console.log("Connect to PostgreSQL successfully!")
})

export default pool;