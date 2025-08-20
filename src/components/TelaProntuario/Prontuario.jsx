import './Prontuario.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendar, faPlus, faRectangleList} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import ProntuarioList from './ProntuarioList'; 
import ModelosDeclaracoes from './ModelosDeclaracoes';

const Prontuario = () => {
    const [busca, setBusca] = useState("");
    const [abaAtiva, setAbaAtiva] = useState('prontuarios'); 

    return(
        <div className="prontuario-container">
            <div className="prontuario-header">
                <h1 className="prontuario-titulo">Prontuários</h1>
                <p className="prontuario-subtitulo">Gerencie prontuários de pacientes e gere declarações profissionais</p>
            </div>
            <div className="action-bar">
                <div className="search-wrapper">
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Buscar por nome do paciente"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                </div> 
                <NavLink to='/novoProntuario' className="btn-novo-prontuario">
                    <FontAwesomeIcon icon={faPlus} /> Novo prontuário
                </NavLink>
            </div>
            <div className='header-button-group'>
                <button onClick={() => setAbaAtiva('prontuarios')} className={`header-button ${abaAtiva === "prontuarios" ? "active" : ""}`}>
                    <FontAwesomeIcon icon={faCalendar} /> Prontuários
                </button>
                <button onClick={() => setAbaAtiva('modelosDeclaracoes')} className={`header-button ${abaAtiva === "modelosDeclaracoes" ? "active" : ""}`}>
                    <FontAwesomeIcon icon={faRectangleList} /> Modelos e Declarações
                </button>
            </div>

            <div className="conteudo-principal-prontuario">
                 {abaAtiva === 'prontuarios' && 
                    <ProntuarioList busca={busca} />
                 }
                {abaAtiva === 'modelosDeclaracoes' && <ModelosDeclaracoes />}
            </div>        
        </div>
    );
};

export default Prontuario;