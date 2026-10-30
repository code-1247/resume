document.documentElement.classList.add("x-js");
      try {
        if (new URLSearchParams(location.search).get("lang") === "en") {
          document.documentElement.lang = "en";
          document.documentElement.dir = "ltr";
        }
      } catch (e) {}

(function () {
        var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        var small = window.matchMedia("(max-width: 700px)").matches;
        var doc = document.documentElement;

        /* Scroll progress */
        var bar = document.querySelector(".x-progress"), ticking = false;
        function progress() {
          var max = doc.scrollHeight - doc.clientHeight;
          bar.style.transform = "scaleX(" + (max > 0 ? Math.min(1, window.scrollY / max) : 0) + ")";
          ticking = false;
        }
        window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(progress); } }, { passive: true });
        window.addEventListener("resize", progress);
        progress();

        /* Scroll reveal */
        var items = document.querySelectorAll(".x-reveal, .x-stagger");
        if (reduce || !("IntersectionObserver" in window)) {
          items.forEach(function (el) { el.classList.add("is-visible"); });
        } else {
          var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
              if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
            });
          }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
          items.forEach(function (el) { io.observe(el); });
        }

        /* Translations */
        var I18N = {
          fa: {
            title: "Hosein Fallahnejad | Web Designer",
            langGroup: "انتخاب زبان",
            heroAria: "معرفی",
            name: "حسین فلاح‌نژاد",
            typeSr: 'طراح سایت، <span lang="en" dir="ltr">Web Designer</span>، <span lang="en" dir="ltr">Front-end Developer</span>',
            lines: ["طراح سایت", "Web Designer", "Front-end Developer"],
            tagline: "طراحی و پیاده‌سازی وب‌سایت‌های مدرن، زیبا و واکنش‌گرا.",
            ctaContact: "تماس با من",
            ctaAbout: "درباره من",
            scroll: "اسکرول",
            scrollAria: "رفتن به بخش درباره من",
            navAbout: "درباره من",
            navContact: "تماس",
            aboutEyebrow: "درباره من",
            aboutTitle: 'طراحی با <span class="x-accent">دقت</span>، کدنویسی با عشق.',
            aboutText: 'سلام! من یک طراح سایت و توسعه‌دهنده فرانت‌اند ۱۸ ساله‌ام با مدرک فنی و حرفه‌ای. در ابتدای مسیر حرفه‌ای‌ام هستم (<span lang="en" dir="ltr">Junior</span>) و عاشق ساختن رابط‌های کاربری تمیز، سریع و واکنش‌گرا. همیشه در حال یادگیری‌ام و دنبال فرصتی برای رشد در یک تیم خلاق.',
            skills: "مهارت‌ها",
            contactEyebrow: "تماس با من",
            contactTitle: 'بیایید <span class="x-accent">در ارتباط</span> باشیم',
            contactIntro: "برای همکاری یا گفتگو، از راه‌های زیر با من در تماس باشید.",
            email: "ایمیل",
            telegram: "تلگرام",
            instagram: "اینستاگرام",
            github: "گیت‌هاب"
          },
          en: {
            title: "Hosein Fallahnejad | Web Designer",
            langGroup: "Choose language",
            heroAria: "Introduction",
            name: "Hosein Fallahnejad",
            typeSr: "Web Designer, Front-end Developer, UI Enthusiast",
            lines: ["Web Designer", "Front-end Developer", "UI Enthusiast"],
            tagline: "Designing and building modern, beautiful, responsive websites.",
            ctaContact: "Contact",
            ctaAbout: "About",
            scroll: "Scroll",
            scrollAria: "Go to the About section",
            navAbout: "About",
            navContact: "Contact",
            aboutEyebrow: "About Me",
            aboutTitle: 'Designed with <span class="x-accent">precision</span>, coded with love.',
            aboutText: "Hi! I'm an 18-year-old web designer and front-end developer with a Technical &amp; Vocational certificate. I'm at the start of my professional journey and love building clean, fast and responsive user interfaces. I'm always learning and looking for a chance to grow in a creative team.",
            skills: "Skills",
            contactEyebrow: "Get in Touch",
            contactTitle: 'Let\u2019s <span class="x-accent">stay connected</span>',
            contactIntro: "For a project or just a chat, reach me through any of these.",
            email: "Email",
            telegram: "Telegram",
            instagram: "Instagram",
            github: "GitHub"
          }
        };

        /* Typewriter, restartable per language */
        var type = document.querySelector(".x-type");
        var typeLine = type ? type.parentNode : null;
        var tTimer = 0;
        var isRtl = function (s) { return /[\u0600-\u06FF]/.test(s); };
        function startType(src, delay) {
          if (!type) return;
          clearTimeout(tTimer);
          var lines = src.map(function (l) { return Array.from(l); });
          var li = 0, ci = lines[0].length, deleting = true;
          type.textContent = src[0];
          typeLine.dir = isRtl(src[0]) ? "rtl" : "ltr";
          if (reduce) return;
          var tick = function () {
            var chars = lines[li];
            typeLine.dir = isRtl(chars.join("")) ? "rtl" : "ltr";
            if (deleting) {
              ci--;
              type.textContent = chars.slice(0, ci).join("");
              if (ci <= 0) { deleting = false; li = (li + 1) % lines.length; tTimer = setTimeout(tick, 380); return; }
              tTimer = setTimeout(tick, 32);
            } else {
              ci++;
              type.textContent = chars.slice(0, ci).join("");
              if (ci >= chars.length) { deleting = true; tTimer = setTimeout(tick, 2200); return; }
              tTimer = setTimeout(tick, 80);
            }
          };
          tTimer = setTimeout(tick, delay);
        }

        /* Language switch */
        var page = document.querySelector(".page");
        var langBox = document.querySelector(".x-lang");
        var langBtns = langBox.querySelectorAll("button[data-lang]");
        var current = doc.lang === "en" ? "en" : "fa";
        function apply(lang, delay) {
          var d = I18N[lang];
          doc.lang = lang;
          doc.dir = lang === "fa" ? "rtl" : "ltr";
          document.title = d.title;
          document.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = d[el.getAttribute("data-i18n")]; });
          document.querySelectorAll("[data-i18n-html]").forEach(function (el) { el.innerHTML = d[el.getAttribute("data-i18n-html")]; });
          document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
            el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
              var p = pair.split(":");
              if (p.length === 2) el.setAttribute(p[0].trim(), d[p[1].trim()]);
            });
          });
          document.querySelectorAll(".x-arrow").forEach(function (a) { a.textContent = lang === "fa" ? "←" : "→"; });
          startType(d.lines, delay);
        }
        function markSwitch(lang) {
          langBox.setAttribute("data-active", lang);
          langBtns.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang)); });
        }
        var fadeTimer = 0;
        function setLang(lang) {
          if (lang === current || !I18N[lang]) return;
          current = lang;
          markSwitch(lang);
          if (reduce) { apply(lang, 0); return; }
          clearTimeout(fadeTimer);
          page.classList.add("x-fading");
          fadeTimer = setTimeout(function () {
            apply(lang, 1600);
            page.classList.remove("x-fading");
          }, 260);
        }
        langBtns.forEach(function (b) {
          b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
        });
        markSwitch(current);
        apply(current, 2600);

        /* Magnetic buttons, desktop pointers only */
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches && !reduce) {
          document.querySelectorAll(".x-magnet").forEach(function (el) {
            el.addEventListener("mousemove", function (e) {
              var r = el.getBoundingClientRect();
              var dx = (e.clientX - (r.left + r.width / 2)) * 0.28;
              var dy = (e.clientY - (r.top + r.height / 2)) * 0.4;
              el.style.translate = dx.toFixed(1) + "px " + dy.toFixed(1) + "px";
            }, { passive: true });
            el.addEventListener("mouseleave", function () { el.style.translate = ""; });
          });
        }

        /* Cursor glow, desktop only */
        var cursor = document.querySelector(".x-cursor");
        if (!reduce && window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 900px)").matches) {
          var x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y, running = false;
          var loop = function () {
            x += (tx - x) * 0.16; y += (ty - y) * 0.16;
            cursor.style.transform = "translate3d(" + x + "px," + y + "px,0)";
            if (Math.abs(tx - x) + Math.abs(ty - y) > 0.4) requestAnimationFrame(loop); else running = false;
          };
          window.addEventListener("mousemove", function (e) {
            tx = e.clientX; ty = e.clientY;
            cursor.classList.add("is-on");
            cursor.classList.toggle("is-hot", !!(e.target.closest && e.target.closest("a, button, .x-tags li")));
            if (!running) { running = true; requestAnimationFrame(loop); }
          }, { passive: true });
          document.addEventListener("mouseleave", function () { cursor.classList.remove("is-on"); });
        }

        /* Hero rain: falling characters on a canvas */
        /* 3D tilt + spotlight, desktop pointers only (visual only, never handles clicks) */
        var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        if (fine && !reduce) {
          document.querySelectorAll(".x-tilt, .x-contact a").forEach(function (el) {
            var max = el.classList.contains("x-tilt") ? 4 : 7;
            el.addEventListener("mousemove", function (e) {
              var r = el.getBoundingClientRect();
              var px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
              el.style.setProperty("--ry", ((px - 0.5) * max * 2).toFixed(2) + "deg");
              el.style.setProperty("--rx", ((0.5 - py) * max * 2).toFixed(2) + "deg");
              el.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
              el.style.setProperty("--my", (py * 100).toFixed(1) + "%");
            }, { passive: true });
            el.addEventListener("mouseleave", function () {
              el.style.setProperty("--rx", "0deg");
              el.style.setProperty("--ry", "0deg");
            });
          });
        }

        var cv = document.querySelector(".x-hero__canvas");
        if (cv && !reduce && fine && cv.getContext) {
          var ctx = cv.getContext("2d");
          var glyphs = Array.from("01<>/{}=+*#ابپتجحدرزسشصطعفقکگلمنوهی۰۱۲۳۴۵۶۷۸۹アカサタナハマヤラ");
          var fs = small ? 13 : 16, gap = small ? 1.9 : 1.35, interval = small ? 80 : 55;
          var w = 0, h = 0, cols = 0, drops = [], step = 0, last = 0, raf = 0, visible = true;
          var dpr = Math.min(window.devicePixelRatio || 1, 2);
          var size = function () {
            var r = cv.getBoundingClientRect();
            w = r.width; h = r.height;
            cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            cols = Math.max(1, Math.floor(w / (fs * gap)));
            step = w / cols;
            drops = [];
            for (var i = 0; i < cols; i++) drops.push(Math.random() * -(h / fs));
          };
          var draw = function (ts) {
            raf = 0;
            if (!visible || document.hidden) return;
            raf = requestAnimationFrame(draw);
            if (ts - last < interval) return;
            last = ts;
            ctx.globalCompositeOperation = "destination-out";
            ctx.fillStyle = "rgba(0,0,0,0.12)";
            ctx.fillRect(0, 0, w, h);
            ctx.globalCompositeOperation = "source-over";
            ctx.font = fs + 'px "Geist Mono", monospace';
            for (var i = 0; i < cols; i++) {
              var py = drops[i] * fs;
              if (py > 0) {
                ctx.fillStyle = Math.random() > 0.96 ? "rgba(225,255,238,0.95)" : "rgba(34,224,122,0.7)";
                ctx.fillText(glyphs[(Math.random() * glyphs.length) | 0], i * step + step / 4, py);
              }
              if (py > h && Math.random() > 0.97) drops[i] = 0;
              drops[i] += 1;
            }
          };
          var start = function () { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(draw); };
          size();
          var rt;
          window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(size, 200); });
          if ("IntersectionObserver" in window) {
            new IntersectionObserver(function (en) { visible = en[0].isIntersecting; start(); }).observe(cv);
          }
          document.addEventListener("visibilitychange", start);
          start();
        }
      })();

(function () {
        document.addEventListener("contextmenu", function (e) { e.preventDefault(); });
        document.addEventListener("keydown", function (e) {
          var k = (e.key || "").toLowerCase();
          var c = e.code || "";
          var letter = c.indexOf("Key") === 0 ? c.slice(3).toLowerCase() : k;
          var block =
            k === "f12" || c === "F12" ||
            (e.ctrlKey && e.shiftKey && !e.altKey && !e.metaKey && (letter === "i" || letter === "j" || letter === "c")) ||
            (e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey && letter === "u") ||
            (e.metaKey && e.altKey && !e.ctrlKey && (letter === "i" || letter === "j" || letter === "c")) ||
            (e.metaKey && !e.altKey && !e.ctrlKey && !e.shiftKey && letter === "u");
          if (block) { e.preventDefault(); e.stopPropagation(); }
        }, true);
      })();
