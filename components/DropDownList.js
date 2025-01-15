import React from 'react';
import { StyleSheet } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'

const DropDownList = () => {

	const [selected, setSelected] = React.useState("");

	const data = [
		{ key: '1', value: '30  Mins.' },
		{ key: '2', value: '40 Mins.' },
		{ key: '3', value: '50 Mins.' },
		{ key: '4', value: '60 Mins.' },
	]

	return (
		<SelectList styles={styles.container}
			setSelected={(val) => setSelected(val)}
			data={data}
			save="value"
			placeholder="Change"
		/>
	)

};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: "#495E57",
		marginTop: 10,
		width: 130,
	},
});

export default DropDownList;