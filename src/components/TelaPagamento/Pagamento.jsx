import React, { useState } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Pagamento.css'; 
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import PagamentoCard from './PagamentoCard';
import NovoPagamento from './NovoPagamento';

const pagamentoData = [
  { id: 1, nome: 'Maria Silva', status: 'Quitado', valor: 'R$ 150,00', metodo: ' PIX' },
  { id: 2, nome: 'João Santos', status: 'Pendente', valor: 'R$ 200,00', metodo: ' Cartão' },
  { id: 3, nome: 'Ana Costa', status: 'Vencido', valor: 'R$ 120,00', metodo: ' Boleto' },
];

const Pagamento = () => {
    const [busca, setBusca] = useState("");

    const [isFormVisible, setIsFormVisible] = useState(false);


    return (
        <div className="pagamento-container">
            <div className="pagamento-card">
                <h1 className="pagamento-titulo">
                    <FontAwesomeIcon icon={faCreditCard} /> Sistema de pagamentos
                </h1>
                <div className="action-bar">
                    <div className="search-wrapper">
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Buscar paciente"
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                    </div>
                     <button className="btn-novo-pagamento" onClick={() => setIsFormVisible(true)}>
                        <FontAwesomeIcon icon={faPlus} /> Novo pagamento
                    </button>
                </div>

                {isFormVisible && <NovoPagamento onClose={() => setIsFormVisible(false)} />}
                <div className="pagamento-list">
                    {pagamentoData.map((pagamento) => (
                        <PagamentoCard key={pagamento.id} pagamento={pagamento} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Pagamento;