document.addEventListener('DOMContentLoaded', function() {
const urlParams = new URLSearchParams(window.location.search);
const refCode = urlParams.get('rfc'); 

if (refCode) {
    const apiUrl = 'https://crm.dayonedevelopment.com/api/v1/history/save';
    fetch(apiUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ reference_code: refCode, action: 'Landed on Home page' })
    })
    .then(response => response.json())
    .then(data => {
    })
    .catch(error => {
    });
}
});
