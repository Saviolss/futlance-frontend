'use client'
import { JogosAoVivoSection } from "./jogosAoVivoSection.js"

export  function WidgetAoVivo() {
  return (
    <div className="w-full">

      <JogosAoVivoSection
        titulo="Ao Vivo"
        endpoint="/api/ao-vivo"
      />

    </div>
  )
}

export function aoVivoCariocaWidget() {
  return (
    <div className="w-full">

      <JogosAoVivoSection
        titulo="Carioca"
        endpoint="/api/ao-vivo/carioca"
      />

    </div>
  )
}

export function AoVivoCariocaWidget() {
  return (
    <div className="w-full">

      <JogosAoVivoSection
        titulo="Carioca"
        endpoint="/api/ao-vivo/carioca"
      />

    </div>
  )
}

export function AoVivoPaulistaWidget() {
  return (
    <div className="w-full">

    <JogosAoVivoSection
      titulo="Paulista"
      endpoint="/api/ao-vivo/paulista"
    />

  </div>
  )
}

export function AoVivoBrasileiraoWidget() {
  return (
    <div className="w-full">

    <JogosAoVivoSection
      titulo="Brasileirão"
      endpoint="/api/ao-vivo/brasileirao"
    />

  </div>
  )
} 