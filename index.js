/**
 * FEAT FRIENDS クリエイターLP 
 * インタラクティブ制御スクリプト
 */

document.addEventListener('DOMContentLoaded', () => {
  // システム初期化
  initLanguageSwitcher();
  initStickyCta();
});

/**
 * 1. 日韓言語切り替え機能の構築
 */
function initLanguageSwitcher() {
  const htmlEl = document.documentElement;
  const btnJa = document.getElementById('btn-ja');
  const btnKo = document.getElementById('btn-ko');
  const selectBox = document.querySelector('.form-grid select');

  // セレクトボックス要素の動的多言語切り替えデータ
  const selectOptions = {
    ja: [
      { value: "", text: "選択してください" },
      { value: "beatmaker", text: "トラックメイカー / 作曲家" },
      { value: "vocalist", text: "ボーカリスト / シンガー" },
      { value: "lyricist", text: "作詞家" },
      { value: "mv_creator", text: "映像クリエイター / デザイナー" },
      { value: "engineer", text: "ミキシング / マスタリング" },
      { value: "other", text: "その他（コラボレーション提案等）" }
    ],
    ko: [
      { value: "", text: "선택해 주세요" },
      { value: "beatmaker", text: "트랙메이커 / 작곡가" },
      { value: "vocalist", text: "보컬리스트 / 싱어" },
      { value: "lyricist", text: "작사가" },
      { value: "mv_creator", text: "영상 크리에이터 / 디자이너" },
      { value: "engineer", text: "믹싱 / 마스터링 엔지니어" },
      { value: "other", text: "기타 (콜라보레이션 제안 등)" }
    ]
  };

  const updateSelectOptions = (lang) => {
    if (!selectBox) return;
    selectBox.innerHTML = '';
    selectOptions[lang].forEach(opt => {
      const option = document.createElement('option');
      option.value = opt.value;
      option.textContent = opt.text;
      selectBox.appendChild(option);
    });
  };

  // グローバル関数として定義してHTMLボタンのonclickに対応
  window.switchLang = function (lang) {
    if (lang === 'ja') {
      htmlEl.classList.remove('lang-ko');
      htmlEl.classList.add('lang-ja');
      btnJa.classList.add('active');
      btnKo.classList.remove('active');
      updateSelectOptions('ja');
    } else if (lang === 'ko') {
      htmlEl.classList.remove('lang-ja');
      htmlEl.classList.add('lang-ko');
      btnKo.classList.add('active');
      btnJa.classList.remove('active');
      updateSelectOptions('ko');
    }
  };

  // 初回読み込み時の設定
  const currentLang = htmlEl.classList.contains('lang-ko') ? 'ko' : 'ja';
  updateSelectOptions(currentLang);
}

/**
 * 2. SP版：スクロール連動型下部固定CTAバーの挙動制御
 */
function initStickyCta() {
  const stickyBar = document.getElementById('stickyCtaBar');
  if (!stickyBar) return;

  window.addEventListener('scroll', () => {
    // 画面横幅がスマホサイズ以下、かつ200px以上スクロールされた場合にフェード表示
    if (window.innerWidth <= 768 && window.scrollY > 200) {
      stickyBar.style.display = 'block';
    } else {
      stickyBar.style.display = 'none';
    }
  });
}