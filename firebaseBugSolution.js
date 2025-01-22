function writeData(uid, data) {
  // Get the UID from Firebase Authentication - ensure it matches the structure expected in your rules
  // Use Firebase Admin SDK if on the server-side to avoid client-side exposure of authentication details
  const authUid = firebase.auth().currentUser.uid;

  // Check that UID is valid - critical to avoiding errors
  if (uid === null || uid.length === 0) {
    console.error('Invalid UID');
    return;
  }

  // Ensure that data is correctly structured, adhering to the rules' expectations
  // Example:  If your rule checks for data.name and data.value, ensure both are correctly set.
  const dbRef = firebase.database().ref('/users/' + uid);

  dbRef.set(data)
    .then(() => {
      console.log('Data written successfully');
    })
    .catch((error) => {
      console.error('Error writing data:', error);
    });
} 

//Ensure your Firebase rules are correctly structured:
//{
//  "rules": {
//    ".read": "auth != null",
//    ".write": "auth.uid == newData.uid"
//  }
//}