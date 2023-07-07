import Router from 'express'
import {
    cadastrarUsuario
} from '../controllers/UsuariosController/cadastroUsuario/index.js'
import {
    login
} from '../controllers/UsuariosController/login/index.js'
import {
    verificarToken
} from '../controllers/UsuariosController/verificarToken/index.js'
import {
    deletarToken
} from '../controllers/UsuariosController/deletarToken/index.js'
import {
    pesquisarUsuarioCpf
} from '../controllers/UsuariosController/pesquisarUsuarioCpf/index.js'
import {
    pesquisarTodosOsUsuarios
} from '../controllers/UsuariosController/pesquisarUsuarios/index.js'
import {
    adicionarMensagem
} from '../controllers/MensagemController/AdicionarMensagem/index.js'
import { pegarTodasAsMensagens } from '../controllers/MensagemController/PegarTodasAsMensagens/index.js'
import { editarStatus } from '../controllers/UsuariosController/editarStatus/index.js'
export const router = Router()


//Rotas do usuário

router.get('/pesquisar_usuarios', pesquisarTodosOsUsuarios)
router.post('/verificar_token', verificarToken)
router.post('/deletar_token', deletarToken)
router.post('/cadastro', cadastrarUsuario)
router.post('/login', login)
router.post('/pesquisar_usuario_cpf', pesquisarUsuarioCpf)
router.patch('/editar_status',editarStatus)


//Rotas da mensagem

router.post('/pegar_todas_mensagens', pegarTodasAsMensagens)
router.post('/adicionar_mensagem', adicionarMensagem)