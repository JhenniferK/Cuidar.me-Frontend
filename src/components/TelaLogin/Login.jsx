import './Login.css';
import logonome from '../../assets/logo-cuidarme(nome).png';

const Login = () => {
    return (
        <div className="pagina-container">
            <div className="conteudo">
                <h1>Login</h1>

                <form className="form-group">
                    <input id="crp" type="text" placeholder="CRP" />
                    <input id="senha" type="password" placeholder="Senha" />
                </form>

                <div className="form-options">
                    <a href="#">Esqueceu a senha?</a>
                    <button type="submit" className="btn-login">Entrar</button>
                </div>
            </div>

            <div className="right">
                <img src={logonome} alt="logoNome" />
            </div>
        </div>
    );
};

export default Login;