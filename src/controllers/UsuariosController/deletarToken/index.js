import jwt from 'jsonwebtoken'

/*-----verificar token -----*/
export const deletarToken = (req,res) =>{
    //Campo necessário para deletar
    const token = req.body.token || req.query.token || req.cookies.token || req.headers['x-access-token'];

    //Excluindo o token
    if(!token){
        res.status(200).json({message:"Logout não autorizado", status:401})
    }
    res.cookie('token',null,{httpOnly:true})
    res.status(200).json({mensagem:"Sessão finalizada"})
}