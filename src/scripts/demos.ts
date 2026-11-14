// Demo player: one sound at a time, play/stop, category filter.
// Audio is fetched only after "play" is pressed (no preload). Nothing is stored on the device.
export function initDemos(): void {
  const list = document.querySelector<HTMLElement>('[data-demos]');
  if (!list) return;
  const status = document.querySelector<HTMLElement>('[data-demo-status]');
  const filters = Array.from(document.querySelectorAll<HTMLButtonElement>('.filters [data-filter]'));
  const audio = new Audio();
  audio.preload = 'none';
  let current: HTMLButtonElement | null = null;

  const setPlaying = (btn: HTMLButtonElement, on: boolean) => {
    btn.closest('li')?.classList.toggle('is-playing', on);
    btn.setAttribute('aria-label', `${on ? 'Stop' : 'Play'} ${btn.dataset.name}`);
  };

  const stop = () => {
    audio.pause();
    audio.currentTime = 0;
    if (current) setPlaying(current, false);
    current = null;
  };

  audio.addEventListener('ended', stop);
  audio.addEventListener('error', () => {
    if (current && status) status.textContent = `${current.dataset.name} could not be played.`;
    stop();
  });

  list.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('button.play');
    if (!btn) return;
    const wasCurrent = btn === current;
    stop();
    if (wasCurrent) return;
    current = btn;
    audio.src = btn.dataset.src ?? '';
    setPlaying(btn, true);
    audio.play().catch(() => {
      if (current === btn) stop();
    });
  });

  for (const f of filters) {
    f.addEventListener('click', () => {
      const value = f.dataset.filter;
      for (const other of filters) other.setAttribute('aria-pressed', String(other === f));
      let shown = 0;
      for (const li of Array.from(list.querySelectorAll<HTMLLIElement>('li'))) {
        const visible = value === 'all' || li.dataset.category === value;
        li.hidden = !visible;
        if (visible) shown++;
        if (!visible && current && li.contains(current)) stop();
      }
      if (status) status.textContent = `Showing ${shown} ${shown === 1 ? 'preset' : 'presets'}.`;
    });
  }
}
