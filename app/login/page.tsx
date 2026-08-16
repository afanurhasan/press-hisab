"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  /* ================================================= */
  /* CHECK ALREADY LOGGED IN */
  /* ================================================= */

  useEffect(() => {
    const isLoggedIn =
      localStorage.getItem("press-hisab-auth");

    if (isLoggedIn === "true") {
      router.replace("/");
    }
  }, [router]);

  /* ================================================= */
  /* PIN INPUT */
  /* ================================================= */

  const handlePinChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    // Only numbers
    if (!/^\d*$/.test(value)) {
      return;
    }

    // Maximum 4 digits
    if (value.length > 4) {
      return;
    }

    setPin(value);
    setError("");
  };

  /* ================================================= */
  /* LOGIN */
  /* ================================================= */

  const handleLogin = () => {
    if (pin.length !== 4) {
      setError("Please enter a 4 digit PIN.");
      return;
    }

    /*
     * FRONTEND DEVELOPMENT MODE
     *
     * Any 4 digit PIN is accepted for now.
     *
     * Later, when backend is added,
     * real PIN verification will be implemented here.
     */

    localStorage.setItem(
      "press-hisab-auth",
      "true"
    );

    router.replace("/");
  };

  /* ================================================= */
  /* ENTER KEY */
  /* ================================================= */

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  /* ================================================= */
  /* PAGE */
  /* ================================================= */

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f7fb] px-4">

      <div className="w-full max-w-sm">

        {/* ================================================= */}
        {/* LOGIN CARD */}
        {/* ================================================= */}

        <div className="rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/70">

          {/* ================================================= */}
          {/* LOGO */}
          {/* ================================================= */}

          <div className="flex flex-col items-center text-center">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-lg font-bold text-white shadow-md shadow-indigo-200">
              PH
            </div>

            <h1 className="mt-4 text-xl font-bold text-slate-900">
              Press Hisab
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Enter your PIN to continue
            </p>

          </div>

          {/* ================================================= */}
          {/* PIN */}
          {/* ================================================= */}

          <div className="mt-7">

            <label className="mb-2 block text-xs font-semibold text-slate-600">
              4 Digit PIN
            </label>

            <input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={4}
              value={pin}
              onChange={handlePinChange}
              onKeyDown={handleKeyDown}
              placeholder="••••"
              autoComplete="off"
              autoFocus
              className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-center text-2xl font-bold tracking-[0.5em] text-slate-900 outline-none transition placeholder:text-slate-300 placeholder:tracking-[0.3em] focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            />

            {/* ================================================= */}
            {/* ERROR */}
            {/* ================================================= */}

            {error && (
              <p className="mt-2 text-center text-xs font-medium text-red-500">
                {error}
              </p>
            )}

          </div>

          {/* ================================================= */}
          {/* LOGIN BUTTON */}
          {/* ================================================= */}

          <button
            type="button"
            onClick={handleLogin}
            className="mt-4 w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 active:scale-[0.98]"
          >
            Login
          </button>

          {/* ================================================= */}
          {/* DEVELOPMENT NOTE */}
          {/* ================================================= */}

          <p className="mt-4 text-center text-[10px] leading-4 text-slate-400">
            Enter any 4 digit PIN during development.
          </p>

        </div>

        {/* ================================================= */}
        {/* FOOTER */}
        {/* ================================================= */}

        <p className="mt-5 text-center text-[10px] text-slate-400">
          Press Hisab · Weekly Accounts
        </p>

      </div>

    </main>
  );
}