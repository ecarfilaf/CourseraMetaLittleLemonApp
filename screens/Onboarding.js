import React, { useCallback, useContext, useState } from 'react';
import { Alert, Image, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
import Button from "../components/Button";
import { validateEmail, validateName, validateUserName } from '../utils/index.js';
import { AuthContext } from "../contexts/AuthContext.js";
import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen";

const Onboarding = ({ navigation }) => {
	const [fullName, setFullName] = useState("");
	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	let isEmailValid = validateEmail(email);
	let isNameValid = validateName(fullName);
	let isUserNameValid = validateUserName(userName);

	const { onboard } = useContext(AuthContext);

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
		<View style={styles.container}
			onLayout={onLayoutRootView}>
			<View style={styles.header}>
				<Image
					style={styles.logo}
					source={require("./../assets/img/logo.png")}
				/>
			</View>
			<View style={styles.body}>
				<ImageBackground source={require("./../assets/img/set-spices-herbs-left-back.png")} resizeMode="cover" style={styles.image}>
					<View style={styles.tittlesection}>
						<Text style={styles.marktittle}>
							Let us get to know you !!
						</Text>
					</View>
					<View style={styles.controlssection}>
						<Text style={styles.regularText}>
							Full Name
						</Text>
						<TextInput
							style={styles.inputBox}
							onChangeText={setFullName}
							placeholder={"full name"}
							value={fullName}
						/>
						<Text style={styles.regularText}>
							User Name
						</Text>
						<TextInput
							style={styles.inputBox}
							onChangeText={setUserName}
							placeholder={"user name"}
							value={userName}
						/>
						<Text style={styles.regularText}>
							Email
						</Text>
						<TextInput
							style={styles.inputBoxMail}
							onChangeText={emailText => {
								setEmail(emailText);
								isEmailValid = validateEmail(email);
							}}
							placeholder={"email"}
							keyboardType={"email-address"}
							value={email}
						/>
					</View>
					<View style={styles.buttonsection}>
						<Button
							onPress={() => onboard({fullName,userName,email})}
							disabled={(!isEmailValid || !isNameValid || !isUserNameValid)}
						>
							Next ->>
						</Button>
					</View>
				</ImageBackground>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		width: 400,
		backgroundColor: "#EDEFEE",
		textAlign: "center",
	},
	tittlesection: {
		height: 250,
		width: 350,
		justifyContent: 'center',
		alignItems: "center",
		backgroundColor: "#495E57",
		opacity: 0.75,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	controlssection: {
		height: 250,
		width: 350,
		justifyContent: 'center',
		alignItems: "center",
		backgroundColor: "#495E57",
		opacity: 0.75,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
	},
	buttonsection: {
		justifyContent: 'center',
		alignItems: "center",
		marginVertical: 10,
	},
	marktittle: {
		fontSize: 40,
		fontFamily: "MarkaziText-Medium",
		color: "#F4CE14",
	},
	regularText: {
		height: 20,
		fontSize: 20,
		fontFamily: "Karla-Medium",
		color: "#F4CE14",
	},
	logo: {
		marginTop: 15,
		width: 250,
		height: 100,
		resizeMode: "contain",
		alignSelf: "center",
	},
	body: {
		flex: 2,
		justifyContent: 'center',
		borderColor: "EDEFEE",
	},
	image: {
		flex: 1,
		justifyContent: 'center',
		alignItems: "center",
		padding: 10,
	},
	inputBox: {
		height: 40,
		width: 150,
		borderRadius: 10,
		fontSize: 18,
		fontFamily: "Karla-Medium",
		textAlign: "center",
		borderColor: "EDEFEE",
		backgroundColor: "#EDEFEE",
		marginVertical: 5,
	},
	inputBoxMail: {
		height: 40,
		width: 250,
		borderRadius: 10,
		fontSize: 18,
		fontFamily: "Karla-Medium",
		textAlign: "center",
		borderColor: "EDEFEE",
		backgroundColor: "#EDEFEE",
		marginVertical: 5,
	},
});

export default Onboarding;
