const apiEndpoint = 'https://jsonplaceholder.typicode.com/users'
const attendeesList = document.getElementById('attendees')
const filterInput = document.getElementById('filter')

window.addEventListener('load', _ => {

    if('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('sw.js')
        } catch (error) {
            
        }
    }

    getAttendees()
} );

filterInput.addEventListener('keyup', renderAttendees)

let attendees = []

async function getAttendees() {
    const response = await fetch(apiEndpoint)
    const json = await response.json()
    attendees = json.map(dummyUserToAttendee)
    renderAttendees()
}

function renderAttendees() {
    attendeesList.innerHTML = attendees
        .filter(x => x.name.toLowerCase().includes(filterInput.value.toLowerCase()))
        .map(attendeeToHtml)
        .join('\n')
}

function dummyUserToAttendee(u) {
    return {
        name: u.name,
        email: u.email,
        phone: u.phone,
        company: u.company.name
    }
}

function attendeeToHtml(a) {
    return `
        <li data-name=${a.name} data-company=${a.company}>
            ${a.name} (${a.company}) t:${a.phone}
        </li>
    `
}

