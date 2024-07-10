'use strict';

// Страница «Вход и регистрация»:

class UserForm {
	constructor() {
		this.loginFormCallback = null;
		this.registerFormCallback = null;
	};

	setLoginErrorMessage(message) {
		this.loginErrorMessage = message;
	};

	setRegisterErrorMessage(message) {
		this.registerErrorMessage = message;
	};

	loginFormAction() {
		// Обработчик события сабмита формы авторизации
	};

	registerFormAction() {
		// Обработчик события сабмита формы регистрации
	};

	getData(form) {
		return form.elements;
	};
};

const userForm = new UserForm();
userForm.loginFormCallback = function(data) {
	ApiConnector.login(data, response => {
		console.log(response);

		if (response.success) {
			location.reload();
		} else {
			userForm.setLoginErrorMessage('Ошибка авторизации');
		};
	});
};

userForm.registerFormCallback = function(data) {
	ApiConnector.register(data, response => {
		console.log(response);

		if (response.success) {
			location.reload();
		} else {
			userForm.setRegisterErrorMessage('Ошибка регистрации');
		};
	});
};