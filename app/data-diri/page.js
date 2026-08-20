"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DataDiri() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [d, setD] = useState({
    nama: "",
    kelas: "",
    jurusan: "",
    alamat: "",
    umur: ""
  });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const u = localStorage.getItem("loginmarcha_session");
    if (!u) {
      router.replace("/");
      return;
    }

    setUsername(u);

    try {
      const saved = JSON.parse(
        localStorage.getItem(`loginmarcha_biodata_${u}`) || "null"
      );
      if (saved) setD(saved);
    } catch {}
  }, [router]);

  const change = (key, value) => {
    setD({ ...d, [key]: value });
  };

  function save(e) {
    e.preventDefault();

    if (!d.nama || !d.kelas || !d.jurusan || !d.alamat || !d.umur) {
      setMsg("Semua data wajib diisi.");
      return;
    }

    localStorage.setItem(
      `loginmarcha_biodata_${username}`,
      JSON.stringify({ username, ...d })
    );

    router.push("/welcome");
  }

  function logout() {
    localStorage.removeItem("loginmarcha_session");
    router.push("/");
  }

  return (
    <main className="page">
      <section className="card">
        <ul className="card-nav">
          <li><div className="logo">B</div></li>
          <li><button className="active">Data Diri</button></li>
          <li><button onClick={logout}>Logout</button></li>
        </ul>

        <div className="hero noImage">
          <h2>Data Diri.</h2>
          <h3>Silakan lengkapi informasi kamu.</h3>
        </div>

        <div className="card-form">
          <form onSubmit={save}>
            <p>Login sebagai <b>{username}</b>.</p>

            <label>Nama</label>
            <input
              value={d.nama}
              onChange={(e) => change("nama", e.target.value)}
              placeholder="Nama lengkap"
              required
            />

            <label>Kelas</label>
            <input
              value={d.kelas}
              onChange={(e) => change("kelas", e.target.value)}
              placeholder="XII RPL 1"
              required
            />

            <label>Jurusan</label>
            <input
              value={d.jurusan}
              onChange={(e) => change("jurusan", e.target.value)}
              placeholder="Rekayasa Perangkat Lunak"
              required
            />

            <label>Umur</label>
            <input
              type="number"
              value={d.umur}
              onChange={(e) => change("umur", e.target.value)}
              placeholder="Umur"
              required
            />

            <label>Alamat</label>
            <textarea
              value={d.alamat}
              onChange={(e) => change("alamat", e.target.value)}
              placeholder="Alamat lengkap"
              required
            />

            <p className="footer">
              Pastikan semua data sudah benar sebelum menekan Confirm.
            </p>

            <button type="submit">Confirm</button>

            {msg && <p className="message">{msg}</p>}
          </form>
        </div>
      </section>
    </main>
  );
}
