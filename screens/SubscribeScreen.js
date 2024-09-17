import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import Button from "../components/Button";
import { validateEmail } from '../utils';

const fnSubscribe = () => {
	Alert.alert('Test', 'Msg test ');
};

const SubscribeScreen = () => {
	// Add subscribe screen code here
	const [email, onChangeEmail] = useState("");
	const isEmailValid = validateEmail(email);

	return (
		<View style={styles.container}>
			<Image
				style={styles.logo}
				source={require("./../assets/little-lemon-logo-grey.png")}
			/>
			<Text style={styles.regularText}>
				Suscribe to us newsletter for our
				latest delicious recipes!
			</Text>
			<TextInput
				style={styles.inputBox}
				value={email}
				onChangeText={onChangeEmail}
				placeholder={"email"}
				keyboardType={"email-address"}
			/>
			<Button
				onPress={() => {
					Alert.alert("Thanks for subscribing, stay tuned!");
				}}
				disabled={!isEmailValid}
				>
				Subscribe
			</Button>
		</View>
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
		width: 150,
		height: 200,
		resizeMode: "contain",
		alignSelf: "center",
	},
	inputBox: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		fontSize: 16,
		borderColor: "EDEFEE",
		backgroundColor: "#EDEFEE",
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

export default SubscribeScreen;
