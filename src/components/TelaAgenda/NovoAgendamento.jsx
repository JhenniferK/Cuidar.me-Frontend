import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './NovoAgendamento.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const NovoAgendamento = () => {

    const navigate = useNavigate();

    const [pacientes, setPacientes] = useState([]);
    const [busca, setBusca] = useState("");

    const [pacienteSelecionadoId, setPacienteSelecionadoId] = useState("");
    const [data, setData] = useState("");
    const [horario, setHorario] = useState("");
    const [tipoAtendimento, setTipoAtendimento] = useState("")
    const [localidade, setLocalidade] = useState("")
    const [observacoes, setObservacoes] = useState("")

    const selecionarPaciente = (paciente) => {
        setBusca(paciente.nome);
        setPacienteSelecionadoId(paciente.id);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
            console.log("Status de validação:");
            console.log("ID do Paciente:", pacienteSelecionadoId);
            console.log("Data:", data);
            console.log("Horário:", horario);
            console.log("Tipo:", tipoAtendimento);
        if(!pacienteSelecionadoId || !data || !horario || !tipoAtendimento) {
            alert("Preencha todos os campos obrigatórios")
            return
        }

        const novoAgendamento = {
        paciente: {id: pacienteSelecionadoId},
        data: data,
        horario: horario,
        tipoAtendimento: tipoAtendimento,
        localizacao: localidade,
        observacoes: observacoes
        }

        try {
            await axios.post('http://localhost:8081/atendimento', novoAgendamento);

            alert("Agendamento realizado com sucessoo")
            navigate('/consultasAgendadas')
        } catch (error) {
            console.error("Erro ao agendar consulta: ", error)
            alert("Não foi possível realizar o agendamento, verifique o que aconteceu")
        }
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
                                        <li key={paciente.id} onClick={() => selecionarPaciente(paciente)}>
                                            {paciente.nome} - {paciente.cpf}
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
                                <input type="date" id="data" value={data} onChange={(e) => setData(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="form-field">
                            <label htmlFor="horario">Horário</label>
                            <div className="input-with-icon">
                                <select id="horario" value={horario} onChange={(e) => setHorario(e.target.value)} required>
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
                            <select id="tipo" value={tipoAtendimento} onChange={(e) => setTipoAtendimento(e.target.value)} required>
                                <option value="">Selecione o tipo</option>
                                <option value="online">Online</option>
                                <option value="presencial">Presencial</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="localizacao">Localidade</label>
                        <input type="text" id="localizacao" placeholder="Ex: Lagoa de Roça-PB, Rua Manoel Carlos" value={localidade} onChange={(e) => setLocalidade(e.target.value)}/>
                    </div>

                    <div className="form-field">
                        <label htmlFor="observacoes">Observações</label>
                        <textarea id="observacoes" rows="4" placeholder="informações adicionais sobre a consulta" value={observacoes} onChange={(e) => setObservacoes(e.target.value)}></textarea>
                    </div>
                </section>
                <button type="submit" className="submit-button">
                    Agendar Consulta
                </button>
            </form>
        </div>
    );
};

export default NovoAgendamento;