import { useState } from "react";
import { useCookies } from "react-cookie";

export default function Reserva() {
  const [cookies] = useCookies(["username", "password", "secret_key"]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleReserva = async () => {
    await fetch("http://127.0.0.1:8000/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: cookies.username,
        password: cookies.password,
        secret_key: cookies.secret_key,
        date,
        time,
      }),
    });
    alert("Reserva creada!");
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const day = selectedDate.getUTCDay();
    if (day === 0 || day === 6) {
      alert("No se pueden hacer reservas los sábados ni los domingos.");
      setDate("");
    } else {
      setDate(e.target.value);
    }
  };

  return (
    <div className="container">
      <nav>
        <a href='/'>Inicio</a>
      </nav>
      <h1>Hacer una Reserva</h1>
      <input type="date" value={date} onChange={handleDateChange} />
      <select value={time} onChange={(e) => setTime(e.target.value)}>
        {Array.from({ length: 27 }, (_, i) => {
          const hour = 8 + Math.floor(i / 2); // Desde las 8:00
          const minutes = i % 2 === 0 ? "00" : "30"; // Cada 30 minutos
          return (
            <option key={i} value={`${hour}:${minutes}`}>
              {`${hour}:${minutes}`}
            </option>
          );
        })}
      </select>
      <button onClick={handleReserva}>Reservar</button>
    </div>
  );
}
