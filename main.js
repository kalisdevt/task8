document.addEventListener('DOMContentLoaded', function() {
    let openModal = document.getElementById('openModal');
    let closeModal = document.getElementById('closeModal');
    let fio = document.getElementById('fio');
    let email = document.getElementById('email');
    let tel = document.getElementById('tel');
    let organization = document.getElementById('organization');
    let message = document.getElementById('message');
    let agree = document.getElementById('agree');
    let sendForm = document.getElementById('sendForm');
    let alert = document.getElementById('alert');

    fio.value = localStorage.getItem('fio');
    email.value = localStorage.getItem('email');
    tel.value = localStorage.getItem('telephone');
    organization.value = localStorage.getItem('organization');
    message.value = localStorage.getItem('message');


    openModal.addEventListener('click', () => {
        window.history.pushState({ page: 1 }, 'title1', '?forma=open');
    });

    closeModal.addEventListener('click', () => {
        window.history.back();
    });

    sendForm.addEventListener('click', async function () {
        const fi = fio.value;
        const em = email.value;
        const me = message.value;
        const te = tel.value;
        const org = organization.value;
        const ag = agree.checked;
        
        if (!fi || !em || !te || !org || !ag) {
            return alert.classList.remove('d-none');
        }

        localStorage.setItem('fio', fi);
        localStorage.setItem('email', em);
        localStorage.setItem('message', me);
        localStorage.setItem('telephone', te);
        localStorage.setItem('organization', org);

        const response = await fetch("https://formcarry.com/s/hgoSGlL_9rh", {
            method: 'POST',
            headers: {
                'Accept': "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: fi, email: em, message: me,  })
        });

        const data = await response.json();
        console.log(data);

        localStorage.removeItem('fio');
        localStorage.removeItem('email');
        localStorage.removeItem('message');
        localStorage.removeItem('telephone');
        localStorage.removeItem('organization');
        fio.value = email.value = organization.value = message.value = tel.value = '';
    });
});