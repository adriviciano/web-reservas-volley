import { useCookies } from "react-cookie";

export default function Navbar() {
  const [cookies] = useCookies(["username"]);
  const isLoggedIn = !!cookies.username;

  return (
    <nav>
      {!isLoggedIn && <a href="/login">Login</a>}
      {isLoggedIn && (
        <>
          <a href="/reservar">Hacer una Reserva</a>
          <a href="/mis-reservas">Ver Reservas</a>
        </>
      )}
    </nav>
  );
}
