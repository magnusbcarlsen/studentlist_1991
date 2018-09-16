"use strict";

window.addEventListener("DOMContentLoaded", initFrontend);

function initFrontend() {
    console.log("Frontend is running");

    // register buttons for sort
    document.querySelector("button#sort_first").addEventListener("click", clickedSortFirstname );
    document.querySelector("button#sort_last").addEventListener("click", clickedSortLastname );
    

    // register buttons for filters
//    document.querySelectorAll("#filters a").forEach( function(element) { element.addEventListener("click", clickedFilter); } );
    document.querySelectorAll("#filters a").forEach( element => element.addEventListener("click", clickedFilter));
    //register  table clicks
    document.querySelector("table#studentlist").addEventListener("click", clickedTable);
}

function clickedTable(event) {
   /*  console.log("CLicked table");
    console.log(event.target); */

    
    const clicked = event.target;
    console.log(clicked.tagName);
    if(clicked.tagName === "BUTTON") {
        //NOTE: when we have more buttons, check which kind was clicked(on class or something)
        clickedDelete(clicked);
    }
}

function clickedDelete(deleteButton) {
    // find the <tr> that has this deleteButton inside it
    let tr = deleteButton.parentElement;
    while( tr.tagName !== "TR") {
        tr = tr.parentElement;
    }

    // find the studentId

    const studentId = tr.dataset.studentId;
    console.log(studentId);

    deleteStudent( studentId );
    animateDelete( tr );

    // remove tha <tr>
    tr.remove();

}

function animateDelete( tr ) {
   
    tr.style.transform = "translate(-105%)";
    tr.style.transition = "transform 1s";
    
    tr.addEventListener("transitionend", function() {
        const nextSibling = tr.nextElementSibling;

        nextSibling.addEventListener("transitionend", function() {
            
            let nextTr = tr.nextElementSibling;
            
            while(nextTr = tr.nextElementSib)nextTr.style.transform = "translateY(0)";
            nextTr.style.transform = "transform 0s";

            nextTr = nextTr.nextElementSibling;
            
        })

        while(nextSibling !== null) {
        nextSibling.style.transform = "translateY("-rect.height+"px)";
        nextSibling.style.transform = "transform 0.5s";

        nextSibling = nextSibling.nextElementSibling;
        }

    });
}

function clickedSortFirstname() {
    console.log("clickedSortFirstname");
    sortByFirstName();
    displayList(currentStudents);
}

function clickedSortLastname() {
    console.log("clickedSortLastname");
    sortByLastName();
    displayList(currentStudents);
}



function clickedFilter(event) {
    console.log("clickedFilter");
    const filter = this.dataset.filter; // references data-filter="____"
    console.log(event);
    event.preventDefault(); //prevent from default (avoid from scrolling up)

    const filteredList = filterByHouse(filter);
    displayList(filteredList);

    //create a list of filtered students by house

    // if filter === all, let the list be all students
    if(filter === "all"){
        // currentStudents = allStudents;
        displayList(allStudents);
    } else {
        currentStudents = filterByHouse(filter);
        displayList(currentStudents);
    }
}

function displayList( listOfStudents ) {
    console.log("Display list");
    // clear the table
    document.querySelector("table#studentlist tbody").innerHTML = "";

    // foreach student in listOfStudents
    listOfStudents.forEach( function( student ) {
        // clone a table-row for student
        const clone = document.querySelector("#student_template").content.cloneNode(true);
        
        // fill in the clone with data
        clone.querySelector("[data-firstname]").textContent = student.firstName;
        clone.querySelector("[data-lastname]").textContent = student.lastName;
       

        // add the studentID to the <tr>

        clone.querySelector("tr").dataset.studentId = student.id;

        // append clone to table
        document.querySelector("table#studentlist tbody").appendChild( clone );
    })

}



let coll = document.getElementsByClassName("collapsible");
let i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

