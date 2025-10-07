const storageKeyTheme = "portfolio_theme";
      const storageKeyAccent = "portfolio_accent";

      // Año footer
      document.getElementById("year").textContent = new Date().getFullYear();

      // Tema
      function setTheme(mode) {
        document.documentElement.setAttribute("data-bs-theme", mode);
        localStorage.setItem(storageKeyTheme, mode);
      }

      function applySavedTheme() {
        const saved = localStorage.getItem(storageKeyTheme) || "light";
        setTheme(saved);
      }

      document
        .getElementById("lightBtn")
        .addEventListener("click", () => setTheme("light"));
      document
        .getElementById("darkBtn")
        .addEventListener("click", () => setTheme("dark"));

      // Color de acento
      function setAccent(color) {
        document.documentElement.style.setProperty("--accent", color);
        document.documentElement.style.setProperty("--bs-primary", color);
        document.documentElement.style.setProperty("--bs-link-color", color);
        localStorage.setItem(storageKeyAccent, color);
      }

      function applySavedAccent() {
        const saved = localStorage.getItem(storageKeyAccent);
        if (saved) setAccent(saved);
      }

      document.querySelectorAll("[data-color]").forEach((btn) => {
        btn.addEventListener("click", () =>
          setAccent(btn.getAttribute("data-color"))
        );
      });

      // Smooth scroll
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          const href = this.getAttribute("href");
          if (href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
              target.scrollIntoView({ behavior: "smooth", block: "start" });

              // Cerrar navbar en móvil
              const navCollapse = document.getElementById("navContent");
              if (navCollapse.classList.contains("show")) {
                bootstrap.Collapse.getInstance(navCollapse).hide();
              }
            }
          }
        });
      });

      // Navbar elevation
      const nav = document.getElementById("mainNav");
      function handleScroll() {
        if (window.scrollY > 10) {
          nav.classList.add("nav-elevated");
        } else {
          nav.classList.remove("nav-elevated");
        }
      }
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();

      // Init
      applySavedTheme();
      applySavedAccent();

      // Animación de entrada
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
            }
          });
        },
        { threshold: 0.1 }
      );

      document
        .querySelectorAll(".card, .skill-card, .experience-item")
        .forEach((el) => {
          el.style.opacity = "0";
          el.style.transform = "translateY(20px)";
          el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
          observer.observe(el);
        });