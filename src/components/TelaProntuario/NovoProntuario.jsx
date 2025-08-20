import './NovoProntuario.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardUser, faSearch } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const NovoProntuario = () => {
    const navigate = useNavigate();

    const [dataRegistro, setDataRegistro] = useState('');
    const [anotacoes, setAnotacoes] = useState('');
    const [busca, setBusca] = useState("");
    const [pacientes, setPacientes] = useState([]);
    const [pacienteSelecionadoId, setPacienteSelecionadoId] = useState(null);
    const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
    const [horario, setHorario] = useState('');

    useEffect(() => {
        const psicologoSalvo = localStorage.getItem('psicologo');
        if (!psicologoSalvo) {
            alert("Sessão expirada. Faça o login novamente.");
            navigate('/');
            return;
        }

        const psicologo = JSON.parse(psicologoSalvo);
        const psicologoId = psicologo.lookupId;

        const url = `http://localhost:8082/cuidarme/api/psicologo/${psicologoId}/pacientes`;

        axios.get(url)
            .then(response => {
                setPacientes(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar pacientes:', error);
            });
    }, [navigate]);

    const selecionarPaciente = (paciente) => {
        setBusca(paciente.nome);
        setPacienteSelecionadoId(paciente.lookupId);
        setMostrarSugestoes(false);
    };

    const pacientesFiltrados = busca.length > 0
        ? pacientes.filter(paciente =>
            paciente.nome.toLowerCase().includes(busca.toLowerCase())
        )
        : [];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!pacienteSelecionadoId) {
            alert("Por favor, selecione um paciente da lista.");
            return;
        }

        const psicologoLogado = JSON.parse(localStorage.getItem("psicologo"));
        if (!psicologoLogado) {
            alert("Você precisa estar logado!");
            return;
        }

        const dataHoraFormatada = `${dataRegistro}T${horario || '00:00'}:00`;

        const novoProntuario = {
            paciente: { lookupId: pacienteSelecionadoId },
            psicologo: { lookupId: psicologoLogado.lookupId },
            dataRegistro: dataHoraFormatada, 
            descricao: anotacoes
        };

        try {
            await axios.post('http://localhost:8082/cuidarme/api/prontuario/adicionar', novoProntuario);
            alert('Prontuário criado com sucesso!');
            navigate('/prontuarios');
        } catch (error) {
            console.error("Erro ao criar prontuário:", error);
            alert("Falha ao criar o prontuário. Verifique os dados e o console.");
        }
    };

    return (
        <div className="novoProntuario-container">
            <div className="novoProntuario-card">
                <div className="novoProntuario-header">
                    <h2 className="novoProntuario-titulo">
                        <FontAwesomeIcon icon={faClipboardUser} />Prontuário Psicológico
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
                                    {pacientesFiltrados.map(paciente => (
                                        <li key={paciente.lookupId} onClick={() => selecionarPaciente(paciente)}>
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
                                <label htmlFor="data">Data do registro:</label>
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
                            <label htmlFor="anotacoes">Anotações da Sessão</label>
                            <textarea
                                id="anotacoes"
                                rows="3"
                                placeholder="Anotações sobre o quadro do paciente nesta sessão"
                                value={anotacoes}
                                onChange={(e) => setAnotacoes(e.target.value)}
                                required
                            ></textarea>
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