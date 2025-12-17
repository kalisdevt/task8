
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
    const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {

    });

    if (document.location.href.includes('?forma=open')) {
        myModal.show();
    } else {
        myModal.hide();
    }
    
    fio.value = localStorage.getItem('fio');
    email.value = localStorage.getItem('email');
    tel.value = localStorage.getItem('telephone');
    organization.value = localStorage.getItem('organization');
    message.value = localStorage.getItem('message');

    fio.addEventListener('input', saveInStore);
    email.addEventListener('input', saveInStore);
    tel.addEventListener('input', saveInStore);
    organization.addEventListener('input', saveInStore);
    message.addEventListener('input', saveInStore);
    
    onpopstate = (event) => {
        console.log('chhh')
        console.log(document.location);

        if (document.location.href.includes('?forma=open')) {
            myModal.show();
        } else {
            myModal.hide();
        }
    };
    
    openModal.addEventListener('click', () => {
        history.pushState({ page: 1 }, '', '?forma=open');
        onpopstate();
    });

    closeModal.addEventListener('click', () => {
        history.back();
    });

    sendForm.addEventListener('click', async function () {
        alert.classList.add('d-none');
        
        const fi = fio.value;
        const em = email.value;
        const me = message.value;
        const te = tel.value;
        const org = organization.value;
        const ag = agree.checked;
        
        if (!fi || !em || !te || !org || !ag) {
            return alert.classList.remove('d-none');
        }

        const response = await fetch("https://formcarry.com/s/hgoSGlL_9rh", {
            method: 'POST',
            headers: {
                'Accept': "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: fi, email: em, message: me,  })
        });

        const data = await response.json();
        
        if (data.code == 200) {
            alert.innerHTML = 'Данные отправлены успешно';
            alert.classList.remove('alert-danger');
            alert.classList.add('alert-success');
            alert.classList.remove('d-none');

        }

        localStorage.removeItem('fio');
        localStorage.removeItem('email');
        localStorage.removeItem('message');
        localStorage.removeItem('telephone');
        localStorage.removeItem('organization');
        fio.value = email.value = organization.value = message.value = tel.value = '';
    });

    function saveInStore () {
        const fi = fio.value;
        const em = email.value;
        const me = message.value;
        const te = tel.value;
        const org = organization.value;
        const ag = agree.checked;

        localStorage.setItem('fio', fi);
        localStorage.setItem('email', em);
        localStorage.setItem('message', me);
        localStorage.setItem('telephone', te);
        localStorage.setItem('organization', org);
    }
});
