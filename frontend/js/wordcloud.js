// KOTE 44 (인덱스 0~43)
const KOTE_44 = [
  "불평/불만",
  "환영/호의",
  "감동/감탄",
  "지긋지긋",
  "고마움",
  "슬픔",
  "화남/분노",
  "존경",
  "기대감",
  "우쭐댐/무시함",
  "안타까움/실망",
  "비장함",
  "의심/불신",
  "뿌듯함",
  "편안/쾌적",
  "신기함/관심",
  "아껴주는",
  "부끄러움",
  "공포/무서움",
  "절망",
  "한심함",
  "역겨움/징그러움",
  "짜증",
  "어이없음",
  "없음",
  "패배/자기혐오",
  "귀찮음",
  "힘듦/지침",
  "즐거움/신남",
  "깨달음",
  "죄책감",
  "증오/혐오",
  "흐뭇함(귀여움/예쁨)",
  "당황/난처",
  "경악",
  "부담/안_내킴",
  "서러움",
  "재미없음",
  "불쌍함/연민",
  "놀람",
  "행복",
  "불안/걱정",
  "기쁨",
  "안심/신뢰",
];

// 기본값
let selected = "불평/불만";

const dropdown = document.getElementById("emotionDropdown");
const toggleBtn = document.getElementById("toggleBtn");
const menu = document.getElementById("menu");
const selectedText = document.getElementById("selectedText");
// const debugOut = document.getElementById("debugOut");
// 이미지 변경 함수
const desc = document.querySelector(".emotion-description");

function setSelected(value) {
  selected = value;
  selectedText.textContent = value;
  // debugOut.textContent = value;

  // ✅ 선택된 감정의 idx 찾기
  const idx = KOTE_44.indexOf(value);

  // ✅ idx로 이미지 로드: img/{idx}.jpg
  const imgPath = `img/kim/${idx}.png`;

  // ✅ description 영역에 이미지 삽입
  desc.innerHTML = `
            <img src="${imgPath}" alt="emotion-${idx}" onerror="this.remove();">
        `;

  // aria-selected 업데이트
  [...menu.querySelectorAll(".item")].forEach((btn) => {
    btn.setAttribute("aria-selected", String(btn.dataset.value === value));
  });
}

function openMenu() {
  dropdown.classList.add("open");
  toggleBtn.setAttribute("aria-expanded", "true");
}
function closeMenu() {
  dropdown.classList.remove("open");
  toggleBtn.setAttribute("aria-expanded", "false");
}
function toggleMenu() {
  dropdown.classList.contains("open") ? closeMenu() : openMenu();
}

// 메뉴 렌더
function renderMenu() {
  menu.innerHTML = "";
  KOTE_44.forEach((emo, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "item";
    btn.dataset.value = emo;
    btn.setAttribute("role", "option");
    btn.setAttribute("aria-selected", String(emo === selected));
    btn.innerHTML = `<span class="idx">${idx}</span> ${emo}`;
    btn.addEventListener("click", () => {
      setSelected(emo);
      closeMenu();
    });
    menu.appendChild(btn);
  });
}

// 버튼 클릭
toggleBtn.addEventListener("click", toggleMenu);

// 바깥 클릭하면 닫기
document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target)) closeMenu();
});

// ESC로 닫기
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

// 초기화
renderMenu();
setSelected(selected);
