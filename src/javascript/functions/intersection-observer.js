export const interSectionObserver = () => {
  const header = document.querySelector('.header');
  const scrollWatcher = document.createElement('div');

  scrollWatcher.setAttribute('data-scroll-watcher', '');
  header.before(scrollWatcher);

  const navObserver = new IntersectionObserver((entries) => {
    header.classList.toggle('header--sticking', !entries[0].isIntersecting);
  }, {rootMargin: '10px 0px 0px 0px'});

  navObserver.observe(scrollWatcher);
}