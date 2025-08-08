import './Agenda.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faRectangleList } from '@fortawesome/free-solid-svg-icons';

const Agenda = ({abaAtiva, onMudarAba}) => {
    return (
        <header className='agendamento-header'>
            <div className='header-button-group'>
                <button onClick={() => onMudarAba('novo')} className={`header-button ${abaAtiva === "novo" ? "active" : ""}`}>
                    <FontAwesomeIcon icon={faCalendar} /> Novo Agendamento
                </button>
                <button onClick={() => onMudarAba('consultas')} className={`header-button ${abaAtiva === "consultas" ? "active" : ""}`}>
                    <FontAwesomeIcon icon={faRectangleList} /> Consultas Agendadas
                </button>
            </div>
        </header>
    );
};

export default Agenda;