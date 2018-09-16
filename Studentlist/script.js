"use strict";

window.addEventListener("DOMContentLoaded", init);

const allStudents = [];
let currentStudents = [];

const Student_prototype = {
    firstName: "",
    middleName: "",
    lastName: "",
    toString() {
        return this.firstName+" "+this.middleName+" "+this.lastName;
    },
    splitName(fullName) {
        const firstSpace = fullName.indexOf(" ");
        const secondSpace = fullName.indexOf(" ", firstSpace + 1);
        this.firstName = fullName.substring(0,firstSpace);
        this.middleName = fullName.substring(firstSpace, secondSpace).trim();
        this.lastName = fullName.substring(secondSpace +1);

        
    },
  
}


function init() {
    // clear the students array - just in case
    allStudents.splice(0, allStudents.length); // from https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
    
    // fetch JSON 
    fetchData();

    // parse JSON
    // --- done via fetchJSON
}

function fetchData() {
    const url= "students.json";

    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(jsondata) {
        console.log(jsondata);

        buildList(jsondata); //creates allStudents

        currentStudents = allStudents;
        
        displayList(currentStudents);
    });
}


function buildList(jsondata) {


    jsondata.forEach( createStudent );
        function createStudent( fullName ) {
            const student = Object.create(Student_prototype);
            student.splitName(fullName);

            //assign this student a unique id
            student.id = "" + allStudents.length;
            allStudents.push(student);
        }
    }




function  deleteStudent( studentId ) {
    // Find the index of the student with studentId

    console.log("Break here");

    const index = allStudents.findIndex(findStudent);
    console.log("Found index: " + index);

    allStudents.splice(index,1);

    // function that returns true wen student.id == studentId
    function findStudent (student) {
        if(student.id === studentId){
            return true;
        } else {
            return false;
        }
    }
}


function sortByFirstName() {
    allStudents.sort( byFirstName );

    function byFirstName(a,b) {
        if( a.firstName < b.firstName ) {
            return -1;
        } else if( a.firstName > b.firstName ) {
            return 1;
        } else {
            return 0;
        }
    }
}

function sortByLastName() {
    currentStudents.sort( byLastName );

    function byLastName(a,b) {
        if( a.lastName < b.lastName ) {
            return -1;
        } else {
            return 1;
        }
    }
}



/* function sortByHouse() {
    allStudents.sort( byHouseAndFirstName );

    function byHouseAndFirstName(a,b) {
        // first sort by house, but if house is the same, sort by first name
        if( a.house < b.house ) {
            return -1;
        } else if( a.house > b.house ) {
            return 1;
        } else {
            if( a.firstName < b.firstName ) {
                return -1;
            } else {
                return 1;
            }
        }
    }
} */

/* function filterByHouse( house ) {
    const filteredStudents = allStudents.filter( byHouse );

    function byHouse( student ) {
        if( student.house === house ) {
            return true;
        } else {
            return false;
        }
    }

    return filteredStudents;
} */

function listOfStudents() {
    let str = "";

    allStudents.forEach( student => str+=student+"\n" );

    return str;
}