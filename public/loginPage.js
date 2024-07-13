'use strict';

// Страница «Вход и регистрация»:

const userForm = new UserForm();
userForm.loginFormCallback = function(data) {
	ApiConnector.login(data, response => {
		console.log(response);

		if (response.success) {
			location.reload();
		} else {
			console.log(response.error);
			userForm.setLoginErrorMessage(response.error);
		};
	});
};

userForm.registerFormCallback = function(data) {
	ApiConnector.register(data, response => {
		console.log(response);

		if (response.success) {
			location.reload();
		} else {
			console.log(response.error);
			userForm.setRegisterErrorMessage(response.error);
		};
	});
};