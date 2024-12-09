import * as React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

const Button = ({ onPress, children, disabled, alter, remove }) => {
	return (
		<Pressable
			onPress={onPress}
			style={[styles.buttonDefault, disabled && styles.disabled, alter && styles.buttonAlter, remove && styles.buttonRemove]}
			disabled={disabled}
		>
			<Text style={[styles.text, alter && styles.textAlter]}>{children}</Text>
		</Pressable>
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
	},
	textAlter: {
		fontSize: 18,
		color: '#F4CE14',
	}
});

export default Button;
