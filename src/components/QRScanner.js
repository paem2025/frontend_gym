import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';

const QRScanner = () => {
  const [resultado, setResultado] = useState('');
  const [estado, setEstado] = useState(null);

  const manejarResultado = async (result, error) => {
    if (!!result) {
      const texto = result?.text || '';
      if (texto.startsWith('socio:')) {
        setResultado(texto);
        try {
          const res = await axios.get(`http://192.168.1.4:5000/verificar_acceso_qr/${texto}`);
          setEstado(res.data);
        } catch (error) {
          console.error('Error al verificar el acceso:', error);
          setEstado({ acceso: false, mensaje: 'Error de conexión ❌' });
        }
      }
    }

    if (!!error) {
      console.warn(error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">📷 Escanear QR del Socio</h2>
      <div className="max-w-md mx-auto">
        <QrReader
          onResult={manejarResultado}
          constraints={{ facingMode: 'environment' }}
          style={{ width: '100%' }}
        />
      </div>

      {resultado && (
        <div className="mt-4 text-center">
          <p><strong>QR escaneado:</strong> {resultado}</p>
          {estado && (
            <div className={`mt-2 p-2 rounded ${estado.acceso ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {estado.mensaje}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QRScanner;
