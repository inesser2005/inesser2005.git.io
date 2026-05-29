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
// Typewriter effect
document.addEventListener("DOMContentLoaded", () => {
  const words = [
    "Programadora Full Stack",
    "Designer UX/UI",
    "Estudante de Multimédia",
    "Criadora de Conteúdo Digital"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const targetSpan = document.getElementById("typewriter-text");

  // Só executa o script se o elemento existir na página atual (evita erros na consola)
  if (targetSpan) {
    function typeEffect() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        // Remove uma letra
        targetSpan.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        // Adiciona uma letra
        targetSpan.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      // Define as velocidades das animações em milissegundos
      let typeSpeed = isDeleting ? 50 : 100;

      // Se a palavra estiver toda escrita
      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 1500; // Tempo de pausa com a palavra completa no ecrã
        isDeleting = true;
      }
      // Se a palavra terminou de ser apagada
      else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length; // Avança para a próxima palavra
        typeSpeed = 500; // Pausa curta antes de começar a escrever a nova
      }

      setTimeout(typeEffect, typeSpeed);
    }

    // Inicia a animação
    typeEffect();
  }
});

// Darkmode/Lightmod// 1. SINCRO DE TEMA IMEDIATA (Executa mal a página abre para não haver falhas)
const htmlTag = document.documentElement;
const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
htmlTag.setAttribute("data-bs-theme", savedTheme);

// 2. CONFIGURAÇÃO DOS BOTÕES (Espera o HTML carregar)
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
