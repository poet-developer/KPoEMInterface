(function () {
  const textarea = document.getElementById("userText");
  const revealingValue = document.getElementById("revealingValue");
  const gradientBox = document.getElementById("gradientBox");
  const analyzingEl = document.getElementById("analyzing");
  const swatch1 = document.getElementById("swatch1");
  const swatch2 = document.getElementById("swatch2");
  const legend1 = document.getElementById("legend1");
  const legend2 = document.getElementById("legend2");
  const btn = document.getElementById("analyzeButton");
  const resetBtn = document.getElementById("analyzeResetButton");
  const gradientFill = document.getElementById("gradientFill");

  const TARGET_SENTENCE = "미풍이 웃는 아침을 기원하련다";

  const PALETTES = [
    // ✅ 팔레트 버전 1 (연두 → 베이지)
    {
      emotions: ["가벼운", "기대감", "기쁨"],
      primary: "#E9F7A1", // 연두 (면적 큼)
      secondary: "#E5E3D6", // 베이지 (면적 작음)
    },

    // ✅ 팔레트 버전 2 (오프화이트 → 옐로우)
    {
      emotions: ["가벼운", "기대감", "기쁨"],
      primary: "#E8E9D6", // 오프화이트 (면적 큼)
      secondary: "#F6ECA1", // 옐로우 (면적 작음)
    },
  ];

  if (!btn) return;

  btn.addEventListener("mouseover", () => btn.classList.add("hovered"));
  btn.addEventListener("mouseout", () => btn.classList.remove("hovered"));

  btn.addEventListener("click", (e) => {
    btn.classList.add("clicked");
    setTimeout(() => btn.classList.remove("clicked"), 150);
    btn.classList.add("active");
    resetBtn.classList.remove("active");

    const text = textarea.value.trim();

    if (!text) {
      alert("텍스트를 입력해주세요.");
      return;
    }

    // ✅ 분석중 모션 표시
    analyzingEl.classList.add("visible");

    // ✅ 기존 결과 초기화
    revealingValue.textContent = "";
    gradientBox.style.background = "#ccc";

    // ✅ 3초 딜레이 후 결과 출력
    setTimeout(() => {
      const result = analyzeText(text);

      if (!result) {
        analyzingEl.classList.remove("visible");
        return;
      }

      applyEmotionResult(result);
    }, 3000);
  });

  resetBtn.addEventListener("click", () => {
    // ✅ 버튼 active 토글
    resetBtn.classList.add("active");
    btn.classList.remove("active");

    // ✅ 입력 / 텍스트 초기화
    textarea.value = "";
    revealingValue.textContent = "-";
    analyzingEl.classList.remove("visible");

    // ✅ wipe 애니메이션으로 회색 되돌리기
    const initialGray = emotionColors["초기화된"];

    gradientFill.style.transition = "none";
    gradientFill.style.transform = "translateX(-100%)";

    gradientFill.style.background = `linear-gradient(90deg, ${initialGray}, ${initialGray})`;

    requestAnimationFrame(() => {
      gradientFill.style.transition = "transform 0.9s cubic-bezier(.4,0,.2,1)";
      gradientFill.style.transform = "translateX(0)";
    });

    // ✅ 하단 legend & swatch 초기화
    swatch1.style.background = initialGray;
    swatch2.style.background = initialGray;

    legend1.innerHTML = `RGB: 229, 229, 229<br>HEX: ${initialGray}`;
    legend2.innerHTML = `RGB: 229, 229, 229<br>HEX: ${initialGray}`;
  });

  // ✅ 감정 → 색상 매핑
  const emotionColors = {
    초기화된: "#e5e5e5",
    화려한: "#9d3393",
    부끄러움: "#9d3393",
    슬픔: "#39657c",
  };

  function applyEmotionResult(result) {
    const { emotions, startColor, endColor } = result;

    const text = `${emotions[0]} ${emotions[1]}과(와) ${emotions[2]}`;
    revealingValue.textContent = text;

    gradientBox.style.background = `linear-gradient(90deg, ${startColor}, ${endColor})`;

    swatch1.style.background = startColor;
    swatch2.style.background = endColor;

    legend1.innerHTML = `RGB: 157, 51, 147<br>HEX: ${startColor}`;
    legend2.innerHTML = `RGB: 57, 101, 124<br>HEX: ${endColor}`;

    analyzingEl.classList.remove("visible");
  }

  // ✅ 초기 상태
  gradientBox.style.background = `linear-gradient(90deg, ${emotionColors["초기화된"]}, ${emotionColors["초기화된"]})`;
  swatch1.style.background = emotionColors["초기화된"];
  swatch2.style.background = emotionColors["초기화된"];
  legend1.innerHTML = `RGB: 229, 229, 229<br>HEX: #e5e5e5`;
  legend2.innerHTML = `RGB: 229, 229, 229<br>HEX: #e5e5e5`;

  gradientBox.style.background = `linear-gradient(90deg,
    ${startColor} 0%,
    ${startColor} 70%,
    ${endColor} 70%,
    ${endColor} 100%
  )`;

  function analyzeText(text) {
    // ✅ 지정된 문장이 아니면 반응 안 함
    if (text !== TARGET_SENTENCE) {
      alert("이 프로토타입은 지정된 한 문장에만 반응합니다.");
      return null;
    }

    // ✅ 팔레트 2종 중 랜덤 선택
    const selected = PALETTES[Math.floor(Math.random() * PALETTES.length)];

    return {
      emotions: selected.emotions,
      startColor: selected.primary,
      endColor: selected.secondary,
    };
  }
})();
