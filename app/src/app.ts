import express from "express" // Importa o Express para criar o servidor da aplicação web
import router from "./routes" // Importa o arquivo router, que contém as rotas definidas
import { Pool, Client } from 'pg'; // // Importa a classe Pool do 'pg' para criar um pool de conexões com o banco de dados

const app = express() // Cria instância do express
const PORT = 8080 // Define a porta

const pool = new Pool({
    connectionString: "postgres://admin:123123@localhost:5432/primary_db"
});

// const poolSecondary = new Pool({
//     connectionString: process.env.POSTGRES_SECONDARY_URL
// });

// const poolTertiary = new Pool({
//     connectionString: process.env.POSTGRES_TERTIARY_URL
// });

async function queryDatabase(pool:any, query:any, serverName:any) {
    const client = await pool.connect();
    try {

        const res = await client.query(query);
        console.log(`Servidor ${serverName}:`, res.rows[0].message);
    } catch (err) {
        console.error(err);
    } finally {
        client.release();
    }
}

async function main() {
    await queryDatabase(pool, 'SELECT $1::text as message', 'Principal');
    // await queryDatabase(poolSecondary, 'SELECT $1::text as message', 'Secundário');
    // await queryDatabase(poolTertiary, 'SELECT $1::text as message', 'Terciário');
}

main();

app.use(router) // Usa o router para lidar com as requisições
app.listen(PORT, () => console.log(`⚡server is running on port: ${PORT}`)) // Inicia o servidor e printa a porta que está em uso.