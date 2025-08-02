import React from "react";
import './Paciente.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faCalendarAlt, faClock, faEye, faEdit } from '@fortawesome/free-solid-svg-icons';

const CardPaciente = ({ paciente }) => {

    const { nome, dataNascimento, telefonePessoal } = paciente;

    const calcularIdade = (dataNascimento) => {
        if (!dataNascimento) return "-";

        const hoje = new Date();
        const nascimento = new Date(dataNascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();

        if (mes < 0 || mes === 0 && hoje.getDate() < nascimento.getDate()) {
            idade--;
        }

        return idade;
    }

    const idade = calcularIdade(dataNascimento);

    return (
        <div className="card-paciente">
            <div className="card-header">
                <div className="avatar">{nome?.slice(0,2).toUpperCase()}</div>
                    <div className="info-pessoal">
                        <h3>{nome}</h3>
                        <p>{idade} anos</p>
                    </div>
                    <span className="status-badge ativo">ativo</span>
                </div>
                <div className="card-body">
                    <p><FontAwesomeIcon icon={faPhone}/>{telefonePessoal}</p>
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