import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { faCalendarDays, faMapMarkedAlt, faPhone, faUserFriends, faIdCard, faUser, faHouse, faLocationArrow, faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './AddPaciente.css';
import { NavLink } from 'react-router-dom';

const AddPaciente = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [telefonePessoal, setTelefonePessoal] = useState('');

  const [contatoEmergencia, setContatoEmergencia] = useState({
    nome: '',
    telefone: ''
  });

  const [infoAdicionais, setInfoAdicionais] = useState('');

  const [enderecoPessoal, setEnderecoPessoal] = useState({
    logradouro: '',
    numero: '',
    cep: '',
    cidade: '',
    estado: ''
  });

  const [enderecoTrabalho, setEnderecoTrabalho] = useState({
    logradouro: '',
    numero: '',
    cep: '',
    cidade: '',
    estado: ''
  });

  const formatarCPF = (valor) => {
    valor = valor.replace(/\D/g, '').slice(0, 11);
    return valor
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const formatarTelefone = (valor) => {
    valor = valor.replace(/\D/g, '').slice(0, 11);
    return valor
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d{5})(\d{4})$/, '$1-$2');
  };


  const buscarEnderecoPorCep = async (cep, tipoEndereco) => {
    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (!data.erro) {
        if (tipoEndereco === 'enderecoPessoal') {
          setEnderecoPessoal(prev => ({
            ...prev,
            logradouro: data.logradouro || '',
            cidade: data.localidade || '',
            estado: data.uf || ''
          }));
        } else if (tipoEndereco === 'enderecoTrabalho') {
          setEnderecoTrabalho(prev => ({
            ...prev,
            logradouro: data.logradouro || '',
            cidade: data.localidade || '',
            estado: data.uf || ''
          }));
        }
      } else {
        alert('CEP não encontrado.');
      }
    } catch (error) {
      alert('Erro ao buscar o CEP. Verifique sua conexão ou o formato do CEP.');
    }
  };

  useEffect(() => {
    if (enderecoPessoal.cep.length === 8) {
      buscarEnderecoPorCep(enderecoPessoal.cep, 'enderecoPessoal');
    }
  }, [enderecoPessoal.cep]);

  useEffect(() => {
    if (enderecoTrabalho.cep.length === 8) {
      buscarEnderecoPorCep(enderecoTrabalho.cep, 'enderecoTrabalho');
    }
  }, [enderecoTrabalho.cep]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const paciente = {
      nome,
      cpf,
      rg,
      dataNascimento,
      telefonePessoal,
      enderecoPessoal,
      enderecoTrabalho,
      infoAdicionais,
      contatoEmergencia,
    };

    axios.post('http://localhost:8081/paciente', paciente)
      .then(() => {
        alert('Paciente cadastrado com sucesso!');
        navigate('/paciente');
      })
      .catch((error) => {
        console.error('Erro ao cadastrar paciente:', error);
        alert('Erro ao cadastrar paciente.');
      });
  };

  return (
    <div className="cadastro-paciente">
      <div className="cadastro-card">
        <div className="form-header">
          <h1>Cadastro de Paciente</h1>
          <p>Preencha as informações do paciente para adicionar ao sistema</p>
        </div>

        <form onSubmit={handleSubmit}>
          <section className="form-section">
            <h2 className="section-title">
              <FontAwesomeIcon icon={faUserFriends} />
              Dados Pessoais
            </h2>

            <div className="grupo-form">
              <label htmlFor="nome-completo">Nome*</label>
              <div className="input-with-icon">
                <FontAwesomeIcon icon={faUser} className="input-icon" />
                <input
                  type="text"
                  id="nome-completo"
                  placeholder="Nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grupo-form">
              <label htmlFor="cpf">CPF*</label>
              <div className="input-with-icon">
                <FontAwesomeIcon icon={faIdCard} className="input-icon" />
                <input
                  type="text"
                  id="cpf"
                  placeholder="Apenas números"
                  value={cpf}
                  onChange={(e) => setCpf(formatarCPF(e.target.value))}
                  required
                />
              </div>
            </div>

            <div className="grupo-form">
              <label htmlFor="rg">RG*</label>
              <div className="input-with-icon">
                <FontAwesomeIcon icon={faIdCard} className="input-icon" />
                <input
                  type="text"
                  id="rg"
                  placeholder="Apenas números"
                  value={rg}
                  onChange={(e) => setRg(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grupo-form">
              <label htmlFor="dataNascimento">Data de Nascimento*</label>
              <div className="input-with-icon">
                <FontAwesomeIcon icon={faCalendarDays} className="input-icon" />
                <input
                  type="date"
                  id="data-nascimento"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grupo-form">
              <label htmlFor="telefone">Telefone*</label>
              <div className="input-with-icon">
                <FontAwesomeIcon icon={faPhone} className="input-icon" />
                <input
                  type="text"
                  id="telefone"
                  placeholder="Apenas números"
                  value={telefonePessoal}
                  onChange={(e) => setTelefonePessoal(formatarTelefone(e.target.value))}
                  required
                />
              </div>
            </div>

            <div className="grupo-form">
              <label htmlFor="telefone-emergencia">Contato de Emergência*</label>
              <div className="input-with-icon">
                <FontAwesomeIcon icon={faUser} className="input-icon" />
                <input
                  type="text"
                  id="nome-emergencia"
                  placeholder="Nome"
                  value={contatoEmergencia.nome}
                  onChange={(e) => setContatoEmergencia({
                    ...contatoEmergencia, 
                    nome: e.target.value})}
                  required
                />
              </div>
              <label htmlFor="telefone-emergencia"></label>
              <div className="input-with-icon">
                <FontAwesomeIcon icon={faPhone} className="input-icon" />
                <input
                  type="text"
                  id="telefone-emergencia"
                  placeholder="Apenas números"
                  value={contatoEmergencia.telefone}
                  onChange={(e) => setContatoEmergencia({
                    ...contatoEmergencia, 
                    telefone: formatarTelefone(e.target.value)})}
                  required
                />
              </div>
            </div>

            <div className="grupo-form">
              <label htmlFor="info-adicionais">Informações Adicionais</label>
              <div className="input-with-icon">
                <FontAwesomeIcon icon={faNoteSticky} className="input-icon" />
                <input
                  type="text"
                  id="info-adicionais"
                  placeholder="Informações importantes sobre o paciente"
                  value={infoAdicionais}
                  onChange={(e) => setInfoAdicionais(e.target.value)}
                />
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2 className="section-title">
              <FontAwesomeIcon icon={faMapMarkedAlt} /> Endereço Residencial
            </h2>
            <div className="grupo-form">
              <label htmlFor="endereco-rua">Logradouro*</label>
              <div className="input-with-icon">
                <FontAwesomeIcon icon={faMapMarkedAlt} className="input-icon" />
                <input
                  type="text"
                  id="endereco-rua"
                  placeholder="Nome da rua"
                  name="logradouro"
                  value={enderecoPessoal.logradouro}
                  onChange={(e) => setEnderecoPessoal({...enderecoPessoal, logradouro: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grupo-form">
              <label htmlFor="endereco-numero">Número*</label>
              <div className="input-with-icon">
                <FontAwesomeIcon icon={faHouse} className="input-icon" />
                <input
                  type="text"
                  id="endereco-numero"
                  placeholder="Número"
                  name="numero"
                  value={enderecoPessoal.numero}
                  onChange={(e) => setEnderecoPessoal({...enderecoPessoal, numero: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grupo-form">
              <label htmlFor="endereco-cep">CEP*</label>
              <div className="input-with-icon">
                <FontAwesomeIcon icon={faLocationArrow} className="input-icon" />
                <input
                  type="text"
                  id="endereco-cep"
                  placeholder="12345678"
                  name="cep"
                  value={enderecoPessoal.cep}
                  onChange={(e) => setEnderecoPessoal({...enderecoPessoal, cep: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grupo-form">
              <label htmlFor="cidade-pessoal">Cidade</label>
              <input
                type="text"
                id="cidade-pessoal"
                placeholder="Cidade"
                name="cidade"
                value={enderecoPessoal.cidade}
                readOnly
              />
            </div>

            <div className="grupo-form">
              <label htmlFor="estado-pessoal">Estado</label>
              <input
                type="text"
                id="estado-pessoal"
                placeholder="Estado"
                name="estado"
                value={enderecoPessoal.estado}
                readOnly
              />
            </div>
          </section>

          <section className="form-section">
            <h2 className="section-title">
              <FontAwesomeIcon icon={faMapMarkedAlt} /> Endereço de Trabalho
            </h2>
            <div className="grupo-form">
              <label htmlFor="trabalho-rua">Logradouro*</label>
              <div className="input-with-icon">
                <FontAwesomeIcon icon={faMapMarkedAlt} className="input-icon" />
                <input
                  type="text"
                  id="trabalho-rua"
                  placeholder="Nome da rua"
                  name="logradouro"
                  value={enderecoTrabalho.logradouro}
                  onChange={(e) => setEnderecoTrabalho({...enderecoTrabalho, logradouro: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grupo-form">
              <label htmlFor="trabalho-numero">Número*</label>
              <div className="input-with-icon">
                <FontAwesomeIcon icon={faHouse} className="input-icon" />
                <input
                  type="text"
                  id="trabalho-numero"
                  placeholder="Número"
                  name="numero"
                  value={enderecoTrabalho.numero}
                  onChange={(e) => setEnderecoTrabalho({...enderecoTrabalho, numero: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grupo-form">
              <label htmlFor="trabalho-cep">CEP*</label>
              <div className="input-with-icon">
                <FontAwesomeIcon icon={faLocationArrow} className="input-icon" />
                <input
                  type="text"
                  id="trabalho-cep"
                  placeholder="12345678"
                  name="cep"
                  value={enderecoTrabalho.cep}
                  onChange={(e) => setEnderecoTrabalho({...enderecoTrabalho, cep: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grupo-form">
              <label htmlFor="cidade-trabalho">Cidade</label>
              <input
                type="text"
                id="cidade-trabalho"
                placeholder="Cidade"
                name="cidade"
                value={enderecoTrabalho.cidade}
                readOnly
              />
            </div>

            <div className="grupo-form">
              <label htmlFor="estado-trabalho">Estado</label>
              <input
                type="text"
                id="estado-trabalho"
                placeholder="Estado"
                name="estado"
                value={enderecoTrabalho.estado}
                readOnly
              />
            </div>
          </section>

          <div className="form-actions">
            <NavLink to="/paciente" className="btn-voltar">
              Voltar
            </NavLink>
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