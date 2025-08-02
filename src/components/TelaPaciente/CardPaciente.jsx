import './Paciente.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faCalendarAlt, faClock, faEye, faEdit } from '@fortawesome/free-solid-svg-icons';

const CardPaciente = () => {
    return (
        <div className="card-paciente">
            <div className="card-header">
                <div className="avatar">JS</div>
                    <div className="info-pessoal">
                        <h3>João Silva</h3>
                        <p>28 anos</p>
                    </div>
                    <span className="status-badge ativo">ativo</span>
                </div>
                <div className="card-body">
                    <p><FontAwesomeIcon icon={faEnvelope}/>joao.silva@email.com</p>
                    <p><FontAwesomeIcon icon={faPhone}/>(11) 98888-5678</p>
          <p><FontAwesomeIcon icon={faCalendarAlt} /> <strong>Próxima consulta:</strong>24/01/2025 10:30</p>
        <p><FontAwesomeIcon icon={faClock} /> <strong>Última sessão:</strong>17/01/2025</p>
        </div>
        <div className="card-footer">
        <button className="btn-detalhes"><FontAwesomeIcon icon={faEye} /> Ver Detalhes</button>
        <button className="btn-editar"><FontAwesomeIcon icon={faEdit} /> Editar</button>
      </div>
    </div>
    );
}
export default CardPaciente;