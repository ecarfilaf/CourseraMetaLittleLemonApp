import { useFonts } from "expo-font";
import { useCallback, useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import NavBar from "../components/NavBar";
import DropDownList from "../components/DropDownList";
import Button from "../components/Button";
import * as SplashScreen from "expo-splash-screen";
import { CheckBox } from '@rneui/themed';
import { readOrder, removeOrder, updateOrderDish } from "../utils/orders";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const PreOrder = ({ navigation }) => {
	const [order, setOrder] = useState({
		dishes: [],
		clutery: false,
		subtotal: 0.00,
		delivery: "2.00",
		service: "1.00",
		total: 0.00,
	});

	const updateOrder = (key, value) => {
		setOrder((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};

	useEffect(() => {
		(async () => {
			const order = await readOrder();
			if (order != null) setOrder(JSON.parse(order));
		})();
	}, []);

	const removeDish = (index) => {
		const newDishes = order.dishes.filter((dish, i) => i !== index);
		setOrder({ ...order, 
			dishes: newDishes,
			subtotal : (order.subtotal - order.dishes[index].ammount) > 0 ? (order.subtotal - order.dishes[index].ammount) : 0.00,
			total: (order.total - order.dishes[index].ammount > 0 ? (order.total - order.dishes[index].ammount) : 0.00),
		 });
		updateOrderDish(order);
	}

	const Checkout = async () => {
		console.log("Checkout");
		await removeOrder();
		navigation.navigate("Home");
	}

	// FONTS
	const [fontsLoaded] = useFonts({
		"Karla-Regular": require("../assets/fonts/Karla-Regular.ttf"),
		"Karla-Medium": require("../assets/fonts/Karla-Medium.ttf"),
		"Karla-Bold": require("../assets/fonts/Karla-Bold.ttf"),
		"Karla-ExtraBold": require("../assets/fonts/Karla-ExtraBold.ttf"),
		"MarkaziText-Regular": require("../assets/fonts/MarkaziText-Regular.ttf"),
		"MarkaziText-Medium": require("../assets/fonts/MarkaziText-Medium.ttf"),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<View style={styles.container} onLayout={onLayoutRootView}>
			<View style={styles.header}>
				<NavBar navigation={navigation} />
			</View>
			<View style={styles.delivery}>
				<Image style={styles.imgVan} source={require("../assets/img/deliveryVan.png")} />
				<Text style={styles.txtDelivery} >Delivery in 30 minutes</Text>
				<View style={styles.ddl}>
					<DropDownList />
				</View>
			</View>
			<View style={styles.clutery} >
				<Text style={styles.subtittle}>Clutery</Text>
				<View style={styles.cluteryitems} >
					<Text style={styles.cluterytext}>Help reduce plastic waste, {"\n"}only ask for clutery if you need it.</Text>
					<CheckBox title=""
						containerStyle={styles.checkbox}
						fontFamily={"Karla-Medium"}
						checked={order.clutery}
						onPress={() => updateOrder("clutery", !order.clutery)}
						uncheckedColor={"#333333"}
						checkedColor={"#495E57"}
					/>
				</View>
			</View>
			<View style={styles.line} ></View>
			<View style={styles.ordersumary}>
				<Text style={styles.tittle}>Order Summary</Text>
				<Text style={styles.subtittle}>Items</Text>
				<View>
					{order.dishes.map((dish, index) => (
						<View key={index} style={styles.listitems}>
							<View style={styles.listsubitems}>
								<Text style={styles.subtittle}>{dish.numdishes} x </Text>
								<Text style={styles.subtittle}>{dish.name}
									{dish.avocado > 0 ? "\n + Avocado" : ""}
									{dish.seeds > 0 ? "\n + Seeds" : ""}
									{dish.dressing > 0 ? "\n + Dressing" : ""}
								</Text>
							</View>
							<View style={styles.listsubitems}>
								<Text style={styles.subtittle}> $ {dish.ammount.toFixed(2)} </Text>
								<MaterialIcons name="delete" size={24} color="#495E57" onPress={ () =>{
									removeDish(index);
								 }
								}
								/>
							</View>
						</View>
					))}
				</View>
			</View>
			<View style={styles.line} ></View>
			<View style={styles.addorder}>
				<Text style={styles.subtittle}>Add More To Your Order !</Text>
				<View>
					<Pressable onPress={() => console.log("Add More")} >
						<Text>Add More</Text>
					</Pressable>
				</View>
			</View>
			<View style={styles.sumary} >
				<View style={styles.sumaryitems} >
					<Text style={styles.tittle}>Subtotal</Text>
					<Text style={styles.subtittle}>$ {order.subtotal.toFixed(2)}</Text>
				</View>
				<View style={styles.sumaryitems} >
					<Text style={styles.subtittle}>Delivery</Text>
					<Text style={styles.subtittle}>$ {order.delivery}</Text>
				</View>
				<View style={styles.sumaryitems} >
					<Text style={styles.subtittle}>Service</Text>
					<Text style={styles.subtittle}>$ {order.service}</Text>
				</View>
				<View style={styles.sumaryitems} >
					<Text style={styles.tittle}>Total</Text>
					<Text style={styles.subtittle}>$ {order.total.toFixed(2)}</Text>
				</View>
				<View style={styles.line} ></View>
			</View>
			<View style={styles.buttonsection}>
				<Button onPress={() => Checkout()} > Checkout </Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// overflow: 'scroll',
		//justifyContent: 'space-between',
		// borderColor: "#333333",
		// borderWidth: 1,
	},
	header: {
		textAlign: "center",
		height: 120,
	},
	delivery: {
		flexDirection: "row",
		justifyContent: 'space-between',
		borderBottomColor: "#495E57",
		borderBottomWidth: 1,
		paddingBottom: 15,
	},
	imgVan: {
		marginLeft: 15,
		resizeMode: "contain",
		height: 50,
		width: 50,
	},
	txtDelivery: {
		fontFamily: "Karla-Medium",
		color: "#495E57",
		fontSize: 20,
		margin: 10,
	},
	ddl: {
		marginRight: 15,
	},
	tittle: {
		fontFamily: "Karla-Bold",
		color: "#333333",
		fontSize: 24,
	},
	subtittle: {
		fontFamily: "Karla-Bold",
		color: "#333333",
		fontSize: 20,
	},
	clutery: {
		margin: 15,
	},
	cluterytext: {
		fontFamily: "Karla-Regular",
		color: "#333333",
		fontSize: 18,
	},
	cluteryitems: {
		flexDirection: "row",
		// justifyContent: 'space-between',
	},
	checkbox: {
		backgroundColor: "#EDEFEE",
	},
	line: {
		borderBottomColor: "#333333",
		borderBottomWidth: 1,
	},
	ordersumary: {
		margin: 10,
	},
	sumary: {
		margin: 20,
	},
	listitems: {
		marginTop: 3,
		marginBottom: 3,
		marginLeft: 15,
		marginRight: 20,
		flexDirection: "row",
		justifyContent: 'space-between',
	},
	listsubitems: {
		flexDirection: "row",
		justifyContent: 'space-between',
	},
	addorder: {
		margin: 10,
	},
	sumaryitems: {
		flexDirection: "row",
		justifyContent: 'space-between',
		marginRight: 20,
		marginTop: 5,
		marginBottom: 5,
	},
	buttonsection: {
		justifyContent: 'center',
		alignItems: "center",
		marginVertical: 15,
	},
});

export default PreOrder;