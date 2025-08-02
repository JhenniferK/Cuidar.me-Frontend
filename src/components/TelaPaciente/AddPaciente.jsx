import { useNavigate } from 'react-router-dom';
import { faBuilding, faCalendarDays, faMapMarkedAlt, faPhone, faUserFriends, faUserPlus, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './AddPaciente.css'; 
import { NavLink } from 'react-router-dom';

const AddPaciente = () => {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
    }
    return(
        <div className="cadastro-paciente">
            <div className="cadastro-card">
                <div className="form-header">
                    <h1>Cadastro de Paciente</h1>
                    <p>Preencha as informações do paciente para adicionar ao sistema</p>
                </div>

                <form>
                    <section className="form-section">
                        <h2 className="section-title">
                            <FontAwesomeIcon icon={faUserFriends} />
                            Dados Pessoais
                        </h2>
                        <div className="grupo-form">
                            <label htmlFor="fullName"> Nome Completo *</label>
                            <input type="text" id="fullName" placeholder="Digite o nome completo"/>
                        </div>
                        <div className="grupo-form">
                            <label htmlFor="dataNascimento">Data de Nascimento *</label>
                            <div className="input-with-icon">
                                <FontAwesomeIcon icon={faCalendarDays} className="input-icon" />
                                <input type="text" id="dataNascimento" placeholder="dd/mm/aaaa" />
                            </div>
                        </div>
                        <div className="grupo-form">
                            <label htmlFor="telefone">Telefone *</label>
                            <div className="input-with-icon">
                                <FontAwesomeIcon icon={faPhone} className="input-icon"/>
                                <input type="text" id="telefone" placeholder="(11) 9 9999-9999"/>
                            </div>
                        </div>
                        <div className="grupo-form">
                            <label htmlFor="cpf">CPF *</label>
                            <div className="input-with-icon">
                                <FontAwesomeIcon icon={faIdCard} className="input-icon" />
                                <input type="text" id="cpf" placeholder="123.456.789-00" />
                            </div>
                        </div>
                    </section>

                    <section className="form-section">
                        <h2 className="section-title">
                            <FontAwesomeIcon icon={faMapMarkedAlt} /> Endereço Residencial
                        </h2>
                        <div className="grupo-form">
                            <label htmlFor="endereco">Endereço *</label>
                            <input type="text" id="endereco" placeholder="Rua, número, bairro" />
                        </div>
                        <div className="grupo-form">
                            <label htmlFor="cidade">Cidade *</label>
                            <input type="text" id="cidade" placeholder="Cidade" />
                        </div>
                        <div className="grupo-form">
                            <label htmlFor="cep">CEP *</label>
                            <input type="text" id="cep" placeholder="12345-678" />
                        </div>
                    </section>

                    <section className="form-section">
                        <h2 className="section-title">
                            <FontAwesomeIcon icon={faBuilding} /> Endereço de Trabalho <span>(Opcional)</span>
                        </h2>
                        <div className="grupo-form">
                            <label htmlFor="endereco-trabalho">Endereço</label>
                            <input type="text" id="endereco-trabalho" placeholder="Rua, número, bairro" />
                        </div>
                        <div className="grupo-form">
                            <label htmlFor="cidade-trabalho">Cidade</label>
                            <input type="text" id="cidade-trabalho" placeholder="Cidade" />
                        </div>
                        <div className="grupo-form">
                            <label htmlFor="cep-trabalho">CEP</label>
                            <input type="text" id="cep-trabalho" placeholder="12345-678" />
                        </div>
                    </section>

                    <div className="form-actions">
                        <button type="button" className="btn-limpar">
                            Limpar
                        </button>
                        <button type="submit" className="btn-cadastrar-paciente">
                            Cadastrar Paciente
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPaciente;