export function normalizeJogosData(input) {
  if (Array.isArray(input)) {
    return input.filter(Boolean)
  }

  if (!input || typeof input !== "object") {
    return []
  }

  const seemsLikeSingleJogo = [
    "partida_id",
    "mandante",
    "visitante",
    "placar_mandante",
    "tempo",
    "placar_visitante"
  ].some((key) => key in input)

  if (seemsLikeSingleJogo) {
    return [input]
  }

  const wrappers = [
    input.jogos,
    input.partidas,
    input.resultados,
    input.finalizados,
    input.encerrados,
    input.dados,
    input.data,
    input.items,
    input.matches
  ]

  for (const candidate of wrappers) {
    const normalized = normalizeJogosData(candidate)
    if (normalized.length) {
      return normalized
    }
  }

  return []
}
