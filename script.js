const url = 'http://localhost:3000/data';
const divResult = document.getElementById('divResult');

async function sendName(event) {
    event.preventDefault();

    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    const jobTitle = document.getElementById('job_title').value;

    const user = {
        first_name: firstName,
        last_name: lastName,
        job_title: jobTitle
    };

    console.log(user);

    const request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    const response = await fetch(request);
    const result = await response.json();

    divResult.innerHTML = '';
    getNames();
}

async function deleteName(id) {
    const url_delete = `http://localhost:3000/data/${id}`;

    const user = {
        first_name: '',
        last_name: '',
        job_title: ''
    };

    const request = new Request(url_delete, {
        method: 'DELETE',
        body: JSON.stringify(user),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });
    const response = await fetch(request);
    const result = await response.json();

    divResult.innerHTML = '';
    getNames();
}

async function editName(id) {
    const url_edit = `http://localhost:3000/data/${id}`;

    const editUser = {
        first_name: 'Paulo',
        last_name: 'Santos Soares',
        job_title: 'Programador'
    };

    const request = new Request(url_edit, {
        method: 'PUT',
        body: JSON.stringify(editUser),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    const response = await fetch(request);
    const result = await response.json();

    divResult.innerHTML = '';
    getNames();
}

async function getNames() {
    const response = await fetch(url);
    const result = await response.json();

    result.forEach(element => {
        divResult.insertAdjacentHTML('beforeend',
            `
                <li>
                    <p>${element.first_name}</p>
                    <p>${element.last_name}</p>
                    <p>${element.job_title}</p>
                    <button onclick="editName(${element.id})">Editar</button>
                    <button onclick="deleteName(${element.id})">Deletar</button>
                </li>
            `
        )
    });
};

getNames();