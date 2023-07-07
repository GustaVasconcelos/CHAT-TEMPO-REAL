import React,{useEffect, useState} from "react";
import api from "./api";

import {Navigate} from 'react-router-dom'
import { desconectar, pegarToken } from "./localstorage";


import CircularProgress from '@mui/material/CircularProgress';

export default function WAuth({children, redirectTo}){
    const [redirect,setRedirect] = useState(false)
    const [loading,setLoading] = useState(true)

    useEffect(() =>{
        try{

            //Função para verificar o token do usuário, para permitir utilizar as rotas privadas
            const verify = async () =>{

                const data = {token:pegarToken()}
                if(data.token === null){
                    setLoading(false)
                    setRedirect(true)
                }else{
                    const res = await api.post('/verificar_token',data)
                    if(res.data.status === 400 || res.data.status === 401){
                        desconectar()
                        setLoading(false)
                        setRedirect(true)
                        
                    }else{
                        setLoading(false)
                        setRedirect(false)
                    }
                }
            
            }

            verify()

        }catch(err){
            console.log(err)
        }

    },[])

    return loading?<CircularProgress/>:!redirect? children : <Navigate to={redirectTo}/>
};