import * as SQLite from 'expo-sqlite';
import { SECTION_LIST_MOCK_DATA } from './utils.js';

// // const db = SQLite.openDatabase('little_lemon');
// const db = SQLite.openDatabaseAsync('little_lemon.db', {useNewConnection: true});
const db = SQLite.openDatabase('little_lemon.db', { useNewConnection: true });

export async function createTable() {
	// console.log('Creating BD');
	try {
		// const response = await db.execAsync(
		// 	"Create Table If Not Exists menuitems (id integer primary key not null, name text, price text, description text, image text, category text)"
		// );
		db.transaction(tx => {
			tx.executeSql(
				"Create Table If Not Exists menuitems (id integer primary key not null, name text, price text, description text, image text, category text)",
				[],
				(_, { rows }) => {
					console.log('createTable rows');
					// console.log(rows);
				}
			);
		});
		console.log('BD created');
	} catch (ex) {
		console.log('Error creating DB: ' + ex);
	}
}

export async function getMenuItems() {
	// console.log('getMenuItems');
	// const result =  await db.getAllAsync("Select * From menuitems");
	// return result;
	return new Promise(resolve => {
		db.transaction(tx => {
			tx.executeSql("select * from menuitems", [], (_, { rows }) => {
				resolve(rows._array);
				// console.log('getMenuItems rows._array');
			});
		});
	});
}

export function saveMenuItems(menuItems) {
	db.transaction(tx => {
		tx.executeSql(
			`insert into menuitems (id, name, price, description, image, category) values ${menuItems
				.map(
					item =>
						`("${item.id}", "${item.name}", "${item.price}", "${item.description}", "${item.image}", "${item.category}")`
				)
				.join(", ")}`
		);
	});
}

export async function filterByQueryAndCategories(query, activeCategories) {
	// console.log('filterByQueryAndCategories');
	// console.log(query);
	// console.log(activeCategories);
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				"Select * From menuitems Where name Like ? AND (category = ? OR category = ? OR category = ? OR category = ?)",
				[`%${query}%`, ...activeCategories],
				(_, { rows }) => {
					resolve(rows._array);
					//console.log(rows._array, "filterByQueryAndCategories rows._array");
				}
			);
		}, reject);
		//resolve(SECTION_LIST_MOCK_DATA);
	});
}
