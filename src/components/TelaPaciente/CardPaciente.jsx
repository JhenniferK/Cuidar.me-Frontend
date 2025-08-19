import './Paciente.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faCalendarAlt, faClock, faEye, faEdit, faCalendar, faMapMarkerAlt, faHospital, faInfoCircle, faGenderless, faHeart, faBriefcase, faBookOpen, faBook } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const CardPaciente = ({ paciente }) => {
    const navigate = useNavigate();

    const [mostrarDetalhes, setMostrarDetalhes] = useState(false);
    const { nome, dataNascimento, telefone } = paciente;

    const toggleDetalhes = () => {
        setMostrarDetalhes(prev => !prev);
    };

    const EditarPaciente = () => {
        navigate('/editarPaciente/${paciente.lookupId}', {state: {pacienteParaEditar: paciente}})
    }

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

    const formatarData = (data) => {
        if (!data) return "-";
        const [ano, mes, dia] = data.split("-");
        return `${dia}/${mes}/${ano}`;
    };

    const idade = calcularIdade(dataNascimento);

    return (
        <div className="card-paciente">
            <div className="card-header">
                <div className="avatar">{nome?.split(" ").slice(0, 2).map((tk, i) => {
                    return tk[0].toUpperCase()})}
                </div>
                <div className="info-pessoal">
                    <h3>{nome}</h3>
                    <p>{idade} anos</p>
                </div>  
                <span className="status-badge ativo">ativo</span>
            </div>

            <div className="card-body-paciente">
                <p><FontAwesomeIcon icon={faPhone} />{paciente.telefone}</p>
                <p><FontAwesomeIcon icon={faCalendarAlt} /> <strong>Próxima consulta:</strong>24/01/2025 10:30</p>
                <p><FontAwesomeIcon icon={faClock} /> <strong>Última sessão:</strong>17/01/2025</p>
            </div>

            <div className="card-footer">
                <button className="btn-detalhes" onClick={toggleDetalhes}> <FontAwesomeIcon icon={faEye} /> {mostrarDetalhes ? 'Ocultar detalhes' : 'Ver detalhes'} </button>
                <button className="btn-editar" onClick={EditarPaciente}><FontAwesomeIcon icon={faEdit} /> Editar</button>
            </div>

            {mostrarDetalhes && (
                <div style={{ marginTop: '20px', color: '#343a40', lineHeight: 2 }}>

                    <p><FontAwesomeIcon icon={faCalendar} /> <strong> Data de Nascimento: </strong>{formatarData(paciente.dataNascimento)}</p>

                    <p><FontAwesomeIcon icon={faGenderless} /><strong> Gênero: </strong>{paciente.sexo}</p>

                    <p><FontAwesomeIcon icon={faHeart} /><strong> Estado Civil: </strong>{paciente.estadoCivil}</p>

                    <p><FontAwesomeIcon icon={faBook} /><strong> Escolaridade: </strong>{paciente.grauInstrucao}</p>

                    <p><FontAwesomeIcon icon={faBriefcase} /><strong> Profissão: </strong>{paciente.profissao}</p>

                    <p><FontAwesomeIcon icon={faPhone} /> <strong> Telefone: </strong>{paciente.telefone}</p>

                    {paciente.enderecoPessoal && (
                        <p><FontAwesomeIcon icon={faMapMarkerAlt} /> <strong> Endereço: </strong>{paciente.enderecoPessoal.logradouro}, {paciente.enderecoPessoal.numero} - {paciente.enderecoPessoal.cidade}, {paciente.enderecoPessoal.estado}</p>
                    )}

                    {paciente.enderecoTrabalho && (
                        <p><FontAwesomeIcon icon={faHospital} /> <strong> Endereço de Trabalho: </strong> {paciente.enderecoTrabalho.logradouro}, {paciente.enderecoTrabalho.numero} - {paciente.enderecoTrabalho.cidade}, {paciente.enderecoTrabalho.estado}</p>
                    )}

                    {paciente.infoAdicionais && (
                        <p><FontAwesomeIcon icon={faInfoCircle} /><strong> Informações adicionais: </strong> {paciente.infoAdicionais}</p>
                    )}

                    {paciente.contatoEmergencia && (
                        <p><FontAwesomeIcon icon={faPhone} /> <strong> Contato de Emergência: </strong>{paciente.contatoEmergencia.nome}, {paciente.contatoEmergencia.telefone}, {paciente.contatoEmergencia.parentesco} </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default CardPaciente;