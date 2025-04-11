import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NuevoSocioForm from './NuevoSocioForm';
import QRScanner from './QRScanner';

const Dashboard = () => {
  const [asistenciasHoy, setAsistenciasHoy] = useState([]);
  const [asistenciasSemana, setAsistenciasSemana] = useState([]);
  const [totalSocios, setTotalSocios] = useState(0);
  const [ranking, setRanking] = useState([]);
  const [mostrarQR, setMostrarQR] = useState(false);

  useEffect(() => {
    axios.get('/asistencias_hoy')
      .then(res => setAsistenciasHoy(res.data.asistencias_hoy || []))
      .catch(err => console.error("Error al obtener asistencias de hoy:", err));

    axios.get('/asistencias_semana')
      .then(res => setAsistenciasSemana(res.data.asistencias_semana || []))
      .catch(err => console.error("Error al obtener asistencias de la semana:", err));

    axios.get('/total_socios')
      .then(res => setTotalSocios(res.data.total || 0))
      .catch(err => console.error("Error al obtener total de socios:", err));

    axios.get('/ranking_asistencias')
      .then(res => setRanking(res.data.ranking || []))
      .catch(err => console.error("Error al obtener ranking:", err));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">🏋️‍♂️ Dashboard del Gimnasio</h1>

      <NuevoSocioForm />

      <div className="bg-white rounded shadow p-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={() => setMostrarQR(!mostrarQR)}
        >
          {mostrarQR ? 'Ocultar escáner QR' : 'Escanear código QR'}
        </button>

        {mostrarQR && (
          <div className="mt-4">
            <QRScanner />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Asistencias de hoy</h2>
          <ul>
            {asistenciasHoy.map((a, i) => (
              <li key={i}>{a.nombre} - {a.fecha_hora}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Asistencias de esta semana</h2>
          <ul>
            {asistenciasSemana.map((a, i) => (
              <li key={i}>{a.nombre} - {a.fecha_hora}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded shadow p-4 col-span-1">
          <h2 className="text-lg font-semibold mb-2">Total de socios</h2>
          <p className="text-2xl font-bold">{totalSocios}</p>
        </div>

        <div className="bg-white rounded shadow p-4 col-span-1">
          <h2 className="text-lg font-semibold mb-2">Ranking de asistencia</h2>
          <ol className="list-decimal list-inside">
            {ranking.map((s, i) => (
              <li key={i}>{s.nombre} - {s.cantidad} asistencias</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
