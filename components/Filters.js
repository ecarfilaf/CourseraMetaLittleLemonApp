import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';

const Filters = ({ onChange, selections, sections }) => {
	return (
		<ScrollView style={styles.filtersContainer} horizontal={true}>
			{sections.map((section, index) => (
				<TouchableOpacity
					key={index}
					onPress={() => {
						onChange(index);
					}}
					style={{
						flex: 1 / sections.length,
						justifyContent: 'center',
						alignItems: 'center',
						padding: 15,
						margin: 10,
						backgroundColor: selections[index] ? '#495E57' : '#EDEFEE',
						borderWidth: 1,
						borderColor: '#FBDABB',
						borderRadius: 25,
						shadowColor: "#333333",
						shadowOffset: {
							width: 6,
							height: 6,
						},
						shadowOpacity: 0.5,
						shadowRadius: 4,
						elevation: 8,
					}}>
					<View>
						<Text style={[styles.text, { color: selections[index] ? '#EDEFEE' : '#495E57' }]}>
							{section}
						</Text>
					</View>
				</TouchableOpacity>
			))}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	filtersContainer: {
		backgroundColor: '#EDEFEE',
		flexDirection: 'row',
		marginBottom: 15,
		marginTop: 15,
	},
	text:{
		fontSize: 16,
		fontFamily: "Karla-Bold",
		//fontWeight: 800,
		textTransform: 'capitalize',
	}
});

export default Filters;
