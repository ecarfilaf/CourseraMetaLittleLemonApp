import { Image, StyleSheet, Text, View } from "react-native";
import NavBar from "../components/NavBar";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";

const DetailDish = ({ navigation, name, price, description, image }) => {

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
			<View style={styles.herosection}>
				<View style={styles.herosubsectionimg}>
					<Image
						style={styles.heroimg} 
						source={{
							uri: `https://github.com/ecarfilaf/CourseraMetaLittleLemonApp/blob/master/assets/img/${image}?raw=true`,
						}} />
				</View>
			</View>
				<View style={styles.tittle}>
					<Text> {name}</Text>
				</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		overflow: 'scroll',
	},
	header: {
		//backgroundColor: "#EDEFEE",
		textAlign: "center",
		height: 120,
	},
	herosection: {
		backgroundColor: "#495E57",
		textAlign: "center",
		height: 400,
		//justifyContent: 'space-between',
		borderColor: "#333333",
		borderWidth: 0,
	},
	herosubsectionimg: {
		borderRadius: 25,
	},
	heroimg: {
		marginTop: 10,
		marginRight: 15,
		width: 50,
		height: 50,
		resizeMode: "cover",
		alignSelf: "center",
		borderRadius: 10,
	},
	tittle: {
		marginTop: 10,
		color: "#333333",
	},
});

export default DetailDish;