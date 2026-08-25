/* =========================================================
   PHOCO - Landing Page Nón Đồng Phục
   Vanilla JS: mobile nav, FAQ accordion, gallery lightbox,
   back-to-top, demo-mode quote form state machine.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Mobile navigation ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var mobileNav = document.querySelector(".mobile-nav");

  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- FAQ accordion ---------- */
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    var question = item.querySelector(".faq-question");
    var answer = item.querySelector(".faq-answer");
    if (!question || !answer) return;

    question.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");

      faqItems.forEach(function (other) {
        if (other !== item) {
          other.classList.remove("is-open");
          var otherAnswer = other.querySelector(".faq-answer");
          var otherQ = other.querySelector(".faq-question");
          if (otherAnswer) otherAnswer.style.maxHeight = null;
          if (otherQ) otherQ.setAttribute("aria-expanded", "false");
        }
      });

      if (isOpen) {
        item.classList.remove("is-open");
        answer.style.maxHeight = null;
        question.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("is-open");
        answer.style.maxHeight = answer.scrollHeight + "px";
        question.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- Gallery lightbox ---------- */
  var lightbox = document.querySelector(".lightbox");
  var lightboxImg = lightbox ? lightbox.querySelector("img") : null;
  var lightboxCaption = lightbox ? lightbox.querySelector(".lightbox-caption") : null;
  var lightboxClose = lightbox ? lightbox.querySelector(".lightbox-close") : null;
  var lightboxPrev = lightbox ? lightbox.querySelector(".lightbox-prev") : null;
  var lightboxNext = lightbox ? lightbox.querySelector(".lightbox-next") : null;

  /* Current browsable group (e.g. all gallery items, or all product
     cards) and the index within it, so Prev/Next can step through
     images of the same kind without mixing unrelated collections. */
  var lightboxGroup = [];
  var lightboxIndex = -1;

  function renderLightbox(item) {
    var img = item.querySelector("img");
    if (!img || !lightbox || !lightboxImg) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    var caption = item.getAttribute("data-caption") || img.alt;
    if (lightboxCaption) lightboxCaption.textContent = caption;
  }

  function updateLightboxNav() {
    var multiple = lightboxGroup.length > 1;
    if (lightboxPrev) lightboxPrev.hidden = !multiple;
    if (lightboxNext) lightboxNext.hidden = !multiple;
  }

  function openLightboxFrom(item, group) {
    lightboxGroup = group || [item];
    lightboxIndex = lightboxGroup.indexOf(item);
    if (lightboxIndex === -1) lightboxIndex = 0;
    renderLightbox(item);
    updateLightboxNav();
    if (!lightbox) return;
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function stepLightbox(delta) {
    if (!lightboxGroup.length) return;
    lightboxIndex = (lightboxIndex + delta + lightboxGroup.length) % lightboxGroup.length;
    renderLightbox(lightboxGroup[lightboxIndex]);
  }

  var galleryItems = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
  galleryItems.forEach(function (item) {
    item.addEventListener("click", function () {
      openLightboxFrom(item, galleryItems);
    });
  });

  /* Product catalog cards ("Xem mẫu") also open the lightbox for a
     closer look at material/stitching/logo detail. The whole card is
     the interactive control (role=button); the inner "Xem mẫu" element
     is purely visual text inside it, so it isn't a second, redundant
     tab stop for keyboard/screen-reader users. */
  var productCards = Array.prototype.slice.call(document.querySelectorAll(".product-card[data-lightbox]"));
  productCards.forEach(function (item) {
    item.setAttribute("role", "button");
    item.setAttribute("tabindex", "0");
    item.addEventListener("click", function () {
      openLightboxFrom(item, productCards);
    });
    item.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightboxFrom(item, productCards);
      }
    });
  });

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", function (e) {
      e.stopPropagation();
      stepLightbox(-1);
    });
  }
  if (lightboxNext) {
    lightboxNext.addEventListener("click", function (e) {
      e.stopPropagation();
      stepLightbox(1);
    });
  }
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (!lightbox || !lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") stepLightbox(-1);
    if (e.key === "ArrowRight") stepLightbox(1);
  });

  /* ---------- Back to top ---------- */
  var backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    window.addEventListener(
      "scroll",
      function () {
        if (window.scrollY > 600) {
          backToTop.classList.add("is-visible");
        } else {
          backToTop.classList.remove("is-visible");
        }
      },
      { passive: true }
    );
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Quote request form ----------
     Dán URL Web App Google Apps Script vào đây (xem README.txt mục
     12 "ĐỔ LIÊN HỆ KHÁCH HÀNG VỀ GOOGLE SHEET" để biết cách lấy URL
     này) thì form sẽ gửi thật dữ liệu vào Google Sheet mỗi khi có
     khách gửi yêu cầu báo giá. Để trống "" thì form chạy ở chế độ
     demo (chỉ giả lập độ trễ mạng, không gửi đi đâu). */
  var GOOGLE_SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzM1olpUxEKz5skm4ROJHBaeZt3rlUofs90YSaH7uhUjM-mq5bqkrkzgOdxY51AVWHOew/exec";

  var form = document.getElementById("quote-form");
  if (form) {
    var formCard = form.closest(".form-card") || form.parentElement;
    var statusBox = formCard ? formCard.querySelector(".form-status") : null;
    var submitBtn = form.querySelector('button[type="submit"]');
    var demoNoteEl = form.querySelector(".demo-note");
    if (demoNoteEl && GOOGLE_SHEET_WEBHOOK_URL) demoNoteEl.style.display = "none";

    function setStatus(type, message) {
      if (!statusBox) return;
      statusBox.className = "form-status is-visible status-" + type;
      statusBox.innerHTML = message;
    }

    function clearStatus() {
      if (!statusBox) return;
      statusBox.className = "form-status";
      statusBox.innerHTML = "";
    }

    function showFieldError(field, message) {
      var group = field.closest(".form-group");
      if (!group) return;
      group.classList.add("has-error");
      var err = group.querySelector(".field-error");
      if (err) err.textContent = message;
    }

    function clearFieldError(field) {
      var group = field.closest(".form-group");
      if (!group) return;
      group.classList.remove("has-error");
    }

    function validatePhone(value) {
      var digits = value.replace(/\s|\.|-/g, "");
      return /^(0|\+84)\d{9,10}$/.test(digits);
    }

    function validate() {
      var valid = true;
      var name = form.querySelector("#qf-name");
      var phone = form.querySelector("#qf-phone");
      var quantity = form.querySelector("#qf-quantity");
      var need = form.querySelector("#qf-need");

      [name, phone, quantity, need].forEach(function (f) {
        if (f) clearFieldError(f);
      });

      if (!name.value.trim()) {
        showFieldError(name, "Vui lòng nhập họ tên.");
        valid = false;
      }
      if (!phone.value.trim()) {
        showFieldError(phone, "Vui lòng nhập số điện thoại.");
        valid = false;
      } else if (!validatePhone(phone.value.trim())) {
        showFieldError(phone, "Số điện thoại chưa đúng định dạng.");
        valid = false;
      }
      if (!quantity.value.trim()) {
        showFieldError(quantity, "Vui lòng nhập số lượng cần đặt.");
        valid = false;
      }
      if (!need.value) {
        showFieldError(need, "Vui lòng chọn nhu cầu.");
        valid = false;
      }

      return valid;
    }

    /* Gom dữ liệu form thành FormData, dùng chữ hiển thị (thay vì mã
       nội bộ) cho trường "Nhu cầu" để ghi vào Google Sheet cho dễ đọc. */
    function buildQuotePayload() {
      var data = new FormData();
      data.append("name", form.querySelector("#qf-name").value.trim());
      data.append("phone", form.querySelector("#qf-phone").value.trim());
      data.append("quantity", form.querySelector("#qf-quantity").value.trim());
      var needSelect = form.querySelector("#qf-need");
      var needText =
        needSelect.selectedIndex > -1
          ? needSelect.options[needSelect.selectedIndex].text
          : "";
      data.append("need", needText);
      data.append("note", form.querySelector("#qf-note").value.trim());
      return data;
    }

    /* Gửi form đi. Nếu đã dán URL Web App Google Apps Script vào biến
       GOOGLE_SHEET_WEBHOOK_URL (xem README mục 12), form sẽ gửi thật
       dữ liệu vào Google Sheet. Nếu để trống, form chạy ở chế độ demo
       (giả lập độ trễ mạng, không gửi đi đâu) để vẫn xem được luồng
       Đang gửi -> Thành công khi kiểm thử giao diện. */
    function submitQuote(payload) {
      if (!GOOGLE_SHEET_WEBHOOK_URL) {
        return new Promise(function (resolve) {
          setTimeout(resolve, 1100);
        });
      }
      return fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        body: payload,
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      clearStatus();

      if (!validate()) {
        setStatus("error", "Vui lòng kiểm tra lại thông tin còn thiếu bên trên.");
        return;
      }

      if (submitBtn) submitBtn.setAttribute("disabled", "disabled");
      setStatus(
        "loading",
        '<span class="spinner" aria-hidden="true"></span> Đang gửi yêu cầu...'
      );

      submitQuote(buildQuotePayload())
        .then(function () {
          var demoNote = GOOGLE_SHEET_WEBHOOK_URL
            ? ""
            : " (Chế độ demo: form chưa kết nối hệ thống thật)";
          setStatus(
            "success",
            "Đã ghi nhận yêu cầu. PHOCO sẽ liên hệ lại sớm nhất qua số điện thoại bạn cung cấp." +
              demoNote
          );
           if (typeof fbq === "function") fbq("track", "Lead");
          if (submitBtn) submitBtn.removeAttribute("disabled");
          form.reset();
        })
        .catch(function () {
          setStatus(
            "error",
            "Gửi yêu cầu chưa thành công, vui lòng thử lại hoặc gọi trực tiếp hotline."
          );
          if (submitBtn) submitBtn.removeAttribute("disabled");
        });
    });
  }

  /* ---------- Scroll-reveal animations ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if ("IntersectionObserver" in window) {
      /* Stagger cards that share a parent grid so they cascade in
         rather than popping together, without touching per-item CSS. */
      var groups = [];
      function groupIndexFor(parent) {
        for (var i = 0; i < groups.length; i++) {
          if (groups[i].parent === parent) return i;
        }
        groups.push({ parent: parent, count: 0 });
        return groups.length - 1;
      }
      revealEls.forEach(function (el) {
        var gi = groupIndexFor(el.parentElement);
        var idx = groups[gi].count++;
        var delay = Math.min(idx * 70, 420);
        el.style.transitionDelay = delay + "ms";
      });

      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      /* No IntersectionObserver support: show everything immediately. */
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
    }
  }

  /* ---------- Current year in footer ---------- */
  var yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

   /* ---------- Meta Pixel: su kien Contact khi khach bam goi/Zalo/Messenger ---------- */
   document.addEventListener("click", function (e) {
      var link = e.target.closest && e.target.closest('a[href^="tel:"], a[href*="m.me/"], a[href*="zalo.me/"]');
      if (link && typeof fbq === "function") {
         fbq("track", "Contact");
      }
   });
})();
