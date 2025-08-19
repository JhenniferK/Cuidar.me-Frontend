import './NovoProntuario.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardUser, faSearch } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const NovoProntuario = () => {
    const navigate = useNavigate();

    const [data, setData] = useState("");
    const [horario, setHorario] = useState('');
    const [descricao, setDescricao] = useState('');

    const [busca, setBusca] = useState("");
    const [pacientes, setPacientes] = useState([]);
    const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
    const [pacienteSelecionado, setPacienteSelecionado] = useState(null);

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


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!pacienteSelecionado) {
            alert("Selecione um paciente!");
            return;
        }
        if(!data || !horario) {
            alert("Por favor, preencha a data e o horário do atendimento");
            return;
        }

        const dataHora = `${data}T${horario}:00`;

        const prontuario = {
            dataRegistro: dataHora,
            descricao: descricao,
            paciente: {
                lookupId: pacienteSelecionado.lookupId
            }
    };
        try {
            await axios.post('http://localhost:8082/cuidarme/api/prontuario/adicionar', prontuario);
            alert('Prontuário criado com sucesso!');
            navigate('/prontuario'); 
        } catch (error) {
            console.error("Erro ao criar prontuário:", error);
            alert("Falha ao criar o prontuário. Verifique o console.");
        }

    };

    return (
        <div className="novoProntuario-container">
            <div className="novoProntuario-card">
                <div className="novoProntuario-header">
                    <h2 className="novoProntuario-titulo">
                        <FontAwesomeIcon icon={faClipboardUser}/>Prontuário Psicológico
                    </h2>
                    <p>Preencha as informações de prontuário para adicionar no sistema</p>
                </div>

                <form className="novoProntuario-form" onSubmit={handleSubmit}>
                    <section className="form-section">
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
                                        .filter(p => p.nome.toLowerCase().includes(busca.toLowerCase()))
                                        .map(p => (
                                            <li key={p.lookupId || p.id} onClick={() => selecionarPaciente(p)}>
                                                {p.nome} - {p.cpf}
                                            </li>
                                        ))
                                    }
                                </ul>
                            )}
                        </div>
                    </section>
                
                    <section className="form-section">
                        <div className="input-group">
                            <div className="form-field">
                                <label htmlFor="data">Data do atendimento:</label>
                                <input
                                    type="date" 
                                    id="data" 
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}
                                />
                            </div>

                            <div className="form-field">
                                <label htmlFor="horario">Horário</label>
                                <select 
                                    id="horario"
                                    value={horario}
                                    onChange={(e) => setHorario(e.target.value)}
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

                        <div className="form-field">
                            <label htmlFor="descricao">Informações da consulta</label>
                            <textarea id="descricao" rows="4" placeholder="Outras informações, evolução do paciente, encaminhamentos, etc" value={descricao} onChange={(e) => setDescricao(e.target.value)}></textarea>
                        </div>
                    </section>
                    <button type="submit" className="submit-button">
                        Criar Prontuário
                    </button>
                </form>
            </div>
        </div>
    )
}

export default NovoProntuario;