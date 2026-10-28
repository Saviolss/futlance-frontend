"use client";
import { useTranslation } from "react-i18next"
import { useState } from "react"

function valor(...valores) {
  return valores.find((v) => v !== undefined && v !== null && v !== "") ?? "";
}

function formatarData(data, hora) {
  if (!data) return hora || "";
  const texto = String(data);
  const dataValida = new Date(texto);
  const dataFormatada = Number.isNaN(dataValida.getTime())
    ? texto
    : dataValida.toLocaleDateString("pt-BR", { timeZone: "UTC" });
  return [dataFormatada, hora].filter(Boolean).join(" às ");
}

function obterEscudo(time) {
  const url = valor(time?.escudo, time?.url_escudo, time?.logo);
  if (!url) return "";
  if (String(url).startsWith("//")) return `https:${url}`;
  return url;
}

function obterNome(time) {
  return valor(time?.nome, time?.nome_popular, time?.name, "Time");
}

function carregarImagemEscudo(url) {
  if (!url) return Promise.resolve(null);

  return new Promise((resolve) => {
    const imagem = new Image();
    const timeout = setTimeout(() => resolve(null), 5000);
    imagem.crossOrigin = "anonymous";
    imagem.onload = () => {
      clearTimeout(timeout);
      resolve(imagem);
    };
    imagem.onerror = () => {
      clearTimeout(timeout);
      resolve(null);
    };
    imagem.src = url;
  });
}

function desenharEscudo(contexto, imagem, nome, x, y) {
  const tamanho = 100;
  if (imagem) {
    const escala = Math.min(tamanho / imagem.naturalWidth, tamanho / imagem.naturalHeight);
    const largura = imagem.naturalWidth * escala;
    const altura = imagem.naturalHeight * escala;
    contexto.drawImage(imagem, x - largura / 2, y - altura / 2, largura, altura);
    return;
  }

  contexto.fillStyle = "#374151";
  contexto.beginPath();
  contexto.arc(x, y, tamanho / 2, 0, Math.PI * 2);
  contexto.fill();
  contexto.fillStyle = "#ffffff";
  contexto.font = "bold 34px Arial, sans-serif";
  contexto.textAlign = "center";
  contexto.textBaseline = "middle";
  contexto.fillText(nome.trim().charAt(0).toUpperCase() || "?", x, y);
}

