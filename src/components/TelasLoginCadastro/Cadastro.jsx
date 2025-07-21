import './LoginCadastro.css';
import logonome from '../../assets/logonome.png';

const Cadastro = () => {
    return (
        <div className="pagina-logincadastro-container">
            <div className="conteudo">
                <h1>Cadastro</h1>

                <form className="form-group">
                    <input id="crp" type="text" placeholder="CRP" />
                    <input id="email" type="text" placeholder="E-mail" />
                    <input id="senha" type="password" placeholder="Senha" />
                </form>

                <div className="form-options">
                    <button type="submit" className="btn-submit">Cadastrar</button>
                </div>
            </div>

            <div className="right">
                <img src={logonome} alt="logoNome" />
            </div>
        </div>
    );
};

export default Cadastro;