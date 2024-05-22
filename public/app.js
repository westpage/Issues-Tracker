// STep1 is to create an event listener that listens for when the form is submitted and the it saves the form input to localStorage and updates the issuesList

// LET'S CREATE OUR MODAL FUNCTIONALITY
// get modal variables
var closeModalOverlay = document.getElementById("modalOverlay");
var closeModalForm = document.getElementById("modalForm");
var successMsg = document.getElementById("successMsg");
var openMsg = false;

// Modal trigger button
var addIssueBtn = document
  .getElementById("addIssueBtn")
  .addEventListener("click", function (e) {
    e.preventDefault();

    if (e.target.id == "addIssueBtn") {
      if (openMsg == false) {
        if (modalOverlay.classList.contains("hidden")) {
          openMsg = true;
          modalOverlay.classList.remove("hidden");
        } else {
          modalOverlay.classList.add("hidden");
          openMsg = false;
        }
      } else {
        if (modalOverlay.classList.contains("hidden")) {
          openMsg = true;
          modalOverlay.classList.remove("hidden");
        } else {
          modalOverlay.classList.add("hidden");
        }
      }
    }
  });

// Close Modal Overlay
closeModalOverlay.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.id == "modalOverlay") {
    closeModalFunc();
  }
});

// Close Modal Form
closeModalForm.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.id == "closeForm") {
    closeModalFunc();
  }
});

// Close Modal Function
function closeModalFunc() {
  if (openMsg) {
    modalOverlay.classList.add("hidden");
  } else {
    openMsg = false;
    modalOverlay.classList.remove("hidden");
  }
}

/**********end of modal functionalities***************** */

/**********LET'S CREATE OUR FORM FUNCTIONALITIES**************************** */
// get form variables
var formAddBtn = document.getElementById("formAddBtn");
let emptyContainer = document.getElementById("emptyContainer");

// Add Event Handler
formAddBtn.addEventListener("click", createNewIssue);

// CreateNewIssue function
function createNewIssue(e) {
  e.preventDefault();

  //get form input variables and their values
  var issueDesc = document.getElementById("issueDescriptionInput").value;
  var issueSeverity = document.getElementById("issueSeverityInput").value;
  var issueAssignedTo = document.getElementById("issueAssignedToInput").value;
  var issueId = Math.floor(Math.random() * 800 + 1);
  var issueStatus = "Open";

  // Animate button on submit
  formAddBtn.classList.add("animate", "animate-pulse");
  formAddBtn.innerText = "Please wait...";

  // show success
  setTimeout(function () {
    setTimeout(function () {
      successMsg.classList.remove("hidden");

      formAddBtn.classList.remove("animate", "animate-pulse");

      formAddBtn.innerText = "Add";

      setTimeout(function () {
        successMsg.classList.add("hidden");
      }, 2500);
    }, 2000);
  }, 1000);

  //  Create an object to store the values of our new created issue
  var ourIssueObject = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus,
  };

  // Lets check to see if we already have issues from ourLocalStorage, so we could add to what we already have..
  if (localStorage.getItem("issues") == null) {
    // Initialize an empty Array
    var issuesArray = [];

    emptyContainer.innerHTML = '<h1 class="">No Issues Yet</h1>';

    // push ourIssueObject into the issueArray
    issuesArray.push(ourIssueObject);

    // Then let's add our new Issue to ourLocalStorage
    localStorage.setItem("issues", JSON.stringify(issuesArray));
  } else {
    // If we have issues already then
    // get what ever issues we have on our localStorage
    let ourLocalStorage = JSON.parse(localStorage.getItem("issues"));

    //Push ourIssueObject into what we got from ourLocalStorage
    ourLocalStorage.push(ourIssueObject);

    // Set Updated Issues Array to localStorage
    localStorage.setItem("issues", JSON.stringify(ourLocalStorage));
  }

  // Reset the form data
  document.getElementById("issueInputForm").reset();

  //Empty our Issues Container
  emptyContainer.innerHTML = "";

  // Now Refetch from our localStorage
  fetchIssueList();
}

