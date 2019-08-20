'use strict';

(function iifeMenu(document, window, undefined) {
	var menuBtn = document.querySelector('.menu__btn');
	var	menu = document.querySelector('.menu__list');

	function toggleMenu() {
		menu.classList.toggle('menu__list--active');
		menu.classList.toggle('menu__list--transition');
		this.classList.toggle('menu__btn--active');
		this.setAttribute(
			'aria-expanded',
			this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
		);
	}

	function removeMenuTransition() {
		this.classList.remove('menu__list--transition');
	}

	if (menuBtn && menu) {
		menuBtn.addEventListener('click', toggleMenu, false);
		menu.addEventListener('transitionend', removeMenuTransition, false);
	}
}(document, window));


function replyTo(parent, name) {
  var e = document.getElementById(parent),
      f = document.getElementById('comment-form'),
      h = document.getElementById('comment-form-header');

  h.innerHTML = 'Reply to ' + name;
  e.parentNode.insertBefore(f, e.nextSibling);
  document.getElementsByName('fields[reply_to]')[0].value=parent;
}