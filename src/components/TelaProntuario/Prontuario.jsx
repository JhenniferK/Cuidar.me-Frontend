import './Prontuario.css';
import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendar, faPlus, faRectangleList} from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import ProntuarioParaImpressao from './ProntuarioParaImpressao';
import ProntuarioList from './ProntuarioList';

const Prontuario = ({abaAtiva, onMudarAba}) => {
    const navigate = useNavigate();

    const [busca, setBusca] = useState("");

    const [prontuarioParaImprimir, setProntuarioParaImprimir ] = useState(null);
    const prontuarioParaImpressaoRef = useRef();

    const handleVerProntuario = (id) => {
        navigate(`/novoProntuario/${id}`);
    }
    
    const handleImprimirProntuario = (prontuario) => {
        setProntuarioParaImprimir(prontuario);
        setTimeout(() => {
            prontuarioParaImpressaoRef.current?.imprimir();
        }, 100);
    }
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

            <div className="conteudo-principal">
                <ProntuarioList
                    busca={busca}
                    onVerProntuario={handleVerProntuario}
                    onImprimirProntuario={handleImprimirProntuario}
                    />
            </div>
            <ProntuarioParaImpressao
                ref={prontuarioParaImpressaoRef}
                dados={prontuarioParaImprimir}
                />
        </div>
    );
};

export default Prontuario;