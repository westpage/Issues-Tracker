// STep1 is to create an event listener that listens for when the form is submitted and the it saves the form input to localStorage and updates the issuesList

// LET'S CREATE OUR MODAL FUNCTIONALITY
// get modal variables
var modalOverlay = document.getElementById("modalOverlay");
var closeForm = document.getElementById("closeForm");
var successMsg = document.getElementById("successMsg");
var openMsg = false;

var addIssueBtn = document.getElementById("addIssueBtn");
addIssueBtn.addEventListener("click", function (e) {
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

modalOverlay.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.id == "modalOverlay") {
    closeModalFunc();
  }
});

closeForm.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.id == "closeForm") {
    closeModalFunc();
  }
});

function closeModalFunc() {
  if (openMsg) {
    modalOverlay.classList.add("hidden");
  } else {
    openMsg = false;
    modalOverlay.classList.remove("hidden");
  }
}

// Form Components

var formAddBtn = document.getElementById("formAddBtn");
formAddBtn.addEventListener("click", createNewIssue);

let emptyContainer = document.getElementById("emptyContainer");

function createNewIssue(e) {
  // Prevent Default Behavior
  e.preventDefault();

  // assign variables to all the form inputs elements
  var issueDesc = document.getElementById("issueDescriptionInput").value;
  var issueSeverity = document.getElementById("issueSeverityInput").value;
  var issueAssignedTo = document.getElementById("issueAssignedToInput").value;
  var issueId = Math.floor(Math.random() * 800 + 1);
  var issueStatus = "Open";

  formAddBtn.classList.add("animate", "animate-pulse");
  formAddBtn.innerText = "Please wait...";
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
  //  formAddBtn.classList.add("animate animate-bounce");

  //  Create an object to hold the properties of our new created issue
  var ourIssueObject = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus,
  };

  // Lets check to see if we already have issues from ourLocalStorage
  if (localStorage.getItem("issues") == null) {
    // Initialize an empty Array
    emptyContainer.innerHTML = '<h1 class="">No Issues Yet</h1>';

    var issuesArray = [];
    issuesArray.push(ourIssueObject);

    // Then let's add it to ourLocalStorage
    localStorage.setItem("issues", JSON.stringify(issuesArray));
  } else {
    // get what ever issues we have on our localStorage
    let ourLocalStorage = JSON.parse(localStorage.getItem("issues"));
    ourLocalStorage.push(ourIssueObject);
    localStorage.setItem("issues", JSON.stringify(ourLocalStorage));
  }

  document.getElementById("issueInputForm").reset();

  // Refetch From localStorage
  emptyContainer.innerHTML = "";

  fetchIssueList();
}

// STep 2 is to Create a function that will check if we have any already existing issues on our LocalStorage, and if yes then we want display the existing issues on the issueList Container of our page

