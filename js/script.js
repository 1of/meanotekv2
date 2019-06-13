document.addEventListener('click', close);
document.addEventListener('scroll', stickyNav);

$('#send-mail-modal').on('show.bs.modal', function (event) {
	var dataset = event.relatedTarget.dataset;
	var form = this.querySelector('#send-mail');
	var title = form.querySelector('.modal-title');
	var elems = form.querySelectorAll('.form-control');

	form.dataset.whatever = dataset.whatever;

	if (dataset.modalType == 'phone') {
		title.textContent = 'Укажите свои контакты а также удобные время и способ связи';
		for (var i = 0; i < elems.length; i++) {
			if (/name|phone|email|time|message/.test(elems[i].name)) {
				elems[i].parentElement.style.display = '';
			} else {
				elems[i].parentElement.style.display = 'none';
			}
		}
	} else {
		title.textContent = 'Пожалуйста заполните форму для получения информации';
		for (var i = 0; i < elems.length; i++) {
			if (/phone|time/.test(elems[i].name)) {
				elems[i].parentElement.style.display = 'none';
			} else {
				elems[i].parentElement.style.display = '';
			}
		}
	}
});

$('#send-mail-modal').on('hidden.bs.modal', function () {
	resetForm(this.querySelector('#send-mail'), true);
});

$('#send-mail-modal').on('focus', function () {
	this.querySelector('.form-group:not([style$="none;"]) input').focus();
});

$('#modal-msg').on('focus', function () {
	this.querySelector('.btn').focus();
});

stickyNav();

function close() {
	var video1 = document.getElementById('video_inner1');
	var video2 = document.getElementById('video_inner2');

	if (video1 && video1.style.display != 'none') showVideo('video_inner1');
	if (video2 && video2.style.display != 'none') showVideo('video_inner2');
}

function isIE() {
	return /trident/i.test(navigator.userAgent);
}

function stickyNav() {
	var header = document.getElementById('header');

	if (pageYOffset > header.scrollTop) {
		header.classList.add('sticky');
	} else {
		header.classList.remove('sticky');
	}
}

function showPost(id) {
	var parent = document.getElementById(id);

	parent.querySelector('.post-full').classList.remove('hide');
	parent.querySelector('.post-more').style.display = 'none';
}

function toggleNavigation() {
	var nav = document.getElementById('mobile_nav');
	var mobileNav = document.getElementById('nav_toggle');

	nav.classList.toggle('hide');
	mobileNav.classList.toggle('open');
}

function showVideo(id, event) {
	if (typeof event == 'object') event.stopPropagation();

	var video = document.getElementById(id);

	if (video.style.display == 'none') video.querySelector('video').play();
	else video.querySelector('video').load();

	toggle(id);
}

function toggle(id) {
	var el = document.getElementById(id);

	if (el.style.display == 'none') el.style.display = 'block';
	else el.style.display = 'none';
}

function switchProject(panelId, tabPaneId, tabId) {
	var parent = document.getElementById(panelId);
	var tabs = parent.querySelectorAll('.tabs-item');
	var panels = parent.querySelectorAll('.tab-pane');

	Array.prototype.forEach.call(tabs, function(item) {
		if (~item.className.indexOf('active')) item.classList.remove('active');
	});

	Array.prototype.forEach.call(panels, function(item) {
		if (~item.className.indexOf('active')) item.classList.remove('active');
	});

	parent.querySelector(tabPaneId).classList.add('active');
	parent.querySelector(tabId).classList.add('active');
}



/*
========================================
============ Проверка формы ============
========================================
*/
var regName = /^([a-z]{2,64}( [a-z]{2,64})?)$|^([а-яё]{2,64}( [а-яё]{2,64})?)$/i;
var regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i;

function checkField(formGroup, bool, txt) {
	var glyphicon = formGroup.querySelector('.form-control-feedback');
	var errOut = formGroup.querySelector('.error-info');

	if (bool) {
		formGroup.className = 'form-group has-feedback has-success';
		glyphicon.className = 'fa form-control-feedback fa-check';
	} else {
		formGroup.className = 'form-group has-feedback has-error';
		glyphicon.className = 'fa form-control-feedback fa-times';
		errOut.textContent = txt;
	}
}

