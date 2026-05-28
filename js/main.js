const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initSmoothAnchors();
  initReveal();
  initSuctionSlider();
  initNozzleTabs();
  initAccordion();
  initStickyCta();
});

function initMobileMenu() {
  const button = document.querySelector(".menu-button");
  const menu = document.querySelector("#mobileMenu");

  if (!button || !menu) {
    return;
  }

  const setOpen = (isOpen) => {
    button.setAttribute("aria-expanded", String(isOpen));
    button.setAttribute("aria-label", isOpen ? "모바일 메뉴 닫기" : "모바일 메뉴 열기");
    menu.hidden = !isOpen;
    document.body.classList.toggle("is-menu-open", isOpen);
  };

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    setOpen(!isOpen);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setOpen(false);
    }
  });
}

function initSmoothAnchors() {
  document.querySelectorAll('a[href*="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const url = new URL(link.href, window.location.href);
      const isSamePage = url.origin === window.location.origin && url.pathname === window.location.pathname;
      const target = isSamePage && url.hash.length > 1 ? document.querySelector(url.hash) : null;

      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });
      window.history.pushState(null, "", url.hash);
    });
  });
}

function initReveal() {
  const targets = document.querySelectorAll("[data-reveal]");

  if (!targets.length) {
    return;
  }

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -4% 0px"
  });

  targets.forEach((target) => observer.observe(target));
}

function initSuctionSlider() {
  const slider = document.querySelector("#suctionLevel");
  const output = document.querySelector("#suctionLevelOutput");
  const text = document.querySelector("#suctionLevelText");

  if (!slider || !output || !text) {
    return;
  }

  const descriptions = {
    1: "가장 낮은 단계입니다. 처음 사용 시 제품 작동감과 아이의 반응을 확인하는 출발점입니다.",
    2: "낮은 단계 구간입니다. 짧은 사용 흐름에서 부담을 줄이며 확인할 수 있습니다.",
    3: "낮은 단계에서 시작해 조금씩 조절하는 구간입니다.",
    4: "중간 단계입니다. 사용설명서 기준에 따라 짧게 나누어 확인하는 상황에 어울립니다.",
    5: "분비물 상태와 사용 시간을 함께 보며 단계적으로 확인하는 구간입니다.",
    6: "높은 단계에 가까운 구간입니다. 주의사항을 기준으로 신중하게 확인하십시오.",
    7: "가장 높은 단계입니다. 필요한 상황에서만 사용방법을 확인한 뒤 짧게 사용하는 흐름을 권장합니다."
  };

  const update = () => {
    const value = Number(slider.value);
    output.textContent = `${value}단계`;
    text.textContent = descriptions[value];
    slider.setAttribute("aria-valuetext", `${value}단계`);
  };

  slider.addEventListener("input", update);
  slider.addEventListener("change", update);
  update();
}

function initNozzleTabs() {
  const tabs = Array.from(document.querySelectorAll("[data-nozzle]"));
  const panel = document.querySelector("#nozzlePanel");
  const title = document.querySelector("#nozzleTitle");
  const kicker = document.querySelector("#nozzleKicker");
  const description = document.querySelector("#nozzleDescription");
  const label = document.querySelector("#nozzleImageLabel");
  const image = document.querySelector("#nozzleImage");

  if (!tabs.length || !panel || !title || !kicker || !description || !label || !image) {
    return;
  }

  const data = {
    basic1: {
      title: "기본 1호",
      kicker: "선택 시 참고",
      description: "넓은 접촉면을 가진 기본 노즐입니다. 사용 전 코 크기와 밀착 상태를 확인한 뒤 선택해 주세요.",
      label: "기본 1호 상세 이미지",
      image: "data/images/기본1호.png"
    },
    basic2: {
      title: "기본 2호",
      kicker: "선택 시 참고",
      description: "작은 코에 맞춰 확인할 수 있는 기본형 노즐입니다. 낮은 흡입 단계와 함께 사용감을 먼저 확인해 주세요.",
      label: "기본 2호 상세 이미지",
      image: "data/images/기본2호.png"
    },
    custom1: {
      title: "커스텀 1호",
      kicker: "선택 시 참고",
      description: "투명 소재로 내부 확인이 쉬운 노즐입니다. 사용 후 세척과 건조 상태를 확인하기 좋습니다.",
      label: "커스텀 1호 상세 이미지",
      image: "data/images/커스텀1호.png"
    },
    custom2: {
      title: "커스텀 2호",
      kicker: "선택 시 참고",
      description: "중간 크기의 노즐입니다. 코 크기와 사용 상황에 따라 선택 시 참고할 수 있습니다.",
      label: "커스텀 2호 상세 이미지",
      image: "data/images/커스텀2호.png"
    },
    custom3: {
      title: "커스텀 3호",
      kicker: "선택 시 참고",
      description: "상대적으로 큰 사이즈의 노즐입니다. 사용 전 설명서의 노즐 안내를 확인해 주세요.",
      label: "커스텀 3호 상세 이미지",
      image: "data/images/커스텀3호.png"
    }
  };

  const render = (key, activeTab) => {
    const item = data[key];
    title.textContent = item.title;
    kicker.textContent = item.kicker;
    description.textContent = item.description;
    label.textContent = item.label;
    image.src = item.image;
    image.alt = `${item.title} 상세 이미지`;
    panel.setAttribute("aria-labelledby", activeTab.id);

    tabs.forEach((tab) => {
      const isActive = tab === activeTab;
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });
  };

  tabs.forEach((tab, index) => {
    tab.tabIndex = index === 0 ? 0 : -1;

    tab.addEventListener("click", () => {
      render(tab.dataset.nozzle, tab);
    });

    tab.addEventListener("keydown", (event) => {
      const currentIndex = tabs.indexOf(tab);
      let nextIndex = currentIndex;

      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        nextIndex = (currentIndex + 1) % tabs.length;
      }

      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      }

      if (event.key === "Home") {
        nextIndex = 0;
      }

      if (event.key === "End") {
        nextIndex = tabs.length - 1;
      }

      if (nextIndex !== currentIndex) {
        event.preventDefault();
        tabs[nextIndex].focus();
        tabs[nextIndex].click();
      }
    });
  });
}

function initAccordion() {
  const buttons = Array.from(document.querySelectorAll(".accordion-item button"));

  if (!buttons.length) {
    return;
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.getAttribute("aria-controls")}`);
      const isOpen = button.getAttribute("aria-expanded") === "true";

      if (!panel) {
        return;
      }

      button.setAttribute("aria-expanded", String(!isOpen));
      panel.hidden = isOpen;
    });
  });
}

function initStickyCta() {
  const stickyCta = document.querySelector(".sticky-mobile-cta");
  const hero = document.querySelector(".hero, .about-hero");

  if (!stickyCta || !hero) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    stickyCta.classList.add("is-visible");
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    const isHeroVisible = entries.some((entry) => entry.isIntersecting);
    stickyCta.classList.toggle("is-visible", !isHeroVisible);
  }, {
    threshold: 0.08
  });

  observer.observe(hero);
}
