import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, Image, StyleSheet, Text, TextInput, Pressable, ScrollView, Alert } from "react-native";
import { validateEmail, validateName, validatePhoneNumber, validateUserName } from '../utils/index.js';
import { AuthContext } from "../contexts/AuthContext.js";
import { CheckBox } from '@rneui/themed';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import NavBar from '../components/NavBar.js';
import Button from "../components/Button.js";

const Profile = ({ navigation }) => {
	const [profile, setProfile] = useState({
		fullName: "",
		userName: "",
		email: "",
		phonenumber: "",
		orderStatuses: false,
		passwordChanges: false,
		specialOffers: false,
		newsletter: false,
		image: "",
	});
	const [discard, setDiscard] = useState(false);
	const [isValidPhone, setValidPhone] = useState();

	const validatePhone = (number) => {
		var regex = /^\+?([0-9]{1,3})?[-. ]?(\(?[0-9]{1,4}\)?)?[-. ]?([0-9]{1,4})[-. ]?([0-9]{1,4})[-. ]?([0-9]{2,9})$/;
		if (regex.test(number)) {
			setValidPhone(true);
		}
		else {
			setValidPhone(false);
		}
	};

	useEffect(() => {
		(async () => {
			try {
				const getProfile = await AsyncStorage.getItem("profile");
				//console.log(getProfile);
				setProfile(JSON.parse(getProfile));
				setDiscard(false);
			} catch (e) {
				console.error(e);
			}
		})();
	}, [discard]);

	const { update } = useContext(AuthContext);
	const { logout } = useContext(AuthContext);

	const updateProfile = (key, value) => {
		setProfile((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};

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
	};

	const getIsFormValid = () => {
		return (
			validateName(profile.fullName) &&
			validateUserName(profile.userName) &&
			validateEmail(profile.email) &&
			// validatePhoneNumber(profile.phonenumber)
			isValidPhone
		);
	};

	const saveImage = async (uri, nameImage) => {
		const url = "./assets/uploads/";
		const response = await saveAsync(
			url || nameImage,
			{ compress: 1, format: SaveFormat.PNG }
		);
		console.log(response);
	};

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ['images', 'videos'],
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			//console.log(result);
			setProfile((prevState) => ({
				...prevState,
				["image"]: result.assets[0].uri,
			}));
			saveImage(result.assets[0].uri,result.assets[0].fileName);
		}
	};

	const removeImage = () => {
		setProfile((prevState) => ({
			...prevState,
			["image"]: "",
		}));
		//console.log(profile);
	};

	return (
		<ScrollView indicatorStyle="white" style={styles.container}
			onLayout={onLayoutRootView}>
			<View style={styles.header}>
				<NavBar navigation={navigation} />
			</View>
			<View style={styles.body}>
				<Text style={styles.sectiontittle}>
					Personal Information
				</Text>
				<View style={styles.sectionavatar}>
					{/* <Image style={styles.avatar} source={require(profile.image)} /> */}
					<Image style={styles.avatar} source={require("./../assets/img/noavatar.jpg")} />
					<Button alter={true} onPress={pickImage} > Change </Button>
					<Button remove={true} onPress={removeImage} > Remove </Button>
				</View>
				<Text style={styles.regularText}>
					Full Name
				</Text>
				<TextInput
					style={styles.input}
					value={profile.fullName}
					onChangeText={(newValue) => updateProfile("fullName", newValue)}
					placeholder={"full name"}
				/>
				<Text style={styles.regularText}>
					User Name
				</Text>
				<TextInput
					style={styles.input}
					value={profile.userName}
					onChangeText={(newValue) => updateProfile("userName", newValue)}
					placeholder={"user name"}
				/>
				<Text style={styles.regularText}>
					Email
				</Text>
				<TextInput
					style={styles.inputMail}
					value={profile.email}
					onChangeText={(newValue) => updateProfile("email", newValue)}
					placeholder={"email"}
					keyboardType={"email-address"}
				/>
				<Text style={styles.regularText}>
					Phone Number
				</Text>
				<TextInput
					style={styles.input}
					value={profile.phonenumber}
					onChangeText={
						(newValue) => {
							updateProfile("phonenumber", newValue);
							validatePhone(newValue);
						}}
					placeholder={"phone number"}
				/>
				<View
					style={styles.checkboxes}>
					<Text style={styles.sectiontittle}>
						Email Notifications
					</Text>
					<View style={styles.checkboxform}>
						<CheckBox title="Order Status"
							containerStyle={styles.checkbox}
							fontFamily={"Karla-Medium"}
							checked={profile.orderStatuses}
							onPress={() => updateProfile("orderStatuses", !profile.orderStatuses)}
							uncheckedColor={"#333333"}
							checkedColor={"#495E57"}
						/>
						<CheckBox title="Password Changes"
							containerStyle={styles.checkbox}
							fontFamily={"Karla-Medium"}
							checked={profile.passwordChanges}
							onPress={() => updateProfile("passwordChanges", !profile.passwordChanges)}
							uncheckedColor={"#333333"}
							checkedColor={"#495E57"}
						/>
						<CheckBox title="Special Offers"
							containerStyle={styles.checkbox}
							fontFamily={"Karla-Medium"}
							checked={profile.specialOffers}
							onPress={() => updateProfile("specialOffers", !profile.specialOffers)}
							uncheckedColor={"#333333"}
							checkedColor={"#495E57"}
						/>
						<CheckBox title="Newsletter"
							containerStyle={styles.checkbox}
							fontFamily={"Karla-Medium"}
							checked={profile.newsletter}
							onPress={() => updateProfile("newsletter", !profile.newsletter)}
							uncheckedColor={"#333333"}
							checkedColor={"#495E57"}
						/>
					</View>
				</View>
				<View style={styles.logoutsection}>
					<Button
						onPress={() => logout()}
					> Logout </Button>
				</View>
				<View style={styles.buttonsection}>
					<Button alter={true}
						onPress={() => update(profile)}
						disabled={!getIsFormValid()}
					>
						Save Changes
					</Button>
					<Button remove={true}
						onPress={() => setDiscard(true)} >
						Discard Changes
					</Button>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#EDEFEE",
		borderColor: "EDEFEE",
		borderWidth: 0,
	},
	header: {
		textAlign: "center",
		height: 120,
	},
	body: {
		paddingLeft: 10,
		textAlign: "left",
	},
	sectiontittle: {
		fontSize: 20,
		padding: 10,
		color: "black",
		textAlign: "left",
		fontFamily: "Karla-ExtraBold",
	},
	sectionavatar: {
		fontSize: 20,
		padding: 10,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	avatar: {
		width: 100,
		height: 100,
		textAlign: "center",
		resizeMode: "contain",
		alignSelf: "center",
		borderRadius: 50,
	},
	regularText: {
		height: 20,
		fontSize: 16,
		fontFamily: "Karla-Bold",
		marginTop: 10,
	},
	input: {
		height: 40,
		width: 350,
		borderRadius: 10,
		fontSize: 16,
		fontFamily: "Karla-Medium",
		textAlign: "left",
		backgroundColor: "#EDEFEE",
		color: "#333333",
		marginVertical: 5,
		borderColor: "EDEFEE",
		borderWidth: 1,
		padding: 10,
	},
	inputMail: {
		height: 40,
		width: 350,
		borderRadius: 10,
		fontSize: 16,
		fontFamily: "Karla-Medium",
		textAlign: "left",
		borderColor: "#333333",
		borderWidth: 1,
		backgroundColor: "#EDEFEE",
		marginVertical: 5,
		padding: 10,
	},
	checkbox: {
		backgroundColor: "#EDEFEE",
	},
	checkboxform: {
		margin: 0,
		padding: 0,
		flexDirection: "column",
		backgroundColor: "#EDEFEE",
	},
	buttonsection: {
		marginTop: 15,
		marginBottom: 30,
		margin: 25,
		justifyContent: "space-between",
		flexDirection: "row",
	},
});

export default Profile;