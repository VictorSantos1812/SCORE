import React from 'react';
import { useParams, Link } from 'react-router-dom';

const maxValues = {
  stack: 16,
  cicd: 16,
  iac: 16,
  deployment: 16,
  custo: 16,
  logging: 5,
  monitoring: 7,
  tracing: 8
};

function getBackgroundClass(value, max) {
  const pct = value / max;
  if (pct < 0.5) return 'bg-red-200';
  if (pct <= 0.8) return 'bg-yellow-200';
  return 'bg-green-200';
}

function calculateTotal(app) {
  return Object.keys(maxValues).reduce((sum, key) => sum + (app[key] || 0), 0);
}

function AplicacaoDetalhe({ aplicacoes }) {
  const { nome } = useParams();
  const app = aplicacoes.find((a) => a.nome === decodeURIComponent(nome));

  if (!app) {
    return <div className="p-4 text-center">Aplicação não encontrada</div>;
  }

  const total = calculateTotal(app);
  const overallPct = Math.round(
    (total / Object.values(maxValues).reduce((a, b) => a + b, 0)) * 100
  );

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Link to="/" className="text-blue-500 hover:underline">
        ← Voltar ao catálogo
      </Link>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-2">{app.nome}</h2>
        <p className="text-gray-700 mb-4">{app.descricao}</p>
        <div className="flex space-x-4 mb-6">
          <a
            href={app.documentacao}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded hover:bg-indigo-200"
          >
            Documentação
          </a>
          <a
            href={app.repositorio}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
          >
            Repositório
          </a>
        </div>

        <h3 className="text-2xl font-semibold mb-4">Notas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(maxValues).map(([key, max]) => {
            const value = app[key] || 0;
            const pct = Math.round((value / max) * 100);
            return (
              <div key={key} className="flex flex-col">
                <span className="font-medium capitalize">{key}</span>
                <div className="mt-1 flex items-center space-x-2">
                  <span className="text-lg font-semibold">
                    {value} / {max}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-sm font-medium rounded ${
                      getBackgroundClass(value, max)
                    }`}
                  >
                    {pct}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded mt-2">
                  <div
                    className={`${getBackgroundClass(value, max)} h-full rounded`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t flex items-center justify-between">
          <span className="text-xl font-semibold">Total:</span>
          <span className="text-2xl font-bold">
            {total} / {Object.values(maxValues).reduce((a, b) => a + b, 0)} ({overallPct}%)
          </span>
        </div>
      </div>
    </div>
  );
}

export default AplicacaoDetalhe;