/* Case study — course screen viewer */
(function () {
  const I = n => 'assets/case-study/cs-' + String(n).padStart(2, '0') + '.jpg';
  const MODS = [
    { g: 'Orientation', t: 'Learning Objectives', f: [13] },
    { g: 'Orientation', t: 'Glossary', f: [57, 38] },
    { g: 'Track A · Foundations', t: 'The Skin Microbiome', f: [3, 36, 27, 20, 47, 40] },
    { g: 'Track A · Foundations', t: 'Skin Microbiome Roles', f: [60, 10, 44] },
    { g: 'Track A · Foundations', t: 'Gut-Brain-Skin Axis', f: [43, 64, 33, 28] },
    { g: 'Track A · Foundations', t: 'Healthy vs. Unhealthy Skin', f: [37, 29, 4] },
    { g: 'Track A · Foundations', t: 'Imbalance Factors', f: [63, 30, 61, 49, 41] },
    { g: 'Track A · Foundations', t: 'In the Treatment Room', f: [51, 52, 59] },
    { g: 'Track B · Practice', t: 'Live Probiotic Skincare', f: [53, 58, 62, 50] },
    { g: 'Track B · Practice', t: 'Product Methodology', f: [54, 32, 56, 9] },
    { g: 'Track B · Practice', t: 'Modality Layering', f: [46, 35, 45] },
    { g: 'Track B · Practice', t: 'Client Education', f: [42, 39, 55, 11, 34] },
    { g: 'Track B · Practice', t: 'Works Cited', f: [48] }
  ];
  const TOTAL = MODS.reduce((a, m) => a + m.f.length, 0);
  const $ = id => document.getElementById(id);
  if (!$('plNav')) return;
  let st = { m: 2, s: 0 };
  try { st = JSON.parse(localStorage.getItem('kb_cs_player2')) || st; } catch (e) {}
  if (!MODS[st.m] || !MODS[st.m].f[st.s]) st = { m: 2, s: 0 };

  function renderNav() {
    let h = '', g = '';
    MODS.forEach((m, i) => {
      if (m.g !== g) { g = m.g; h += `<h6>${g}</h6>`; }
      h += `<button data-i="${i}" class="${i === st.m ? 'on' : ''}" aria-pressed="${i === st.m}">${m.t}<span>${m.f.length}</span></button>`;
    });
    $('plNav').innerHTML = h;
    $('plNav').querySelectorAll('button').forEach(b => b.onclick = () => { st = { m: +b.dataset.i, s: 0 }; render(); });
  }
  function render() {
    const m = MODS[st.m];
    $('plImg').src = I(m.f[st.s]);
    $('plImg').alt = `${m.t}, screen ${st.s + 1}`;
    $('plTitle').textContent = m.t;
    $('plCount').textContent = `Screen ${st.s + 1} of ${m.f.length}`;
    const done = MODS.slice(0, st.m).reduce((a, x) => a + x.f.length, 0) + st.s + 1;
    $('plProg').style.width = (done / TOTAL * 100) + '%';
    renderNav();
    try { localStorage.setItem('kb_cs_player2', JSON.stringify(st)); } catch (e) {}
  }
  $('plNext').onclick = () => { const m = MODS[st.m]; if (st.s < m.f.length - 1) st.s++; else if (st.m < MODS.length - 1) { st.m++; st.s = 0; } render(); };
  $('plPrev').onclick = () => { if (st.s > 0) st.s--; else if (st.m > 0) { st.m--; st.s = MODS[st.m].f.length - 1; } render(); };
  render();
})();
