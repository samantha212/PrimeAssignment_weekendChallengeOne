var array = [];
var allMonthlySalaries = [];

$(document).ready(function(){
	$('#employeeInfo').on('submit', function(event){
		event.preventDefault();

		//Create a new values object to hold the info from the form.
		var values = {};

		//Creates an array for each field in the '#employeeInfo' form. Pushes this to the values object 
		//by making the field.name the key and the field.value the value in that new property.
		$.each($('#employeeInfo').serializeArray(), function(i, field){
			values[field.name] = field.value;
		})

		//Resets input fields to blank.
		$('#employeeInfo').find('input[type=text]').val('');

		//Adds values entered to the html, using function below.
		appendDom(values);

		//Pushes values object to the array var.
		array.push(values);
		
		// Creates a monthly salary for this employee, rounded to a whole number,
		// Then pushes it to the allMonthlySalaries array above to store for later.
		var employeeAnnSalary = values.annSalary
		employeeAnnSalary = employeeAnnSalary.replace(/[^0-9\.]+/g, '');
		var employeeMonthlySalary = Math.round(employeeAnnSalary/12);
		allMonthlySalaries.push(employeeMonthlySalary);

		var totalSalaries = calcTotalSal(allMonthlySalaries);
		console.log('Total monthly salary cost is ' + totalSalaries + '.')
	});

});

//Function to append entries to the DOM.
function appendDom(object){
	$('#displayInput').append('<div></div>');
	var $location = $('#displayInput').children().last();

	$location.append('<p>' + object.employeeName + '</p>');
	$location.append('<p>' + object.employeeID + '</p>');
	$location.append('<p>' + object.jobTitle + '</p>');
	$location.append('<p>' + object.annSalary + '</p>');
	$location.append('<button class=\'button\'>Click to delete employee</button>');
	//Adding button function to delete employee. 
	$('.button').on('click', function(){
		$(this).parent().remove();
	});
};

//Function to calculate total monthly salary cost.
function calcTotalSal(salaries){
	var total = 0
	for (i=0; i<salaries.length; i++) {
		total = total + salaries[i];
	}
	return total;
}
