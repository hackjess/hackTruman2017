$(document).ready(function()
{
  // production hack, sorry
  for (var i = 1; i < 12; i++) {
    $('#category'+i).hide();
  }
  $("#results").click(function() {

if (!$("input[@name=q1]:checked").val() ||
!$("input[@name=q2]:checked").val() ||
!$("input[@name=q3]:checked").val() ||
!$("input[@name=q4]:checked").val() ||
!$("input[@name=q5]:checked").val() ||
!$("input[@name=q6]:checked").val() ||
!$("input[@name=q7]:checked").val() ||
!$("input[@name=q8]:checked").val() ||
!$("input[@name=q9]:checked").val() ||
!$("input[@name=q10]:checked").val()
) {
alert("You're not done yet!");
}

else {
var cat1name = "1";
var cat2name = "2";
var cat3name = "3";
var cat4name = "4";
var cat5name = "5";
var cat6name = "6";
var cat7name = "7";
var cat8name = "8";
var cat9name = "9";
var cat10name = "10";
var cat11name = "None";

var cat1 = ($("#q1b:checked").val() == "b");
var cat2 = ($("#q2b:checked").val() == "b");
var cat3 = ($("#q3a:checked").val() == "a");
var cat4 = ($("#q4b:checked").val() == "b");
var cat5 = ($("#q5b:checked").val() == "b");
var cat6 = ($("#q6b:checked").val() == "b");
var cat7 = ($("#q7a:checked").val() == "a");
var cat8 = ($("#q8b:checked").val() == "b");
var cat9 = ($("#q9s:checked").val() == "a");
var cat10 = ($("#q10b:checked").val() == "b");

var cat11 = (cat1 && cat2 && cat3 && cat4 && cat5 && cat6 && cat7 && cat8 && cat9 && cat10);
var categories = [];

if (!cat1) { categories.push(cat1name) };
if (!cat2) { categories.push(cat2name) };
if (!cat3) { categories.push(cat3name) };
if (!cat4) { categories.push(cat4name) };
if (!cat5) { categories.push(cat5name) };
if (!cat6) { categories.push(cat6name) };
if (!cat7) { categories.push(cat7name) };
if (!cat8) { categories.push(cat8name) };
if (!cat9) { categories.push(cat9name) };
if (!cat10) { categories.push(cat10name) };
if (cat11) { categories.push(cat11name) };

var catStr = 'The percentage of questions answered correctly is: ' + (((10 - categories.length)/10) * 100) + "% ";
$("#categorylist").text(catStr);
$("#categorylist").show("slow");

//var totalPercent = ((10 - categories.length)/10) * 100;
//$("#categorylist").text(totalPercent);
//$("#categorylist").show("slow");

if (!cat1) { $("#category1").show("slow"); };
if (!cat2) { $("#category2").show("slow"); };
if (!cat3) { $("#category3").show("slow"); };
if (!cat4) { $("#category4").show("slow"); };
if (!cat5) { $("#category5").show("slow"); };
if (!cat6) { $("#category6").show("slow"); };
if (!cat7) { $("#category7").show("slow"); };
if (!cat8) { $("#category8").show("slow"); };
if (!cat9) { $("#category9").show("slow"); };
if (!cat10) { $("#category10").show("slow"); };

if (cat11) { $("#category11").show("slow"); };
{ $("#closing").show("slow"); };
}
    });});
