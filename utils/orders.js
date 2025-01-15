import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setDish(data) {
	// console.log('Orders - setDish');
	try {
		const jsonValue = JSON.stringify(data);
		await AsyncStorage.setItem("selectedDish", jsonValue);
	} catch (e) {
		console.error('Error: Orders.js setDish' + e.toString());
	}
}

export async function readDish() {
	// console.log('Orders - readDish');
	try {
		return await AsyncStorage.getItem("selectedDish");
	} catch (e) {
		console.error('Error: Orders.js readDish' + e.toString());
	}
}

export async function removeDish() {
	// console.log('Orders - removeDish');
	try {
		await AsyncStorage.removeItem("selectedDish");
	} catch (e) {
		console.error('Error: Orders.js removeDish' + e.toString());
	}
}

export async function addOrderDish(data) {
	console.log('Orders - addOrderDish');
	try {
		// await removeOrder();
		let newOrder = {};
		const order = await readOrder();
		if (order != null) {
			newOrder = JSON.parse(order);
			// console.log('Orders - addOrderDish - newOrder');
			// console.log(newOrder);
			newOrder.dishes.push(data);
			newOrder.subtotal += Math.round(parseFloat(data.ammount)*100)/100.00;
			newOrder.total += Math.round(parseFloat(data.ammount)*100)/100.00;
		} else {
			newOrder = {
				dishes: [data],
				clutery: false,
				subtotal: Math.round(parseFloat(data.ammount)*100)/100.00,
				delivery: "2.00",
				service: "1.00",
				total: Math.round((parseFloat(data.ammount) + 3)*100)/100.00,
			};
		}
		// console.log('Orders - addOrderDish - newOrder');
		// console.log(newOrder);
		const jsonValue = JSON.stringify(newOrder);
		// console.log(jsonValue);
		await AsyncStorage.setItem("order", jsonValue);
	} catch (e) {
		console.error('Error: Orders.js addOrderDish' + e.toString());
	}
}

export async function updateOrderDish(data) {
	console.log('Orders - updateOrderDish');
	try {
		const jsonValue = JSON.stringify(data);
		await AsyncStorage.setItem("order", jsonValue);
	} catch (e) {
		console.error('Error: Orders.js updateOrderDish' + e.toString());
	}
}

export async function readOrder() {
	// console.log('Orders - readOrder');
	try {
		return await AsyncStorage.getItem("order");
	} catch (e) {
		console.error('Error: Orders.js readOrder' + e.toString());
	}
}

export async function removeOrder() {
	// console.log('Orders - removeOrder');
	try {
		await AsyncStorage.removeItem("order");
	} catch (e) {
		console.error('Error: Orders.js removeOrder' + e.toString());
	}
}