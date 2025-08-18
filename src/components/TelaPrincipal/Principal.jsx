import './Principal.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logonome from '../../assets/logonome.png';

const Principal = () => {
  const navigate = useNavigate();
  const [psicologo, setPsicologo] = useState(null);

  useEffect(() => {
    const dadosSalvos = localStorage.getItem('usuarioLogado');
    if (dadosSalvos) {
      setPsicologo(JSON.parse(dadosSalvos));
    } else {
      alert('Você precisa estar logado!');
      navigate('/');
    }
  }, []);

  if (!psicologo) return null;

  return (
    <div className="principal">
      <main className="main">
        <h1>Bem-vindo(a), {psicologo.nome.split(" ")[0]}!</h1>
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