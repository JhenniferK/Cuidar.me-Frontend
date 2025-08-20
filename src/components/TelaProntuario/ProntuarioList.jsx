import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faFileLines } from '@fortawesome/free-solid-svg-icons';
import './ProntuarioList.css';

const ProntuarioList = ({ busca }) => {
    const navigate = useNavigate();
    
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pacienteAbertoId, setPacienteAbertoId] = useState(null);

    useEffect(() => {
        const psicologoSalvo = localStorage.getItem('psicologo');
        if (!psicologoSalvo) {
            setError("Sessão expirada. Faça o login novamente.");
            setLoading(false);
            return;
        }

        const psicologo = JSON.parse(psicologoSalvo);
    
        const url = `http://localhost:8082/cuidarme/api/psicologo/${psicologo.lookupId}/pacientes-com-prontuarios`;

        axios.get(url)
            .then(response => {
                const pacientesComProntuariosOrdenados = response.data.map(paciente => ({
                    ...paciente,
                    prontuarios: paciente.prontuarios.sort((a, b) => new Date(b.dataRegistro) - new Date(a.dataRegistro))
                }));
                setPacientes(pacientesComProntuariosOrdenados);
            })
            .catch(err => {
                console.error('Erro ao buscar pacientes e prontuários:', err);
                setError('Não foi possível carregar os dados.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const toggleProntuarios = (pacienteId) => {
        setPacienteAbertoId(pacienteAbertoId === pacienteId ? null : pacienteId);
    };

    const pacientesFiltrados = pacientes.filter(p => 
        p.nome.toLowerCase().includes(busca.toLowerCase())
    );
    
    if (loading) return <p className="mensagem-feedback">Carregando prontuários...</p>;
    if (error) return <p className="mensagem-feedback erro">{error}</p>;

    return (
        <div className="lista-pacientes-container">
            {pacientesFiltrados.length > 0 ? (
                pacientesFiltrados.map((paciente) => (
                    <div key={paciente.lookupId} className="paciente-card">
                        <div className="paciente-card-header" onClick={() => toggleProntuarios(paciente.lookupId)}>
                            <div className="paciente-info">
                                <h3>{paciente.nome}</h3>
                                <span>{paciente.prontuarios.length} registro(s)</span>
                            </div>
                            <FontAwesomeIcon 
                                icon={faChevronDown} 
                                className={`toggle-icon ${pacienteAbertoId === paciente.lookupId ? 'aberto' : ''}`} 
                            />
                        </div>

                        {pacienteAbertoId === paciente.lookupId && (
                            <div className="prontuarios-lista">
                                {paciente.prontuarios.length > 0 ? (
                                    paciente.prontuarios.map(prontuario => (
                                        <div key={prontuario.lookupId} className="prontuario-item">
                                            <div className="prontuario-item-info">
                                                <FontAwesomeIcon icon={faFileLines} />
                                                <div>
                                                    <strong>Data: {new Date(prontuario.dataRegistro).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</strong>
                                                    <p>{prontuario.descricao.substring(0, 100)}...</p>
                                                </div>
                                            </div>
                                            <button 
                                                className="btn-ver-detalhes" 
                                                onClick={() => navigate(`/prontuarios/${prontuario.lookupId}`)}
                                            >
                                                Ver Detalhes
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <p className="sem-prontuarios">Nenhum prontuário registrado para este paciente.</p>
                                )}
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p className="mensagem-feedback">Nenhum paciente encontrado.</p>
            )}
        </div>
    );
};

export default ProntuarioList;