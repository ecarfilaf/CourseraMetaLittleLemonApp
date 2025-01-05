import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Image, SectionList, StyleSheet, Text, View } from 'react-native';
import NavBar from '../components/NavBar';
import debounce from "lodash.debounce";
import { createTable, getMenuItems, saveMenuItems, filterByQueryAndCategories } from "./../utils/database";
import Filters from '../components/Filters';
import { getSectionListData, useUpdateEffect } from "../utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from 'expo-font';
import Card from '../components/Card';
import { ScrollView } from 'react-native-virtualized-view';
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import { Searchbar } from 'react-native-paper';

const BASE_URL =
	"https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";

const sections = ["starters", "mains", "desserts", "drinks"];

const Home = ({ navigation }) => {
	const [profile, setProfile] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		orderStatuses: false,
		passwordChanges: false,
		specialOffers: false,
		newsletter: false,
		image: "",
	});
	const [data, setData] = useState([]);
	const [searchBarText, setSearchBarText] = useState("");
	const [query, setQuery] = useState("");
	const [filterSelections, setFilterSelections] = useState(
		sections.map(() => false)
	);

	const fetchData = async () => {
		try {
			const response = await fetch(BASE_URL);
			const json = await response.json();
			const menu = json.menu.map((item, index) => ({
				id: index + 1,
				name: item.name,
				price: item.price.toString(),
				description: item.description,
				image: item.image,
				category: item.category,
			}));
			return menu;
		} catch (ex) {
			console.error('Fetch data error= ' + ex);
		} finally {
		}
	};

	useEffect(() => {
		(async () => {
			let menuItems = [];
			try {
				// console.log('useEffect-createTable');
				await createTable();
				// console.log('useEffect-getMenuItems');
				menuItems = await getMenuItems();
				// console.log('useEffect-log-getMenuItems');
				// console.log(menuItems);
				if (!menuItems.length) {
					// console.log('useEffect-fetchData');
					menuItems = await fetchData();
					// console.log(menuItems);
					saveMenuItems(menuItems);
				}
				// console.log('useEffect-loaddData');
				// console.log(menuItems);
				// console.log('useEffect - getSectionListData');
				const sectionListData = getSectionListData(menuItems);
				setData(sectionListData);
				const getProfile = await AsyncStorage.getItem("profile");
				setProfile(JSON.parse(getProfile));
			} catch (e) {
				Alert.alert(e.message);
			}
		})();
	}, []);

	useUpdateEffect(() => {
		(async () => {
			const activeCategories = sections.filter((s, i) => {
				if (filterSelections.every((item) => item === false)) {
					return true;
				}
				return filterSelections[i];
			});
			try {
				const menuItems = await filterByQueryAndCategories(
					query,
					activeCategories
				);
				const sectionListData = getSectionListData(menuItems);
				setData(sectionListData);
			} catch (e) {
				Alert.alert(e.message);
			}
		})();
	}, [filterSelections, query]);

	const lookup = useCallback((q) => {
		setQuery(q);
	}, []);

	const debouncedLookup = useMemo(() => debounce(lookup, 1000), [lookup]);

	const handleSearchChange = (text) => {
		setSearchBarText(text);
		debouncedLookup(text);
	};

	const handleFiltersChange = async (index) => {
		const arrayCopy = [...filterSelections];
		arrayCopy[index] = !filterSelections[index];
		setFilterSelections(arrayCopy);
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
	}

	return (
		<View style={styles.container} onLayout={onLayoutRootView}>
			<View style={styles.header}>
				<NavBar navigation={navigation} />
			</View>
			<ScrollView horizontal={false}>
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
					<Searchbar
						placeholder="Search"
						placeholderTextColor="#333333"
						onChangeText={handleSearchChange}
						value={searchBarText}
						style={styles.searchBar}
						iconColor="#333333"
						inputStyle={{ color: "#333333" }}
						elevation={0}
					/>
				</View>
				<View style={styles.filtersection}>
					<Text style={styles.sectiontittle}>
						Order for Delivery !!
					</Text>
					<Filters
						selections={filterSelections}
						onChange={handleFiltersChange}
						sections={sections}
					/>
				</View>
				<View>
					<SectionList
						style={styles.sectionList}
						sections={data}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<Card
								navigation={navigation}
								name={item.name}
								price={item.price}
								description={item.description}
								image={item.image}
							/>
						)}
						renderSectionHeader={({ section: { name } }) => (
							<Text style={styles.itemHeader}>{name}</Text>
						)}
					/>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		overflow: 'scroll',
	},
	header: {
		//backgroundColor: "#EDEFEE",
		textAlign: "center",
		height: 120,
	},
	herosection: {
		backgroundColor: "#495E57",
		textAlign: "center",
		height: 430,
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
		// justifyContent: 'top',
		borderColor: "#333333",
		borderWidth: 0,
	},
	searchBar: {
		margin: 10,
		backgroundColor: "#e4e4e4",
		shadowRadius: 0,
		shadowOpacity: 0,
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
		paddingLeft: 20,
		color: "#EDEFEE",
		textAlign: "left",
		fontSize: 50,
		fontFamily: "MarkaziText-Medium",
	},
	filtersection: {
		borderBottomColor: "#333333",
		borderBottomWidth: 1,
		flex: 1,
	},
	sectiontittle: {
		top: 10,
		paddingLeft: 20,
		color: "#333333",
		textAlign: "left",
		fontSize: 20,
		fontFamily: "Karla-ExtraBold",
	},
	regular: {
		top: 0,
		paddingLeft: 20,
		color: "#EDEFEE",
		textAlign: "left",
		fontSize: 18,
		fontFamily: "Karla-Regular",
	},
	herosubsectionimg: {
		borderRadius: 25,
	},
	heroimg: {
		marginTop: 10,
		marginRight: 15,
		width: 200,
		height: 250,
		resizeMode: "cover",
		alignSelf: "center",
		borderRadius: 10,
	},
});

export default Home;
