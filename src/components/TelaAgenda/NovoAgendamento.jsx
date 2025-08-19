import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faSearch, faBell } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './NovoAgendamento.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const NovoAgendamento = () => {
    const [pacientes, setPacientes] = useState([]);
    const [busca, setBusca] = useState("");

    const navigate = useNavigate();

    const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
    const [pacienteSelecionado, setPacienteSelecionado] = useState(null);

    const [tipo, setTipo] = useState(""); 
    const [data, setData] = useState("");
    const [horario, setHorario] = useState("");
    const [localidade, setLocalidade] = useState("");

    useEffect(() => {
        axios.get('http://localhost:8082/cuidarme/api/paciente/listar')
            .then(response => {
                setPacientes(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar pacientes:', error);
            });
    }, []);

    const selecionarPaciente = (paciente) => {
        setBusca(paciente.nome);
        setPacienteSelecionado(paciente);
        setMostrarSugestoes(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!pacienteSelecionado) {
            alert("Selecione um paciente!");
            return;
        }

        if (!data || !horario) {
            alert("Selecione data e horário!");
            return;
        }

        const psicologoLogado = JSON.parse(localStorage.getItem("psicologo"));
        if (!psicologoLogado) {
            alert("Você precisa estar logado!");
            return;
        }

        const dataHora = `${data}T${horario}:00`;

        const atendimento = {
            data: dataHora,
            localidade: tipo === "presencial" ? localidade : "Online",
            status: "AGENDADO", 
            psicologo: { lookupId: psicologoLogado.lookupId },
            paciente: { lookupId: pacienteSelecionado.lookupId }
        };

        axios.post("http://localhost:8082/cuidarme/api/atendimento/salvar", atendimento)
            .then(() => {
                alert("Atendimento agendado com sucesso!");
                navigate('/paciente');
            })
            .catch(err => {
                console.error("Erro ao salvar atendimento:", err);
                alert("Erro ao salvar atendimento!");
            });
    };

    return (
        <div className='form-container'>
            <h1 className='form-titulo'>
                <FontAwesomeIcon icon={faCalendar} />
                Agendamento de Consulta
            </h1>

            <form onSubmit={handleSubmit}>
                <section className="form-section">
                    <h2 className="section-title">Paciente</h2>
                    <div className="input-busca-container">
                        <div className="input-busca">
                            <FontAwesomeIcon icon={faSearch} />
                            <input
                                type="text"
                                placeholder="Buscar paciente"
                                value={busca}
                                onChange={(e) => { 
                                    setBusca(e.target.value); 
                                    setMostrarSugestoes(true); 
                                }}
                                required
                            />
                        </div>

                        {mostrarSugestoes && busca.length > 0 && (
                            <ul className="resultado-busca">
                                {pacientes
                                    .filter(paciente =>
                                        paciente.nome.toLowerCase().includes(busca.toLowerCase())
                                    )
                                    .map(paciente => (
                                        <li key={paciente.lookupId} onClick={() => selecionarPaciente(paciente)}>
                                            {paciente.nome} - CPF: {paciente.cpf}
                                        </li>
                                    ))
                                }
                            </ul>
                        )}
                    </div>
                </section>

                <section className="form-section">
                    <h2 className="section-title">Detalhes da Consulta</h2>
                    <div className="input-group">
                        <div className="form-field">
                            <label htmlFor="data">Data</label>
                            <div className="input-with-icon">
                                <FontAwesomeIcon icon={faCalendar} className="input-icon" />
                                <input 
                                    type="date" 
                                    id="data" 
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-field">
                            <label htmlFor="horario">Horário</label>
                            <div className="input-with-icon">
                                <select 
                                    id="horario"
                                    value={horario}
                                    onChange={(e) => setHorario(e.target.value)}
                                    required
                                >
                                    <option value="">Selecione o horário</option>
                                    <option value="08:00">08:00</option>
                                    <option value="09:00">09:00</option>
                                    <option value="11:00">11:00</option>
                                    <option value="14:00">14:00</option>
                                    <option value="15:00">15:00</option>
                                    <option value="16:00">16:00</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="tipo">Tipo de Atendimento</label>
                        <div className="input-with-icon">
                            <select 
                                id="tipo" 
                                value={tipo} 
                                onChange={(e) => setTipo(e.target.value)}
                                required
                            >
                                <option value="">Selecione o tipo</option>
                                <option value="online">Online</option>
                                <option value="presencial">Presencial</option>
                            </select>
                        </div>
                    </div>
                    {tipo === "presencial" && (
                        <div className="form-field">
                            <label htmlFor="localizacao">Localidade</label>
                            <select 
                                id="localizacao"
                                value={localidade}
                                onChange={(e) => setLocalidade(e.target.value)}
                                required
                            >
                                <option value="">Selecione o local</option>
                                <option value="CRAS - Alagoa Grande">CRAS - Alagoa Grande</option>
                                <option value="CRAS - Nova Cruz">CRAS - Nova Cruz</option>
                                <option value="Cuidar e Ser - Campina Grande">Cuidar e Ser - Campina Grande</option>
                            </select>
                        </div>
                    )}

                </section>

                <section className="form-section">
                    <h2 className="section-title">Notificações</h2>
                    <div className="notification-toggle">
                        <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round"></span>
                        </label>
                        <span>Enviar lembrete por WhatsApp</span>
                    </div>
                    <p className="notification-info">
                        <FontAwesomeIcon icon={faBell} />Confirmação automática será enviada por WhatsApp</p>
                </section>
                <button type="submit" className="submit-button">
                    Agendar Consulta
                </button>
            </form>
        </div>
    );
};

export default NovoAgendamento;