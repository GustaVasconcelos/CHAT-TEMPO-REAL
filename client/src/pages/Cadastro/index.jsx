import React, { useState } from "react"
import './style.css'

import { Mensagem } from "../../components/MensagemAviso";
import { FaEyeSlash,FaEye, FaUserCircle,FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../services/api";

export const Cadastro = () =>{
    
    const [tipoInput, setTipoInput] = useState('password')
    const [msg,setMsg] = useState('')
    const [cpf, setCpf] = useState('')
    const [nome,setNome] = useState('')
    const [confirmacao, setConfirmacao] = useState('')
    const [senha, setSenha] = useState('')
    const [tipo, setTipo] = useState('')

    const cadastrar = async () =>{

        //enviando os dados necessários para o cadastro
        const data = {cpf,nome,senha,confirmacao}
        
        //limpando a mensagem de aviso, caso ela já tenha um dado
        if(msg){
            setMsg('')
            setTipo('')
        }

        try{
            const res = await api.post('/cadastro', data)
            if(res.data.status === 400){
                setMsg(res.data.mensagem)
                setTipo('erro')
                
            }else{
                console.log(res)
                setMsg(res.data.mensagem)
                setTipo('sucesso')
            }
        }catch(err){
            console.log(err)
        }
    }

    //Mudando o tipo do input, para o cliente exibir a senha ou não

    const mudarTipoInput = () =>{
        if(tipoInput === 'password'){
            setTipoInput('text')
        }else{
            setTipoInput('password')
        }
    }
    return(
        <main className="container-cadastro">
            <div className="container-cadastro-enfeite"></div>
            <section className="container-cadastro-imagem">

            </section>
            <section className="container-cadastro-formulario">
                <div className="container-cadastro-formulario-caixa">
                    <div className="container-cadastro-formulario-svg">
                        <FaUserCircle/>
                    </div>
                    <div className="container-cadastro-formulario-titulo">
                        <h2>Cadastro</h2>
                    </div>
                    <div className="container-cadastro-formulario-campos">
                        <div className="container-cadastro-formulario-campos-caixa-inputs">
                            <p>Cpf:</p>
                            <span>
                                <FaUserAlt/>
                                <input value={cpf} onChange={(e) => setCpf(e.target.value)} type="number"placeholder="Digite seu Cpf"></input>
                            </span>
                        </div>
                        <div className="container-cadastro-formulario-campos-caixa-inputs">
                            <p>Nome:</p>
                            <span>
                                <FaUserAlt/>
                                <input value={nome} onChange={(e) => setNome(e.target.value)} type="text"placeholder="Digite o seu nome"></input>
                            </span>
                        </div>
                        <div className="container-cadastro-formulario-campos-caixa-inputs">
                            <p>Senha:</p>
                            {
                                tipoInput === 'password'?(
                                    <span>
                                        <FaEyeSlash onClick={mudarTipoInput}/>
                                        <input value={senha} onChange={(e) => setSenha(e.target.value)} type="password"placeholder="digite sua senha"></input>
                                    </span>
                                ):(
                                    <span>
                                        <FaEye onClick={mudarTipoInput}/>
                                        <input value={senha} onChange={(e) => setSenha(e.target.value)} type="text"placeholder="Digite sua senha"></input>
                                    </span>
                                )
                            }
                        </div>
                        <div className="container-cadastro-formulario-campos-caixa-inputs">
                            <p>Confirmar senha:</p>
                            {
                                tipoInput === 'password'?(
                                    <span>
                                        <FaEyeSlash onClick={mudarTipoInput}/>
                                        <input value={confirmacao} onChange={(e) => setConfirmacao(e.target.value)} type="password"placeholder="digite sua senha novamente"></input>
                                    </span>
                                ):(
                                    <span>
                                        <FaEye onClick={mudarTipoInput}/>
                                        <input value={confirmacao} onChange={(e) => setConfirmacao(e.target.value)} type="text"placeholder="Digite sua senha novamente"></input>
                                    </span>
                                )
                            }
                        </div>
                    </div>
                    <div className="container-cadastro-formulario-botao">
                        <button onClick={cadastrar}>cadastro</button>
                        <Link to='/'>Já possui uma conta? Faça login!</Link>
                    </div>
                    <div className="container-cadastro-formulario-mensagem">
                        {msg&&
                            <Mensagem tipo={tipo} msg={msg}/>
                        }
                    </div>
                </div>
            </section>
        </main>
    )
}