import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import NavBar from "../components/NavBar";
import { useFonts } from "expo-font";
import { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import DropDownList from "../components/DropDownList";
import { addOrderDish, readDish } from "../utils/orders";
import Button from "../components/Button";

const DetailDish = ({ navigation }) => {
	const [dish, setdish] = useState({
		name: "",
		price: "",
		description: "",
		image: "",
		avocado: 0,
		seeds: 0,
		dressing: 0,
		numdishes: 0,
		ammount: 0.00,
	});

	useEffect(() => {
		(async () => {
			const dish = await readDish();
			setdish(JSON.parse(dish));
		})();
	}, []);

	const addOrder = async () => {
		await addOrderDish(dish);
		navigation.navigate("PreOrder");
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

	const addItemDish = (item) => {
		if (item != 'numdishes') {
			setdish({ ...dish, [item]: dish[item] + 1, ammount: (dish.ammount + 1.00) });
		} else {
			setdish({ ...dish, [item]: dish[item] + 1, ammount: (parseFloat(dish.ammount) + parseFloat(dish.price)) });
		}
	}

	const delItemDish = (item) => {
		if (dish[item] > 0)

			if (item != 'numdishes') {
				setdish({ ...dish, [item]: dish[item] - 1, ammount: (dish.ammount - 1.00) });
			} else {
				setdish({ ...dish, [item]: dish[item] - 1, ammount: (parseFloat(dish.ammount) - parseFloat(dish.price)) });
			}
	}

	return (
		<View style={styles.container} onLayout={onLayoutRootView}>
			<View style={styles.header}>
				<NavBar navigation={navigation} />
			</View>
			<View style={styles.herosection}>
				<View style={styles.herosubsectionimg}>
					<Image
						style={styles.heroimg}
						source={{
							uri: `https://github.com/ecarfilaf/CourseraMetaLittleLemonApp/blob/master/assets/img/${dish.image}?raw=true`,
						}} />
				</View>
			</View>
			<View style={styles.tittleBar}>
				<Text style={styles.tittle}>{dish.name}</Text>
				<Text style={styles.tittle}>$ {dish.price}</Text>
			</View>
			<View style={styles.text}>
				<Text style={styles.textDesc}>{dish.description}</Text>
			</View>
			<View style={styles.delivery}>
				<Image style={styles.imgVan} source={require("../assets/img/deliveryVan.png")} />
				<Text style={styles.txtDelivery} >Delivery in 30 minutes</Text>
				<DropDownList />
			</View>
			<View style={styles.additions}>
				<Text style={styles.tittle}>Additions</Text>
				<View style={styles.addList}>
					<View style={styles.addItem}>
						<Text style={styles.textDesc}>Avocado</Text>
						<Text style={styles.textDesc}>$ 1.00</Text>
						<View style={styles.addItem}>
							<Pressable onPress={() => delItemDish('avocado')}>
								<Text style={styles.textDesc}> - </Text>
							</Pressable>
							<Text style={styles.tittle}> {dish.avocado} </Text>
							<Pressable onPress={() => addItemDish('avocado')}>
								<Text style={styles.textDesc}> + </Text>
							</Pressable>
						</View>
					</View>
					<View style={styles.addItem}>
						<Text style={styles.textDesc}>Seeds     </Text>
						<Text style={styles.textDesc}>$ 1.00</Text>
						<View style={styles.addItem}>
							<Pressable onPress={() => delItemDish('seeds')}>
								<Text style={styles.textDesc}> - </Text>
							</Pressable>
							<Text style={styles.tittle}> {dish.seeds} </Text>
							<Pressable onPress={() => addItemDish('seeds')}>
								<Text style={styles.textDesc}> + </Text>
							</Pressable>
						</View>
					</View>
					<View style={styles.addItem}>
						<Text style={styles.textDesc}>Dressing</Text>
						<Text style={styles.textDesc}>$ 1.00</Text>
						<View style={styles.addItem}>
							<Pressable onPress={() => delItemDish('dressing')}>
								<Text style={styles.textDesc}> - </Text>
							</Pressable>
							<Text style={styles.tittle}> {dish.dressing} </Text>
							<Pressable onPress={() => addItemDish('dressing')}>
								<Text style={styles.textDesc}> + </Text>
							</Pressable>
						</View>
					</View>
				</View>
				<View style={styles.addDish}>
					<Pressable onPress={() => delItemDish('numdishes')}>
						<Text style={styles.tittle}> - </Text>
					</Pressable>
					<Text style={styles.tittle}> {dish.numdishes} </Text>
					<Pressable onPress={() => addItemDish('numdishes')}>
						<Text style={styles.tittle}> + </Text>
					</Pressable>
				</View>
				<View style={styles.buttonsection}>
					<Button onPress={() => addOrder()} 
						disabled={(dish.ammount == 0) ? true : false}
					> Add for  $ {dish.ammount} </Button>
				</View>
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
	herosection: {
		textAlign: "center",
		// height: 400,
	},
	herosubsectionimg: {
		borderRadius: 25,
	},
	heroimg: {
		margin: 5,
		width: 460,
		height: 350,
		resizeMode: "cover",
		alignSelf: "center",
		borderRadius: 10,
		borderColor: "#333333",
		borderWidth: 1,
	},
	tittleBar: {
		flexDirection: "row",
		justifyContent: 'space-between',
		margin: 15,
	},
	tittle: {
		color: "#495E57",
		fontSize: 20,
		fontFamily: "Karla-Bold",
	},
	text: {
		margin: 15,
		fontFamily: "Karla-Medium",
		color: "#495E57",
		fontSize: 20,
	},
	textDesc: {
		fontFamily: "Karla-Medium",
		color: "#495E57",
		fontSize: 20,
	},
	delivery: {
		flexDirection: "row",
		justifyContent: 'space-between',
		margin: 10,
	},
	imgVan: {
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
	additions: {
		margin: 10,
	},
	addList: {
		marginLeft: 10,
		justifyContent: 'space-between',
		flexDirection: "column",
	},
	addItem: {
		marginLeft: 10,
		justifyContent: 'space-between',
		flexDirection: "row",
	},
	addDish: {
		flexDirection: "row",
		justifyContent: 'space-between',
		marginTop: 40,
		marginBottom: 30,
		marginLeft: 100,
		marginRight: 100,
	},
	buttonsection: {
		justifyContent: 'center',
		alignItems: "center",
		marginVertical: 10,
	},
});

export default DetailDish;