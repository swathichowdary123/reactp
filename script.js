// Function to add a new activity
function addActivity() {
    var activityName = document.getElementById("activityName").value;
    if (!activityName) return;
  
    var activity = {
      name: activityName,
      days: Array(30).fill(false) // Initialize all days as unchecked
    };
  
    // Add the activity to local storage
    localStorage.setItem(activityName, JSON.stringify(activity));
  
    // Render the activity
    renderActivity(activity);
  }
  
  // Function to render an activity
  function renderActivity(activity) {
    var activitiesDiv = document.getElementById("activities");
  
    var activityDiv = document.createElement("div");
    activityDiv.classList.add("activity");
  
    var title = document.createElement("div");
    title.classList.add("activity-title");
    title.textContent = activity.name;
    activityDiv.appendChild(title);
  
    for (var i = 0; i < 30; i++) {
      var dayBox = document.createElement("div");
      dayBox.classList.add("day-box");
      if (activity.days[i]) {
        dayBox.classList.add("checked");
      }
      dayBox.setAttribute("data-index", i);
      dayBox.addEventListener("click", toggleDay);
      activityDiv.appendChild(dayBox);
    }
  
    activitiesDiv.appendChild(activityDiv);
  }
  
  // Function to toggle a day's status
  function toggleDay() {
    var index = parseInt(this.getAttribute("data-index"));
    var activityDiv = this.parentElement;
    var activityName = activityDiv.querySelector(".activity-title").textContent;
  
    var activity = JSON.parse(localStorage.getItem(activityName));
    activity.days[index] = !activity.days[index];
    localStorage.setItem(activityName, JSON.stringify(activity));
  
    this.classList.toggle("checked");
  }
  
  // Load activities from local storage on page load
  window.onload = function() {
    for (var i = 0; i < localStorage.length; i++) {
      var activityName = localStorage.key(i);
      var activity = JSON.parse(localStorage.getItem(activityName));
      renderActivity(activity);
    }
  };
  