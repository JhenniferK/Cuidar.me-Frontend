import './LoginCadastro.css';
import axios from 'axios';
import logonome from '../../assets/logonome.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Cadastro = () => {

    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const psicologo = {
            nome,
            email,
            senha
        };

        axios.post('http://localhost:8082/cuidarme/api/psicologo/cadastrar', psicologo)
            .then((response) => {
                const psicologoCadastrado = response.data;
                localStorage.setItem('psicologo', JSON.stringify(psicologoCadastrado));
                alert('Psicólogo cadastrado com sucesso!');
                navigate('/principal');
            })
            .catch((error) => {
                console.error('Erro ao cadastrar psicólogo:', error);
                alert('Erro ao cadastrar psicólogo.');
            });
    };

    return (
        <div className="pagina-logincadastro-container">
            <div className="conteudo">
                <h1>Cadastro</h1>

                <form className="form-group" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="nome-psicologo"
                        placeholder="Nome completo"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required />
                    <input
                        type="text"
                        id="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                    <input
                        type="password"
                        id="senha"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required />

                    <div className="form-options">
                        <button type="submit" className="btn-submit">Cadastrar</button>
                    </div>
                </form>
            </div>

            <div className="right">
                <img src={logonome} alt="logoNome" />
            </div>
        </div>
    );
};

export default Cadastro;