import React, { useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';

const NavBar = ({ navigation }) => {
	const [state, setState] = useState("");

	const { routes, index } = navigation.getState();
	// console.log(routes);
	// console.log(index);
	// console.log(routes[index].name)

	return (
		<View style={styles.container}>
			<View style={styles.menu}>
				<Pressable onPress={() => {
					if (routes[index].name == 'Profile'){
						navigation.navigate('Home');
					}
				}}>
					<Image
						style={styles.menuimg} source={require("./../assets/img/Button_Arrow.png")} />
				</Pressable>
			</View>
			<View style={styles.image}>
				<Image
					style={styles.logo}
					source={require("./../assets/img/logo.png")}
				/>
			</View>
			<View style={styles.user}>
				<Pressable onPress={() => {
					navigation.navigate('Profile')
				}}>
					<Image
						style={styles.usrimg} source={require("./../assets/img/Profile.png")} />
				</Pressable>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#EDEFEE",
		flexDirection: 'row',
		textAlign: "center",
		marginTop: 20,
		justifyContent: 'space-between',
		borderColor: "#333333",
		borderWidth: 0,
	},
	menu: {
		margin: 20,
		textAlign: "center",
	},
	menuimg: {
		width: 40,
		height: 40,
		textAlign: "center",
		borderRadius: 10,
	},
	image: {
		textAlign: "center",
	},
	logo: {
		width: 200,
		height: 80,
		resizeMode: "contain",
		alignSelf: "center",
	},
	user: {
		margin: 20,
		justifyContent: "center",
		resizeMode: "contain",
	},
	usrimg: {
		width: 50,
		height: 50,
		textAlign: "center",
		resizeMode: "contain",
		alignSelf: "center",
		borderRadius: 40,
	},
});

export default NavBar;
