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

  function switchMode(newMode) {
    setMode(newMode);
    setMessage("");
    setUsername("");
    setPassword("");
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

    // =========================
    // LOGIN
    // =========================

    if (mode === "login") {
      const account = users.find(
        (x) => x.username === u && x.password === password
      );

      // Akun demo
      const demo =
        u === "bintang" && password === "bintangaja"
          ? {
              username: "bintang",
              password: "bintangaja",
            }
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

    // =========================
    // SIGN UP
    // =========================

    if (users.some((x) => x.username === u)) {
      setMessage("Username sudah digunakan.");
      return;
    }

    const newUser = {
      username: u,
      password: password,
    };

    localStorage.setItem(
      USERS_KEY,
      JSON.stringify([...users, newUser])
    );

    setMessage("Akun berhasil dibuat. Silakan Sign In.");

    setMode("login");
    setPassword("");
  }

  return (
    <main className="page">

      <section className="card">

        {/* =========================
            NAVIGATION
        ========================= */}

        <ul className="card-nav">

          <li>
            <div className="logo">M</div>
          </li>

          <li>
            <button
              type="button"
              className={mode === "login" ? "signin active" : "signin"}
              onClick={() => switchMode("login")}
            >
              <span>Sign In</span>
            </button>
          </li>

          <li>
            <button
              type="button"
              className={mode === "signup" ? "signup active" : "signup"}
              onClick={() => switchMode("signup")}
            >
              <span>Sign Up</span>
            </button>
          </li>

        </ul>

        {/* =========================
            HERO
        ========================= */}

        <div className="card-hero">

          <div className="card-hero-inner">

            <div className="card-hero-content signin">

              <div>
                <h2>Welcome Back.</h2>

                <h3>
                  Please enter your credentials.
                </h3>
              </div>

            </div>

            <div className="card-hero-content signup">

              <div>
                <h2>Sign Up Now.</h2>

                <h3>
                  Join the crowd and get started.
                </h3>
              </div>

            </div>

          </div>

        </div>

        {/* =========================
            FORM
        ========================= */}

        <div className="card-form">

          <div className="forms">

            <form onSubmit={submit}>

              <p>
                {mode === "login"
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    switchMode(
                      mode === "login"
                        ? "signup"
                        : "login"
                    );
                  }}
                >
                  {mode === "login"
                    ? "Sign Up"
                    : "Sign In"}
                </a>
                .
              </p>

              {/* USERNAME */}

              <label>
                Username
              </label>

              <div className="control">

                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  autoComplete="off"
                  placeholder="myusername"
                  required
                />

                <i className="ai-person"></i>

              </div>

              {/* PASSWORD */}

              <label>
                Password
              </label>

              <div className="control">

                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="●●●●●●"
                  required
                />

                <i className="ai-lock-on"></i>

              </div>

              <p className="footer">
                By clicking{" "}
                {mode === "login"
                  ? "Sign In"
                  : "Sign Up"}{" "}
                you agree to our terms and
                conditions.
              </p>

              <button type="submit">
                {mode === "login"
                  ? "Sign In"
                  : "Sign Up"}
              </button>

              {message && (
                <p className="message">
                  {message}
                </p>
              )}

            </form>

          </div>

        </div>

      </section>

    </main>
  );
}
