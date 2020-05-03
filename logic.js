var firebaseConfig = {
    apiKey: "AIzaSyBtbkCV8EiaKwnkwRK2FOjnJUIf5wW4lTw",
    authDomain: "trainschedul-f50f8.firebaseapp.com",
    databaseURL: "https://trainschedul-f50f8.firebaseio.com",
    projectId: "trainschedul-f50f8",
    storageBucket: "trainschedul-f50f8.appspot.com",
    messagingSenderId: "1090286479225",
    appId: "1:1090286479225:web:8614c668ec663e465b31a8",
    measurementId: "G-V95P7WHK1R"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


var trainData = firebase.database();

$("addTrainBtn").on("click",function(){
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10,"years").format("X");
    var frequency = $("frequencyInput").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

    trainData.ref().push(newTrain);

    alert("Train Added!");

    $("#trainNameInput").val("");
    $("#festinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

    return false;
})

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

})