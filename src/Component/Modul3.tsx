import { useEffect, useState } from "react";

function Modul3() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Gagal fetch:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-blue- 500 p-4 rounded-md">
      <h2>Daftar Pengguna</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name}, {u.username},{u.address.zipcode}</li>
        ))}
      </ul>
    </div>
  );
}

export default Modul3;