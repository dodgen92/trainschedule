    
//Get Current Time for the page
currentTime = moment();
$("#currTime").html("Current Time: " + moment(currentTime).format("hh:mm a"));
  
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

$("#add-train").on("click", function(event){
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

    var timeSplit = firstTrain.split(":")
    var trainTime = moment().hours(timeSplit[0]).minutes(timeSplit[1]);
    var maxMoment = moment.max(moment(), trainTime);
    var timeMin;
    var timeArr;
  
   if (maxMoment === trainTime) {
    timeArr = trainTime.format("hh:mm A");
    timeMin = trainTime.diff(moment(), "minutes");
  } else {
  
    var differenceTimes = moment().diff(trainTime, "minutes");
    var tRemainder = differenceTimes % frequency;
    timeMin = frequency - tRemainder;
 
    timeArr = moment().add(timeMin, "m").format("hh:mm A");
  }
  console.log("timeMin:", timeMin);
  console.log("timeArr:", timeArr);


    
    
    console.log(tRemainder);
    console.log(timeMin);
    console.log(timeArr);





   $("#trainTable > tBody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+timeArr+"</td><td>"+timeMin+"</td></tr>");

  })