
const birthday = document.querySelector("#birth-date");
const checkButton = document.querySelector("#show-btn");
const showResult = document.querySelector("#show-result");

checkButton.addEventListener("click", startCalculation)


function startCalculation(){
    var birthdate = birthday.value;

    if(birthdate!=''){

        var seperatedDate = birthdate.split('-');

        var date = {
            day : Number(seperatedDate[2]),
            month : Number(seperatedDate[1]),
            year : Number(seperatedDate[0])
        };
       // var dateStr = convertDateToString(date)
        var isPalindrome = checkPalindromeForAllDateVariations(date)
        if(isPalindrome){
            showResult.innerText = "🎂🎂🎂🎂 Yes! Your birthday is a palindrome!!!  🎂🎂🎂🎂"
        }
        else{
            const [daysForNextPalindromeDate, nextDate] = getNextPalindromeDate(date);
            const [daysPastForPreviousPalindromeDate, prevDate] = getPreviousPalindromeDate(date);

             // we are using ternary operator to determine and show 'day' for 1 day and 'days' for more than 1 day
      var nextDayOrDays = (daysForNextPalindromeDate === 1) ? 'day' : 'days';
      var previousDayOrDays = (daysPastForPreviousPalindromeDate) === 1 ? 'day' : 'days';
      
            if (daysForNextPalindromeDate > daysPastForPreviousPalindromeDate) {
              showResult.innerText = `😢😢😢😢 The previous palindrome date was ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed by ${daysPastForPreviousPalindromeDate} ${previousDayOrDays}. 😢😢😢😢`;
            } else {
              showResult.innerText = `😢😢😢😢 The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${daysForNextPalindromeDate} ${nextDayOrDays}. 😢😢😢😢`;
            }
          
        }
    }
    else{
      showResult.innerText = "Please enter a valid date!!!"
    }
}


//ex01
function reverseTheString(inputString){

   var listofCharecters = inputString.split('');           //split by char
   var reversedListOfChar = listofCharecters.reverse();   //reverse the listof chars
   var reversedString = reversedListOfChar.join('');     //join each char to build the list

   return reversedString;

}

//ex02

function checkIfTheStringIsPalindrome(inputString){
    var reversedString = reverseTheString(inputString)
    // if(reversedString === inputString)
    // return true
    // else
    // return false
    return inputString === reversedString
}

//ex03

function convertDateToString(inputDate){

    var dateStr = {day: '', month:'', year:''};

    if(inputDate.day<10){
        dateStr.day = '0' + inputDate.day
    }
    else{
        dateStr.day = inputDate.day.toString(); 
    }

    if(inputDate.month<10){
        dateStr.month = '0'+ inputDate.month
    }
    else{
        dateStr.month = inputDate.month.toString();
    }
  dateStr.year = inputDate.year.toString();
  
  return dateStr;
}

//ex4

function getAllVariationsOfADate(inputDate){

     var dateStr = convertDateToString(inputDate);

     var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year
     var mmddyyyy = dateStr.month + dateStr.day + dateStr.year
     var yyyymmdd = dateStr.year + dateStr.month + dateStr.day
     var ddmmyy   = dateStr.day + dateStr.month + dateStr.year.slice(-2)
     var mmddyy   = dateStr.month + dateStr.day + dateStr.year.slice(-2)
     var yymmdd   = dateStr.year + dateStr.month + dateStr.day.slice(-2)
    

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

//console.log(getAllVariationsOfADate(input))

//ex5
function checkPalindromeForAllDateVariations(inputDate){

   var allDateFormats = getAllVariationsOfADate(inputDate);
    console.log("Date Input "+inputDate)
    console.log("ADFT "+allDateFormats)
    var flag = false;
    for(var index = 0 ; index< allDateFormats.length ; index++){
        console.log("ADFT "+allDateFormats[index])
        if(checkIfTheStringIsPalindrome(allDateFormats[index])){
            flag = true;
            break;
        }
     }
   return flag;
}

//ex7
function getNextDate(inputDate){

    var day = inputDate.day + 1; //increment the day by 1
    var month = inputDate.month;
    var year = inputDate.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if(month===2){
    if(isLeapYear(year)){
        if(day>29){
            day =1;
            month = month + 1;
        }
    }else{
    if(day>28){
        day = 1; 
        month = month + 1;
    } 
  }
}
    else{
        if(day> daysInMonth[month - 1]) ///range is 0 to 11, so minus 1
        { 
            day =  1;
            month = month + 1;

        }
}

    if(month> 12){
        month = 1;
        year++;
    }

    return {
        day : day,
        month : month, 
        year : year
    };

}

function isLeapYear(year){

  if(year % 400 === 0){
    return true;
  }

  if(year % 100 === 0){
    return false;
  }

  if(year % 4 === 0){
    return true;
  }

  return false;

}

function getNextPalindromeDate(dateInput){
  var nextDate = getNextDate(dateInput);
  var daysRemainingForNextPalindromeDate = 0;

  while(1){
    daysRemainingForNextPalindromeDate++;
   // var dateStr = convertDateToString(nextDate);
   console.log("Next  Date "+nextDate);
    var isPalindromeDate = checkPalindromeForAllDateVariations(nextDate);

   if(isPalindromeDate){
    break;
   }
    nextDate = getNextDate(nextDate)
  }
  return [daysRemainingForNextPalindromeDate, nextDate]
}
//ex 8 (bonus)

function getPreviousDate(inputDate){

    var day = inputDate.day - 1; //increment the day by 1
    var month = inputDate.month;
    var year = inputDate.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if(day===0){
        month = month -1 ;


    if(month===0){
    month = 12;
    day = 31;
    year = year -1;
    }    else if(month===2){

    if(isLeapYear(year)){
        day = 29;
    } else {
      day = 28;
    }
 } else{
        day = daysInMonth[month - 1]
    }
  }

 return {
        day : day,
        month : month, 
        year : year
    };

}

function getPreviousPalindromeDate(dateInput){
    var previousDate = getPreviousDate(dateInput);
    var daysPastForPreviousPalindromeDate = 0;
  
    while(1){
        daysPastForPreviousPalindromeDate++;
     // var dateStr = convertDateToString(nextDate);
      var isPrevPalindromeDate = checkPalindromeForAllDateVariations(previousDate);
  
      if(isPrevPalindromeDate){
        break;
      }
      previousDate = getPreviousDate(previousDate)
    }
    return [daysPastForPreviousPalindromeDate, previousDate]
  }