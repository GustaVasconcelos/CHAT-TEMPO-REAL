import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import http from 'http'
import {Server} from 'socket.io'

import { router } from './src/routes/routes.js';
import { conectarBancoDeDados } from './src/database/db.js';

dotenv.config()


const port = 5000;
const app = express();
const server = http.createServer(app)
const io = new Server(server, {cors:{
    origin:'*',
    credentials:true
}})
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(router)
conectarBancoDeDados()

global.usuariosOnlines = new Map();
io.on("connection", socket => {
    global.chatSocket = socket
    socket.on("adicionar-usuario", (usuarioId) => {
        usuariosOnlines.set(usuarioId, socket.id);
      });

    socket.on("enviar-mensagem", (data) => {
    const enviarUsuarioSocket = usuariosOnlines.get(data.para);
    if (enviarUsuarioSocket) {
        socket.to(enviarUsuarioSocket).emit("mensagem-recebida", data.mensagem);
    }
    });

})

server.listen(port,console.log('Servidor rodando'))