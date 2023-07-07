import Usuario from "../model/Usuario.js"
const cadastrarUsuarioService = (body) => Usuario.create(body)
const pesquisarUsuarioPorCpfService = (cpf) => Usuario.findOne({cpf})
const pesquisarTodosOsUsuariosService = () => Usuario.find()
const editarStatusService = (_id,status) => Usuario.findByIdAndUpdate({_id},{status}, {new:true})

export{
    cadastrarUsuarioService,
    pesquisarUsuarioPorCpfService,
    pesquisarTodosOsUsuariosService,
    editarStatusService
}