import styles from './style.module.css'
import { useState, useEffect } from 'react'

export const Mensagem = ({tipo, msg}) =>{
    const [visivel, setVisivel] = useState(false)

    useEffect(() =>{
        if(!msg){

            return setVisivel(false)
        }
        setVisivel(true)

        const tempo = setTimeout(() =>{
            setVisivel(false)
        },4000)

        return () => clearTimeout(tempo)

    },[msg]
    )

    return(
        <>
            {visivel &&(
                <div className={`${styles.mensagem} ${styles[tipo]}`}>
                    <p>{msg}</p>
                </div>
            )}
        </>

        
    )
}
