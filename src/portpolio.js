/* =========================================================
   Jay-hak Portfolio — shared script (의존성 없음)
   1) 모바일 메뉴 토글   2) 헤더 스크롤 상태
   3) 좌우명 자동 슬라이드   4) 프로젝트 시간표(타임라인) 렌더링
   ========================================================= */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1) 모바일 메뉴 */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        toggle.focus();
      }
    });
  }

  /* 2) 스크롤 시 헤더 하단 라인 */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* 3) 좌우명 자동 슬라이드 (타이핑 + 일시정지/재생 + 문장 선택)
        - 시간값(elapsed) 하나로 타이핑 글자 수와 진행 막대를 함께 계산
        - 일시정지 = elapsed 증가만 멈춤 → 타이핑·막대가 정확히 같이 멈춤 */
  const motto = document.querySelector('[data-motto]');
  if (motto) {
    const slides = [...motto.querySelectorAll('.motto-slide')];
    const steps = [...motto.querySelectorAll('.motto-step')];
    const toggleBtn = motto.querySelector('[data-motto-toggle]');
    const live = motto.querySelector('[data-motto-live]');
    const counter = motto.querySelector('[data-motto-current]');

    // 슬라이드별 정보: 이모지가 깨지지 않도록 코드포인트 단위로 분리
    const data = slides.map((el) => {
      const chars = Array.from(el.querySelector('.motto-sizer').textContent);
      const long = chars.length > 80;
      const charMs = long ? 22 : 55;              // 긴 문단은 빠르게 타이핑
      const holdMs = long ? 6500 : 3200;          // 대신 더 오래 머묾
      const typeMs = chars.length * charMs;
      return { el, chars, charMs, typeMs, duration: typeMs + holdMs, typed: el.querySelector('.motto-typed') };
    });

    const caret = document.createElement('span');
    caret.className = 'caret';
    caret.setAttribute('aria-hidden', 'true');

    let index = 0;
    let elapsed = 0;
    let playing = !reduceMotion;                  // 동작 줄이기 설정 시 정지 상태로 시작
    let lastTs = null;
    let shownChars = -1;

    motto.classList.add('is-js');

    const render = () => {
      const d = data[index];
      // 동작 줄이기: 타이핑 없이 문장 전체 표시
      const n = reduceMotion ? d.chars.length : Math.min(d.chars.length, Math.floor(elapsed / d.charMs));
      if (n !== shownChars) {
        d.typed.textContent = d.chars.slice(0, n).join('');
        d.typed.appendChild(caret);
        shownChars = n;
      }
      steps.forEach((st, i) => {
        const p = i < index ? 1 : i === index ? Math.min(1, elapsed / d.duration) : 0;
        st.style.setProperty('--p', p);
      });
    };

    const goTo = (i) => {
      data[index].el.classList.remove('is-active');
      data[index].typed.textContent = '';
      index = (i + data.length) % data.length;
      data[index].el.classList.add('is-active');
      // 정지 상태에서 문장을 고르면 바로 읽을 수 있게 전체 문장을 표시 (재개 시 머무는 시간부터 이어감)
      elapsed = playing ? 0 : data[index].typeMs;
      shownChars = -1;
      steps.forEach((st, k) => st.setAttribute('aria-current', k === index ? 'true' : 'false'));
      if (counter) counter.textContent = index + 1;
      live.textContent = data[index].chars.join('');
      render();
    };

    const setPlaying = (on) => {
      playing = on;
      lastTs = null;
      motto.classList.toggle('is-paused', !on);
      toggleBtn.setAttribute('aria-label', on ? '자동 재생 일시정지' : '자동 재생 시작');
      // WAI-ARIA 캐러셀 패턴: 재생 중엔 읽지 않고, 정지 시 현재 문장을 읽어줌
      live.setAttribute('aria-live', on ? 'off' : 'polite');
    };

    const loop = (ts) => {
      if (playing) {
        if (lastTs !== null) {
          elapsed += Math.min(ts - lastTs, 100);  // 탭 전환 후 복귀 시 한 번에 건너뛰지 않도록 보정
          if (elapsed >= data[index].duration) goTo(index + 1);
          else render();
        }
        lastTs = ts;
      }
      requestAnimationFrame(loop);
    };

    toggleBtn.addEventListener('click', () => setPlaying(!playing));
    steps.forEach((st, i) => st.addEventListener('click', () => goTo(i)));   // 선택해도 재생 상태는 유지
    document.addEventListener('visibilitychange', () => { lastTs = null; });

    goTo(0);
    setPlaying(playing);
    requestAnimationFrame(loop);
  }

  /* 4) 프로젝트 시간표 */
  const tt = document.querySelector('[data-timetable]');
  if (tt) {
    const START = Number(tt.dataset.from);        // 예: 2013
    const END = Number(tt.dataset.to);            // 예: 2027 (이 해의 1월 1일까지)
    const span = END - START;
    const toYear = (ym) => { const [y, m] = ym.split('-').map(Number); return y + (m - 1) / 12; };
    const pct = (v) => ((v - START) / span) * 100;

    // 연도 눈금
    const axis = tt.querySelector('.tt-axis-track');
    for (let y = START; y <= END; y++) {
      const t = document.createElement('span');
      t.className = 'tt-year';
      t.style.left = pct(y) + '%';
      t.textContent = y;
      axis.appendChild(t);
    }
    tt.style.setProperty('--year-w', (100 / span) + '%');

    // 막대 배치 (종료월은 그 달의 끝까지 포함)
    tt.querySelectorAll('.tt-row').forEach((row, i) => {
      const s = toYear(row.dataset.start);
      const e = toYear(row.dataset.end) + 1 / 12;
      const bar = row.querySelector('.tt-bar');
      bar.style.left = pct(s) + '%';
      bar.style.width = (pct(e) - pct(s)) + '%';
      bar.style.setProperty('--i', i);
    });

    // 현재 위치
    const now = new Date();
    const nowY = now.getFullYear() + now.getMonth() / 12;
    const marker = tt.querySelector('.tt-now');
    if (marker && nowY >= START && nowY <= END) marker.style.left = pct(nowY) + '%';

    // 화면에 들어올 때 한 번만 막대 애니메이션
    if ('IntersectionObserver' in window && !reduceMotion) {
      const io = new IntersectionObserver((entries) => {
        if (entries.some((en) => en.isIntersecting)) { tt.classList.add('is-ready'); io.disconnect(); }
      }, { threshold: 0.25 });
      io.observe(tt);
    }
  }

  /* 푸터 연도 */
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