export default function JogoEncerradoCard({ jogo, campeonato }) {
  const { t } = useTranslation();
  const [compartilhando, setCompartilhando] = useState(false);
  if (!jogo) return null;

  const mandante = valor(jogo.time_mandante, jogo.mandante, {});
  const visitante = valor(jogo.time_visitante, jogo.visitante, {});
  const nomeMandante = obterNome(mandante);
  const nomeVisitante = obterNome(visitante);
  const escudoMandante = obterEscudo(mandante);
  const escudoVisitante = obterEscudo(visitante);
  const golsMandante = valor(jogo.placar_mandante, jogo.gols_mandante, jogo.mandante_gols, jogo.placar?.mandante, 0);
  const golsVisitante = valor(jogo.placar_visitante, jogo.gols_visitante, jogo.visitante_gols, jogo.placar?.visitante, 0);
  const nomeCampeonato = valor(campeonato, jogo.campeonato?.nome, jogo.campeonato, jogo.nome_campeonato, "Futebol");
  const data = valor(jogo.data, jogo.data_iso, jogo.data_realizacao, jogo.data_partida);
  const hora = valor(jogo.hora, jogo.horario, jogo.hora_realizacao);
  const estadio = valor(jogo.estadio?.nome, jogo.estadio, jogo.local, "");

  async function compartilharResultado() {
    if (compartilhando) return;
    setCompartilhando(true);

    try {
      const detalhes = [formatarData(data, hora), estadio].filter(Boolean).join(" • ");

      const canvas = document.createElement("canvas");
      canvas.width = 1080;
      canvas.height = 1080;
      const contexto = canvas.getContext("2d");
      if (!contexto) throw new Error("Seu navegador não conseguiu criar a imagem.");

      contexto.fillStyle = "#0b1020";
      contexto.fillRect(0, 0, canvas.width, canvas.height);

      const gradiente = contexto.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradiente.addColorStop(0, "#0f172a");
      gradiente.addColorStop(1, "#111827");
      contexto.fillStyle = gradiente;
      contexto.fillRect(0, 0, canvas.width, canvas.height);

      contexto.fillStyle = "#1f2937";
      contexto.strokeStyle = "#374151";
      contexto.lineWidth = 4;
      contexto.beginPath();
      contexto.roundRect(62, 62, 956, 956, 56);
      contexto.fill();
      contexto.stroke();

      contexto.textAlign = "center";
      contexto.textBaseline = "middle";
      contexto.fillStyle = "#fb923c";
      contexto.font = "700 34px Arial, sans-serif";
      contexto.fillText(String(nomeCampeonato).toUpperCase(), 540, 170, 760);
      contexto.fillStyle = "#d1d5db";
      contexto.font = "700 26px Arial, sans-serif";
      contexto.fillText("RESULTADO FINAL", 540, 225);

      contexto.fillStyle = "#ffffff";
      contexto.font = "700 44px Arial, sans-serif";
      contexto.textAlign = "right";
      contexto.fillText(String(nomeMandante), 350, 510, 270);

      contexto.textAlign = "center";
      contexto.font = "900 96px Arial, sans-serif";
      contexto.fillText(`${golsMandante}`, 430, 510, 110);
      contexto.fillStyle = "#fb923c";
      contexto.font = "900 72px Arial, sans-serif";
      contexto.fillText(":", 540, 510);
      contexto.fillStyle = "#ffffff";
      contexto.font = "900 96px Arial, sans-serif";
      contexto.fillText(`${golsVisitante}`, 650, 510, 110);

      contexto.font = "700 44px Arial, sans-serif";
      contexto.textAlign = "left";
      contexto.fillText(String(nomeVisitante), 730, 510, 270);

      contexto.strokeStyle = "#374151";
      contexto.beginPath();
      contexto.moveTo(120, 660);
      contexto.lineTo(960, 660);
      contexto.stroke();
      
      contexto.textAlign = "center";
      contexto.textBaseline = "middle";
      contexto.fillStyle = "#d1d5db";
      contexto.font = "600 28px Arial, sans-serif";
      contexto.fillText(detalhes, 540, 760, 720);

      contexto.fillStyle = "#fb923c";
      contexto.font = "700 26px Arial, sans-serif";

      const blob = await new Promise((resolve, reject) => {
        canvas.toBlob((resultado) => {
          if (resultado) resolve(resultado);
          else reject(new Error("Não foi possível gerar a imagem do resultado."));
        }, "image/png");
      });

      const arquivo = new File([blob], "resultado-futlance.png", { type: "image/png" });

      if (navigator.share && navigator.canShare?.({ files: [arquivo] })) {
        try {
          await navigator.share({
            title: `${nomeMandante} ${golsMandante} x ${golsVisitante} ${nomeVisitante}`,
            text: `Confira o resultado no Futlance: ${nomeCampeonato}`,
            files: [arquivo],
          });
          return;
        } catch (erro) {
          if (erro?.name !== "AbortError") baixarImagem(blob);
        }
      } else {
        baixarImagem(blob);
      }
    } catch (erro) {
      console.error("Erro ao gerar imagem do resultado:", erro);
      alert(`Não foi possível gerar a imagem. ${erro?.message || "Tente novamente."}`);
    } finally {
      setCompartilhando(false);
    }
  }

  function baixarImagem(blob) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "resultado-futlance.png";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <article className="group relative w-full max-w-[340px] overflow-hidden rounded-2xl border border-zinc-500/20 bg-linear-to-br from-[#0b0f1a] via-[#0f172a] to-[#020617] text-white shadow-[0_0_25px_rgba(113,113,122,0.12)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(113,113,122,0.2)] backdrop-blur-md">
      <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-transparent via-zinc-500 to-transparent" />

      <button
        type="button"
        onClick={compartilharResultado}
        disabled={compartilhando}
        aria-label={compartilhando ? "Gerando imagem para compartilhar" : "Compartilhar resultado"}
        title={compartilhando ? "Gerando imagem..." : "Compartilhar resultado"}
        data-html2canvas-ignore="true"
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-500/40 bg-[#0b0f1a]/80 text-zinc-200 transition-colors hover:border-orange-400 hover:bg-orange-500 hover:text-white disabled:cursor-wait disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="m8.7 10.7 6.6-4.4M8.7 13.3l6.6 4.4" />
        </svg>
      </button>

      <div className="flex flex-col items-center gap-5 px-6 py-6">
        <div className="px-8 text-center text-xs uppercase tracking-[0.2em] text-zinc-400">
          {typeof nomeCampeonato === "string" ? nomeCampeonato : "Futebol"}
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-zinc-500" />
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-400">{t("finalizado")}</span>
        </div>

        <div className="flex w-full items-center justify-between">
          <div className="flex w-1/3 flex-col items-center gap-3 text-center">
            {escudoMandante ? (
              <img src={escudoMandante} alt={nomeMandante} className="h-14 w-14 object-contain" />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-700 text-zinc-100">
                {nomeMandante.slice(0, 1)}
              </div>
            )}
            <span className="text-center text-xs font-medium leading-tight text-zinc-200 md:text-sm">{nomeMandante}</span>
          </div>

          <div className="flex min-w-20 flex-col items-center">
            <div className="flex items-center gap-2 text-4xl font-light text-zinc-200">
              <span>{golsMandante}</span>
              <span className="opacity-50">:</span>
              <span>{golsVisitante}</span>
            </div>
            {(data || hora) && (
              <span className="mt-2 text-center text-xs text-zinc-500">
                {data} {hora}
              </span>
            )}
          </div>

          <div className="flex w-1/3 flex-col items-center gap-3 text-center">
            {escudoVisitante ? (
              <img src={escudoVisitante} alt={nomeVisitante} className="h-14 w-14 object-contain" />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-700 text-zinc-100">
                {nomeVisitante.slice(0, 1)}
              </div>
            )}
            <span className="text-center text-xs font-medium leading-tight text-zinc-200 md:text-sm">{nomeVisitante}</span>
          </div>
        </div>

        {estadio && <div className="text-center text-xs tracking-wide text-zinc-400">{estadio}</div>}
      </div>
    </article>
  );
}

export function JogosEncerradosSection({ titulo, jogos = [] }) {
  if (!jogos.length) return null;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10">
      {titulo && (
        <h2 className="mb-8 text-center text-3xl font-light text-white md:text-5xl">
          {titulo}
        </h2>
      )}

      <div className="flex flex-wrap justify-center gap-6">
        {jogos.map((jogo, index) => (
          <JogoEncerradoCard
            key={jogo?.partida_id ?? jogo?.id ?? `${jogo?.data ?? ""}-${index}`}
            jogo={jogo}
          />
        ))}
      </div>
    </section>
  );
}
