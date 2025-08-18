import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines, faPrint } from '@fortawesome/free-solid-svg-icons';
import './ProntuarioCard.css';

const ProntuarioCard = ({ prontuario, onVerClick, onImprimirClick }) => {
  return (
    <div className="prontuario-card">
        <div className="card-header">
            <h2>{prontuario.tipo}</h2>
            <span className="tag prontuario">
                {prontuario.nome}
            </span>
      </div>

     <div className="card-body">
        <p>
          <strong>Consulta de {prontuario.dataRegistro}:</strong> {prontuario.demanda}
        </p>
      </div>
      <div className="card-footer">
        <button className="card-button usar-template" onClick={() => onVerClick(prontuario.id)}>
          <FontAwesomeIcon icon={faFileLines} />
          Ver
        </button>
        <button className="card-button imprimir" onClick={() => onImprimirClick(prontuario)}>
          <FontAwesomeIcon icon={faPrint} />
        </button>
      </div>
    </div>
  );
};

export default ProntuarioCard;