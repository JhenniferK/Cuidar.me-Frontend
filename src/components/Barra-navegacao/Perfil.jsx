import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faBriefcase, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import './Perfil.css';

const Perfil = () => {
    const userData = {
        nome: "Dr. Joyce Gregório",
        especialidade: "Crianças e adolescentes",
        email: "joycegregorio@gmail.com",
        iniciais: "JG"
    };
    return (
        <div className="perfil-background">
            <div className="perfil-card">
                <div className="perfil-avatar">
                    <span>{userData.iniciais}</span>
                </div>
            <h1 className="perfil-title">Perfil do Usuário</h1>
            <p className="perfil-subtitle">
            Gerencie suas informações pessoais e profissionais
            </p>

            <div className="info-section">
                <div className="info-field">
                    <label className="info-label">
                        <FontAwesomeIcon icon={faUser} /> Nome Completo
                    </label>
                    <div className="info-value">João Silva</div>
                </div>

                <div className="info-field">
                    <label className="info-label">
                        < FontAwesomeIcon icon={faEnvelope} /> E-mail de Contato
                    </label>
                    <div className="info-value">joao.silva@email.com</div>
                </div>

                <div className="info-field">
                    <label className="info-label">
                    <FontAwesomeIcon icon={faBriefcase} /> Especialidade
                    </label>
                    <div className="info-value">Desenvolvedor Frontend</div>
                </div>
                </div>

                <button className="edit-profile-button">
                < FontAwesomeIcon icon={faPencilAlt} /> Editar Perfil
                </button>
            </div>
        </div>
    );
};

export default Perfil;