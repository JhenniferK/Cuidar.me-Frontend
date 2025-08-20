import './ConsultasAgendadas.css';
import RemarcarAgendamento from './RemarcarAgendamento';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMap } from '@fortawesome/free-regular-svg-icons';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ConsultasAgendadas = () => {
    const [consultas, setConsultas] = useState([]);
    const [remarcandoConsultaId, setRemarcandoConsultaId] = useState(null);

    useEffect(() => {
        const psicologoSalvo = localStorage.getItem('psicologo');

        if (psicologoSalvo) {
            const psicologo = JSON.parse(psicologoSalvo);
            const psicologolookupId = psicologo.lookupId;

            const url = `http://localhost:8082/cuidarme/api/psicologo/${psicologolookupId}/atendimento`;

            axios.get(url)
                .then(response => {
                    setConsultas(response.data);
                })
                .catch(error => {
                    console.error("Erro ao buscar agendamentos:", error);
                });
        }
    }, []);

    const handleCancelarConsulta = (lookupId) => {
        if (!window.confirm("Tem certeza que deseja cancelar esta consulta?")) {
            return;
        }

        const url = `http://localhost:8082/cuidarme/api/atendimento/cancelar/${lookupId}`;

        axios.put(url)
            .then(() => {
                setConsultas(consultasAtuais =>
                    consultasAtuais.map(consulta =>
                        consulta.lookupId === lookupId
                            ? { ...consulta, status: "CANCELADO" }
                            : consulta
                    )
                );

                alert("Consulta cancelada com sucesso!");
            })
            .catch(error => {
                console.error("Erro ao cancelar a consulta:", error);
                alert("Não foi possível cancelar a consulta. Tente novamente.");
            });
    };

    const handleSalvarRemarcacao = (consultaId, novosDados) => {
        const url = `http://localhost:8082/cuidarme/api/atendimento/remarcar/${consultaId}`;

        axios.patch(url, novosDados)
            .then(response => {
                const consultaAtualizada = response.data;
                setConsultas(consultasAtuais =>
                    consultasAtuais.map(c =>
                        c.lookupId === consultaId ? consultaAtualizada : c
                    )
                );
                setRemarcandoConsultaId(null);
                alert("Consulta remarcada com sucesso!");
            })
            .catch(error => {
                console.error("Erro ao remarcar a consulta:", error);
                alert("Não foi possível remarcar a consulta.");
            });
    };

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
                <FontAwesomeIcon icon={faCalendar} /> Consultas Agendadas
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
                            <button
                                className="footer-button"
                                onClick={() => setRemarcandoConsultaId(consulta.lookupId)}
                            >
                                Remarcar
                            </button>
                            <button
                                className="footer-button"
                                onClick={() => handleCancelarConsulta(consulta.lookupId)}
                            >
                                Cancelar
                            </button>
                        </div>

                        {remarcandoConsultaId === consulta.lookupId && (
                            <RemarcarAgendamento
                                consulta={consulta}
                                onSalvar={handleSalvarRemarcacao}
                                onCancelar={() => setRemarcandoConsultaId(null)}
                            />
                        )}

                    </div>
                );
            })}
        </div>
    );
};

export default ConsultasAgendadas;