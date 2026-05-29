// js/tradutor.js

document.addEventListener("DOMContentLoaded", () => {
  // 1. Função melhorada para aplicar as traduções
  function aplicarIdioma(idioma) {
    // Procura todos os elementos que têm o atributo data-pt
    const elementos = document.querySelectorAll("[data-pt]");
    
    elementos.forEach(el => {
      // Usamos innerHTML em vez de textContent para suportar tags como <strong> ou <i>
      if (idioma === "en") {
        el.innerHTML = el.getAttribute("data-en");
      } else {
        el.innerHTML = el.getAttribute("data-pt");
      }
    });

    document.documentElement.lang = idioma;
    localStorage.setItem("idioma-preferido", idioma);
    
    // Atualiza o texto do botão visualmente para mostrar a opção oposta
    const btnIdioma = document.getElementById("btn-idioma");
    if (btnIdioma) {
      btnIdioma.textContent = idioma === "pt" ? "EN" : "PT";
    }
  }

  // 2. Lógica de decisão inicial
  const idiomaGuardado = localStorage.getItem("idioma-preferido");

  if (idiomaGuardado) {
    aplicarIdioma(idiomaGuardado);
  } else {
    const idiomaNavegador = navigator.language || navigator.userLanguage;
    if (!idiomaNavegador.startsWith("pt")) {
      aplicarIdioma("en");
    } else {
      aplicarIdioma("pt");
    }
  }

  // 3. Ouvinte de clique para o botão (funciona com cliques repetidos)
  const btnIdioma = document.getElementById("btn-idioma");
  if (btnIdioma) {
    btnIdioma.addEventListener("click", (e) => {
      e.preventDefault(); // Evita qualquer comportamento padrão do botão
      const idiomaAtual = document.documentElement.lang || "pt";
      const novoIdioma = idiomaAtual === "pt" ? "en" : "pt";
      aplicarIdioma(novoIdioma);
    });
  }
});
