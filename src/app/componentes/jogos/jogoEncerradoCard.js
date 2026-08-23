'use client';

import { useRef } from "react";
import { useTranslation } from "react-i18next";
import html2canvas from "html2canvas";

export function JogoEncerradoCard({ jogo }) {

  const { t } = useTranslation();

  const cardRef = useRef(null);

  const {
    campeonato,
    time_mandante,
    time_visitante,
    placar_mandante,
    placar_visitante,
    estadio,
    data,
    hora
  } = jogo;

  async function compartilharCard() {

    if (!cardRef.current) {
      console.error("Card não encontrado.");
      return;
    }

    try {

      const canvas = await html2canvas(
        cardRef.current,
        {
          backgroundColor: "#020617",
          scale: 2,
          useCORS: true,
          allowTaint: false
        }
      );

      const blob = await new Promise((resolve) => {
        canvas.toBlob(
          resolve,
          "image/png",
          1
        );
      });

      if (!blob) {
        throw new Error(
          "Não foi possível gerar a imagem."
        );
      }

      const arquivo = new File(
        [blob],
        "futlance-jogo.png",
        {
          type: "image/png"
        }
      );

      /*
       * COMPARTILHAMENTO NATIVO
       */

      if (
        typeof navigator !== "undefined" &&
        navigator.share
      ) {

        /*
         * Alguns navegadores aceitam share
         * mas não aceitam arquivos.
         */

        if (
          navigator.canShare &&
          navigator.canShare({
            files: [arquivo]
          })
        ) {

          await navigator.share({
            title: "Futlance",
            text:
              `${time_mandante?.nome || ""} ` +
              `${placar_mandante} x ${placar_visitante} ` +
              `${time_visitante?.nome || ""}`,
            files: [arquivo]
          });

          return;
        }
      }

      /*
       * FALLBACK
       *
       * Se o navegador não suporta
       * compartilhamento de arquivos,
       * baixa a imagem.
       */

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = "futlance-jogo.png";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      URL.revokeObjectURL(url);

    } catch (error) {

      /*
       * Usuário cancelou o compartilhamento.
       */

      if (error?.name === "AbortError") {
        return;
      }

      console.error(
        "Erro ao compartilhar card:",
        error
      );
    }
  }

  return (

    /*
     * CONTAINER EXTERNO
     *
     * O botão fica aqui fora.
     * Assim ele NÃO entra no print.
     */

    <div className="relative w-full max-w-[340px]">

      {/* BOTÃO COMPARTILHAR */}

      <button
        type="button"
        onClick={compartilharCard}
        aria-label="Compartilhar resultado"
        title="Compartilhar resultado"
        className="
          absolute
          top-3
          right-3
          z-50
          w-9
          h-9
          flex
          items-center
          justify-center
          rounded-full
          bg-black/70
          border
          border-zinc-500/40
          text-zinc-300
          shadow-lg
          cursor-pointer
          hover:bg-orange-400
          hover:border-orange-400
          hover:text-white
          active:scale-95
          transition-all
          duration-200
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

          <line
            x1="8.59"
            y1="13.51"
            x2="15.42"
            y2="17.49"
          />

          <line
            x1="15.41"
            y1="6.51"
            x2="8.59"
            y2="10.49"
          />
        </svg>

      </button>


      {/* =========================
          ÁREA QUE SERÁ TRANSFORMADA
          EM IMAGEM
      ========================= */}

      <div
        ref={cardRef}
        className="
          relative
          w-full
          rounded-2xl
          overflow-hidden
          bg-gradient-to-br
          from-[#020617]
          via-[#0f172a]
          to-[#020617]
          border
          border-zinc-500/20
          shadow-[0_0_25px_rgba(113,113,122,0.12)]
          text-white
        "
      >

        {/* LINHA SUPERIOR */}

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


        <div
          className="
            flex
            flex-col
            items-center
            px-6
            py-6
            gap-5
          "
        >

          {/* CAMPEONATO */}

          {campeonato?.nome && (

            <h2
              className="
                text-sm
                tracking-widest
                uppercase
                text-zinc-400
                font-medium
                text-center
                pr-8
              "
            >
              {campeonato.nome}
            </h2>

          )}


          {/* FINALIZADO */}

          <div className="flex items-center gap-2">

            <span
              className="
                w-2
                h-2
                rounded-full
                bg-zinc-500
              "
            />

            <span
              className="
                text-xs
                tracking-widest
                uppercase
                text-zinc-400
              "
            >
              {t("finalizado")}
            </span>

          </div>


          {/* TIMES */}

          <div
            className="
              flex
              items-center
              justify-between
              w-full
            "
          >

            {/* MANDANTE */}

            <div
              className="
                flex
                flex-col
                items-center
                gap-3
                w-1/3
              "
            >

              {time_mandante?.escudo && (

                <img
                  src={time_mandante.escudo}
                  alt={
                    time_mandante.nome ||
                    "Time mandante"
                  }
                  crossOrigin="anonymous"
                  className="
                    w-14
                    h-14
                    object-contain
                  "
                />

              )}

              <span
                className="
                  text-xs
                  text-center
                  text-zinc-200
                  leading-tight
                "
              >
                {time_mandante?.nome}
              </span>

            </div>


            {/* PLACAR */}

            <div
              className="
                flex
                flex-col
                items-center
                min-w-[80px]
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-4xl
                  font-light
                  text-zinc-200
                "
              >

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


              {/* DATA */}

              {(data || hora) && (

                <span
                  className="
                    text-xs
                    text-zinc-500
                    mt-2
                    text-center
                  "
                >
                  {data} {hora}
                </span>

              )}

            </div>


            {/* VISITANTE */}

            <div
              className="
                flex
                flex-col
                items-center
                gap-3
                w-1/3
              "
            >

              {time_visitante?.escudo && (

                <img
                  src={time_visitante.escudo}
                  alt={
                    time_visitante.nome ||
                    "Time visitante"
                  }
                  crossOrigin="anonymous"
                  className="
                    w-14
                    h-14
                    object-contain
                  "
                />

              )}

              <span
                className="
                  text-xs
                  text-center
                  text-zinc-200
                  leading-tight
                "
              >
                {time_visitante?.nome}
              </span>

            </div>

          </div>


          {/* ESTÁDIO */}

          {estadio?.nome_popular && (

            <p
              className="
                text-xs
                text-zinc-500
                tracking-wide
                text-center
              "
            >
              {estadio.nome_popular}
            </p>

          )}


          {/* MARCA */}

          <span
            className="
              text-[10px]
              tracking-widest
              uppercase
              text-zinc-600
              mt-1
            "
          >
            Futlance
          </span>

        </div>

      </div>

    </div>
  );
}