import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useMemo, useReducer } from 'react';
import { StyleSheet, Alert } from 'react-native';
import Onboarding from './screens/Onboarding.js';
import Profile from './screens/Profile.js';
import SplashScreen from './screens/SplashScreen.js';
import Home from './screens/Home.js';
import { StatusBar } from "expo-status-bar";
import DetailDish from './screens/DetailDish.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from "./contexts/AuthContext";
import PreOrder from './screens/PreOrder.js';

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {

	const [state, dispatch] = useReducer(
		(prevState, action) => {
			switch (action.type) {
				case "onboard":
					//console.log('App.js useReducer onboard');
					return {
						...prevState,
						isLoading: false,
						isOnboardingCompleted: action.isOnboardingCompleted,
					};
			}
		},
		{
			isLoading: true,
			isOnboardingCompleted: false,
		}
	);

	useEffect(() => {
		(async () => {
			let profileData = [];
			try {
				const getProfile = await AsyncStorage.getItem("profile");
				if (getProfile !== null) {
					profileData = getProfile;
				}
			} catch (e) {
				console.error('App.js useEffect ' + e.message);
			} finally {
				if (Object.keys(profileData).length != 0) {
					dispatch({ type: "onboard", isOnboardingCompleted: true });
				} else {
					dispatch({ type: "onboard", isOnboardingCompleted: false });
				}
			}
		})();
	}, []);

	const authContext = useMemo(
		() => ({
			onboard: async (data) => {
				console.log('App.js authContext = useMemo onboard');
				try {
					const jsonValue = JSON.stringify(data);
					await AsyncStorage.setItem("profile", jsonValue);
				} catch (e) {
					console.error('Error: App.js authContext = useMemo onboard');
				}

				dispatch({ type: "onboard", isOnboardingCompleted: true });
			},
			update: async (data) => {
				console.log('App.js authContext = useMemo update');
				try {
					const jsonValue = JSON.stringify(data);
					await AsyncStorage.setItem("profile", jsonValue);
				} catch (e) {
					console.error('Error: App.js authContext = useMemo update');
				}

				Alert.alert("Success", "Successfully saved changes!");
				navigation.navigate('Home');
			},
			logout: async () => {
				try {
					await AsyncStorage.clear();
				} catch (e) {
					console.error('Error: App.js authContext = useMemo logout');
				}

				dispatch({ type: "onboard", isOnboardingCompleted: false });
			},
		}),
		[]
	);

	if (state.isLoading) {
		return <SplashScreen />;
	}

	return (
    <AuthContext.Provider value={authContext}>
		<NavigationContainer>
			<Stack.Navigator>
				{state.isOnboardingCompleted ? (
					<>
						<Stack.Screen
							name="Home"
							component={Home}
							options={{ headerShown: false }}
						/>
						<Stack.Screen name="Profile" component={Profile}
							options={{ headerShown: false }} />
						<Stack.Screen name="DetailDish" component={DetailDish}
							options={{ headerShown: false }} />
						<Stack.Screen name="PreOrder" component={PreOrder}
							options={{ headerShown: false }} />
					</>
				) : (
					<Stack.Screen
						name="Onboarding"
						component={Onboarding}
						options={{ headerShown: false }}
					/>
				)}
			</Stack.Navigator>
		</NavigationContainer>
    </AuthContext.Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		backgroundColor: '#495E57',
	},
	sectionList: {
		paddingHorizontal: 16,
	},
	searchBar: {
		marginBottom: 24,
		backgroundColor: '#495E57',
		shadowRadius: 0,
		shadowOpacity: 0,
	},
	item: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 16,
	},
	header: {
		fontSize: 24,
		paddingVertical: 8,
		color: '#FBDABB',
		backgroundColor: '#495E57',
	},
	title: {
		fontSize: 20,
		color: 'white',
	},
});
