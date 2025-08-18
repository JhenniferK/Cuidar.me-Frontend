import './Paciente.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faCalendarDay, faClock, faSearch, faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';
import CardPaciente from './CardPaciente';
import { NavLink } from 'react-router-dom';

const Paciente = () => {

    const [pacientes, setPacientes] = useState([]);
    const [busca, setBusca] = useState("");

    useEffect(() => {
        axios.get('http://localhost:8082/paciente/listar')
            .then(response => {
                setPacientes(response.data)
            })
            .catch(error => {
                console.error('Erro ao buscar pacientes:', error)
            });
    }, []);

    const pacientesFiltrados = pacientes.filter(paciente =>
        paciente.nome.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <div className="pagina-pacientes">
            <header className="header-pacientes-gradiente">
                <h1>Meus Pacientes</h1>
                <p>Gerencie e acompanhe seus pacientes.</p>
                <div className="add-paciente-container">
                    <NavLink to="/addPaciente" className="btn-novo-paciente">
                        <FontAwesomeIcon icon={faPlus} /> Novo Paciente
                    </NavLink>
                </div>
            </header>

            <main className="conteudo-principal">
                <section className="stats-container">
                    <div className="stat-card">
                        <div className="stat-info">
                            <p>Total de Pacientes</p>
                            <span>{pacientes.length}</span>
                        </div>
                        <FontAwesomeIcon icon={faUserFriends} className="stat-icon" />
                    </div>

                    <div className="stat-card">
                        <div className="stat-info">
                            <p>Pacientes Ativos</p>
                            <span>3</span>
                        </div>
                        <FontAwesomeIcon icon={faCalendarDay} className="stat-icon" />
                    </div>

                    <div className="stat-card">
                        <div className="stat-info">
                            <p>Consultas Hoje</p>
                            <span>1</span>
                        </div>
                        <FontAwesomeIcon icon={faClock} className="stat-icon" />
                    </div>
                </section>

                <section className="filtro-container">
                    <div className="input-busca">
                        <FontAwesomeIcon icon={faSearch} />
                        <input
                            type="text"
                            placeholder="Buscar pacientes"
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                    </div>

                    <div className="input-filtro">
                        <FontAwesomeIcon icon={faFilter} />
                        <select>
                            <option value="todos">Todos os status</option>
                            <option value="ativo">Ativo</option>
                            <option value="inativo">Inativo</option>
                        </select>
                    </div>
                </section>

                <section className="lista-pacientes">
                    {pacientes.map(paciente => (
                        <CardPaciente key={paciente.id} paciente={paciente} />
                    ))}
                </section>
            </main>
        </div>
    );
};

export default Paciente;