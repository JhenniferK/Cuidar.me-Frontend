import './LoginCadastro.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logonome from '../../assets/logonome.png';
import { useState } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8082/cuidarme/api/psicologo/login', { email, senha })
            .then((response) => {
                const psicologoLogado = response.data;
                localStorage.setItem('usuarioLogado', JSON.stringify(psicologoLogado));
                navigate('/principal');
            })
            .catch((error) => {
                console.error('Erro no login:', error);
                alert('Email ou senha inválidos.');
            });
    };

    return (
        <div className="pagina-logincadastro-container">
            <div className="conteudo">
                <h1>Login</h1>

                <form className="form-group" onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                    <div className="form-options">
                        <a href="#">Esqueceu a senha?</a>
                        <button type="submit" className="btn-submit">Entrar</button>
                    </div>
                </form>
            </div>

            <div className="right">
                <img src={logonome} alt="logoNome" />
            </div>
        </div>
    );
};

export default Login;