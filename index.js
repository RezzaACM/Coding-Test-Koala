import express from 'express';
import { Model } from 'objection';
import Knek from 'knex';
import api from './src/routes/api.js'

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const knek = Knek({
    client:'postgres',
    connection:{
        database: 'koala-test',
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'root',
    },
    log:{
        error(message){
            console.log(message)
        }
    }
})

Model.knex(knek);


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization,*"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.get('/', (req, res) => {
    res.json({
        status: true,
        messaage: "App is running!"
    })
})

app.use('/api', api)

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`)
}).setTimeout(3000)
