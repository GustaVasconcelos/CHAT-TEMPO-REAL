import { pesquisarUsuarioPorCpfService, cadastrarUsuarioService } from "../../../services/usuario.services.js";

//Função para verificar se o cpf é válido
const verificarCpf = (cpf) => {
    var Soma;
    var Resto;
    Soma = 0;
  if (cpf == "00000000000") return false;

  for (let i=1; i<=9; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(cpf.substring(9, 10)) ) return false;

  Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(cpf.substring(10, 11) ) ) return false;
    return true;
}

export const cadastrarUsuario = async (req,res) =>{
    
    //Campos necessários para o cadastro do usuario
    const {cpf,nome,senha,confirmacao,status} = req.body

    //Verificando se há campos vázios
    if(!cpf || !nome || !senha || !confirmacao){
        return res.status(200).json({mensagem:"Há campos vázios!", status:400})
    }

    //Verificando se o cpf é válido
    const cpfValido = verificarCpf(cpf)
    if(!cpfValido){
        return res.status(200).json({mensagem:"Cpf inválido!", status:400})
    }
    
    //verificação se as senhas são diferentes
    if(senha !== confirmacao){
        return res.status(200).json({mensagem:"As senhas são diferentes!", status:400})
    }

    //verificação se a senha tem no minimo 6 digitos
    if(senha.length < 6){
        return res.status(200).json({mensagem:"A senha precisa ter no minimo 6 digitos!", status:400})

    }
    try{
        //verificando se o usuário já existe
        const verificarUsuario = await pesquisarUsuarioPorCpfService(cpf)

        if(verificarUsuario){
            return res.status(200).json({mensagem:"Cpf já está em uso!", status:400})

        }
        //cadastrando o usuário
        const data = {cpf,nome,senha,status:'offline'}
        const usuarioCadastrado = await cadastrarUsuarioService(data)
        return res.status(200).json({mensagem:"Usuário cadastrado!", usuarioCadastrado})
        
        
    }catch(err){
        return res.status(500).json({mensagem: "Erro ao cadastrar o usuário", err});
    }
}


