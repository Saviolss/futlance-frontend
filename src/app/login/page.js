"use client"

import {
  useState
} from "react"

import Login from "../componentes/autenticacao/Login"

import CriarConta from "../componentes/autenticacao/CriarConta"


export default function LoginPage() {


  const [
    modo,
    setModo
  ] = useState("login")


  return (

    <main className="min-h-screen flex items-center justify-center px-4 bg-gray-900 py-12">

      <div className="w-full max-w-md">

        {modo === "login" ? (

          <Login />

        ) : (

          <CriarConta />

        )}


        {/* ==================================================
            ALTERNAR LOGIN / CADASTRO
        ================================================== */}

        <div className="mt-5 text-center">

          {modo === "login" ? (

            <button
              type="button"
              onClick={() =>
                setModo("cadastro")
              }
              className="text-sm text-zinc-400 hover:text-orange-400 transition"
            >

              Não tem conta?{" "}

              <span className="text-orange-400 font-medium">

                Criar conta

              </span>

            </button>

          ) : (

            <button
              type="button"
              onClick={() =>
                setModo("login")
              }
              className="text-sm text-zinc-400 hover:text-orange-400 transition"
            >

              Já tem uma conta?{" "}

              <span className="text-orange-400 font-medium">

                Entrar

              </span>

            </button>

          )}

        </div>

      </div>

    </main>

  )

}