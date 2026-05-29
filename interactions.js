document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector('form[action*="formspree.io"]');

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      let isValid = true;

      // Seleciona todos os campos que têm o atributo 'required'
      const requiredInputs = contactForm.querySelectorAll("[required]");

      requiredInputs.forEach((input) => {
        // Validação básica: verificar se está vazio
        if (!input.value.trim()) {
          input.classList.add("is-invalid");
          input.classList.remove("is-valid");
          isValid = false;
        } else {
          // Validação específica para o campo de Email
          if (input.type === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value.trim())) {
              input.classList.add("is-invalid");
              input.classList.remove("is-valid");
              isValid = false;
              return;
            }
          }

          input.classList.remove("is-invalid");
          input.classList.add("is-valid");
        }
      });

      // Se algum campo falhar, trava o envio do formulário
      if (!isValid) {
        event.preventDefault();
      } else {
        // Efeito Visual Premium: Altera o botão para o estado de envio
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            A enviar...
          `;
        }
      }
    });

    // Limpa o estado de erro assim que o utilizador começa a digitar no campo
    contactForm.querySelectorAll("input, textarea").forEach((input) => {
      input.addEventListener("input", () => {
        if (input.value.trim()) {
          input.classList.remove("is-invalid");
        }
      });
    });
  }
});

// Typewriter effect com suporte Multi-idioma
document.addEventListener("DOMContentLoaded", () => {
  // 1. Dicionário de palavras estruturado por idioma
  const wordsLibrary = {
    pt: [
      "Programadora Full Stack",
      "Designer UX/UI",
      "Estudante de Multimédia",
      "Criadora de Conteúdo Digital"
    ],
    en: [
      "Full Stack Developer",
      "UX/UI Designer",
      "Multimedia Student",
      "Digital Content Creator"
    ]
  };

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const targetSpan = document.getElementById("typewriter-text");

  if (targetSpan) {
    function typeEffect() {
      // 2. Deteta dinamicamente o idioma atual da página (padrão 'pt' se falhar)
      const idiomaAtual = document.documentElement.lang || "pt";

      // Obtém a lista de palavras correta com base no idioma ativo
      const currentWordsList = wordsLibrary[idiomaAtual] || wordsLibrary["pt"];
      const currentWord = currentWordsList[wordIndex];

      // Proteção: se por algum motivo o índice ficar fora do tamanho da lista (ex: listas com tamanhos diferentes)
      if (!currentWord) {
        wordIndex = 0;
        setTimeout(typeEffect, 100);
        return;
      }

      if (isDeleting) {
        targetSpan.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        targetSpan.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 1500;
        isDeleting = true;
      }
      else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % currentWordsList.length;
        typeSpeed = 500;
      }

      setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();
  }
});


// Darkmode/Lightmod//  SINCRO DE TEMA IMEDIATA 
const htmlTag = document.documentElement;
const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
htmlTag.setAttribute("data-bs-theme", savedTheme);

//  CONFIG DOS BOTÕES (Espera o HTML carregar)
document.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  // Função para atualizar apenas o ícone visual da Navbar
  const updateIcon = (theme) => {
    if (!themeIcon) return;
    if (theme === "dark") {
      themeIcon.className = "bi bi-sun-fill fs-5 text-warning";
    } else {
      themeIcon.className = "bi bi-moon-stars-fill fs-5 text-secondary";
    }
  };

  // Aplica o ícone correto logo no arranque da página atual
  updateIcon(savedTheme);

  // Escuta o clique no botão de alternar tema
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = htmlTag.getAttribute("data-bs-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      htmlTag.setAttribute("data-bs-theme", newTheme);
      localStorage.setItem("portfolio-theme", newTheme);
      updateIcon(newTheme);
    });
  }
});
