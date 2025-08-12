import './Prontuario.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendar, faPlus, faRectangleList} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const Prontuario = ({abaAtiva, onMudarAba}) => {

    const [busca, setBusca] = useState(""); 
    
    return(
        <div className="prontuario-container">
            <div className="prontuario-header">
                <h1 className="prontuario-titulo">Sistema de Prontuários</h1>
                <p className="prontuario-subtitulo">Gerencie prontuários de pacientes e gere declarações profissionais</p>
            </div>
            <div className="action-bar">
                <div className="search-wrapper">
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Buscar por nome ou tipo de terapia"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                </div> 
                <NavLink to='/novoProntuario' className="btn-novo-prontuario">
                    <FontAwesomeIcon icon={faPlus} /> Novo prontuário
                </NavLink>
            </div>
            <div className='header-button-group'>
                <button onClick={() => onMudarAba('novo')} className={`header-button ${abaAtiva === "novo" ? "active" : ""}`}>
                    <FontAwesomeIcon icon={faCalendar} /> Prontuários
                </button>
                <button onClick={() => onMudarAba('modelosDeclaracoes')} className={`header-button ${abaAtiva === "modelosDeclaracoes" ? "active" : ""}`}>
                    <FontAwesomeIcon icon={faRectangleList} /> Modelos e Declarações
                </button>
            </div>

        </div>
    );
};

export default Prontuario;