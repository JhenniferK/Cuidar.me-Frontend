import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClock, faExclamationCircle, faLink, faDownload } from '@fortawesome/free-solid-svg-icons';
import './PagamentoCard.css';

const statusConfig = {
  Quitado: { icon: faCheckCircle, className: 'status-quitado' },
  Pendente: { icon: faClock, className: 'status-pendente' },
  Vencido: { icon: faExclamationCircle, className: 'status-vencido' },
};

const PagamentoCard = ({ pagamento }) => {
  const currentStatus = statusConfig[pagamento.status] || statusConfig.Pendente;

  return (
    <div className="pagamento-card-item">
      <div className="info-section">
        <div className="main-info">
          <span className="paciente-name">{pagamento.nome}</span>
          <span className={`status-badge ${currentStatus.className}`}>
            <FontAwesomeIcon icon={currentStatus.icon} />
            {pagamento.status}
          </span>
        </div>
        <div className="info-secundaria">
          <span className="valor-pagamento">{pagamento.valor}</span>
          <span className="metodo-pagamento">{pagamento.metodo}</span>
        </div>
      </div>
      <div className="actions-section">
        <button className="action-button">
          <FontAwesomeIcon icon={faLink} />
          <span>Link</span>
        </button>
        <button className="action-button">
          <FontAwesomeIcon icon={faDownload} />
          <span>Recibo</span>
        </button>
      </div>
    </div>
  );
};

export default PagamentoCard;