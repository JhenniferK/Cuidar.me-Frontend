import './Paciente.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faUserFriends, faCalendarDay, faClock, faSearch, faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';
import CardPaciente from './CardPaciente';
import addPaciente from './AddPaciente';
import { NavLink } from 'react-router-dom';

const Paciente = () => {
    return (
        <div className="pagina-pacientes">
            <header className="header-pacientes-gradiente">
                <h1>Meus Pacientes</h1>
                <p>Gerencie e acompanhe seus pacientes</p>
                <div className="add-paciente-container">
                    <NavLink to="/addPaciente" className="btn-novo-paciente">
                        <FontAwesomeIcon icon={faPlus}/> Novo Paciente
                    </NavLink>
                </div>
            </header>

            <main className="conteudo-principal">
                <section className="stats-container">
                    <div className="start-card">
                        <div className="stat-info">
                            <p>Total de Pacientes</p>
                            <span>6</span>
                        </div>
                        <FontAwesomeIcon icon={faUserFriends} className="stat-icon"/>
                    </div>
                    <div className="stat-card">
                        <div className="stat-info">
                            <p>Pacientes Ativos</p>
                            <span>4</span>
                        </div>
                        <FontAwesomeIcon icon={faCalendarDay} className="stat-icon"/>
                    </div>
                    <div className="stat-card">
                        <div className="stat-info">
                            <p>Consultas Hoje</p>
                            <span>3</span>
                        </div>
                        <FontAwesomeIcon icon={faClock} className="stat-icon"/>
                    </div>
                </section>
                <section className="filtro-container">
                    <div className="input-busca">
                        <FontAwesomeIcon icon={faSearch}/>
                        <input type="text" placeholder="Buscar pacientes..."/>
                    </div>
                    <div className="input-filtro">
                        <FontAwesomeIcon icon={faFilter}/>
                        <select>
                            <option value="todos">Todos os status</option>
                            <option value="ativo">Ativo</option>
                            <option value="inativo">Inativo</option>
                        </select>
                    </div>
                </section>
            <section className="lista-pacientes">
                <CardPaciente />
                <CardPaciente />
                <CardPaciente />
                <CardPaciente />
            </section>
        </main>
    </div>
    );
};

export default Paciente;