function fetchIssueList() {
  // Get issues from our localStorage

  let ourLocalStorage = JSON.parse(localStorage.getItem("issues"));

  if (!ourLocalStorage) {
    emptyContainer.innerHTML =
      '<h1 class="font-mono text-center">No Issues Yet <br/> <a href="#issuesWrapper" class="mt-2 text-base text-blue-600 font-bold">Add New Issues</a> </h1>';
  } else {
    // Get the issuesContainer Element to house all our issues
    let issuesContainer = document.getElementById("issuesContainer");
    // get the issuesContainer empty it and fill it with the issues from the ourLocalStorage

    emptyContainer.classList.add("hidden");

    //   Empty the issuesContainer for now
    issuesContainer.innerHTML = "";

    // Run through the issues we got from ourLocalStorage and give eeach on its body and add it to the issuesContainer
    for (var i = 0; i < ourLocalStorage.length; i++) {
      // Get issues Object Properties and assign them to variables
      let id = ourLocalStorage[i].id;
      let description = ourLocalStorage[i].description;
      let severity = ourLocalStorage[i].severity;
      let assignedTo = ourLocalStorage[i].assignedTo;
      let status = ourLocalStorage[i].status;

      //  Now add each issues to our issuesContainer by first clothing each issue element in its case element

      issuesContainer.innerHTML += `
      
      <div class="w-full sm:max-w-[550px] md:max-w-[340px] lg:max-w-[420px] mt-6 bg-white shadow-sm hover:shadow-2xl rounded-lg">
       
        <div class="w-full flex flex-col bg-white rounded-lg  shadow-md  border border-stone-200 hover:shadow-2xl py-4 px-4">



        <div class="w-full flex items-center justify-between">
        
        <p class="w-full bg-white flex items-center justify-start py-2 px-2  text-xs text-stone-700 font-bold">Issue ID: <span class="bg-white px-2 py-1 rounded-xl shadow-inner text-stone-700 font-medium ml-2">${id}</span></p>
      
        <p class="w-full bg-white flex items-center justify-end py-2 px-2  text-xs text-stone-700 font-bold">Status: <span class="bg-[#C4DFDF] shadow-inner text-stone-600  font-semibold rounded-xl text-xs ml-2 px-2 py-1">${status}</span></p>
      </div>
      
      <p class="w-full bg-white  py-2 px-2  hover:shadow-inner text-xs text-stone-700 font-bold">Assigned To:
      <span  class='px-4 text-stone-500 font-semibold'>
       ${assignedTo}
        </span></p>

        <p class="w-full  py-2 px-2 hover:shadow-inner text-xs text-stone-700 font-bold">Description:
        <span  class='px-4 text-stone-500 leading-5 font-medium'>
         ${description}
          </span></p>


            <p class="w-full  py-2 px-2  hover:shadow-inner text-xs text-stone-700 font-bold">Severity:
              <span  class='px-4 text-stone-600 font-normal'>
               ${severity}
                </span></p>

             

        </div>

        <div class="w-full  px-6 py-4 rounded-sm  flex items-center justify-start space-x-3">
          <a
            href=""
            class="bg-[#C4DFDF] text-xs text-stone-500 font-semibold px-4 py-2 flex items-center gap-1 rounded-sm hover:shadow-2xl"
          >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
        CLOSE
          </a>
      
          <a
            href=""
            class="bg-red-50 text-xs text-red-500 px-4 py-2 flex items-center justify-center gap-1 rounded-sm font-semibold hover:shadow-2xl"
          >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
        DELETE
          </a>
        </div>
      </div>
      
      
      `;
    }
  }
}

// localStorage.clear()

// lets get dom elements
document.addEventListener("DOMContentLoaded", filterIssueList);

function filterIssueList(e) {
  // QUICK ACTIONS FUNCTIONALITY
  var mediumIssues = document.getElementById("mediumIssues");
  var lowIssues = document.getElementById("lowIssues");
  var highIssues = document.getElementById("highIssues");
  var approvedIssues = document.getElementById("approvedIssues");
  var deletedIssues = document.getElementById("deletedIssues");

  // View Low Issues in our Catalog
  lowIssues.addEventListener("click", function (e) {
    let clicked = e.target.textContent;

    console.log(clicked);
    if (clicked == "Low") {
      document
        .getElementById("lowIssues")
        .classList.add("bg-stone-600", "text-stone-50");
      document
        .getElementById("mediumIssues")
        .classList.remove("bg-stone-600", "text-stone-50");

      document
        .getElementById("highIssues")
        .classList.remove("bg-stone-600", "text-stone-50");
    } else {
      document
        .getElementById("lowIssues")
        .classList.remove("bg-stone-600", "text-stone-50");
      document
        .getElementById("mediumIssues")
        .classList.add("bg-stone-600", "text-stone-50");

      document
        .getElementById("highIssues")
        .classList.add("bg-stone-100", "text-stone-700");
    }

    // get all issues array
    let issues = JSON.parse(localStorage.getItem("issues"));

    // Filter the issues list to get only issues with closed status
    showFilteredIssues(issues, e, clicked);
    e.preventDefault();
  });
}

