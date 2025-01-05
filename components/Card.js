import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

const Card = ({ navigation, name, price, description, image }) => {
	const imgDef = "./../assets/little-lemon-logo-grey.png";
	const imgPath1 = "./../assets/img/greekSalad.jpg";
	const imgPath2 = "./../assets/img/bruschetta.jpg";
	const imgPath3 = "./../assets/img/grilledFish.jpg";
	const imgPath4 = "./../assets/img/pasta.jpg";
	const imgPath5 = "./../assets/img/lemonDessert.jpg";

	const onPressFunction = () => {
		navigation.navigate('DetailDish', {
			name: name,
			price: price,
			description: description,
			image: image,
		});
	};

	return (
		<>
			<Pressable onPress={onPressFunction}>
				<View style={styles.container}>
					<View style={styles.textcard}>
						<Text style={styles.tittle}>{name}</Text>
						<Text style={styles.texto}>{description}</Text>
						<Text style={styles.price}>$ {price}</Text>
					</View>
					<View>
						<Image
							style={styles.image}
							source={{
								uri: `https://github.com/ecarfilaf/CourseraMetaLittleLemonApp/blob/master/assets/img/${image}?raw=true`,
							}}
						/>
					</View>
				</View>
			</Pressable>
			<View style={styles.line}></View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: "#495E57",
		flexDirection: "row",
		marginTop: 10,
		justifyContent: 'space-between',
		borderColor: "#333333",
		borderWidth: 0,
		height: 170,
	},
	textcard: {
		// flex: 1,
		flexDirection: "column",
		color: "#495E57",
		margin: 15,
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	tittle: {
		fontSize: 20,
		fontFamily: "Karla-Bold",
		//fontWeight: 800,
	},
	texto: {
		fontSize: 16,
		maxHeight: 60,
		maxWidth: 250,
	},
	price: {
		fontSize: 18,
		fontFamily: "Karla-Bold",
		color: "#495E57",
		//fontWeight: 500,
	},
	image: {
		width: 140,
		height: 140,
		margin: 10,
		borderRadius: 10,
	},
	line: {
		marginInline: 10,
		borderBottomColor: '#333333',
		borderBottomWidth: 1,
	},
});

export default Card;
