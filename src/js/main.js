document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.header__navigation-button').addEventListener('click', function() {
    document.querySelector('.login').classList.add('show')
  });

  document.querySelector('.backdrop').addEventListener('click', removeClass);
  document.querySelector('.login__popup-close').addEventListener('click', removeClass);

  function removeClass() {
    document.querySelector('.login').classList.remove('show');
  };
}, false);