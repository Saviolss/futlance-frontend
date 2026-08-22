'use client'

import { useRef } from "react"
import { useTranslation } from "react-i18next"
import html2canvas from "html2canvas"

export function JogoEncerradoCard({ jogo }) {

  const { t } = useTranslation()

  const cardRef = useRef(null)

  const {
    campeonato,
    time_mandante,
    time_visitante,
    placar_mandante,
    placar_visitante,
    estadio
  } = jogo

  async function compartilharCard() {

    if (!cardRef.current) return

    try {

      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#020617",
        scale: 2,
        useCORS: true,
        allowTaint: false
      })

      const blob = await new Promise(resolve => {
        canvas.toBlob(resolve, "image/png")
      })

      if (!blob) {
        throw new Error("Não foi possível gerar a imagem")
      }

      const arquivo = new File(
        [blob],
        "futlance-jogo.png",
        {
          type: "image/png"
        }
      )

      /*
       * Compartilhamento nativo
       */

      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({
          files: [arquivo]
        })
      ) {

        await navigator.share({
          title: "Futlance",
          text: `${time_mandante?.nome_popular} ${placar_mandante} x ${placar_visitante} ${time_visitante?.nome_popular}`,
          files: [arquivo]
        })

        return
      }

      /*
       * Caso o navegador não suporte
       * compartilhamento de arquivos.
       */

      const url = URL.createObjectURL(blob)

      const link = document.createElement("a")

      link.href = url
      link.download = "futlance-jogo.png"

      document.body.appendChild(link)

      link.click()

      link.remove()

      URL.revokeObjectURL(url)

    } catch (error) {

      /*
       * Cancelar o compartilhamento não é erro real.
       */

      if (error?.name === "AbortError") {
        return
      }

      console.error(
        "Erro ao compartilhar card:",
        error
      )
    }
  }

  return (

    <div
      ref={cardRef}
      className="
        relative
        w-full
        max-w-[320px]
        rounded-xl
        overflow-hidden
        bg-gradient-to-br
        from-[#020617]
        via-[#0f172a]
        to-[#020617]
        border
        border-zinc-500/20
        shadow-[0_0_20px_rgba(0,0,0,0.4)]
        text-white
      "
    >

      {/* Linha decorativa */}

      <div
        className="
          absolute
          inset-x-0
          top-0
          h-[2px]
          bg-gradient-to-r
          from-transparent
          via-zinc-500
          to-transparent
        "
      />

      {/* Botão compartilhar */}

      <button
        type="button"
        onClick={compartilharCard}
        aria-label="Compartilhar resultado"
        title="Compartilhar"
        className="
          absolute
          top-3
          right-3
          z-20
          w-9
          h-9
          flex
          items-center
          justify-center
          rounded-full
          bg-white/5
          border
          border-white/10
          text-zinc-300
          transition-all
          duration-200
          hover:bg-orange-400
          hover:border-orange-400
          hover:text-white
          active:scale-95
        "
      >

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>

      </button>

      <div className="
        flex
        flex-col
        items-center
        px-6
        py-6
        gap-4
      ">

        {/* Campeonato */}

        <h2 className="
          text-sm
          tracking-widest
          uppercase
          text-zinc-400
          font-medium
          text-center
          pr-8
        ">
          {campeonato?.nome}
        </h2>

        {/* Finalizado */}

        <span className="
          text-xs
          tracking-widest
          uppercase
          text-zinc-400
        ">
          {t("finalizado")}
        </span>

        {/* Times + Placar */}

        <div className="
          flex
          items-center
          justify-between
          w-full
        ">

          {/* Mandante */}

          <div className="
            flex
            flex-col
            items-center
            gap-2
            w-1/3
          ">

            <img
              src={time_mandante?.escudo}
              alt={time_mandante?.nome_popular}
              crossOrigin="anonymous"
              className="
                w-14
                h-14
                object-contain
                opacity-90
              "
            />

            <span className="
              text-xs
              text-center
              text-zinc-300
              leading-tight
            ">
              {time_mandante?.nome_popular}
            </span>

          </div>

          {/* Placar */}

          <div className="
            flex
            items-center
            gap-2
            text-4xl
            font-light
            text-zinc-200
          ">

            <span>
              {placar_mandante}
            </span>

            <span className="opacity-50">
              :
            </span>

            <span>
              {placar_visitante}
            </span>

          </div>

          {/* Visitante */}

          <div className="
            flex
            flex-col
            items-center
            gap-2
            w-1/3
          ">

            <img
              src={time_visitante?.escudo}
              alt={time_visitante?.nome_popular}
              crossOrigin="anonymous"
              className="
                w-14
                h-14
                object-contain
                opacity-90
              "
            />

            <span className="
              text-xs
              text-center
              text-zinc-300
              leading-tight
            ">
              {time_visitante?.nome_popular}
            </span>

          </div>

        </div>

        {/* Estádio */}

        {estadio?.nome_popular && (

          <p className="
            text-xs
            text-zinc-500
            tracking-wide
            text-center
          ">
            {estadio.nome_popular}
          </p>

        )}

        {/* Marca Futlance */}

        <span className="
          text-[10px]
          tracking-widest
          uppercase
          text-zinc-600
          mt-1
        ">
          Futlance
        </span>

      </div>

    </div>
  )
}