import express,{Request,Response,NextFunction} from 'express';
import cookieParser from "cookie-parser"
import cors from 'cors';
import morgan from "morgan"
import { db } from './config/db';
import { corsOptions } from './config/cors';
import authrouts from './presentation/routes/authrouts';
import bookrouts from './presentation/routes/bookrouts';
import http from 'http';
import { Server } from 'socket.io';
import { checkoutrouter } from './presentation/routes/checkoutrouts';
import {socketConnection} from "./utils/socket"
import { errorHandler } from './presentation/middleware/errorhandler';
import { adminrouter } from './presentation/routes/adminrouts';
import { AppError } from './config/AppError';
const app=express()
const server=http.createServer(app)
app.use(cors(corsOptions));

const io = new Server(server, {
    cors: corsOptions,
    path: "/ws", 
})
// middileware error handle
export{io}
socketConnection()
db()
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded())
app.use(morgan('dev'))
app.use('/api',authrouts)
app.use('/api/book',bookrouts)
app.use('/api/checkout',checkoutrouter)
app.use('/api/admin',adminrouter)

app.use((err: AppError, req: Request, res: Response, next: NextFunction) =>
  {
    
    errorHandler(err, req, res, next)
  }  
);  

export {server}


