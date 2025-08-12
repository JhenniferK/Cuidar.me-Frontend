import './NovoProntuario.css'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardUser, faSearch } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const NovoProntuario = () => {
    const navigate = useNavigate;

    const [dataRegistro, setDataRegistro] = useState('');
    const [horario, setHorario] = useState('');
    const [demanda, setDemanda] = useState('');
    const [tecnicasUtilizadas, settecnicasUtilizadas] = useState('');
    const [pacienteSelecionado, setPacienteSelecionado] = useState('')

    const [pacientes] = useState([]);
    const [busca, setBusca] = useState("");
    const selecionarPaciente = (paciente) => {
        setBusca(paciente.nome);
        setPacienteSelecionado(paciente);
        setMostrarSugestoes(false);
    }
    const [mostrarSugestoes, setMostrarSugestoes] = useState(false);

    const handleSubmit = (event) => {
    event.preventDefault();
        if (!pacienteSelecionado) {
            alert("Por favor, selecione um paciente da lista.");
            return;
        }
        navigate('/prontuarios'); 
    }   
    
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
                                    setPacienteSelecionado(null);
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
                        <div className="input-group">
                            <div className="form-field">
                                <label htmlFor="data">Data do atendimento:</label>
                                <input
                                    type="date" 
                                    id="data" 
                                    value={dataRegistro}
                                    onChange={(e) => setDataRegistro(e.target.value)}
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
                            <label htmlFor="demanda">Demanda Principal / Queixa</label>
                            <textarea 
                                id="demanda" 
                                rows="3" 
                                placeholder="Descreva a principal queixa ou demanda do paciente nesta sessão"
                                value={demanda}
                                onChange={(e) => setDemanda(e.target.value)}
                                required
                            ></textarea>
                        </div>

                        <div className="form-field">
                            <label htmlFor="tecnicas">Técnicas Utilizadas</label>
                            <textarea 
                                id="tecnicas" 
                                rows="3" 
                                placeholder="Descreva as técnicas, abordagens e intervenções utilizadas"
                                value={tecnicasUtilizadas}
                                onChange={(e) => settecnicasUtilizadas(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="form-field">
                            <label htmlFor="observacoes">Infos Adicionais</label>
                            <textarea id="observacoes" rows="4" placeholder="Outras informações, evolução do paciente, encaminhamentos, etc"></textarea>
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