import { useNavigate } from 'react-router-dom';

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

function AplicacoesTable({ aplicacoes }) {
  const navigate = useNavigate();
  return (
    <table className="min-w-full table-auto border">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2">Aplicação</th>
          <th className="px-4 py-2">Stack (16)</th>
          <th className="px-4 py-2">CI/CD (16)</th>
          <th className="px-4 py-2">IaC (16)</th>
          <th className="px-4 py-2">Deployment (16)</th>
          <th className="px-4 py-2">Custo (16)</th>
          <th className="px-4 py-2">Logging (5)</th>
          <th className="px-4 py-2">Monitoring (7)</th>
          <th className="px-4 py-2">Tracing (8)</th>
          <th className="px-4 py-2">Total (100)</th>
        </tr>
      </thead>
      <tbody>
        {aplicacoes.map((app) => {
          const total = calculateTotal(app);
          return (
            <tr
              key={app.nome}
              onClick={() => navigate(`/aplicacao/${encodeURIComponent(app.nome)}`)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <td className="border px-4 py-2">{app.nome}</td>
              {Object.entries(maxValues).map(([key, max]) => (
                <td
                  key={key}
                  className={`border px-4 py-2 ${getBackgroundClass(app[key], max)}`}>
                  {app[key]}
                </td>
              ))}
              <td className={`border px-4 py-2 ${getBackgroundClass(total, 100)}`}>{total}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default AplicacoesTable;