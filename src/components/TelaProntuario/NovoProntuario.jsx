import './NovoProntuario.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NovoProntuario = () => {
    const navigate = useNavigate();

    const [dataRegistro, setDataRegistro] = useState('');
    const [horario, setHorario] = useState('');
    const [anotacoes, setAnotacoes] = useState('');
    const [busca, setBusca] = useState("");
    const [pacientes, setPacientes] = useState([]);
    const [pacienteSelecionadoId, setPacienteSelecionadoId] = useState(null);
    const [mostrarSugestoes, setMostrarSugestoes] = useState(false);

    useEffect(() => {
        const psicologoSalvo = localStorage.getItem('psicologo');
        if (!psicologoSalvo) {
            alert("Sessão expirada. Faça o login novamente.");
            navigate('/');
            return;
        }

        const psicologo = JSON.parse(psicologoSalvo);
        const url = `http://localhost:8082/cuidarme/api/psicologo/${psicologo.lookupId}/pacientes`;

        axios.get(url)
            .then(response => {
                setPacientes(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar pacientes:', error);
                alert('Não foi possível carregar a lista de pacientes.');
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
        if (!dataRegistro || !horario || !anotacoes) {
            alert("Por favor, preencha todos os campos: data, horário e anotações.");
            return;
        }

        const psicologoLogado = JSON.parse(localStorage.getItem("psicologo"));
        if (!psicologoLogado) {
            alert("Sessão expirada. Faça login novamente.");
            return;
        }

        const dataHoraFormatada = `${dataRegistro}T${horario}:00`;

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
            console.error("Erro ao criar prontuário:", error.response?.data || error.message);
            alert("Falha ao criar o prontuário. Verifique os dados e tente novamente.");
        }
    };

    return (
        <div className="novoProntuario-container">
            <div className="novoProntuario-card">
                <div className="novoProntuario-header">
                    <h1>Novo Prontuário</h1>
                    <p>Preencha os dados para criar um novo registro para o paciente.</p>
                </div>

                <form className="novoProntuario-form" onSubmit={handleSubmit}>
                    
                    <div className="form-field input-busca-container">
                        <label htmlFor="busca-paciente">Buscar Paciente</label>
                        <input
                            type="text"
                            id="busca-paciente"
                            placeholder="Digite o nome do paciente"
                            value={busca}
                            onChange={(e) => {
                                setBusca(e.target.value);
                                setMostrarSugestoes(true);
                                setPacienteSelecionadoId(null);
                            }}
                            autoComplete="off"
                        />
                        {mostrarSugestoes && busca.length > 0 && (
                            <ul className="resultado-busca">
                                {pacientesFiltrados.length > 0 ? (
                                    pacientesFiltrados.map(paciente => ( 
                                        <li key={paciente.lookupId} onClick={() => selecionarPaciente(paciente)}>
                                            {paciente.nome}
                                        </li>
                                    ))
                                ) : (
                                    <li className="sem-resultados">Nenhum paciente encontrado</li>
                                )}
                            </ul>
                        )}
                    </div>

                    <div className="input-group">
                        <div className="form-field">
                            <label htmlFor="data">Data do Registro</label>
                            <input
                                type="date"
                                id="data"
                                value={dataRegistro}
                                onChange={(e) => setDataRegistro(e.target.value)}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="horario">Horário</label>
                            <input
                                type="time"
                                id="horario"
                                value={horario}
                                onChange={(e) => setHorario(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="anotacoes">Anotações do Dia</label>
                        <textarea
                            id="anotacoes"
                            rows="8"
                            placeholder="Descreva a sessão, observações e progresso do paciente..."
                            value={anotacoes}
                            onChange={(e) => setAnotacoes(e.target.value)}
                        ></textarea>
                    </div>
                    
                    <button type="submit" className="submit-button">
                        Criar Prontuário
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NovoProntuario;