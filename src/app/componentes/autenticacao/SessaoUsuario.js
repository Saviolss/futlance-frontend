"use client"

import {
  useEffect,
  useState
} from "react"

import { api } from "@/app/servidor/api"

export default function SessaoUsuario() {

  const [
    carregando,
    setCarregando
  ] = useState(true)


  const [
    usuario,
    setUsuario
  ] = useState(null)


  const [
    erro,
    setErro
  ] = useState("")


  // ==========================================================
  // BUSCAR SESSÃO
  // ==========================================================

  async function buscarSessao() {

    try {

      setCarregando(true)

      setErro("")


      const resposta =
        await api.get(
          "/auth/sessao"
        )


      if (
        resposta.data?.autenticado
      ) {

        setUsuario(
          resposta.data.usuario
        )

      } else {

        setUsuario(null)

      }


    } catch (erro) {

      // ======================================================
      // USUÁRIO NÃO LOGADO
      // ======================================================

      if (
        erro?.response?.status === 401
      ) {

        setUsuario(null)

      } else {

        console.error(
          "Erro ao buscar sessão:",
          erro
        )

        setErro(
          "Não foi possível verificar a sessão."
        )

      }

    } finally {

      setCarregando(false)

    }

  }


  // ==========================================================
  // EXECUTAR AO CARREGAR
  // ==========================================================

  useEffect(() => {

    buscarSessao()

  }, [])


  // ==========================================================
  // LOADING
  // ==========================================================

  if (carregando) {

    return (

      <div className="text-sm text-gray-400">

        Verificando sessão...

      </div>

    )

  }


  // ==========================================================
  // ERRO
  // ==========================================================

  if (erro) {

    return (

      <div className="text-sm text-red-400">

        {erro}

      </div>

    )

  }


  // ==========================================================
  // NÃO AUTENTICADO
  // ==========================================================

  if (!usuario) {

    return (

      <div className="text-sm text-gray-400">

        Usuário não autenticado.

      </div>

    )

  }


  // ==========================================================
  // AUTENTICADO
  // ==========================================================

  return (

    <div className="rounded-lg bg-[#111] p-4 text-white">

      <p className="text-lg font-semibold">

        Olá, {usuario.nome}

      </p>


      <p className="mt-1 text-sm text-gray-400">

        {usuario.email}

      </p>


      <p className="mt-1 text-sm text-gray-400">

        Idioma: {usuario.idioma}

      </p>


      <p className="mt-2 text-sm text-green-400">

        ✓ Usuário autenticado

      </p>

    </div>

  )

}