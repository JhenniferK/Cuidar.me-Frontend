import './ConsultasAgendadas.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMap } from '@fortawesome/free-regular-svg-icons';
import { faVideo, faVoicemail } from '@fortawesome/free-solid-svg-icons';
import { faClock} from '@fortawesome/free-regular-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const dadosPacientes = [
    {
        id: 1,
        nome: 'Maria Silva',
        status: 'Confirmado',
        data: 'domingo, 14 de janeiro de 2024',
        horario: '09:00',
        localizacao: 'Campina Grande-PB',
        tipo: 'Presencial',
        email: 'maria@email.com',
        telefone: '(11) 99999-1111',
        observacao: 'Primeira consulta',
    },
      {
        id: 2,
        nome: 'Joyce',
        status: 'Agendado',
        data: 'domingo, 14 de janeiro de 2024',
        horario: '09:00',
        localizacao: 'Campina Grande-PB',
        tipo: 'Presencial',
        email: 'joyce@email.com',
        telefone: '(11) 99999-1111',
        observacao: 'Primeira consulta',
    },
      {
        id: 3,
        nome: 'Jhennifer',
        status: 'Agendado',
        data: 'domingo, 14 de janeiro de 2024',
        horario: '09:00',
        localizacao: 'Campina Grande-PB',
        tipo: 'Presencial',
        email: 'jhennifer@email.com',
        telefone: '(11) 99999-1111',
        observacao: 'Primeira consulta',
    },
];

const ConsultasAgendadas = () => {
    return (
        <div className="consultas-container">
            <h1 className="main-titulo">
                <FontAwesomeIcon icon={faCalendar}/> Consultas Agendadas
            </h1>
            {dadosPacientes.map((consulta) => (
                <div className="dadosPacientes-card" key={consulta.id}>
                    <div card-header>
                        <div className="paciente-info">
                            <h2>{consulta.nome}</h2>
                            <span className={`status-badge-status-${consulta.status.toLowerCase()}`}>{consulta.status}</span>
                        </div>
                    </div>

                    <div className="card-body-consultas">
                        <div className="detalhes-consulta">
                            <p><FontAwesomeIcon icon={faCalendar} /> {consulta.data}</p>
                            <p><FontAwesomeIcon icon={faClock} /> {consulta.horario}</p>
                            <p>
                                {consulta.tipo === 'Online' ? <FontAwesomeIcon icon={faVideo} /> : <FontAwesomeIcon icon={faMap} />}
                                {consulta.localizacao}
                                <span className="consulta-type-badge">{consulta.tipo}</span>
                            </p>
                        </div>
                         <div className="detalhes-contato">
                            <p>< FontAwesomeIcon icon={faVoicemail} /> {consulta.email}</p>
                            <p><FontAwesomeIcon icon={faPhone} /> {consulta.telefone}</p>
                            {consulta.observacao && (
                                <p className="observacoes"><strong>Observações:</strong> {consulta.observacao}</p>
                            )}
                        </div>
                    </div>
                    <div className="card-footer">
                        <button className="footer-button">Enviar Lembrete</button>
                        <button className="footer-button">Confirmar Consulta</button>
                        <button className="footer-button">Remarcar</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ConsultasAgendadas;