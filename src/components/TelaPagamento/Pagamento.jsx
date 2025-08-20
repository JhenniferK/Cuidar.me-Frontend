import { useState } from 'react'; 
import axios from 'axios';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Pagamento.css'; 
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import PagamentoCard from './PagamentoCard';
import NovoPagamento from './NovoPagamento';

const Pagamento = () => {
    const [pagamentos, setPagamentos] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [pacienteSelecionado, setPacienteSelecionado] = useState(null);
    const [busca, setBusca] = useState("");
    const [isFormVisible, setIsFormVisible] = useState(false);

    const buscarPagamentos = async ()=> {
        try {
            const response = await axios.get('http://localhost:8082/cuidarme/api/pagamento/listar');
            setPagamentos(response.data);
        }catch (error) {
            console.error('Erro ao buscar a lista de pagamentos', error);
        }
    }

     useEffect(() => {
        buscarPagamentos();
    }, []);

    useEffect(() => {
        const buscarPacientes = async () => {
            try {
                const response = await axios.get('http://localhost:8082/cuidarme/api/paciente/listar');
                setPacientes(response.data);
            } catch (error) {
                console.error('Erro ao buscar a lista de pacientes', error);
            }
        };
        buscarPacientes();
    }, []);

    const pacientesFiltrados = busca.length > 0 ? pacientes
        .filter(paciente => paciente.nome.toLowerCase().includes(busca.toLowerCase()))
        : [];

    const handleSelecionarPaciente = (paciente) => {
        setPacienteSelecionado(paciente);
        setBusca(paciente.nome);
    };

    const handlePagamentoCriado = () => {
        buscarPagamentos();
        setIsFormVisible(false);
    }

    return (
        <div className="pagamento-container">
            <div className="pagamento-card">
                <h1 className="pagamento-titulo">
                    <FontAwesomeIcon icon={faCreditCard} /> Controle de Pagamentos
                </h1>
                <div className="action-bar">
                    <div className="search-wrapper">
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Buscar paciente"
                            value={busca}
                            onChange={(e) => {
                            setBusca(e.target.value);
                                if (pacienteSelecionado) {
                                    setPacienteSelecionado(null);
                                }
                            }}
                            required
                        />
                    </div>

                    {pacientesFiltrados.length > 0 && !pacienteSelecionado && (
                        <div className="resultados-busca">
                            {pacientesFiltrados.map(paciente => (
                                <div
                                    key={paciente.id}
                                     className="resultado-item"
                                    onClick={() => handleSelecionarPaciente(paciente)}
                                >
                                    {paciente.nome}
                                </div>
                            ))}
                        </div>
                    )}
                     <button className="btn-novo-pagamento" onClick={() => setIsFormVisible(true)}>
                        <FontAwesomeIcon icon={faPlus} /> Novo pagamento
                    </button>
                </div>

                {isFormVisible && <NovoPagamento onClose={() => setIsFormVisible(false)} onPagamentoCriado={handlePagamentoCriado} />}
                <div className="pagamento-list">
                    {pagamentos.map((pagamento) => (
                        <PagamentoCard key={pagamento.id} pagamento={pagamento} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Pagamento;  