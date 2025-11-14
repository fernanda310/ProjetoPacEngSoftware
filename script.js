
    // ========================================
    // FUNCIONALIDADES INTERATIVAS MODERNAS
    // ========================================

    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

    document.addEventListener("DOMContentLoaded", () => {
      // ===== NAV TOGGLE (MOBILE) =====
      // This functionality is removed as the navbar is replaced by a hero section
      
      // ===== VER/OCULTAR RESOLUÇÕES =====
      $$(".ver-resolucao").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.target;
          const correcao = document.getElementById(`correcao-${id}`);
          if (!correcao) return;
          const isHidden = correcao.hidden;
          correcao.hidden = !isHidden;
          btn.setAttribute("aria-expanded", String(!isHidden));
        });
      });

      // ===== LIMPAR CAMPO =====
      $$(".limpar").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.target;
          const textarea = document.getElementById(`atividade-${id}-codigo`);
          if (!textarea) return;
          textarea.value = "";
          localStorage.removeItem(`atividade-${id}-codigo`);
          textarea.focus();
        });
      });

      // ===== VER CÓDIGO =====
      $$(".ver-codigo").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.codigo;
          const bloco = document.getElementById(`codigo-${id}`);
          if (!bloco) return;
          const isHidden = bloco.hidden;
          bloco.hidden = !isHidden;
          btn.setAttribute("aria-expanded", String(!isHidden));
        });
      });

      // ===== VOLTAR AO TOPO =====
      const btnTopo = $("#btn-topo");
      if (btnTopo) {
        btnTopo.addEventListener("click", () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      }


      // ===== PERSISTIR TEXTAREA =====
      $$(".cmd-input").forEach(textarea => {
        const id = textarea.id;
        if (!id) return;

        const stored = localStorage.getItem(id);
        if (stored) textarea.value = stored;

        let timer = null;
        textarea.addEventListener("input", () => {
          clearTimeout(timer);
          timer = setTimeout(() => {
            localStorage.setItem(id, textarea.value);
          }, 550);
        });

        textarea.addEventListener("keydown", (e) => {
          if (e.key === "Enter" && e.ctrlKey) {
            const matches = id.match(/^atividade-(\d+)-codigo$/);
            if (matches) {
              const aid = matches[1];
              const correcao = document.getElementById(`correcao-${aid}`);
              const btn = document.querySelector(`.ver-resolucao[data-target="${aid}"]`);
              if (correcao && btn) {
                const nowHidden = correcao.hidden;
                correcao.hidden = !nowHidden;
                btn.setAttribute("aria-expanded", String(!nowHidden));
              }
            }
            e.preventDefault();
          }

          if ((e.key === "s" || e.key === "S") && (e.ctrlKey || e.metaKey)) {
            localStorage.setItem(id, textarea.value);
            textarea.animate(
              [
                { boxShadow: "0 0 0 0 rgba(37,99,235,0.3)" },
                { boxShadow: "0 0 0 8px rgba(37,99,235,0.06)" },
              ],
              { duration: 420 }
            );
            e.preventDefault();
          }
        });
      });

      window.addEventListener("resize", () => {
      });
    });
