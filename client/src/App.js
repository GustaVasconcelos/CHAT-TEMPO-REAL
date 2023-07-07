
import './App.css';
import {BrowserRouter as Rotas} from 'react-router-dom';
import Conteudo from './routes/routes.js';

function App() {
    return (
        <Rotas>
            <Conteudo></Conteudo>
        </Rotas>
    );
}

export default App;