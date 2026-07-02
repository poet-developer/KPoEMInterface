(function () {
  const poemSelect = document.getElementById("poemSelect");
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

  const PALETTES = {
    김소월01: [
      {
        emotions: ["우울한", "슬픔", "서러움"],
        primary: { rgb: "rgb(190, 197, 206)", hex: "#bec5ceff" },
        secondary: { rgb: "rgb(140, 108, 153)", hex: "#8c6c99ff" },
      },
      {
        emotions: ["품위있는", "슬픔", "서러움"],
        primary: { rgb: "rgb(24, 40, 61)", hex: "#18283dff" },
        secondary: { rgb: "rgb(111, 89, 119)", hex: "#6f5977ff" },
      },
    ],
    윤동주01: [
      {
        emotions: ["순수한", "슬픔", "서러움"],
        primary: { rgb: "rgb(237,229,225)", hex: "#ede5e1ff" },
        secondary: { rgb: "rgb(169,161,173)", hex: "#a9a1adff" },
      },
      {
        emotions: ["섬세한", "슬픔", "서러움"],
        primary: { rgb: "rgb(190,204,221)", hex: "#beccddff" },
        secondary: { rgb: "rgb(223,222,224)", hex: "#dfdee0ff" },
      },
    ],

    이상01: [
      {
        emotions: ["그윽한", "서러움", "슬픔"],
        primary: { rgb: "rgb(172, 163, 175)", hex: "#aca3afff" },
        secondary: { rgb: "rgb(217, 218, 219)", hex: "#d9dadbff" },
      },
      {
        emotions: ["우울한", "서러움", "슬픔"],
        primary: { rgb: "rgb(201, 190, 206)", hex: "#c9beceff" },
        secondary: { rgb: "rgb(108, 127, 153)", hex: "#6c7f99ff" },
      },
    ],

    임화01: [
      {
        emotions: ["강인한", "비장함", "슬픔"],
        primary: { rgb: "rgb(204, 99, 20)", hex: "#cc6314ff" },
        secondary: { rgb: "rgb(22, 71, 135)", hex: "#164787ff" },
      },
      {
        emotions: ["기운찬", "비장함", "슬픔"],
        primary: { rgb: "rgb(204, 99, 20)", hex: "#cc6314ff" },
        secondary: { rgb: "rgb(26, 117, 237)", hex: "#1a75edff" },
      },
    ],

    한용운01: [
      {
        emotions: ["우울한", "슬픔", "서러움"],
        primary: { rgb: "rgb(111, 115, 119)", hex: "#6f7377ff" },
        secondary: { rgb: "rgb(64, 19, 81)", hex: "#401351ff" },
      },
      {
        emotions: ["우울한", "슬픔", "서러움"],
        primary: { rgb: "rgb(78, 89, 104)", hex: "#4e5968ff" },
        secondary: { rgb: "rgb(177, 135, 193)", hex: "#b187c1ff" },
      },
    ],

    신석정01: [
      {
        emotions: ["순수한", "흐뭇함(귀여움/예쁨)", "기쁨"],
        primary: { rgb: "rgb(203, 216, 215)", hex: "#cbd8d7ff" },
        secondary: { rgb: "rgb(224, 249, 236)", hex: "#e0f9ecff" },
      },
      {
        emotions: ["감각적인", "흐뭇함(귀여움/예쁨)", "기쁨"],
        primary: { rgb: "rgb(78, 102, 99)", hex: "#4e6663ff" },
        secondary: { rgb: "rgb(139, 196, 166)", hex: "#8bc4a6ff" },
      },
    ],

    김수영01: [
      {
        emotions: ["깊은", "안타까움/실망", "비장함"],
        primary: { rgb: "rgb(76, 26, 30)", hex: "#4c1a1eff" },
        secondary: { rgb: "rgb(153, 142, 134)", hex: "#998e86ff" },
      },
      {
        emotions: ["깊은", "안타까움/실망", "비장함"],
        primary: { rgb: "rgb(112, 19, 64)", hex: "#701340ff" },
        secondary: { rgb: "rgb(153, 142, 134)", hex: "#998e86ff" },
      },
    ],

    백석01: [
      {
        emotions: ["사랑스러운", "흐뭇함(귀여움/예쁨)", "아껴주는"],
        primary: { rgb: "rgb(249, 220, 164)", hex: "#f9dca4ff" },
        secondary: { rgb: "rgb(193, 128, 124)", hex: "#c1807cff" },
      },
      {
        emotions: ["사랑스러운", "흐뭇함(귀여움/예쁨)", "아껴주는"],
        primary: { rgb: "rgb(124, 193, 185)", hex: "#7cc1b9ff" },
        secondary: { rgb: "rgb(249, 164, 196)", hex: "#f9a4c4ff" },
      },
    ],
  };

  if (!btn) return;

  // ✅ 시 데이터 (추가)
  const POEMS = {
    김소월01: `나 보기가 역겨워
가실 때에는
말없이 고이 보내드리오리다.

영변(寧邊)에 약산(藥山)
진달래꽃
아름따다 가실 길에 뿌리오리다.

가시는 걸음 걸음
놓인 그 꽃을
사뿐히 즈려밟고 가시옵소서.

나 보기가 역겨워
가실 때에는
죽어도 아니 눈물 흘리오리다.`,

    윤동주01: `죽는 날까지 하늘을 우러러
한 점 부끄럼이 없기를,
잎새에 이는 바람에도
나는 괴로워했다.
별을 노래하는 마음으로
모든 죽어가는 것을 사랑해야지
그리고 나에게 주어진 길을 
걸어가야겠다.

오늘 밤에도 별이 바람에 스치운다.`,

    이상01: `벌판한복판에 꽃나무하나가있소. 근처(近處)에는꽃나무가하나도없소. 꽃나무는제가생각하는꽃나무를 열심(熱心)으로생각하는것처럼 열심으로꽃을피워가지고섰소. 꽃나무는제가생각하는꽃나무에게갈수없소. 나는막달아났소. 한꽃나무를위(爲)하여 그러는것처럼 나는참그런이상스러운흉내를내었소.`,

    임화01: `비록 청춘의 즐거움과 희망을
모두다 땅속 깊이 파묻는
비통한 매장의 날일지라도,
한번 현해탄은 청년들의 눈앞에,
검은 상장(喪帳)을 내린 일은 없었다.
              
오늘도 또한 나젊은 청년들은
부지런한 아이들처럼
끊임없이 이 바다를 건너가고, 돌아오고,
내일도 또한
현해탄은 청년들의 해협이리라.
              
영원히 현해탄은 우리들의 해협이다.`,

    한용운01: `나는 나룻배
당신은 행인(行人)

당신은 흙발로 나를 짓밟습니다
나는 당신을 안고 물을 건너갑니다
나는 당신을 안으면 깊으나 옅으나 급한 여울이나 건너갑니다

만일 당신이 아니 오시면 나는 바람을 쐬고 눈비를 맞으며 밤에서 낮까지 당신을 기다리고 있습니다
당신은 물만 건너면 나를 돌아보지도 않고 가십니다 그려

그러나 당신이 언제든지 오실 줄만은 알아요
나는 당신을 기다리면서 날마다날마다 낡아갑니다

나는 나룻배
당신은 행인`,

    신석정01: `네 눈망울에서는
초록빛 오월
하이얀 찔레꽃 내음새가 난다.

네 눈망울에는
초롱초롱한
별들의 이야기를 머금었다.`,

    백석01: `눈은 푹푹 나리고
아름다운 나타샤는 나를 사랑하고
어데서 흰 당나귀도 오늘밤이 좋아서 응앙응앙 울을 것이다`,

    김수영01: `자유를 위해서
비상(飛翔)하여 본 일이 있는
사람이면 알지.
노고지리가
무엇을 보고
노래하는가를
어째서 자유에는
피 냄새가 섞여 있는가를
혁명(革命)은
왜 고독한 것인가를
`,
  };

  let CURRENT_POEM_KEY = "김소월01";
  let TARGET_SENTENCE = POEMS[CURRENT_POEM_KEY].trim();

  // ✅ select → textarea 연결 (추가)
  if (poemSelect) {
    poemSelect.addEventListener("change", function () {
      const selectedKey = this.value;
      CURRENT_POEM_KEY = selectedKey;

      if (!selectedKey) {
        textarea.value = "";
        return;
      }

      const poem = POEMS[selectedKey] || "";

      textarea.value = poem;

      // ✅ TARGET_SENTENCE 변경
      TARGET_SENTENCE = poem.trim();

      console.log(TARGET_SENTENCE);
    });
  }

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
      const result = analyzeText(text, CURRENT_POEM_KEY);

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
    poemSelect.value = "";
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
  };

  function applyEmotionResult(result) {
    const { emotions, startColor, endColor } = result;

    const text = `${emotions[0]}, ${emotions[1]}과(와) ${emotions[2]}`;
    revealingValue.textContent = text;

    // ⭐ 핵심 추가 (wipe 방식 유지)
    gradientFill.style.transition = "none";
    gradientFill.style.transform = "translateX(-100%)";

    gradientFill.style.background = `linear-gradient(90deg,
    ${startColor.rgb} 0%,
    ${startColor.rgb} 60%,
    ${endColor.rgb} 60%,
    ${endColor.rgb} 100%
  )`;

    gradientBox.style.background = `linear-gradient(90deg, ${startColor.rgb}, ${endColor.rgb})`;

    swatch1.style.background = startColor.rgb;
    swatch2.style.background = endColor.rgb;

    // legend1.innerHTML = `RGB: 158, 193, 230<br>HEX: ${startColor}`;
    // legend2.innerHTML = `RGB: 103, 152, 124<br>HEX: ${endColor}`;
    legend1.innerHTML = `
      RGB: ${startColor.rgb}<br>
      HEX: ${startColor.hex}
    `;

    legend2.innerHTML = `
      RGB: ${endColor.rgb}<br>
      HEX: ${endColor.hex}
    `;

    analyzingEl.classList.remove("visible");
  }

  // ✅ 초기 상태
  gradientBox.style.background = `linear-gradient(90deg, ${emotionColors["초기화된"]}, ${emotionColors["초기화된"]})`;
  swatch1.style.background = emotionColors["초기화된"];
  swatch2.style.background = emotionColors["초기화된"];
  legend1.innerHTML = `RGB: 229, 229, 229<br>HEX: #e5e5e5`;
  legend2.innerHTML = `RGB: 229, 229, 229<br>HEX: #e5e5e5`;

  function analyzeText(text, poet) {
    // ✅ 지정된 문장이 아니면 반응 안 함
    if (text !== TARGET_SENTENCE) {
      alert("이 프로토타입은 지정된 한 문장에만 반응합니다.");

      return null;
    }

    // ✅ 시인별 팔레트 가져오기
    const poetPalettes = PALETTES[poet];

    // ✅ 랜덤 선택
    const selected =
      poetPalettes[Math.floor(Math.random() * poetPalettes.length)];

    return {
      emotions: selected.emotions,

      startColor: { rgb: selected.primary.rgb, hex: selected.primary.hex },

      endColor: { rgb: selected.secondary.rgb, hex: selected.secondary.hex },
    };
  }
})();
