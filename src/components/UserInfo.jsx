import { useCookies } from "react-cookie";

export default function UserInfo() {
  const [cookies] = useCookies(["username"]);
  const username = cookies.username || "Invitado";

  return (
    <div className="container text-center">
      <h1>Bienvenido, {username}</h1>
    </div>
  );
}
