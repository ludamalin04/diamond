const form = document.querySelector('.contact-form');
const name = document.getElementById('name');
const errorName = document.querySelector('.error-name');
const tel = document.getElementById('tel');
const errorTel = document.querySelector('.error-tel');
// const email = document.getElementById('email');
// const errorEmail = document.querySelector('.error-email');
const popup = document.querySelector('.contact-popup');


form.addEventListener('submit', (event) => {
    event.preventDefault();
    validateInputs();
})

// const isValidEmail = (email) => {
//     const req = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return req.test(String(email).toLowerCase());
// }

const isValidTel = (tel) => {
    const req = /^\+?[0-9\s\(\)-]+$/;
    return req.test(tel);
}

const validateInputs = () => {
    const nameValue = name.value.trim();
    const telValue = tel.value.trim();
    // const emailValue = email.value.trim()

    if (nameValue === '') {
        errorName.textContent = 'Це поле необхідне для заповнення';
        errorName.style.visibility = 'visible';
    } else {
        errorName.style.visibility = 'hidden';
    }

    if (telValue === '') {
        errorTel.textContent = 'Це поле необхідне для заповнення';
        errorTel.style.visibility = 'visible';
    } else if (!isValidTel(telValue)) {
        errorTel.textContent = 'Перевірте правильність введення номеру';
        errorTel.style.visibility = 'visible';
    } else {
        errorTel.style.visibility = 'hidden';
    }

    // if (emailValue === '') {
    //     errorEmail.textContent = 'Це поле необхідне для заповнення';
    //     errorEmail.style.visibility = 'visible';
    // } else if (!isValidEmail(emailValue)) {
    //     errorEmail.textContent = 'Перевірте правильність електронної пошти';
    //     errorEmail.style.visibility = 'visible';
    // } else {
    //     errorEmail.style.visibility = 'hidden';
    // }

    if (nameValue !== '' && telValue !== '' && isValidTel(telValue)) {
        send();
    }
}

const burger = document.querySelector('.header-burger');
const list = document.querySelector('.header-list');
const action = document.querySelector('.header-action');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    list.classList.toggle('visible');
    action.classList.toggle('visible');
})

function send() {
    let formData = new FormData(form);
    let btnSubmitTitle = document.querySelector('#form [type="submit"]');
    if (btnSubmitTitle) {
        btnSubmitTitle.children[0].classList.toggle('active');
        btnSubmitTitle.children[1].classList.toggle('active');
    }

    fetch('sendmail.php', {
        method: 'POST',
        body: formData
    }).then(
        (res) => {

            if (btnSubmitTitle) {
                btnSubmitTitle.children[0].classList.toggle('active');
                btnSubmitTitle.children[1].classList.toggle('active');
            }

            if (res.ok && res.status === 200) {
                popup.style.visibility = 'visible';
                setTimeout(() => {
                    popup.style.visibility = 'hidden';
                    form.reset();
                }, 2000);
            } else {
                alert("Ой, щось пішло не так")
            }
        },
    ).catch(
        (error) => {
            alert(error);
        }
    );
}




