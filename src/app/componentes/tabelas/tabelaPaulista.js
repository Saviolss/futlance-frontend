/* ===========================
   Skeleton
=========================== */
function SkeletonRow() {
  return (
    <tr className="border-t border-white/5 animate-pulse">
      <td className="px-3 py-3">
        <div className="h-4 w-4 bg-white/10 rounded" />
      </td>
      <td className="px-3 py-3 flex items-center gap-3">
        <div className="h-6 w-6 bg-white/10 rounded-full" />
        <div className="h-4 w-24 bg-white/10 rounded" />
      </td>
      {Array.from({ length: 5 }).map((_, i) => (
        <td key={i} className="px-3 py-3 text-center">
          <div className="mx-auto h-4 w-6 bg-white/10 rounded" />
        </td>
      ))}
    </tr>
  )
}

/* ===========================
   Group Table
=========================== */
function TabelaGrupo({ nome, tabela, loading }) {
  const showSkeleton = loading || tabela.length === 0

  return (
    <section className="w-full mx-auto flex-wrap items-center px-3 justify-center md:w-3/4 ">
    <div className="rounded-xl border border-white/10 bg-[#0b0f1a]">
      <div className="px-4 py-3 border-b border-white/5 text-sm font-semibold text-white">
        Grupo {nome}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px] border-collapse text-sm">
          <thead>
            <tr className="text-zinc-400 bg-[#020617]">
              <th className="px-3 py-3 text-left">#</th>
              <th className="px-3 py-3 text-left">Clube</th>
              <th className="px-3 py-3 text-center text-white">P</th>
              <th className="px-3 py-3 text-center">J</th>
              <th className="hidden sm:table-cell px-3 py-3 text-center">
                V
              </th>
              <th className="hidden sm:table-cell px-3 py-3 text-center">
                SG
              </th>
            </tr>
          </thead>

          <tbody>
            {showSkeleton
              ? Array.from({ length: 4 }).map((_, i) => (
                <SkeletonRow key={i} />
              ))
              : tabela.map((time, index) => (
                <tr
                  key={time.id || index}
                  className={`border-t border-white/5 hover:bg-white/5 transition
                      ${time.posicao <= 2
                      ? "border-l-4 border-emerald-500"
                      : ""
                    }`}
                >
                  <td className="px-3 py-3 text-zinc-300">
                    {time.posicao}
                  </td>

                  <td className="px-3 py-3 flex items-center gap-3">
                    <img
                      src={time.escudo}
                      alt={time.nome}
                      className="h-6 w-6"
                    />
                    <span className="text-white whitespace-nowrap">
                      {time.nome}
                    </span>
                  </td>

                  <td className="px-3 py-3 text-center font-semibold text-white">
                    {time.pontos}
                  </td>
                  <td className="px-3 py-3 text-center">
                    {time.jogos}
                  </td>

                  <td className="hidden sm:table-cell px-3 py-3 text-center">
                    {time.vitorias}
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
    </div>
    </section>
  )
}

/* ===========================
   Main Component
=========================== */
export default function TabelaPaulista({
  grupos = {},
  loading = false,
}) {
  return (
    <section className="w-full mx-auto flex-wrap items-center px-6 justify-center md:w-3/4 ">
      <h3 className="text-3xl font-light text-center mt-10 mb-5 md:text-5xl text-white">Grupos</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {["A", "B", "C", "D"].map((grupo) => (
        <TabelaGrupo
          key={grupo}
          nome={grupo}
          tabela={grupos[grupo] || []}
          loading={loading}
        />
      ))}
    </div>
    </section>
  )
}
