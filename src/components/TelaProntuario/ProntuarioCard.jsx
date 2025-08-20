import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines, faPrint } from '@fortawesome/free-solid-svg-icons';
import './ProntuarioCard.css';


const ProntuarioCard = ({ prontuario, onVerClick, onImprimirClick }) => {
  
  return (
    <div className="prontuario-card">
        <div className="card-header">
            <span className="tag prontuario">
                {prontuario.nome}
            </span>
      ' </div>

     <div className="card-body">
        <p>
          <strong>Data do último registro: {prontuario.dataRegistro}:</strong> {prontuario.infoAdicionais}
        </p>
      </div>
      <div className="card-footer">
        <button className="card-button usar-template" onClick={() => onVerClick(prontuario.id)}>
          <FontAwesomeIcon icon={faFileLines} />
          Ver
        </button>
        <button className="card-button imprimir" onClick={() => onImprimirClick(prontuario)}>
          <FontAwesomeIcon icon={faPrint} />
          Imprimir
        </button>
      </div>
    </div>
  );
};

export default ProntuarioCard;
