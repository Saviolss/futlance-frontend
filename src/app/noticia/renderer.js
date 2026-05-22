"use client"

import {
  NoticiasSection,
  NoticiaCard
} from "./style"
import { useTranslation } from "react-i18next"


export default function NoticiasRenderer({
  widgets = []
}) {
  const { t } = useTranslation()

  if (!widgets.length) {
    return null
  }

  return (
    <div className="w-full">

      {widgets.map((widget, index) => {

        if (widget.tipo !== "noticias") {
          return null
        }

        return (

          <NoticiasSection
            key={index}
            titulo={t("noticiatitulo")}
          >

            <div className="
              w-full
              max-w-7xl
              mx-auto
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              gap-6
              px-4
            ">

              {widget.dados?.map((noticia, i) => (

                <NoticiaCard
                  key={i}
                  noticia={noticia}
                />

              ))}

            </div>

          </NoticiasSection>
        )
      })}
    </div>
  )
}