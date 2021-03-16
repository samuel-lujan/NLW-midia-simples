import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function Responder({ firstSurveyUserId }) {
  const [pergunta, setPergunta] = useState({});
  const [surveyUserId, setSurveyUserId] = useState(firstSurveyUserId);
  const [hasFinished, setHasFinished] = useState(false);

  useEffect(() => {
    async function getRespostas() {
      try {
        if (surveyUserId) {
          const { data } = await api.get(`/surveys/users/${surveyUserId}`);
          setPergunta(data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    console.log(surveyUserId);
    getRespostas();
  }, []);

  async function handleSubmit(nota) {
    try {
      const { data } = await api.put(`/surveys/users/${surveyUserId}`, {
        newValue: nota,
      });

      if (data.has_next) {
        setPergunta({
          title: data.title,
          description: data.description,
        });
        setSurveyUserId(data.id);
      }

      if (!data.has_next) {
        alert("Obrigado pelo feedback");
        setHasFinished(true);
      }
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
            {hasFinished && (
              <div>
                <p>Obrigado por responder</p>
              </div>
            )}
            {!hasFinished && (
              <div>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Responder.getInitialProps = (ctx) => {
  const { id } = ctx.query;
  console.log(ctx.query);
  return {
    firstSurveyUserId: id,
  };
};
