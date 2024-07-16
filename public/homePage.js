// Выход из личного кабинета

const logoutButton = new LogoutButton();

logoutButton.action = function() {
	ApiConnector.logout(response => {
		console.log(response);

		if (response.success) {
			location.reload();
		} else {
			console.error('Logout failed: ', response.error);
		};
	});
};

// Получение информации о пользователе
ApiConnector.current(response => {
	console.log(response);

	if (response.success) {
		ProfileWidget.showProfile(response.data);
	} else {
		console.error('Current user info failed: ', response.error);
	};
});

// Получение текущих курсов валюты

const ratesBoard = new RatesBoard();

function updateRates() {
	ApiConnector.getStocks(response => {
		console.log(response);

		if (response.success) {
			ratesBoard.clearTable();
			ratesBoard.fillTable(response.data);
		} else {
			console.error('Failed to get exchange rates: ', response.error);
		};
	});
};
updateRates();
setInterval(updateRates, 60000);

// Операции с деньгами

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function(data) {
	ApiConnector.addMoney(data, (response) => {
		console.log(response);

		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, "Баланс успешно пополнен!");
		} else {
			moneyManager.setMessage(false, response.error);
		};
	});
};

moneyManager.conversionMoneyCallback = function(data) {
	ApiConnector.convertMoney(data, (response) => {
		console.log(response);

		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, "Конвертация успешно выполнена!");
		} else {
			moneyManager.setMessage(false, response.error);
		};
	});
};

moneyManager.sendMoneyCallback = function(data) {
	ApiConnector.transferMoney(data, (response) => {
		console.log(response);

		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(true, "Перевод успешно выполнен!");
		} else {
			moneyManager.setMessage(false, response.error);
		};
	});
};

// Работа с избранным

const favoritesWidget = new FavoritesWidget();

function updateFavorites() {
	ApiConnector.getFavorites(response => {
		console.log(response);

		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
		} else {
			console.error(response.error);
			favoritesWidget.setMessage(false, response.error);
		};
	});
};
updateFavorites();

favoritesWidget.addUserCallback = function(data) {
	ApiConnector.addUserToFavorites(data, (response) => {
		console.log(response);

		if (response.success) {
			favoritesWidget.setMessage(true, "Пользователь успешно добавлен в избранное!");
			updateFavorites();
		} else {
			favoritesWidget.setMessage(false, response.error);
		};
	});
};

favoritesWidget.removeUserCallback = function(id) {
	ApiConnector.removeUserFromFavorites(id, (response) => {
		console.log(response);

		if (response.success) {
			favoritesWidget.setMessage(true, "Пользователь успешно удален из избранного!");
			updateFavorites();
		} else {
			favoritesWidget.setMessage(false, response.error);
		};
	});
};