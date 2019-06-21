'use strict'

let fromDate = localStorage.getItem('date');
let now = new Date();
let days = dateDiffInDays(fromDate, now);
let incidents = 0;

let setDateToDoc = () => {
	incidents = (localStorage.getItem('incidents'))? localStorage.getItem('incidents') : 0;
	
	now = new Date();
	days = dateDiffInDays(fromDate, now);

	changeFontSize();

	document.getElementById('numberOfDays').innerHTML = days.toString();
	document.getElementById('amountOfIncidents').innerHTML = incidents;
}

function resetDate() {
	localStorage.setItem('date', now);
	fromDate = now;
	localStorage.setItem('incidents', +incidents+1);
	setDateToDoc();
}

function dateDiffInDays(date1, date2) {
	let dt1 = new Date(date1);
	let dt2 = new Date(date2);
	return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate())
		- Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()))
		/ (1000 * 60 * 60 * 24));
}

function changeFontSize() {
	switch (days.toString().length) {
		case 1:
			document.getElementById("numberOfDays").style.fontSize = "230px";
			break;
		case 2:
			document.getElementById("numberOfDays").style.fontSize = "160px";
			break;
		case 3:
			document.getElementById("numberOfDays").style.fontSize = "110px";
			break;
		case 4:
			document.getElementById("numberOfDays").style.fontSize = "80px";
			break;
		case 5:
			document.getElementById("numberOfDays").style.fontSize = "60px";
			break;
		default:
			document.getElementById("numberOfDays").style.fontSize = "60px";
			days = days.toString();
			var ar = days.split('');
			ar.splice(5, 0, "<br>");
			days = ar.join('');
			break;
	}
}

setInterval(setDateToDoc, 10 * 60 * 1000);