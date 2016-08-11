//submit button on click function
var data = new Firebase('https://train01.firebaseio.com/');



$('#submit').on('click', function(){
	//inputs that are needed
	//.val().trim() val retrieves objects
	var train = $('#train').val().trim();
	var destination = $('#destination').val().trim();
	var time = moment($('#time').val().trim(), "HH:mm").subtract(10, "years").format("X");
	var frequency = $('#frequency').val().trim();

	//create template for object data
	var newTrain = {
		name: train,
		destination: destination,
		time: time,
		frequency: frequency
	}

	//push train data
	data.ref().push(newTrain);

	//once data is pushed clear all inputs
	//val() van also be used to update/retrieve
	$('#train').val('');
	$('#destination').val('');
	$('#time').val('');
	$('#frequency').val('');

	//prevent page change
	return false;
});

//create new template for added trains, and push to database
data.ref().on('child-added', function(childSnapshot, prevChildKey){

	//hold data
	var tName = childSnapshot.val().name;
	var tDestination = childSnapshot.val().destination;
	var tFrequency = childSnapshot.val().frequency;
	var tFirstTrain = childSnapshot.val().firstTrain;

	var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
	var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency ;
	var tMinutes = tFrequency - tRemainder;

	var tArrival = moment().add(tMinutes, "m").format("hh:mm A"); 

	//create table
	$("#trainTable > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");

});