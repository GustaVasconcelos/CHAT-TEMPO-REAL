import { Routes, Route } from 'react-router-dom'
import { Login } from '../pages/Login'
import { Cadastro } from '../pages/Cadastro'

import RotaPrivada from '../services/wAuth'
import { BatePapo } from '../pages/BatePapo'


const Conteudo = props => (
    <main >
        {/* Rotas existente do projeto*/}
        <Routes>
            <Route exact path="/" element={<Login/>}></Route>
            <Route exact path="/cadastro" element={<Cadastro/>}></Route>
            <Route exact path='/bate_papo' element={<RotaPrivada redirectTo='/'><BatePapo/></RotaPrivada>}></Route>

        </Routes>
    </main>
)


export default Conteudo