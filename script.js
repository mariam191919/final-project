
//carousel
"use strict";
const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list" );
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb =sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft =imageList.scrollWidth - imageList.clientWidth;

    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition =scrollbarThumb.offsetLeft;



        const handleMouseMove = (e) => {
            const deltax = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltax;
            const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width-scrollbarThumb.offsetWidth;
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
            
        }

        const  handleMouseUp = () =>{
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);

        }

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);


        

    });


    slideButtons.forEach(button => {
        button.addEventListener("click",() =>{
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({left:scrollAmount, behavior: "smooth"});
        });
         
    });
    const handleSlideButtons= () =>{
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block";
        slideButtons[1].style.display =imageList. scrollLeft >= maxScrollLeft ? "none" : "block";
    }
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition =(scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left =`${thumbPosition}px`;
    }


    imageList.addEventListener("scroll", () => {
        handleSlideButtons();
        updateScrollThumbPosition();
    })
}


window.addEventListener("load", initSlider);


//form validation

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const select =  document.getElementById('select');



form.addEventListener('submit', e =>{
    e.preventDefault();
    
    validateInputs();

});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}
const setSuccess = element => {
    const inputControl =element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');


    errorDisplay.innerText = '';
    inputControl.classList.add('successs');
    inputControl.classList.remove('error');

};
const isValidEmail = Email =>{
    const re= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return re.test(String(Email).toLowerCase());
}

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value =password2.value.trim();
    const selectValue =select.value.trim();

    if(usernameValue === ''){
        setError(username, 'Username is required');
    } else {
        setSuccess(username);
    }

    if (emailValue === ''){
        setError(email, 'Email is required');

    } else if (!isValidEmail(emailValue)){
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }
    if(selectValue === ''){
        setError(select, 'Please Select a Country');
    } 
    if(passwordValue === ''){
        setError(password, 'Password is Required');
    } 
    if(passwordValue === ''){
        setError(password2, 'Please confirm your password');
    } else if(password2Value !== passwordValue){
        setError(password2, "Password doesn't match");
    } else {
        setSuccess(password2);
    }
};
//hamburger menu
function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}
function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'

}

//header scroll changes
const header = document.querySelector('.header');
window.onscroll = function(){
let top = window.scrollY;
if (top >=100){
    header.classList.add('active')
}else{
header.classList.remove('active');
}
}
//Fetch
fetch('https://countryinfoapi.com/api/countries')
.then(res =>{
    return res.json();
})
.then(data =>{
    data.forEach(country => {
        const markup =`<option>${country.name}</option>`;
        document.querySelector('select').insertAdjacentHTML('beforeend', markup);
    })
})
.catch(error => console.log(error))

//npm

const moveTo = new MoveTo();
const linkArray = document.querySelectorAll(".nav-a");

linkArray.forEach((item) => {
  item.addEventListener("click", handleClick);
});

function handleClick(e) {
  e.preventDefault();

  const scrollElement = document.querySelector(this.getAttribute("href"));
  moveTo.move(scrollElement);
}