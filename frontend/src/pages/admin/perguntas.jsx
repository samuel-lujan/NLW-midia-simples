import React, {useState, useEffect} from "react";
import api from '../../services/api';
import styles from "../../styles/pages/Perguntas.module.css";

export default function Perguntas() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function getQuestions(){
      const { data } = await api.get('/surveys');
      setQuestions(data);
    }
    getQuestions();
  }, []);

  async function handleSubmit(e){
    e.preventDefault();
    const { data } = await api.post('/surveys', {
      title,
      description
    });

    setQuestions([...questions, data]);

    alert("pregunta criada com sucesso!");
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="container">
        <div className="card mb-3 mt-5">
          <div className="card-header bg-secondary text-white">
            Cadastro de perguntas
          </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="inputTitle" className="h5 card-title">Título da pergunta</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} name="inputTitle" id="inputTitle" type="text" className="form-control" required/>
              </div>
              <div className="form-group">
                <label htmlFor="inputQuestion" className="h5 card-title">Descrição da Pergunta</label>
                <input value={description} onChange={(e) => setDescription(e.target.value)} name="inputQuestion" id="inputQuestion" type="text" className="form-control" required/>
              </div>
            </div>
            <div className="card-footer bg-transparent text-right">
              <button type="submit" className="btn-primary btn">Cadastrar</button>
            </div>
        </div>
      </form>

      <section className='container'>
        <table className="table">
            <thead>
              <tr>
                <th scope="col">Título</th>
                <th scope="col">Descrição</th>
              </tr>
            </thead>
            <tbody>
              {questions.map(question => (
                <tr key={question.id}>
                  <td>{question.title}</td>
                  <td>{question.description}</td>
                </tr>
              ))}
            </tbody>
        </table>
      </section>
    </>
  );
}