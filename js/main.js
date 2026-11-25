// Tabs: mouse, keyboard (arrows) and #hash in the URL (e.g. index.html#mods)
const tabs = [...document.querySelectorAll('.tab')];

function select(tab, focus) {
  tabs.forEach(t => {
    const on = t === tab;
    t.setAttribute('aria-selected', on);
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
  });
  document.documentElement.style.setProperty('--accent', tab.dataset.accent);
  if (focus) tab.focus();
  history.replaceState(null, '', '#' + tab.id.replace('t-', ''));
}

tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => select(tab));
  tab.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') select(tabs[(i + 1) % tabs.length], true);
    if (e.key === 'ArrowLeft')  select(tabs[(i - 1 + tabs.length) % tabs.length], true);
  });
});

const fromHash = document.getElementById('t-' + location.hash.slice(1));
select(fromHash || tabs[0]);
if (!fromHash) history.replaceState(null, '', location.pathname);

document.getElementById('year').textContent = new Date().getFullYear();

// Click-to-play YouTube thumbnails (iframe loads only after click)
document.querySelectorAll('.play[data-yt]').forEach(btn => {
  btn.addEventListener('click', () => {
    const box = btn.parentElement;
    const f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + btn.dataset.yt + '?autoplay=1&rel=0';
    f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    f.allowFullscreen = true;
    f.referrerPolicy = 'strict-origin-when-cross-origin'; // YouTube error 153 without a referrer
    f.title = btn.getAttribute('aria-label');
    box.classList.add('playing');
    btn.replaceWith(f);
  });
});
