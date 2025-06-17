let musicas = [];

// Carrega os dados do JSON externo
fetch('musicas.json')
  .then(response => response.json())
  .then(data => {
    musicas = data;
  })
  .catch(error => {
    console.error("Erro ao carregar o arquivo JSON:", error);
  });

function checarCoreografia() {
  const input = document.getElementById("inputMusica").value.trim().toLowerCase();
  const resultado = document.getElementById("resultado");

  if (musicas.length === 0) {
    resultado.innerHTML = `<tr><td colspan="3">Os dados ainda estão carregando. Tente novamente em alguns segundos.</td></tr>`;
    return;
  }

  const musica = musicas.find(m => m.aliases.includes(input));

  if (musica) {
    const linkTexto = musica.link
    ? (musica.isDancePractice ? "ver dance practice" : "ver vídeo")
    : "-";

    const row = `
      <tr>
        <td><strong>${musica.titulo.toUpperCase()}</strong><br><small><a class="link-artista" href="https://open.spotify.com/artist/5t5FqBwTcgKTaWmfEbwQY9?si=HDgwMOz6SmiNpXL9CY120Q">ENHYPEN</a></small></td>
        <td>${musica.temCoreografia ? "tem!" : "não tem :("}</td>
        <td>${musica.link ? `<a href="${musica.link}" target="_blank">${linkTexto}</a>` : "-"}</td>
      </tr>
    `;
    resultado.innerHTML = row;
  } else {
    resultado.innerHTML = `<tr><td colspan="3">Música não encontrada 😕</td></tr>`;
  }
}

document.getElementById("inputMusica").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    checarCoreografia();
  }
});


