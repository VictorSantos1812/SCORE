import React from 'react';
import { useNavigate } from 'react-router-dom';

const maxValues = {
  stack: 16,
  'ci/cd': 16,
  iac: 16,
  deployment: 16,
  custo: 16,
  logging: 5,
  monitoring: 7,
  tracing: 8
};

// Formata labels como 'Ci/Cd' a partir de chaves com '/'
function formatLabel(key) {
  return key
    .split('/')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('/');
}

function getBackgroundClass(value, max) {
  const pct = value / max;
  if (pct < 0.5) return 'bg-red-100';
  if (pct <= 0.8) return 'bg-yellow-100';
  return 'bg-green-100';
}

function calculateTotal(app) {
  return Object.keys(maxValues).reduce((sum, key) => sum + (app[key] || 0), 0);
}

export default function AplicacoesTable({ aplicacoes }) {
  const navigate = useNavigate();
  const totalMax = Object.values(maxValues).reduce((a, b) => a + b, 0);

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full divide-y divide-gray-200 table-fixed shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-50 sticky top-0">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Aplicação</th>
            {Object.entries(maxValues).map(([key, max]) => (
              <th key={key} className="px-4 py-2 text-center text-sm font-semibold text-gray-600">
                {key.charAt(0).toUpperCase() + key.slice(1)} ({max})
              </th>
            ))}
            <th className="px-4 py-2 text-center text-sm font-semibold text-gray-600">
              Total ({totalMax})
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {aplicacoes.map((app, idx) => {
            const total = calculateTotal(app);
            const stripeClass = idx % 2 === 0 ? 'bg-white' : 'bg-gray-50';

            return (
              <tr key={app.nome} className={`${stripeClass} hover:bg-blue-50 cursor-pointer`} onClick={() => navigate(`/aplicacao/${encodeURIComponent(app.nome)}`)}>
                <td className="px-4 py-3 text-sm text-gray-800 font-medium">{app.nome}</td>
                {Object.entries(maxValues).map(([key, max]) => {
                  const value = app[key] || 0;
                  const pct = Math.round((value / max) * 100);
                  return (
                    <td key={key} className="px-4 py-2 text-center align-middle">
                      <div className={`${getBackgroundClass(value, max)} rounded text-xs font-semibold text-gray-800 py-1`}>{value}</div>
                      <div className="h-1 bg-gray-200 rounded mt-1">
                        <div className="h-full rounded" style={{ width: `${pct}%`, backgroundColor: pct < 50 ? '#FCA5A5' : pct <= 80 ? '#FDE68A' : '#BBF7D0' }} />
                      </div>
                    </td>
                  );
                })}
                <td className="px-4 py-2 text-center align-middle">
                  <div className={`${getBackgroundClass(total, totalMax)} rounded text-xs font-semibold text-gray-800 py-1`}>{total}</div>
                  <div className="h-1 bg-gray-200 rounded mt-1">
                    <div className="h-full rounded" style={{ width: `${Math.round((total / totalMax) * 100)}%`, backgroundColor: Math.round((total / totalMax) * 100) < 50 ? '#FCA5A5' : Math.round((total / totalMax) * 100) <= 80 ? '#FDE68A' : '#BBF7D0' }} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}