import './LoginCadastro.css';
import { useNavigate } from 'react-router-dom';
import logonome from '../../assets/logonome.png';

const Login = () => {
    const navigate = useNavigate();
    return (
        <div className="pagina-logincadastro-container">
            <div className="conteudo">
                <h1>Login</h1>

                <form className="form-group">
                    <input id="crp" type="text" placeholder="CRP" />
                    <input id="senha" type="password" placeholder="Senha" />
                </form>

                <div className="form-options">
                    <a href="#">Esqueceu a senha?</a>
                    <button type="submit" className="btn-submit" onClick={() => navigate('/principal')}>Entrar</button>
                </div>
            </div>

            <div className="right">
                <img src={logonome} alt="logoNome" />
            </div>
        </div>
    );
};

export default Login;