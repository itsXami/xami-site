// Accessible tabs for the screenshot gallery (WAI-ARIA tabs pattern, automatic activation).
export function initGallery(): void {
  const tablist = document.querySelector<HTMLElement>('.gallery [role="tablist"]');
  if (!tablist) return;
  const tabs = Array.from(tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]'));

  const select = (next: HTMLButtonElement, focus: boolean) => {
    for (const tab of tabs) {
      const selected = tab === next;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      const panel = document.getElementById(tab.getAttribute('aria-controls') ?? '');
      if (!panel) continue;
      if (selected) {
        panel.hidden = false;
        panel.classList.add('is-active');
        panel.classList.remove('is-entering');
        void panel.offsetWidth; // restart the fade animation
        panel.classList.add('is-entering');
      } else {
        panel.hidden = true;
        panel.classList.remove('is-active', 'is-entering');
      }
    }
    if (focus) next.focus();
  };

  tablist.addEventListener('click', (e) => {
    const tab = (e.target as HTMLElement).closest<HTMLButtonElement>('[role="tab"]');
    if (tab) select(tab, false);
  });

  tablist.addEventListener('keydown', (e) => {
    const i = tabs.indexOf(document.activeElement as HTMLButtonElement);
    if (i < 0) return;
    let j: number | null = null;
    if (e.key === 'ArrowRight') j = (i + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') j = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') j = 0;
    else if (e.key === 'End') j = tabs.length - 1;
    if (j === null) return;
    e.preventDefault();
    select(tabs[j], true);
  });
}
