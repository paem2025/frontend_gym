import { useState } from 'react';
import axios from 'axios';

export default function NuevoSocioForm() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    altura: '',
    peso: '',
    email: '',
    cuota_pagada: true
  });

  const [mensaje, setMensaje] = useState('');
  const [qrBase64, setQrBase64] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/socio', form);
      if (res.data.status === 'ok') {
        setMensaje('✅ Socio registrado correctamente');
        setQrBase64(res.data.qr_base64);
        setForm({
          nombre: '',
          apellido: '',
          direccion: '',
          altura: '',
          peso: '',
          email: '',
          cuota_pagada: true
        });
      } else {
        setMensaje(`❌ Error: ${res.data.mensaje}`);
        setQrBase64(null);
      }
    } catch (err) {
      console.error(err);
      setMensaje('❌ Error al registrar socio');
      setQrBase64(null);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto bg-white shadow rounded mt-6">
      <h2 className="text-xl font-bold mb-4">Registrar nuevo socio</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* 👇 qr_token fue eliminado de este array */}
        {['nombre', 'apellido', 'direccion', 'altura', 'peso', 'email'].map((campo) => (
          <input
            key={campo}
            type={campo === 'email' ? 'email' : 'text'}
            name={campo}
            placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
            value={form[campo]}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        ))}

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="cuota_pagada"
            checked={form.cuota_pagada}
            onChange={handleChange}
          />
          <span>¿Cuota pagada?</span>
        </label>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Registrar socio
        </button>
      </form>

      {mensaje && <p className="mt-4 text-center font-semibold">{mensaje}</p>}

      {qrBase64 && (
        <div className="mt-6 text-center">
          <h3 className="text-lg font-semibold mb-2">QR generado para el socio</h3>
          <img src={`data:image/png;base64,${qrBase64}`} alt="QR Socio" className="mx-auto w-48 h-48" />
        </div>
      )}
    </div>
  );
}
