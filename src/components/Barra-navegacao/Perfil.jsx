import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faUser, faEnvelope, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import './Perfil.css';

const Perfil = () => {
    const navigate = useNavigate();
    const [psicologo, setPsicologo] = useState(null);

    useEffect(() => {
        const dadosSalvos = localStorage.getItem('usuarioLogado');
        if (dadosSalvos) {
            setPsicologo(JSON.parse(dadosSalvos));
        } else {
            alert('Você precisa estar logado!');
            navigate('/');
        }
    }, []);

    return (
        <div className="perfil-background">
            <div className="perfil-card">
                <div className="perfil-avatar">
                    <span>{psicologo?.nome?.charAt(0)}{psicologo?.nome?.split(' ')[1]?.charAt(0)}</span>
                </div>
                <h1 className="perfil-title">Perfil do Usuário</h1>
                <p className="perfil-subtitle">
                    Gerencie suas informações
                </p>

                <div className="info-section">
                    <div className="info-field">
                        <label className="info-label">
                            <FontAwesomeIcon icon={faUser} /> Nome Completo
                        </label>
                        <div className="info-value">{psicologo?.nome}</div>
                    </div>

                    <div className="info-field">
                        <label className="info-label">
                            <FontAwesomeIcon icon={faEnvelope} /> E-mail
                        </label>
                        <div className="info-value">{psicologo?.email}</div>
                    </div>
                </div>

                <button className="edit-profile-button">
                    <FontAwesomeIcon icon={faPencilAlt} /> Editar Perfil
                </button>
            </div>
        </div>
    );
};

export default Perfil;