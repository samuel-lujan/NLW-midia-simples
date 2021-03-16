import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function Responder({ firstQuestionSurveyUserId }) {
  const [pergunta, setPergunta] = useState({});

  useEffect(() => {

    async function getRespostas() {
      try {

        if (firstQuestionSurveyUserId) {
          const { data } = await api.get(`/surveys/users/${firstQuestionSurveyUserId}`);
          setPergunta(data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    console.log(firstQuestionSurveyUserId);
    getRespostas();
  }, []);

  async function handleSubmit(nota) {
    try {
      const { data } = await api.put(`/surveys/users/${firstQuestionSurveyUserId}`, {
        newValue: nota,
      });
      if (data.has_next) {
        setPergunta({

        })
      }
      alert("Obrigado pelo feedback");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <div className="container mt-5">
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
  const { firstQuestionSurveyUserId } = ctx.query;
  return {
    firstQuestionSurveyUserId
  }
}
