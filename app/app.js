'use strict';
const axios = require('axios')
var firebase = require("firebase/app");
require('firebase/database');
firebase.initializeApp(JSON.parse(process.env.CONFIG));



var listToMonitor=JSON.parse(process.env.MAPPINGS)
for (const index in listToMonitor) {
    const element = listToMonitor[index];
    var starCountRef = firebase.database().ref('posts/'+element.key)
    starCountRef.on('child_added', async function(snapshot) {
      console.log(element.key)
      console.log(JSON.stringify(snapshot.val()))
      var updates = {};
      updates['/posts/'+ element.key + '/' + snapshot.key] = null;
      await axios.post(element.target,snapshot.val());
      await firebase.database().ref().update(updates);
    });
}





