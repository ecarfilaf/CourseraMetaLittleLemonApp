import * as React from "react";
import { Button, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const WelcomeScreen = ({ navigation }) => {
	// Add welcome screen code here.
	return (
	<ScrollView indicatorStyle="white" style={styles.container}>
		<Image
			style={styles.logo}
			source={require("./../assets/little-lemon-logo.png")}
		/>
		<Text style={styles.regularText}>
			Little Lemon, your local Mediterranean Bistro
		</Text>
		<Pressable
			style={styles.button}
			onPress={() => navigation.navigate('Subscribe')}
		>
			<Text style={styles.buttonText}>Newsletter</Text>
		</Pressable>
	</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerText: {
		padding: 40,
		fontSize: 30,
		color: "#EDEFEE",
		textAlign: "center",
	},
	regularText: {
		fontSize: 24,
		padding: 20,
		marginVertical: 10,
		color: "black",
		textAlign: "center",
	},
	logo: {
		marginTop: 30,
		width: 300,
		height: 450,
		resizeMode: "contain",
		alignSelf: "center",
	},
	button: {
		fontSize: 18,
		padding: 10,
		marginVertical: 100,
		margin: 50,
		backgroundColor: "#0b5345",
		borderColor: "#0b5345",
		borderWidth: 2,
		borderRadius: 10,
	},
	buttonText: {
		color: "white",
		textAlign: "center",
		fontSize: 24,
	},
});

export default WelcomeScreen;
