import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function Responder({ id }) {
  const [pergunta, setPergunta] = useState({});

  useEffect(() => {

    async function getRespostas() {
      try {

        if (id) {
          const { data } = await api.get(`/surveys/users/${id}`);
          setPergunta(data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    console.log(id);
    getRespostas();
  }, []);

  async function handleSubmit(nota) {
    try {
      await api.put(`/surveys/users/${id}`, {
        newValue: nota,
      });
      alert("Obrigado pelo feedback");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <div className="container">
        <div className="card">
          <div className="card-header">Consulta NPS</div>
          <div className="card-body">
            <h4>{pergunta.title}</h4>
            <h5>{pergunta.description}</h5>
          </div>
          <div className="card-footer d-flex w-100 align-items-center justify-content-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((nota) => (
              <button
                onClick={() => handleSubmit(nota)}
                className="btn btn-primary m-1"
                key={nota}
              >
                {nota}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Responder.getInitialProps = (ctx) => {
  const { id } = ctx.query;
  return {
    id
  }
}
