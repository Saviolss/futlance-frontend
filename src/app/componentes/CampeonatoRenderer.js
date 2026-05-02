import RenderTabela from "./render/RenderTabela"
import RenderGrupos from "./render/RenderGrupos"
import RenderMataMata from "./render/RenderMataMata"

export default function CampeonatoRenderer({
  fase,
  dados,
  loading
}) {
  if (loading) {
    return <RenderTabela skeleton />
  }

  switch (fase) {

    case "tabela":
      return <RenderTabela dados={dados} />

    case "grupos":
      return <RenderGrupos dados={dados} />

    case "mata-mata":
      return null

    default:
      return (
        <p className="text-center text-zinc-400">
          Fase não disponível
        </p>
      )
  }
}