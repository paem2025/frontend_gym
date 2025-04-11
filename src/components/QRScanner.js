import React, { useEffect, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import axios from 'axios';

const QRScanner = () => {
  const [resultado, setResultado] = useState('');
  const [estado, setEstado] = useState(null);

  useEffect(() => {
    const scanner = new Html5Qrcode("lectorQR");

    scanner.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      async (decodedText) => {
        if (decodedText.startsWith('socio:')) {
          setResultado(decodedText);
          await scanner.stop(); // Detener para no seguir escaneando
          try {
            const res = await axios.get(`http://192.168.1.4:5000/verificar_acceso_qr/${decodedText}`);
            setEstado(res.data);
          } catch (error) {
            console.error('Error al verificar el acceso:', error);
            setEstado({ acceso: false, mensaje: 'Error de conexión ❌' });
          }
        }
      },
      (error) => {
        console.warn('No se detectó QR:', error);
      }
    );

    return () => {
      scanner.stop().catch(err => console.error("Error al detener el escáner", err));
    };
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">📷 Escanear QR del Socio</h2>
      <div id="lectorQR" className="max-w-md mx-auto" />

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
