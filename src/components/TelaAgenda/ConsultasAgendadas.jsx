import './ConsultasAgendadas.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMap } from '@fortawesome/free-regular-svg-icons';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { faClock} from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react'; 
import axios from 'axios'; 

const ConsultasAgendadas = () => {
    const [consultas, setConsultas] = useState([]);

    useEffect(() => {
        const psicologoSalvo = localStorage.getItem('psicologo');

        if (psicologoSalvo) {
            const psicologo = JSON.parse(psicologoSalvo);
            const psicologoLookupId = psicologo.lookupId;

            const url = `http://localhost:8082/cuidarme/api/psicologo/${psicologoLookupId}/atendimento`;
            
            axios.get(url)
                .then(response => {
                    setConsultas(response.data);
                })
                .catch(error => {
                    console.error("Erro ao buscar agendamentos:", error);
                });
        }
    }, []);
    
    const formatarDataHora = (dataString) => {
        if (!dataString) return { data: '-', horario: '-' };
        const dataObj = new Date(dataString);
        const dataFormatada = dataObj.toLocaleDateString('pt-BR');
        const horarioFormatado = dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        return { data: dataFormatada, horario: horarioFormatado };
    };

    return (
        <div className="consultas-container">
            <h1 className="main-titulo">
                <FontAwesomeIcon icon={faCalendar}/> Consultas Agendadas
            </h1>
            
            {consultas.map((consulta) => {
                const { data, horario } = formatarDataHora(consulta.data);
                const tipo = consulta.localidade === 'Online' ? 'Online' : 'Presencial';

                return (
                    <div className="dadosPacientes-card" key={consulta.lookupId}>
                        <div className="card-header-agendamento">
                            <div className="paciente-info">
                                <h2>{consulta.paciente ? consulta.paciente.nome : 'Paciente não encontrado'}</h2>
                                <span className={`status-badge-status-${consulta.status.toLowerCase()}`}>{consulta.status}</span>
                            </div>
                        </div>

                        <div className="card-body-consultas">
                            <div className="detalhes-consulta">
                                <p><FontAwesomeIcon icon={faCalendar} /> {data}</p>
                                <p><FontAwesomeIcon icon={faClock} /> {horario}</p>
                                <p>
                                    {tipo === 'Online' ? <FontAwesomeIcon icon={faVideo} /> : <FontAwesomeIcon icon={faMap} />}
                                    {consulta.localidade}
                                    <span className="consulta-type-badge">{tipo}</span>
                                </p>
                            </div>
                        </div>

                        <div className="card-footer">
                            <button className="footer-button">Enviar Lembrete</button>
                            <button className="footer-button">Remarcar</button>
                            <button className="footer-button">Cancelar</button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ConsultasAgendadas;