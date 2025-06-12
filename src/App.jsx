import { Routes, Route } from 'react-router-dom';
import { aplicacoes } from './data';
import AplicacoesTable from './components/AplicacoesTable';
import AplicacaoDetalhe from './components/AplicacaoDetalhe';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Catálogo de Aplicações - SCORE</h1>
      <Routes>
        <Route path="/" element={<AplicacoesTable aplicacoes={aplicacoes} />} />
        <Route path="/aplicacao/:nome" element={<AplicacaoDetalhe aplicacoes={aplicacoes} />} />
      </Routes>
    </div>
  );
}

export default App;