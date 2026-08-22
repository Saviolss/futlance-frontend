"use client"

import {
  useState
} from "react"

import {
  useTranslation
} from "react-i18next"

import {
  api
} from "@/app/servidor/api"


export default function CriarConta() {

  const {
    t,
    i18n
  } = useTranslation()


  // ==========================================================
  // CAMPOS
  // ==========================================================

  const [
    nome,
    setNome
  ] = useState("")


  const [
    email,
    setEmail
  ] = useState("")


  const [
    senha,
    setSenha
  ] = useState("")


  const [
    confirmarSenha,
    setConfirmarSenha
  ] = useState("")


  const [
    aceitouPolitica,
    setAceitouPolitica
  ] = useState(false)


  // ==========================================================
  // ESTADOS
  // ==========================================================

  const [
    carregando,
    setCarregando
  ] = useState(false)


  const [
    erro,
    setErro
  ] = useState("")


  const [
    sucesso,
    setSucesso
  ] = useState("")


  // ==========================================================
  // CADASTRAR
  // ==========================================================

  async function cadastrar(event) {

    event.preventDefault()

    setErro("")
    setSucesso("")


    // ========================================================
    // NOME
    // ========================================================

    const nomeNormalizado =
      nome
        .trim()
        .replace(/\s+/g, " ")


    if (
      nomeNormalizado.length < 2
    ) {

      setErro(
        t(
          "nomeInvalido",
          "Digite seu nome completo."
        )
      )

      return

    }


    if (
      nomeNormalizado.length > 100
    ) {

      setErro(
        t(
          "nomeInvalido",
          "O nome deve ter no máximo 100 caracteres."
        )
      )

      return

    }


    // ========================================================
    // E-MAIL
    // ========================================================

    const emailNormalizado =
      email
        .trim()
        .toLowerCase()


    if (!emailNormalizado) {

      setErro(
        t(
          "emailObrigatorio",
          "Digite seu e-mail."
        )
      )

      return

    }


    const emailValido =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(emailNormalizado)


    if (!emailValido) {

      setErro(
        t(
          "emailInvalido",
          "Digite um e-mail válido."
        )
      )

      return

    }


    // ========================================================
    // SENHA
    // ========================================================

    if (
      senha.length < 8
    ) {

      setErro(
        t(
          "senhaMinima",
          "A senha deve ter pelo menos 8 caracteres."
        )
      )

      return

    }


    // ========================================================
    // REQUISITOS DA SENHA
    // ========================================================

    const possuiMaiuscula =
      /[A-Z]/.test(senha)


    const possuiMinuscula =
      /[a-z]/.test(senha)


    const possuiNumero =
      /[0-9]/.test(senha)


    const possuiEspecial =
      /[^A-Za-z0-9]/.test(senha)


    if (
      !possuiMaiuscula ||
      !possuiMinuscula ||
      !possuiNumero ||
      !possuiEspecial
    ) {

      setErro(
        t(
          "senhaRequisitos",
          "A senha deve conter letra maiúscula, letra minúscula, número e caractere especial."
        )
      )

      return

    }


    // ========================================================
    // CONFIRMAR SENHA
    // ========================================================

    if (
      senha !== confirmarSenha
    ) {

      setErro(
        t(
          "senhasNaoConferem",
          "As senhas não conferem."
        )
      )

      return

    }


    // ========================================================
    // ACEITE DA POLÍTICA
    // ========================================================

    if (
      aceitouPolitica !== true
    ) {

      setErro(
        t(
          "aceiteTermosObrigatorio",
          "Você precisa aceitar a Política de Privacidade e os Termos de Uso."
        )
      )

      return

    }


    try {

      setCarregando(true)


      // ======================================================
      // CADASTRO
      // ======================================================
      const idiomaAtual =
        (i18n.language || "pt")
          .split("-")[0]
          .toLowerCase()

      const resposta =
        await api.post(
          "/auth/cadastro",
          {
            nome: nomeNormalizado,

            email: emailNormalizado,

            senha,

            idioma: idiomaAtual,

            aceitouPolitica: true
          }
        )


      // ======================================================
      // SUCESSO
      // ======================================================

      if (
        resposta.data?.sucesso
      ) {

        setSucesso(
          resposta.data?.mensagem ||
          t(
            "contaCriada",
            "Conta criada com sucesso."
          )
        )


        // ----------------------------------------------------
        // LIMPAR CAMPOS
        // ----------------------------------------------------

        setNome("")
        setEmail("")
        setSenha("")
        setConfirmarSenha("")
        setAceitouPolitica(false)


        // ----------------------------------------------------
        // NÃO REDIRECIONAMOS AINDA
        // ----------------------------------------------------
        //
        // Vamos primeiro terminar o backend do cadastro.
        // Depois podemos redirecionar automaticamente
        // para a página inicial.
        //
        return

      }


      // ======================================================
      // RESPOSTA SEM SUCESSO
      // ======================================================

      setErro(
        resposta.data?.mensagem ||
        t(
          "erroCadastro",
          "Não foi possível criar sua conta."
        )
      )


    } catch (error) {

      console.error(
        "Erro ao criar conta:",
        error
      )


      // ======================================================
      // RATE LIMIT
      // ======================================================

      if (
        error?.response?.status === 429
      ) {

        setErro(
          error.response.data?.mensagem ||
          t(
            "muitasTentativasCadastro",
            "Muitas tentativas. Aguarde alguns minutos e tente novamente."
          )
        )

        return

      }


      // ======================================================
      // E-MAIL JÁ CADASTRADO
      // ======================================================

      if (
        error?.response?.status === 409
      ) {

        setErro(
          error.response.data?.mensagem ||
          t(
            "emailJaCadastrado",
            "Este e-mail já está cadastrado."
          )
        )

        return

      }


      // ======================================================
      // ERRO DE VALIDAÇÃO
      // ======================================================

      if (
        error?.response?.status === 400
      ) {

        setErro(
          error.response.data?.mensagem ||
          t(
            "erroCadastro",
            "Verifique os dados informados."
          )
        )

        return

      }


      // ======================================================
      // ERRO GENÉRICO
      // ======================================================

      setErro(
        error?.response?.data?.mensagem ||
        t(
          "erroCadastro",
          "Não foi possível criar sua conta."
        )
      )


    } finally {

      setCarregando(false)

    }

  }


  return (

    <div className="w-full max-w-md mx-auto">

      <div className="bg-[#111] border border-orange-400/30 rounded-xl p-6 shadow-lg text-white">

        {/* ==================================================
            TÍTULO
        ================================================== */}

        <h1 className="text-2xl font-semibold text-center mb-6">

          {t(
            "criarConta",
            "Criar conta"
          )}

        </h1>


        <form
          onSubmit={cadastrar}
          className="space-y-4"
        >

          {/* =================================================
              NOME
          ================================================= */}

          <div>

            <label
              htmlFor="cadastro-nome"
              className="block text-sm text-gray-300 mb-2"
            >

              {t(
                "nome",
                "Nome"
              )}

            </label>


            <input
              id="cadastro-nome"
              type="text"
              value={nome}
              onChange={(event) =>
                setNome(
                  event.target.value
                )
              }
              autoComplete="name"
              placeholder={t(
                "digiteSeuNome",
                "Digite seu nome"
              )}
              disabled={carregando}
              maxLength={100}
              className="w-full rounded-lg border border-gray-700 bg-[#0b0b0b] px-4 py-3 text-white outline-none transition focus:border-orange-400 disabled:opacity-50"
            />

          </div>


          {/* =================================================
              E-MAIL
          ================================================= */}

          <div>

            <label
              htmlFor="cadastro-email"
              className="block text-sm text-gray-300 mb-2"
            >

              {t(
                "email",
                "E-mail"
              )}

            </label>


            <input
              id="cadastro-email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              autoComplete="email"
              placeholder={t(
                "digiteSeuEmail",
                "Digite seu e-mail"
              )}
              disabled={carregando}
              maxLength={254}
              className="w-full rounded-lg border border-gray-700 bg-[#0b0b0b] px-4 py-3 text-white outline-none transition focus:border-orange-400 disabled:opacity-50"
            />

          </div>


          {/* =================================================
              SENHA
          ================================================= */}

          <div>

            <label
              htmlFor="cadastro-senha"
              className="block text-sm text-gray-300 mb-2"
            >

              {t(
                "senha",
                "Senha"
              )}

            </label>


            <input
              id="cadastro-senha"
              type="password"
              value={senha}
              onChange={(event) =>
                setSenha(
                  event.target.value
                )
              }
              autoComplete="new-password"
              placeholder={t(
                "digiteSuaSenha",
                "Digite sua senha"
              )}
              disabled={carregando}
              maxLength={128}
              className="w-full rounded-lg border border-gray-700 bg-[#0b0b0b] px-4 py-3 text-white outline-none transition focus:border-orange-400 disabled:opacity-50"
            />

          </div>


          {/* =================================================
              CONFIRMAR SENHA
          ================================================= */}

          <div>

            <label
              htmlFor="cadastro-confirmar-senha"
              className="block text-sm text-gray-300 mb-2"
            >

              {t(
                "confirmarSenha",
                "Confirmar senha"
              )}

            </label>


            <input
              id="cadastro-confirmar-senha"
              type="password"
              value={confirmarSenha}
              onChange={(event) =>
                setConfirmarSenha(
                  event.target.value
                )
              }
              autoComplete="new-password"
              placeholder={t(
                "confirmeSuaSenha",
                "Confirme sua senha"
              )}
              disabled={carregando}
              maxLength={128}
              className="w-full rounded-lg border border-gray-700 bg-[#0b0b0b] px-4 py-3 text-white outline-none transition focus:border-orange-400 disabled:opacity-50"
            />

          </div>


          {/* =================================================
              REQUISITOS DA SENHA
          ================================================= */}

          <div className="rounded-lg bg-black/30 border border-gray-800 p-3">

            <p className="text-xs text-gray-400 mb-2">

              {t(
                "senhaRequisitosTitulo",
                "A senha deve conter:"
              )}

            </p>


            <ul className="space-y-1 text-xs text-gray-500">

              <li>

                ✓ {t(
                  "senhaRequisitoTamanho",
                  "Pelo menos 8 caracteres"
                )}

              </li>

              <li>

                ✓ {t(
                  "senhaRequisitoMaiuscula",
                  "Uma letra maiúscula"
                )}

              </li>

              <li>

                ✓ {t(
                  "senhaRequisitoMinuscula",
                  "Uma letra minúscula"
                )}

              </li>

              <li>

                ✓ {t(
                  "senhaRequisitoNumero",
                  "Um número"
                )}

              </li>

              <li>

                ✓ {t(
                  "senhaRequisitoEspecial",
                  "Um caractere especial"
                )}

              </li>

            </ul>

          </div>


          {/* =================================================
              ERRO
          ================================================= */}

          {erro && (

            <div
              role="alert"
              className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
            >

              {erro}

            </div>

          )}


          {/* =================================================
              SUCESSO
          ================================================= */}

          {sucesso && (

            <div
              role="status"
              className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400"
            >

              {sucesso}

            </div>

          )}


          {/* =================================================
              POLÍTICA / TERMOS
          ================================================= */}

          <div className="rounded-lg border border-gray-800 p-4">

            <label
              htmlFor="aceitou-politica"
              className="flex items-start gap-3 cursor-pointer"
            >

              <input
                id="aceitou-politica"
                type="checkbox"
                checked={aceitouPolitica}
                onChange={(event) =>
                  setAceitouPolitica(
                    event.target.checked
                  )
                }
                disabled={carregando}
                className="mt-1 h-4 w-4 accent-orange-500 cursor-pointer disabled:cursor-not-allowed"
              />


              <span className="text-sm text-gray-300 leading-5">

                {t(
                  "aceiteTermos",
                  "Li e concordo com a Política de Privacidade e os Termos de Uso."
                )}

              </span>

            </label>

          </div>


          {/* =================================================
              BOTÃO
          ================================================= */}

          <button
            type="submit"
            disabled={
              carregando ||
              !aceitouPolitica
            }
            className="w-full rounded-lg bg-orange-500 px-4 py-3 font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
          >

            {carregando
              ? t(
                "criandoConta",
                "Criando conta..."
              )
              : t(
                "criarConta",
                "Criar conta"
              )
            }

          </button>

        </form>

      </div>

    </div>

  )

}