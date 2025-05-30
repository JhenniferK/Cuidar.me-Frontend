import './Cadastro.css';
import logonome from '../../assets/logo-cuidarme(nome).png';

const Cadastro = () => {
    return (
        <div className="pagina-cadastro-container">
            <div className="conteudo">
                <h1>Cadastro</h1>

                <form className="form-group">
                    <input id="crp" type="text" placeholder="CRP" />
                    <input id="email" type="text" placeholder="E-mail" />
                    <input id="senha" type="password" placeholder="Senha" />
                </form>

                <div className="form-options">
                    <button type="submit" className="btn-login">Cadastrar</button>
                </div>
            </div>

            <div className="right">
                <img src={logonome} alt="logoNome" />
            </div>
        </div>
    );
};

export default Cadastro;