/*LET'S CREATE A FUNCTION TO FETCH AND UPDATE OUR CONTENTS */

function fetchIssueList() {
  // Get issues from our localStorage
  let ourLocalStorage = JSON.parse(localStorage.getItem("issues"));

  // check if nothing exist inside ourLocalStorage
  if (!ourLocalStorage) {
    emptyContainer.innerHTML =
      '<h1 class="font-mono text-center">No Issues Yet <br/> <a href="#issuesWrapper" class="mt-2 text-base text-blue-600 font-bold">Add New Issues</a> </h1>';
  } else {
    // If we have issues from ourLocalStorage
    // Get the issuesContainer to house all our issues
    let issuesContainer = document.getElementById("issuesContainer");
    // get the issuesContainer empty it and fill it with the issues from the ourLocalStorage

    // Empty the issuesContainer for now
    issuesContainer.innerHTML = "";

    // Hide EmptyContainer Message
    emptyContainer.classList.add("hidden");

    // Run through the issues we got from ourLocalStorage and give each one its body frame and add it to the issuesContainer
    for (var i = 0; i < ourLocalStorage.length; i++) {
      // Get issues Object Properties and assign them to variables
      let id = ourLocalStorage[i].id;
      let description = ourLocalStorage[i].description;
      let severity = ourLocalStorage[i].severity;
      let assignedTo = ourLocalStorage[i].assignedTo;
      let status = ourLocalStorage[i].status;

      //  Now add each issues to our issuesContainer by first clothing each issue element in its case element
      issuesContainer.innerHTML +=
        ' <div class="w-full sm:max-w-[550px] md:max-w-[340px] lg:max-w-[420px] mt-6 bg-white shadow-sm  hover:shadow-xl rounded-md">' +
        '<div class="w-full flex flex-col rounded-lg border-dashed border-b-2 border-stone-200 py-4 px-4">' +
        '      <div class="w-full flex items-center shadow-inner justify-between">' +
        ' <p class="w-full bg-white flex items-center justify-start py-2 px-2  text-xs text-stone-700 font-bold">Issue ID: ' +
        ' <span class="bg-white px-2 py-1 rounded-xl shadow-inner text-stone-700 font-medium ml-2">' +
        id +
        "</span>" +
        "    </p>" +
        '      <p class="w-full bg-white flex items-center justify-end py-2 px-2  text-xs text-stone-700 font-bold">Status: ' +
        ' <span class="bg-gray-50 text-xs text-gray-500 ml-2 rounded-md shadow-sm font-semibold px-1 py-1">' +
        status +
        "  </span>" +
        "</p>" +
        "</div>" +
        '    <p class="w-full bg-white  py-2 px-2  text-xs text-stone-700 font-bold">Assigned To:' +
        ' <span  class="px-4 text-stone-500 font-semibold">' +
        assignedTo +
        " </span>" +
        " </p>" +
        ' <p class="w-full  py-2 px-2  text-xs text-stone-700 font-bold">Description:' +
        '   <span  class="px-4 text-stone-500 leading-5 font-medium">' +
        description +
        "  </span>" +
        "</p>" +
        '<p class="w-full  py-2 px-2  text-xs text-stone-700 font-bold">Severity:' +
        '    <span  class="px-4 text-stone-500 font-normal">' +
        severity +
        "     </span>" +
        "  </p>" +
        "     </div>" +
        '<div class="w-full px-6 py-4 flex items-center justify-start gap-4">' +
        '<a href=""  onclick="setStatusClosed(\'' +
        id +
        '\')" class="flex items-center gap-1 text-xs text-blue-400 font-semibold rounded-md bg-gray-50 hover:bg-blue-50 shadow-inner hover:shadow-sm px-2 py-1"> ' +
        `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
      ` +
        " Close" +
        " </a>" +
        '<a href=""  onclick="deleteIssue(\''+id+'\')" class="flex items-center  gap-1 text-xs text-red-500 bg-white hover:bg-red-50  font-semibold rounded-md  hover:shadow-sm px-2 py-1">' +
        `     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>` +
        " Delete" +
        "</a> " +
        "</div>";

      (" </div> ");
    }
  }
}

