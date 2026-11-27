// Runs before the first paint (blocking, in <head>): marks that JavaScript works,
// and on the home page holds the panel closed so the entry plays without a flash.
// A file, not an inline script, so the Content-Security-Policy can forbid inline scripts.
document.documentElement.classList.remove('no-js');
if ((/^\/(index\.html)?$/.test(location.pathname) || /\/index\.html$/.test(location.pathname)) && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('pre-enter');
  setTimeout(() => document.documentElement.classList.remove('pre-enter'), 3000);
}
