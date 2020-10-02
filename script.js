const url = ' http://localhost:3000/data';
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
                </li>
            `
        )
    });
};