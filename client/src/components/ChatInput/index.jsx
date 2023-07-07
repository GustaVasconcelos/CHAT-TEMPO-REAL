import { useState } from 'react'
import './style.css'
import {FaPaperPlane} from 'react-icons/fa'
export const ChatInput = ({enviarMensagem}) =>{
    const [mensagem,setMensagem] = useState('')

    //Enviando mensagem para o banco de dados

    const enviarChat = () =>{
        if(mensagem.length > 0){
            enviarMensagem(mensagem)
            setMensagem('')
        }
    }
    return(
        <div className='container-chat-input'>
            <div className='container-chat-input-texto'>
                <input value={mensagem} onChange={(e) => setMensagem(e.target.value)} type='text' placeholder='Digite sua mensagem'></input>
            </div>
            <div className='container-chat-input-enviar' onClick={enviarChat}>
                <FaPaperPlane/>
            </div>
        </div>
    )
}