export const themeToggle = () => {
  const storageKey = 'theme-preference';
  const onClick = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    setPreference();
  };
  const getColorPreference = () => localStorage.getItem(storageKey) || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const setPreference = () => {
    localStorage.setItem(storageKey, theme.value);
    reflectPreference();
  };
  const reflectPreference = () => {
    document.documentElement.setAttribute('data-theme', theme.value);
    document.getElementById('theme-toggle').setAttribute('aria-label', theme.value);
    const picture = document.querySelector('picture');
    const sources = picture.querySelectorAll('source:not([media="(prefers-color-scheme: dark)"])');
    const image = picture.querySelector('img');
    const imageSources = {
      dark: {
        avif: 'assets/images/cover-dark.avif',
        webp: 'assets/images/cover-dark.webp',
        jpg: 'assets/images/cover-dark.jpg',
        jpeg: 'assets/images/cover-dark.jpeg',
      },
      light: {
        avif: 'assets/images/cover-light.avif',
        webp: 'assets/images/cover-light.webp',
        jpg: 'assets/images/cover-light.jpg',
        jpeg: 'assets/images/cover-light.jpeg',
      },
    };
    sources.forEach(source => {
      const format = source.type.split('/')[1];
      source.srcset = imageSources[theme.value][format];
    });
    image.src = imageSources[theme.value].jpg;
  };
  const theme = {
    value: getColorPreference(),
  };
  reflectPreference();
  window.onload = () => {
    reflectPreference();
    document.getElementById('theme-toggle').addEventListener('click', onClick);
  };
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    theme.value = e.matches ? 'dark' : 'light';
    setPreference();
  });
  console.log('Theeme Toggler!');
};