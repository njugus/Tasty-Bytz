import express from 'express';
import route_1 from './Routes/users.routes.js';
import route_2 from './Routes/login.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();
const PORT = 3000;

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
    optionsSuccessStatus: 204
}));

app.use("/api/sign", route_1);
app.use("/api/login", route_2);

// app.post('/api/sign_up', (req, res) => {
//     res.send('Post Successfull!');
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

