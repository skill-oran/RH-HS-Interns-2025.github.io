let alertBtn = document.getElementsByClassName("btn1")[0];
let aboutMeBtn = document.getElementsByClassName("btn2")[0];
let myInterestsBtn = document.getElementsByClassName("btn3")[0];

alertBtn.onclick = function () {
    console.log("Alert button clicked");
    alert("Hello!");
}

aboutMeBtn.onclick = function () {
    console.log("About Me button clicked");
    let aboutMeDiv = document.getElementsByClassName("about-me")[0];
    aboutMeDiv.style.display = "block";
}

myInterestsBtn.onclick = function () {
    console.log("My Interests button clicked");
    let interestsDiv = document.getElementsByClassName("interests")[0];
    interestsDiv.style.display = "block";
}