/* Create function to setStatusClosed when the close button is clicked*/
function setStatusClosed(id) {
  // get issues from local storage
  let issues = JSON.parse(localStorage.getItem("issues"));

  // Loop through and match issues id to get clicked issue
  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = "Closed";
    }

    // Now Update our localStorage with the new status code
    localStorage.setItem("issues", JSON.stringify(issues));

    // Fetch updated version from our local storage
    fetchIssueList();
  }
}

//Create function to handle deleteIssue button when clicked
function deleteIssue(id) {
  // get issues from local storage
  let issues = JSON.parse(localStorage.getItem("issues"));

  for (let i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.pop(issues[i]);
    }

    // Set the rest of the issues back to local storage
    localStorage.setItem("issues", JSON.stringify(issues));

    // Fetch back issues from local storage
    fetchIssueList();
  }
}

// Delete Svg Icon
/*  */

// localStorage.clear()

// SHow FIlteredIssues Functionality

// function showFilteredIssues(issues, e, clicked) {
//   // Get the issues container
//   var issuesContainer = document.getElementById("issuesContainer");
//   console.log(clicked);
//   // Empty the Issues Container
//   issuesContainer.innerHTML = "";

//   if (e.target.textContent === clicked) {
//     for (let i = 0; i < issues.length; i++) {
//       if (issues[i].severity == clicked) {
//         e.target.classList.add("bg-stone-700", "text-stone-50");
//         issuesContainer.innerHTML += `

//         <div class="w-full sm:max-w-[550px] md:max-w-[340px] lg:max-w-[420px] mt-6 bg-white border shadow-md  hover:shadow-2xl rounded-md">

//         <div class="w-full flex flex-col bg-white rounded-lg border-dashed border-b-2 border-stone-200 hover:shadow-2xl py-4 px-4">

//         <div class="w-full flex items-center justify-between">

//         <p class="w-full bg-white flex items-center justify-start py-2 px-2  text-xs text-stone-700 font-bold">Issue ID: <span class="bg-white px-2 py-1 rounded-xl shadow-inner text-stone-700 font-medium ml-2">${id}</span></p>

//         <p class="w-full bg-white flex items-center justify-end py-2 px-2  text-xs text-stone-700 font-bold">Status: <span class="bg-gray-50 shadow-xl text-green-500  font-semibold rounded-xl text-xs ml-2 px-2 py-1">${status}</span></p>
//       </div>

//       <p class="w-full bg-white  py-2 px-2  text-xs text-stone-700 font-bold">Assigned To:
//       <span  class='px-4 text-stone-500 font-semibold'>
//        ${assignedTo}
//         </span></p>

//         <p class="w-full  py-2 px-2 hover:shadow-inner text-xs text-stone-700 font-bold">Description:
//         <span  class='px-4 text-stone-400 leading-5 font-medium'>
//          ${description}
//           </span></p>

//             <p class="w-full  py-2 px-2  text-xs text-stone-700 font-bold">Severity:
//               <span  class='px-4 text-stone-600 font-normal'>
//                ${severity}
//                 </span></p>

//         </div>

//         <div class="w-full  px-6 py-4 pb-4 rounded-sm  flex items-center justify-start space-x-3">
//           <a
//             href=""
//             class="bg-[#C4DFDF] hover:bg-teal-500 text-xs text-stone-500 font-semibold px-4 py-2 flex items-center gap-1 rounded-sm hover:shadow-2xl"
//           >
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
//           <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
//         </svg>
//         CLOSE
//           </a>

//           <a
//             href=""
//             class="bg-red-50 hover:bg-red-500 text-xs text-red-500 px-4 py-2 flex items-center justify-center gap-1 rounded-sm font-semibold hover:shadow-2xl"
//           >
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
//           <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
//         </svg>
//         DELETE
//           </a>
//         </div>
//       </div>

//     `;
//       }
//     }
//   }
// }
