import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import NavBar from '../components/NavBar';

const Home = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<NavBar navigation={navigation} />
			</View>
			<View style={styles.herosection}>
				<View>
					<Text style={styles.tittle}>
						Little Lemmon
					</Text>
				</View>
				<View style={styles.herosubsection}>
					<View style={styles.herosubsectionitems}>
						<Text style={styles.subtittle}>
							Chicago
						</Text>
						<Text style={styles.regular}>
							We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
						</Text>
					</View>
					<View style={styles.herosubsectionimg}>
						<Image
							style={styles.heroimg} source={require("./../assets/img/hero_image.png")} />
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
	herosubsection: {
		justifyContent: 'space-between',
		flexDirection: "row",
		borderColor: "#333333",
		borderWidth: 0,
	},
	herosubsectionitems: {
		width: 250,
		backgroundColor: "#495E57",
		textAlign: "center",
		justifyContent: 'top',
		borderColor: "#333333",
		borderWidth: 0,
	},
	tittle: {
		paddingTop: 20,
		paddingLeft: 20,
		color: "#F4CE14",
		textAlign: "left",
		fontSize: 64,
		fontFamily: "MarkaziText-Medium",
	},
	subtittle: {
		top: 0,
		paddingLeft: 10,
		color: "#EDEFEE",
		textAlign: "left",
		fontSize: 50,
		fontFamily: "MarkaziText-Medium",
	},
	regular: {
		top: 0,
		paddingLeft: 10,
		color: "#EDEFEE",
		textAlign: "left",
		fontSize: 18,
		fontFamily: "Karla-Regular",
	},
	herosubsectionimg: {
		borderRadius: 10,
		overflow: true,
	},
	heroimg: {
		marginTop: 10,
		width: 150,
		height: 200,
		resizeMode: "contain",
		alignSelf: "center",
		borderRadius: 10,
	},
});

export default Home;
