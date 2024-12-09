import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

const SplashScreen = () => {
	return (
		<View style={styles.container}>
			<Image
				style={styles.logo}
				source={require("./../assets/little-lemon-logo.png")}
			/>
			<Text style={styles.regularText}>
				Loading ...
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
		alignItems: "center",
	},
	logo: {
		height: 400,
		width: "90%",
		resizeMode: "contain",
	},	
	regularText: {
		fontSize: 24,
		padding: 20,
		marginVertical: 10,
		color: "black",
		textAlign: "center",
	},
});

export default SplashScreen;