// View Medium Issues in our Catalog
mediumIssues.addEventListener("click", function (e) {
  let clicked = e.target.textContent;

  console.log(clicked);

  if (clicked == "Medium") {
    document
      .getElementById("lowIssues")
      .classList.remove("bg-stone-600", "text-stone-50");

    document
      .getElementById("highIssues")
      .classList.remove("bg-stone-600", "text-stone-50");
    document
      .getElementById("mediumIssues")
      .classList.add("bg-stone-600", "text-stone-50");
  } else {
    document
      .getElementById("mediumIssues")
      .classList.remove("bg-stone-600", "text-stone-50");
    document
      .getElementById("lowIssues")
      .classList.add("bg-stone-100", "text-stone-700");

    document
      .getElementById("highIssues")
      .classList.add("bg-stone-100", "text-stone-700");
  }

  // get all issues array
  let issues = JSON.parse(localStorage.getItem("issues"));

  // Filter the issues list to get only issues with closed status
  showFilteredIssues(issues, e, clicked);
  e.preventDefault();
});

// View High Issues in our Catalog
highIssues.addEventListener("click", function (e) {
  let clicked = e.target.textContent;

  if (clicked == "High") {
    document
      .getElementById("lowIssues")
      .classList.remove("bg-stone-600", "text-stone-50");
    document
      .getElementById("mediumIssues")
      .classList.remove("bg-stone-600", "text-stone-50");

    document
      .getElementById("highIssues")
      .classList.add("bg-stone-600", "text-stone-50");
  } else {
    document
      .getElementById("highIssues")
      .classList.remove("bg-stone-600", "text-stone-50");
  }

  console.log(clicked);

  // get all issues array
  let issues = JSON.parse(localStorage.getItem("issues"));

  // Filter the issues list to get only issues with closed status
  showFilteredIssues(issues, e, clicked);
  e.preventDefault();
});

// SHow FIlteredIssues Functionality

function showFilteredIssues(issues, e, clicked) {
  // Get the issues container
  var issuesContainer = document.getElementById("issuesContainer");
  console.log(clicked);
  // Empty the Issues Container
  issuesContainer.innerHTML = "";

  if (e.target.textContent === clicked) {
    for (let i = 0; i < issues.length; i++) {
      if (issues[i].severity == clicked) {
        e.target.classList.add("bg-stone-700", "text-stone-50");
        issuesContainer.innerHTML += `
     
        <div class="w-full sm:max-w-[450px] mt-6 bg-white border-dotted shadow-lg border-stone-100 hover:shadow-2xl rounded-xl">
       
        <div class="w-full flex flex-col bg-white rounded-xl  shadow-lg border-stone-100 hover:shadow-2xl py-4 px-4">



        <div class="w-full flex items-center justify-between">
        
        <p class="w-full bg-white flex items-center justify-start py-2 px-2  text-xs text-stone-700 font-bold">Issue ID: <span class="bg-white px-2 py-1 rounded-xl shadow text-stone-700 font-semibold ml-2">${id}</span></p>
      
        <p class="w-full bg-white flex items-center justify-end py-2 px-2  text-xs text-stone-700 font-bold">Status: <span class="bg-white shadow text-[#]  font-bold rounded-xl text-xs ml-2 px-2 py-1">${status}</span></p>
      </div>
      
      <p class="w-full bg-white  py-2 px-2  hover:shadow-inner text-xs text-stone-700 font-bold">Assigned To:
      <span  class='px-4 text-[#] font-bold'>
       ${assignedTo}
        </span></p>

        <p class="w-full  py-2 px-2 hover:shadow-inner text-xs text-stone-700 font-bold">Description:
        <span  class='px-4 text-stone-500 font-normal'>
         ${description}
          </span></p>


            <p class="w-full  py-2 px-2  hover:shadow-inner text-xs text-stone-700 font-bold">Severity:
              <span  class='px-4 text-stone-600 font-normal'>
               ${severity}
                </span></p>

             

        </div>

        <div class="w-full  px-6 py-4 rounded-sm  flex items-center justify-start space-x-3">
          <a
            href=""
            class="bg-[#] text-xs text-white px-4 py-2 flex items-center gap-1 rounded-md font-semibold hover:shadow-2xl"
          >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
        CLOSE
          </a>
      
          <a
            href=""
            class="bg-red-500 text-xs text-white px-4 py-2 flex items-center justify-center gap-1 rounded-md font-semibold hover:shadow-2xl"
          >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
        DELETE
          </a>
        </div>
      </div>
    
    
    `;
      }
    }
  }
}