let contentData = document.getElementById("contentData");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;
let ele = document.querySelector(".area");
let ele1 = document.querySelector(".search");
let ele2 = document.querySelector(".categories");
let ele3 = document.querySelector(".ingredients");
let ele4 = document.querySelector(".contact");

$(document).ready(function() {
    getMeals("").then(function(){
        $("#loading").fadeOut(700)
        $("body").css("overflow", "auto")

    })
})
$("#open").click(openSideNav)
function openSideNav() {
    $(".side-nav").animate({
        left: 0
    }, 500)


    $("#open").css("display","none");
    $("#close").css("display","block");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}
$("#close").click(closeSideNav)
function closeSideNav() {
    let boxWidth = $(".side-nav .nav-tab").outerWidth()
    $(".side-nav").animate({
        left: -boxWidth
    }, 500)

    $("#open").css("display","block");
    $("#close").css("display","none");


    $(".links li").animate({
        top: 300
    }, 500)
}


 async function getMeals() {
    closeSideNav()
    $(".inner-loading").fadeIn(500)
   
 
    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`);
    respone = await respone.json();

    displayMeals(respone.meals)
    $(".inner-loading").fadeOut(500)

}

function displayMeals(allI) {
    closeSideNav()
    let cartona = "";

    for (let i = 0; i < allI.length; i++) {
        cartona += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${allI[i].idMeal}')" class="meal position-relative overflow-hidden rounded-3 cursor-pointer">
                    <img class="w-100" src="${allI[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${allI[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    contentData.innerHTML = cartona
}


function showSearchInputs() {
    closeSideNav()
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`
     
    contentData.innerHTML = ""
}

async function searchByName(element) {
    closeSideNav()
    contentData.innerHTML = ""
    $(".inner-loading").fadeIn(500)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${element}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading").fadeOut(500)

}

async function searchByFLetter(element) {
    closeSideNav()
    contentData.innerHTML = ""
    $(".inner-loading").fadeIn(500)

    element == "" ? element = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${element}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading").fadeOut(500)

}


async function getCategories() {
    closeSideNav()
    contentData.innerHTML = ""
    $(".inner-loading").fadeIn(500)
    searchContainer.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    displayCategories(response.categories)
    $(".inner-loading").fadeOut(500)

}

function displayCategories(allI) {
    closeSideNav()
    let cartona = "";

    for (let i = 0; i < allI.length; i++) {
        cartona += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${allI[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${allI[i].strCategoryThumb}" alt="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${allI[i].strCategory}</h3>
                        <p>${allI[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    contentData.innerHTML = cartona
}


async function getArea() {
    closeSideNav()
    contentData.innerHTML = ""
    $(".inner-loading").fadeIn(500)

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    displayArea(respone.meals)
    $(".inner-loading").fadeOut(500)

}


function displayArea(allI) {
    closeSideNav()
    searchContainer.innerHTML="";
    let cartona = "";

    for (let i = 0; i < allI.length; i++) {
        cartona += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${allI[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${allI[i].strArea}</h3>
                </div>
        </div>
        `
    }

    contentData.innerHTML = cartona
}


async function getIngredients() {
    closeSideNav()
    contentData.innerHTML = ""
    $(".inner-loading").fadeIn(500)

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayIngredients(respone.meals.slice(0, 20))
    $(".inner-loading").fadeOut(500)

}


function displayIngredients(allI) {
    closeSideNav()
    let cartona = "";

    for (let i = 0; i < allI.length; i++) {
        cartona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${allI[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${allI[i].strIngredient}</h3>
                        <p>${allI[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    contentData.innerHTML = cartona
}


async function getCategoryMeals(category) {
    contentData.innerHTML = ""
    $(".inner-loading").fadeIn(500)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading").fadeOut(500)

}



async function getAreaMeals(area) {
    contentData.innerHTML = ""
    $(".inner-loading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading").fadeOut(300)

}


async function getIngredientsMeals(ingredients) {
    contentData.innerHTML = ""
    $(".inner-loading").fadeIn(500)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading").fadeOut(500)

}

async function getMealDetails(mealID) {
    closeSideNav()
    contentData.innerHTML = ""
    $(".inner-loading").fadeIn(500)

    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayMealDetails(respone.meals[0])
    $(".inner-loading").fadeOut(500)

}


function displayMealDetails(meal) {
    
    searchContainer.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let cartona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a href="${meal.strSource}" class="btn btn-success">Source</a>
                <a href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    contentData.innerHTML = cartona
}



function showContacts() {
    closeSideNav()
    contentData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *example@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", function() {
        nameInputTouch = true
    })

    document.getElementById("emailInput").addEventListener("focus", function() {
        emailInputTouch = true
    })

    document.getElementById("phoneInput").addEventListener("focus",function () {
        phoneInputTouch = true
    })

    document.getElementById("ageInput").addEventListener("focus", function() {
        ageInputTouch = true
    })

    document.getElementById("passwordInput").addEventListener("focus", function() {
        passwordInputTouch = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", function() {
        repasswordInputTouch = true
    })
}

let nameInputTouch = false;
let emailInputTouch = false;
let phoneInputTouch = false;
let ageInputTouch = false;
let passwordInputTouch = false;
let repasswordInputTouch = false;




function inputsValidation() {
    if (nameInputTouch) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouch) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouch) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouch) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouch) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouch) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}


ele.addEventListener("click",getArea)
ele1.addEventListener("click",showSearchInputs)
ele2.addEventListener("click",getCategories)
ele3.addEventListener("click",getIngredients)
ele4.addEventListener("click",showContacts)
