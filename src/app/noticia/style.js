"use client"

import { useTranslation } from "react-i18next"

export function NoticiasSection({
  titulo,
  children
}) {

  return (

    <section className="w-full px-4 py-12">

      <div className="max-w-7xl mx-auto">

        {/* TÍTULO */}

        <div className="flex items-center gap-4 mb-10">

          <div className="h-px flex-1 bg-linear-to-r from-transparent via-orange-400/40 to-transparent" />

          <h1
            className="
              text-3xl
              md:text-4xl
              font-black
              uppercase
              tracking-wide
              text-white
              text-center
              whitespace-nowrap
            "
          >
            {titulo}
          </h1>

          <div className="h-px flex-1 bg-linear-to-r from-transparent via-orange-400/40 to-transparent" />

        </div>

        {/* GRID */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-1
            2xl:grid-cols-1
            gap-6
            md:gap-7
            xl:gap-8
            items-stretch
          "
        >
          {children}
        </div>

      </div>

    </section>
  )
}

export function NoticiaCard({
  noticia
}) {
  const { t } = useTranslation()  

  return (

    <a
      href={noticia.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        sessionStorage.setItem(
          "ultimaPagina",
          window.location.pathname
        )
      }}
      className="
    group
    relative
    overflow-hidden
    rounded-2xl
    border
    border-orange-400/20
    bg-linear-to-br
    from-[#0b0f1a]
    via-[#0f172a]
    to-[#020617]
    shadow-[0_0_25px_rgba(255,165,0,0.08)]
    hover:shadow-[0_0_30px_rgba(255,165,0,0.18)]
    hover:border-orange-400/40
    transition-all
    duration-300
    flex
    flex-col
    backdrop-blur-md
    h-full
  "
    >


      {/* IMAGEM */}

      <div className="relative overflow-hidden">

        {noticia.imagem && (

          <img
            src={noticia.imagem}
            alt={noticia.titulo}
            className="
              w-full
              max-w-md
              mx-auto
              my-auto
              h-52
              xl:h-60
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />

        )}

        {/* OVERLAY */}

        <div
          className="
            absolute
            inset-0
            bg-linear-to-t
            from-black/90
            via-black/20
            to-transparent
          "
        />

        {/* FONTE */}

        <div
          className="
            absolute
            top-4
            left-4
            px-3
            py-1
            rounded-full
            bg-orange-500/90
            text-white
            text-xs
            font-bold
            uppercase
            tracking-wider
            shadow-lg
            backdrop-blur-sm
          "
        >
          {noticia.fonte}
        </div>

      </div>

      {/* CONTEÚDO */}

      <div className="flex flex-col flex-1 p-4 md:p-5 gap-4">

        {/* TÍTULO */}

        <h2
          className="
            text-lg
            md:text-xl
            xl:text-2xl
            font-extrabold
            leading-tight
            text-white
            line-clamp-3
            group-hover:text-orange-300
            transition-colors
          "
        >
          {noticia.titulo}
        </h2>

        {/* DESCRIÇÃO */}

        <p
          className="
            text-sm
            md:text-base
            leading-relaxed
            text-zinc-300
            line-clamp-4
          "
        >
          {noticia.descricao}
        </p>

        {/* RODAPÉ */}

        <div
          className="
            mt-auto
            pt-4
            border-t
            border-white/10
            flex
            items-center
            justify-between
            gap-3
          "
        >

          <span
            className="
              text-xs
              md:text-sm
              text-zinc-500
              tracking-wide
            "
          >
            {new Date(
              noticia.data
            ).toLocaleDateString("pt-BR")}
          </span>

          <span
            className="
              text-sm
              font-semibold
              text-orange-400
              group-hover:translate-x-1
              transition-transform
              whitespace-nowrap
            "
          >
            {t("noticialink")}
          </span>

        </div>

      </div>

    </a>
  )
}