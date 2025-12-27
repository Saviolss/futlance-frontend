/* ===========================
   Skeleton Row
=========================== */
function SkeletonRow() {
  return (
    <tr className="border-t border-white/5 animate-pulse">
      <td className="px-3 py-3">
        <div className="h-4 w-4 bg-white/10 rounded" />
      </td>

      <td className="px-3 py-3 flex items-center gap-3">
        <div className="h-6 w-6 bg-white/10 rounded-full" />
        <div className="h-4 w-28 bg-white/10 rounded" />
      </td>

      {Array.from({ length: 8 }).map((_, i) => (
        <td key={i} className="px-3 py-3 text-center">
          <div className="mx-auto h-4 w-6 bg-white/10 rounded" />
        </td>
      ))}
    </tr>
  )
}

/* ===========================
   Main Component
=========================== */
export default function TabelaCarioca({
  tabela = [],
  loading = false,
}) {
  const showSkeleton = loading || tabela.length === 0

  const getZonaClassificacao = (posicao) => {
    if (posicao <= 4) return "border-l-4 border-emerald-500"
    if (posicao <= 8) return "border-l-4 border-yellow-400"
    return "border-l-4 border-red-500"
  }

  return (
    <section className="w-full mx-auto flex-wrap items-center px-6 justify-center md:w-3/4 ">
      <h3 className="text-3xl font-light text-center mt-10 mb-5 md:text-5xl text-white">Tabela do Campeonato Carioca</h3>
    <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-[#0b0f1a]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          {/* Cabeçalho */}
          <thead>
            <tr className="bg-gradient-to-r from-[#0f172a] to-[#020617] text-zinc-400">
              <th className="px-3 py-4 text-left">#</th>
              <th className="px-3 py-4 text-left">Clube</th>
              <th className="px-3 py-4 text-center text-white font-semibold">
                P
              </th>
              <th className="hidden sm:table-cell px-3 py-4 text-center">
                J
              </th>
              <th className="hidden md:table-cell px-3 py-4 text-center">
                V
              </th>
              <th className="hidden md:table-cell px-3 py-4 text-center">
                E
              </th>
              <th className="hidden md:table-cell px-3 py-4 text-center">
                D
              </th>
              <th className="hidden sm:table-cell px-3 py-4 text-center">
                GP
              </th>
              <th className="hidden sm:table-cell px-3 py-4 text-center">
                GC
              </th>
              <th className="hidden sm:table-cell px-3 py-4 text-center">
                SG
              </th>
            </tr>
          </thead>

          {/* Corpo */}
          <tbody>
            {showSkeleton
              ? Array.from({ length: 12 }).map((_, i) => (
                <SkeletonRow key={i} />
              ))
              : tabela.map((time, index) => (
                <tr
                  key={time.id || index}
                  className={`border-t border-white/5 hover:bg-white/5 transition
                      ${getZonaClassificacao(time.posicao)}`}
                >
                  {/* Posição */}
                  <td className="px-3 py-3 text-zinc-300">
                    {time.posicao}
                  </td>

                  {/* Clube */}
                  <td className="px-3 py-3 flex items-center gap-3">
                    <img
                      src={time.escudo}
                      alt={time.nome}
                      className="h-6 w-6 object-contain"
                    />
                    <span className="text-white font-medium whitespace-nowrap">
                      {time.nome}
                    </span>
                  </td>

                  {/* Pontos */}
                  <td className="px-3 py-3 text-center font-semibold text-white">
                    {time.pontos}
                  </td>

                  {/* Estatísticas */}
                  <td className="hidden sm:table-cell px-3 py-3 text-center text-zinc-300">
                    {time.jogos}
                  </td>

                  <td className="hidden md:table-cell px-3 py-3 text-center">
                    {time.vitorias}
                  </td>
                  <td className="hidden md:table-cell px-3 py-3 text-center">
                    {time.empates}
                  </td>
                  <td className="hidden md:table-cell px-3 py-3 text-center">
                    {time.derrotas}
                  </td>

                  <td className="hidden sm:table-cell px-3 py-3 text-center">
                    {time.golsPro}
                  </td>
                  <td className="hidden sm:table-cell px-3 py-3 text-center">
                    {time.golsContra}
                  </td>
                  <td
                    className={`hidden sm:table-cell px-3 py-3 text-center font-medium ${time.saldoGols >= 0
                        ? "text-emerald-400"
                        : "text-red-400"
                      }`}
                  >
                    {time.saldoGols}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Legenda */}
      <div className="flex flex-wrap gap-4 px-4 py-3 text-xs text-zinc-400 border-t border-white/5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-1 bg-emerald-500 rounded" />
          Semifinais
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-1 bg-yellow-400 rounded" />
          Taça Rio
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-1 bg-red-500 rounded" />
          Parte inferior
        </div>
      </div>
    </div>
    </section>
  )
}
