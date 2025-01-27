let fName = document.getElementById("fname");
let lName = document.getElementById("lname");
let mailAddress = document.getElementById("mail");
let message = document.getElementById("msg");
let checkBox = document.getElementById("consent");
let checkContainer = document.querySelector(".form__check");
let successMsg = document.querySelector(".successMsg");

document.querySelectorAll(".form__radioItem").forEach((item) => {
    item.addEventListener("click", () => {
        item.querySelector("input").click();
        item.parentElement.parentElement.querySelector(".form__errorMsg").textContent = "";
    });

    item.addEventListener('keyup', (event) => {
        if (event.code == "Space") item.querySelector('input[type="radio"]').click();
    })
});

fName.addEventListener("input", () => { removeError(fName) });
lName.addEventListener("input", () => { removeError(lName) });
mailAddress.addEventListener("input", () => { removeError(mailAddress) });
message.addEventListener("input", () => { removeError(message) });
checkBox.addEventListener("input", () => checkContainer.parentElement.querySelector(".form__errorMsg").textContent = "");

checkContainer.addEventListener("focus", () => {
    checkContainer.addEventListener('keyup', (event) => {
        if (event.code == "Space") checkContainer.querySelector('input[type="checkbox"]').click();
    })
})

document.forms[0].addEventListener("submit", (e) => {
    let isValid = true;

    isValid = checkRequiredFields(fName) && isValid;
    isValid = checkRequiredFields(lName) && isValid;
    isValid = checkRequiredFields(message) && isValid;

    if (mailAddress.value == "") {
        showError(mailAddress, "This field is required");
        isValid = false;
    }
    else if (!/^[a-zA-Z0-9._%-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,16}$/.test(mailAddress.value)) {
        showError(mailAddress, "Please enter a valid email address");
        isValid = false;
    }
    if (!document.querySelector("input[type='radio']:checked")) {
        document.querySelector(".form__radioItem").parentElement.parentElement.querySelector(".form__errorMsg").textContent = "This field is required";
        isValid = false;
    }
    if (!checkBox.checked) {
        checkContainer.parentElement.querySelector(".form__errorMsg").textContent = "This field is required";
        isValid = false;
    }


    if (isValid) {
        successMsg.style.top = "30px";

        setTimeout(() => {
            document.forms[0].reset();
            successMsg.style.top = "-250px"
        }, 3000);
    }

    e.preventDefault();
})

function checkRequiredFields(element) {
    if (element.value == "") {
        showError(element, "This field is required")
        return false;
    }

    return true;
}

function showError(element, message) {
    element.style.borderColor = 'var(--red)';
    element.setAttribute("aria-invalid", "true");
    element.parentElement.querySelector(".form__errorMsg").textContent = message;
}

function removeError(element) {
    element.style.borderColor = 'var(--gray-900)';
    element.setAttribute("aria-invalid", "false");
    element.parentElement.querySelector(".form__errorMsg").textContent = "";
}
