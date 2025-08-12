import { useState } from 'react';
import './NovoPagamento.css';

const NovoPagamento = ( {onClose} ) => {
    
    const [pacienteNome, setPacienteNome] = useState('');
    const [quantia, setQuantia] = useState('');
    const [pacienteMetodo, setPacienteMetodo] = useState('PIX');

    const handleCriarPagamento = (event) => {
    event.preventDefault(); 
    
        onClose();

    };    
    return (
        <div className="novo-pagamento-container">
                <div className="pagamento-form-card">
                <h2 className="card-titulo">
                    Novo Pagamento
                </h2>

                <form onSubmit={handleCriarPagamento}>
                    <div className="form-group">
                    <label htmlFor="paciente-nome">Paciente</label>
                    <input
                        id="paciente-nome"
                        type="text"
                        placeholder="Nome do paciente"
                        value={pacienteNome}
                        onChange={(e) => setPacienteNome(e.target.value)}
                        required
                    />
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
                            value={pacienteMetodo}
                            onChange={(e) => setPacienteMetodo(e.target.value)}
                            required
                        >
                            <option value="PIX">PIX</option>
                            <option value="Cartão de Crédito">Cartão de Crédito</option>
                            <option value="Boleto">Boleto</option>
                            <option value="Dinheiro">Dinheiro</option>
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