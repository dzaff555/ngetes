"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const USERS_KEY = "loginmarcha_users";
const SESSION_KEY = "loginmarcha_session";

export default function Home() {
  const router = useRouter();
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    } catch {
      return [];
    }
  }

  function submit(e) {
    e.preventDefault();
    setMessage("");

    const u = username.trim();
    if (!u || !password) {
      setMessage("Username dan password wajib diisi.");
      return;
    }

    const users = getUsers();

    if (mode === "login") {
      // Akun demo awal agar project langsung bisa dicoba.
      const account = users.find(
        (x) => x.username === u && x.password === password
      );

      const demo =
        u === "bintang" && password === "bintangaja"
          ? { username: "bintang", password: "bintangaja" }
          : null;

      if (!account && !demo) {
        setMessage("Username atau password salah.");
        return;
      }

      if (demo && !users.some((x) => x.username === "bintang")) {
        localStorage.setItem(
          USERS_KEY,
          JSON.stringify([...users, demo])
        );
      }

      localStorage.setItem(SESSION_KEY, u);
      router.push("/data-diri");
      return;
    }

    if (users.some((x) => x.username === u)) {
      setMessage("Username sudah digunakan.");
      return;
    }

    localStorage.setItem(
      USERS_KEY,
      JSON.stringify([...users, { username: u, password }])
    );

    setMessage("Akun berhasil dibuat. Silakan Sign In.");
    setMode("login");
    setPassword("");
  }

  return (
    <main className="page">
      <section className="card">
        <ul className="card-nav">
          <li><div className="logo">B</div></li>
          <li>
            <button
              className={mode === "login" ? "active" : ""}
              onClick={() => { setMode("login"); setMessage(""); }}
            >
              Sign In
            </button>
          </li>
          <li>
            <button
              className={mode === "signup" ? "active" : ""}
              onClick={() => { setMode("signup"); setMessage(""); }}
            >
              Sign Up
            </button>
          </li>
        </ul>

        <div className="hero">
          <h2>{mode === "login" ? "Welcome Back." : "Sign Up Now."}</h2>
          <h3>
            {mode === "login"
              ? "Please enter your credentials."
              : "Join the crowd and get started."}
          </h3>
        </div>

        <div className="card-form">
          <form onSubmit={submit}>
            <p>
              {mode === "login"
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <a
                onClick={() => {
                  setMode(mode === "login" ? "signup" : "login");
                  setMessage("");
                }}
              >
                {mode === "login" ? "Sign Up" : "Sign In"}
              </a>.
            </p>

            <label>Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="myusername"
              required
            />

            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="●●●●●●"
              required
            />

            <p className="footer">
              By clicking {mode === "login" ? "Sign In" : "Sign Up"} you agree
              to our terms and conditions.
            </p>

            <button type="submit">
              {mode === "login" ? "Sign In" : "Sign Up"}
            </button>

            {message && <p className="message">{message}</p>}
          </form>
        </div>
      </section>
    </main>
  );
}
