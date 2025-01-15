import { useFonts } from "expo-font";
import * as React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";

const Button = ({ onPress, children, disabled, alter, remove }) => {
	// FONTS
	const [fontsLoaded] = useFonts({
		"Karla-Regular": require("../assets/fonts/Karla-Regular.ttf"),
		"Karla-Medium": require("../assets/fonts/Karla-Medium.ttf"),
		"Karla-Bold": require("../assets/fonts/Karla-Bold.ttf"),
		"Karla-ExtraBold": require("../assets/fonts/Karla-ExtraBold.ttf"),
		"MarkaziText-Regular": require("../assets/fonts/MarkaziText-Regular.ttf"),
		"MarkaziText-Medium": require("../assets/fonts/MarkaziText-Medium.ttf"),
	});

	const onLayoutRootView = React.useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<View onLayout={onLayoutRootView}>
		<Pressable
			onPress={onPress}
			style={[styles.buttonDefault, disabled && styles.disabled, alter && styles.buttonAlter, remove && styles.buttonRemove]}
			disabled={disabled}
		>
			<Text style={[styles.text, alter && styles.textAlter]}>{children}</Text>
		</Pressable></View>
	);
};

const styles = StyleSheet.create({
	buttonDefault: {
		borderRadius: 10,
		backgroundColor: '#F4CE14',
		borderColor: "#EDEFEE",
		flexDirection: 'row',
		justifyContent: 'center',
		padding: 5,
		paddingHorizontal: 20,
		//width: 250,
		alignItems: "center",
		borderWidth: 1,
		alignSelf: "center",
	},
	buttonAlter: {
		borderRadius: 10,
		backgroundColor: '#495E57',
		borderColor: "#EDEFEE",
		flexDirection: 'row',
		justifyContent: 'center',
		padding: 5,
		paddingHorizontal: 20,
		//width: 250,
		alignItems: "center",
		borderWidth: 1,
		alignSelf: "center",
	},
	buttonRemove: {
		borderRadius: 10,
		backgroundColor: '#EE9972',
		borderColor: "#FBDABB",
		flexDirection: 'row',
		justifyContent: 'center',
		padding: 5,
		paddingHorizontal: 20,
		//width: 250,
		alignItems: "center",
		borderWidth: 1,
		alignSelf: "center",
	},
	disabled: {
		backgroundColor: 'grey',
		color: '#495E57',
		opacity: 0.5,
	},
	text: {
		fontSize: 18,
		color: '#495E57',
		fontFamily: "Karla-Bold",
	},
	textAlter: {
		fontSize: 18,
		color: '#F4CE14',
	}
});

export default Button;
