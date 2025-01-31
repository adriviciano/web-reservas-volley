import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export default function MisReservas() {
  const [cookies] = useCookies(["username"]);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservas = async () => {
      if (!cookies.username) {
        setError("No se encontró un usuario en las cookies.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/reservas/${cookies.username}`
        );
        if (!response.ok) {
          throw new Error(
            `Error al obtener las reservas: ${response.statusText}`
          );
        }

        const data = await response.json();
        if (data.reservas) {
          // Convertir la estructura anidada en un array plano
          const reservasArray = [];
          Object.entries(data.reservas).forEach(([year, months]) => {
            Object.entries(months).forEach(([month, days]) => {
              Object.entries(days).forEach(([day, times]) => {
                Object.entries(times).forEach(([time, reservations]) => {
                  reservations.forEach((reservation) => {
                    reservasArray.push({
                      date: `${year}-${month.padStart(2, "0")}-${day.padStart(
                        2,
                        "0"
                      )}`,
                      time,
                    });
                  });
                });
              });
            });
          });

          setReservas(reservasArray);
        } else {
          setReservas([]);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReservas();
  }, [cookies.username]);

  if (loading) {
    return <div className="container">Cargando reservas...</div>;
  }

  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  return (
    <div className="container">
      <nav>
        <a href='/'>Inicio</a>
        <a href='/reservar'>Hacer una Reserva</a>
      </nav>
      <h1>Mis Reservas</h1>
      {reservas.length > 0 ? (
        <ul>
          {reservas.map((reserva, index) => (
            <li key={index}>
              {reserva.date} - {reserva.time}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes reservas.</p>
      )}
    </div>
  );
}
