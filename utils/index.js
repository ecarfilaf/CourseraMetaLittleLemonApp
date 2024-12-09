export const validateEmail = (email) => {
	return email.match(
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);
};

export const validateName = name => {
	return name.match(/^[a-zA-ZñÑ ]+$/);
};

export const validateUserName = name => {
	return name.match(/^[a-zA-Z]+$/);
};

export const validatePhoneNumber = number => {
	var regex = /^\+?([0-9]{1,3})?[-. ]?(\(?[0-9]{1,4}\)?)?[-. ]?([0-9]{1,4})[-. ]?([0-9]{1,4})[-. ]?([0-9]{2,9})$/;
	return regex.test(number);
};
