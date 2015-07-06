var blogs =
	[
		{name:"blog name"    , time: ""	, date: "something" },
    ];

Template.display.helpers(
 {
	record:  function(){
		return Record.find({}, {sort: {time: -1}, limit: 10});	
	}
 }
)

/*Code for finding the day and time of each post-will be implemented later.

var today = new Date();
var day = today.getDate();
var month = today.getMonth()+1;
var year = today.getFullYear();

var hr = today.getHours();
var min = today.getMinutes();
if (min <10){
	min = "0" + min;
}
var sec = today.getSeconds();
if (sec <10){
	sec = "0" + sec;
}

Template.schedule.helpers(
 {
   activity: function(){return Activities.find({},{sort:{time:1}})},
   date: month+"/"+day+"/"+year,
   time: hr+":"+min+":"+sec
 }
)*/