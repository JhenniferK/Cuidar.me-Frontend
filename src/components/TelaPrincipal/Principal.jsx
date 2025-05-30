import './Principal.css';
import logonome from '../../assets/logo-cuidarme(nome).png';

const Principal = () => {
  return (
    <div className="principal">
      <header className="header">
        <div className="logo">
          <img src={logonome} alt="Cuidar.me" />
        </div>
        <nav className="nav">
          <a href="#">Início</a>
          <a className="active" href="#">Pacientes</a>
          <a href="#">Agenda</a>
          <a href="#">Prontuários</a>
          <a href="#">Pagamentos</a>
        </nav>
        <div className="profile-icon">👤</div>
      </header>

      <main className="main">
        <h1>Bem-vindo(a) ao Cuidar.me!</h1>
        <p>Veja suas informações e atividades.</p>

        <div className="card-container">
          <div className="card pacientes">
            <h2>Pacientes</h2>
          </div>

          <div className="card consultas">
            <h2>Próximas consultas</h2>
            <div className="consulta">
              <span>Paciente (Online)</span>
              <div className="data-horario">
                📅 8 de Junho <strong>14h - 15h</strong>
              </div>
            </div>
          </div>

          <div className="card notas">
            <h2>Notas</h2>
            <div className="nota">
              Paciente efetuou o pagamento!
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Principal;