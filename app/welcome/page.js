"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Welcome() {
  const router = useRouter();
  const [d, setD] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("loginmarcha_session");

    if (!u) {
      router.replace("/");
      return;
    }

    try {
      const saved = JSON.parse(
        localStorage.getItem(`loginmarcha_biodata_${u}`) || "null"
      );

      if (saved) {
        setD(saved);
      } else {
        router.replace("/data-diri");
      }
    } catch {
      router.replace("/data-diri");
    }
  }, [router]);

  if (!d) {
    return (
      <main className="page">
        <section className="card loading">Memuat...</section>
      </main>
    );
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
          <li><button className="active">Profil</button></li>
          <li><button onClick={logout}>Logout</button></li>
        </ul>

        <div className="hero noImage">
          <h2>Welcome, {d.nama}.</h2>
          <h3>Data kamu sudah berhasil disimpan.</h3>
        </div>

        <div className="card-form">
          <div className="saved">
            <p>Username: <b>{d.username}</b></p>

            {["nama", "kelas", "jurusan", "umur", "alamat"].map((key) => (
              <div className="savedRow" key={key}>
                <span>
                  {key[0].toUpperCase() + key.slice(1)}
                </span>
                <b>{d[key]}</b>
              </div>
            ))}

            <button onClick={() => router.push("/data-diri")}>
              Edit Data
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
