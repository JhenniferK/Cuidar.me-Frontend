import { useEffect, useState } from 'react';
import './NovoPagamento.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NovoPagamento = ({onClose, onPagamentoCriado}) => {
    const navigate = useNavigate();

    const [quantia, setQuantia] = useState('');
    const [metodo, setMetodo] = useState('PIX');
    const [busca, setBusca] = useState("");
    const [pacientes, setPacientes] = useState([]);
    const [pacienteSelecionado, setPacienteSelecionado] = useState(null);

    useEffect(() => {
        const buscarPacientes = async () => {
            const psicologoSalvo = localStorage.getItem('psicologo');
            if (!psicologoSalvo) {
                console.error("Nenhum psicólogo logado encontrado.");
                return;
            }
            
            const psicologo = JSON.parse(psicologoSalvo);
            const psicologoId = psicologo.lookupId;

            try {
                const url = `http://localhost:8082/cuidarme/api/psicologo/${psicologoId}/pacientes`;
                const response = await axios.get(url);
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

    const handleCriarPagamento = async (event) => {
        event.preventDefault();
        if (!pacienteSelecionado) {
            alert("Por favor, selecione um paciente da lista");
            return;
        }
        
        const novoPagamento = {
            valor: parseFloat(quantia.replace(',', '.')),
            metodo: metodo,
            data: new Date().toISOString(), 
            status: 'PAGO',
            paciente: {
                lookupId: pacienteSelecionado.lookupId 
            }
        } 

        try {
            const response = await axios.post('http://localhost:8082/cuidarme/api/pagamento/cadastrar', novoPagamento);
            alert("Pagamento realizado com sucesso");

            if(onPagamentoCriado){
                onPagamentoCriado(response.data);
            }

            if(onClose){
                onClose();
            } else {
                navigate('/pagamentos');
            }
        } catch (error) {
            console.error("Erro ao registrar pagamento: ", error);
            alert("Não foi possível realizar o pagamento. Verifique os dados e o console.");
        }
    };

    return (
        <div className="novo-pagamento-container">
            <div className="pagamento-form-card">
                <h2 className="card-titulo">Novo Pagamento</h2>
                <form onSubmit={handleCriarPagamento}>
                    <div className="form-group">
                        <label htmlFor="paciente-nome">Paciente</label>
                        <input
                            id="paciente-nome"
                            type="text"
                            placeholder="Digite para buscar um paciente..."
                            value={busca}
                            autoComplete="off"
                            onChange={(e) => {
                                setBusca(e.target.value);
                                setPacienteSelecionado(null);
                            }}
                            required
                        />
                        {pacientesFiltrados.length > 0 && !pacienteSelecionado && (
                            <div className="resultados-busca">
                                {pacientesFiltrados.map(paciente => (
                                    <div
                                        // --- CORREÇÃO 3: Usar lookupId como key ---
                                        key={paciente.lookupId}
                                        className="resultado-item"
                                        onClick={() => handleSelecionarPaciente(paciente)}
                                    >
                                        {paciente.nome}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="quantia">Valor (R$)</label>
                            <input
                                id="quantia"
                                type="text"
                                placeholder="0,00"
                                value={quantia}
                                onChange={(e) => setQuantia(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="metodo">Método</label>
                            <div className="select-wrapper">
                                <select
                                    id="metodo"
                                    value={metodo}
                                    onChange={(e) => setMetodo(e.target.value)}
                                    required
                                >
                                    <option value="PIX">PIX</option>
                                    <option value="CARTAO">Cartão de Crédito</option>
                                    <option value="ESPECIE">Dinheiro</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="submit-button">
                        Gerar Pagamento
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NovoPagamento;