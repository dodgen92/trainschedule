  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBG84xvyv5HC8YYJsZ4Dh8bva-Aooy77ho",
    authDomain: "wanderlust-railroad.firebaseapp.com",
    databaseURL: "https://wanderlust-railroad.firebaseio.com",
    projectId: "wanderlust-railroad",
    storageBucket: "wanderlust-railroad.appspot.com",
    messagingSenderId: "646638753921",
    appId: "1:646638753921:web:cfbecc9b993b5dd768d580",
    measurementId: "G-K0XRTME1V3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  


var trainData = firebase.database();

$("#add-train-btn").on("click", function(event){
    event.preventDefault();
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = $("#firstTrainInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    };

    trainData.ref().push(newTrain);

    alert("Train Added!");

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

});

trainData.ref().on("child_added",function(snapshot){
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes,"m").format("hh:mm A");

    console.log(remainder);
    console.log(minutes);
    console.log(arrival);

$("#trainTable > tBody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");

  })