// import axios from "axios";
// import { APIURL } from "./ApiLinks";

// export const fetchData = async () => {
//   try {
//     const response = await axios.get(APIURL);

//     return response.data.data.menu[0].sections || [];
//   } catch (error) {
//     console.error("Error fetching data: ", error);
//     throw error;
//   }
// };

import axios from "axios";
import { APIURL } from "./ApiLinks";
// import { openDB } from 'idb';

// إنشاء أو فتح قاعدة بيانات IndexedDB
// const dbPromise = openDB('menu-db', 1, {
//   upgrade(db) {
//     // إنشاء store إذا لم يكن موجودًا
//     if (!db.objectStoreNames.contains('menuSections')) {
//       db.createObjectStore('menuSections');
//     }
//   },
// });

// حفظ البيانات في IndexedDB
//   const db = await dbPromise;
//   const tx = db.transaction('menuSections', 'readwrite');
//   const store = tx.objectStore('menuSections');
//   await store.put(sections, 'sections');
//   await tx.done;
// };

// جلب البيانات من IndexedDB
// const getMenuSectionsFromIndexedDB = async () => {
//   const db = await dbPromise;
//   const tx = db.transaction('menuSections', 'readonly');
//   const store = tx.objectStore('menuSections');
//   const sections = await store.get('sections');
//   await tx.done;
//   return sections;
// };

// تحديث الدالة fetchData لاستخدام IndexedDB
export const fetchData = async () => {
  try {
    const response = await axios.get(APIURL);
    const sections = response.data.data.menu[0].sections || [];

    return sections;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};
