function openTab(evt, tabName) {
     // Hide all tab content
     const tabContents = document.getElementsByClassName("tab-content");
     for (let i = 0; i < tabContents.length; i++) {
       tabContents[i].style.display = "none";
       tabContents[i].classList.remove("active");
     }


     // Remove active class from all buttons
     const tabButtons = document.getElementsByClassName("tab-button");
     for (let i = 0; i < tabButtons.length; i++) {
       tabButtons[i].classList.remove("active");
     }


     // Show the selected tab
     document.getElementById(tabName).style.display = "block";
     document.getElementById(tabName).classList.add("active");


     // Add active class to the clicked button
     evt.currentTarget.classList.add("active");
   }


   // Show Home tab on initial load
   window.onload = () => {
     openTab({ currentTarget: document.querySelector('.tab-button.active') }, 'home');
   };
