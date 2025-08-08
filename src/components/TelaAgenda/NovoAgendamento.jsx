import { faCalendar, faClock } from '@fortawesome/free-regular-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faMapPin, faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './NovoAgendamento.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NovoAgendamento = () => {

    const [pacientes, setPacientes] = useState([]);
    const [busca, setBusca] = useState("");
    const selecionarPaciente = (paciente) => {
        setBusca(paciente.nome);
        setMostrarSugestoes(false);
    }
    const [mostrarSugestoes, setMostrarSugestoes] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8081/paciente/listar')
            .then(response => {
                setPacientes(response.data)
            })
            .catch(error => {
                console.error('Erro ao buscar pacientes:', error)
            });
    }, []);

    return (
        <div className='form-container'>
            <h1 className='form-titulo'>
                <FontAwesomeIcon icon={faCalendar} />
                Agendamento de Consulta
            </h1>

            <form>
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
                            />
                        </div>

                        {mostrarSugestoes && busca.length > 0 && (
                            <ul className="resultado-busca">
                                {pacientes
                                    .filter(paciente =>
                                        paciente.nome.toLowerCase().includes(busca.toLowerCase())
                                    )
                                    .map(paciente => (
                                        <li key={paciente.id} onClick={() => selecionarPaciente(paciente)}>
                                            {paciente.nome} - {paciente.cpf}
                                        </li>
                                    ))}
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
                                <input type="date" id="data" placeholder="dd/mm/aaaa" />
                            </div>
                        </div>
                        <div className="form-field">
                            <label htmlFor="horario">Horário</label>
                            <div className="input-with-icon">
                                <select id="horario">
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
                            <select id="tipo">
                                <option value="">Selecione o tipo</option>
                                <option value="online">Online</option>
                                <option value="presencial">Presencial</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="localizacao">Localidade</label>
                        <input type="text" id="localizacao" placeholder="Ex: Lagoa de Roça-PB, Rua Manoel Carlos" />
                    </div>

                    <div className="form-field">
                        <label htmlFor="observacoes">Observações</label>
                        <textarea id="observacoes" rows="4" placeholder="informações adicionais sobre a consulta"></textarea>
                    </div>
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