function checkName() {
	var parent = this.parentElement;

	if (this.value.trim() == '') {
		checkField(parent, false, 'Поле "Имя" не должно быть пустым');
	} else if (this.value.length < 2 || 64 < this.value.length) {
		checkField(parent, false, 'Длина "Имени" должна быть от 2 до 64 символов');
	} else if (!regName.test(this.value)) {
		checkField(parent, false, 'Имя должно включать только русские или английские символы');
	} else {
		checkField(parent, true);
	}
}

function checkEmail() {
	var parent = this.parentElement;

	if (this.value.trim() == '') {
		checkField(parent, false, 'Поле "E-mail" не должно быть пустым');
	} else if (!regEmail.test(this.value)) {
		checkField(parent, false, 'Введенный Вами Email невалидный, пожалуйста проверьте');
	} else {
		checkField(parent, true);
	}
}

function resetForm(form, bool, txt) {
	var submit = form.elements.submit;
	var spinner = form.querySelector('.spinner');
	var validate = form.querySelectorAll('.has-feedback');
	var errMsg = form.querySelector('.alert');

	spinner.classList.add('hide');
	submit.disabled = false;

	if (bool) {
		setTimeout(function() {
			form.reset();
			Array.prototype.forEach.call(validate, function(item) {
				item.classList.remove('has-feedback', 'has-success', 'has-error');
			});
		}, 3000);
	} else {
		errMsg.classList.remove('hide');
		errMsg.textContent = txt;
	}
}

function sendMail(event, id) {
	event.preventDefault();

	try {
		goog_report_conversion();
	} catch(e) {
		console.log(e.message);
	}

	var isValid = false;
	var form = document.getElementById(id);
	var phone = form.elements.phone;
	var time = form.elements.time;
	var name = form.elements.name;
	var email = form.elements.email;
	var msg = form.elements.message;
	var website = form.elements.website;
	var textType = form.elements.textType;
	var submit = form.elements.submit;
	var spinner = form.querySelector('.spinner');
	var errMsg = form.querySelector('.alert');

	if (isVisible(name.parentElement)) {
		if (regName.test(name.value)) isValid = true;
		else checkName.call(name);
	}

	if (isVisible(email.parentElement)) {
		if (regEmail.test(email.value)) isValid = true;
		else {
			checkEmail.call(email);
			isValid = false;
		}
	}

	console.log(isValid);
	errMsg.classList.add('hide');

	if (isValid) {
		spinner.classList.remove('hide');
		errMsg.classList.add('hide');
		submit.disabled = true;

		var data = {
			name: name.value,
			email: email.value,
			whatever: form.dataset.whatever
		};

		if (phone && phone.value.trim() != '') data.phone = phone.value;
		if (time && time.value.trim() != '') data.time = time.value;
		if (msg && msg.value.trim() != '') data.message = msg.value;
		if (textType) data.textType = textType.value;
		if (website && website.value.trim() != '') data.website = website.value;

		var xhr = new XMLHttpRequest();
		xhr.formElement = form;
		xhr.onreadystatechange = onReady;
		xhr.open('POST', '/sendmail', true);
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(objToURI(data));
	}
}

function onReady() {
	if (this.readyState != 4) return;

	if (this.status != 200) {
		console.log(this.status, this.statusText);
		resetForm(this.formElement, false, 'Ошибка при отправке');
		return;
	}

	console.log(this.responseText);
	var result = JSON.parse(this.responseText);

	if (!result['success']) {
		resetForm(this.formElement, false, result['msg']);
		return;
	}

	resetForm(this.formElement, true);

	if ($('#send-mail-modal').length && $('#send-mail-modal').hasClass('in')) {
		$('#send-mail-modal').on('hidden.bs.modal', function () {
			$('#modal-msg').modal('show');
			$('#send-mail-modal').off('hidden.bs.modal');
		});
		$('#send-mail-modal').modal('hide');
	} else $('#modal-msg').modal('show');
}

function objToURI(obj) {
	var uri = '';

	for (var key in obj) {
		uri += key + '=' + encodeURIComponent(obj[key]) + '&';
	}

	return uri.slice(0,-1);
}

function isVisible(el) {
	return el.style.display != 'none';
}
