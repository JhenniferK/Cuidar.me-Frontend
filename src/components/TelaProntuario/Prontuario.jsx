import './Prontuario.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendar, faPlus, faRectangleList} from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import ProntuarioList from './ProntuarioList';
import ModelosDeclaracoes from './ModelosDeclaracoes';

const Prontuario = ({abaAtiva, onMudarAba}) => {
    const navigate = useNavigate();

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
                        placeholder="Buscar por nome"
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

            <div className="conteudo-principal">
                 {abaAtiva === 'novo' && 
                    <ProntuarioList
                      //  busca={busca}
                      //  onVerProntuario={handleVerProntuario}
                    //    onImprimirProntuario={handleImprimirProntuario}
                    /> //)
                 }
                {abaAtiva === 'modelosDeclaracoes' && <ModelosDeclaracoes />}
            </div>        
        </div>
    );
};

export default Prontuario;