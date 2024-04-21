


function togglePage(pageId) {
    const todayPage = document.getElementById('today');
    const fiveDaysPage = document.getElementById('5day');
    const btnToday=document.getElementById('todayPage');
    const btnFiveDays=document.getElementById('fiveDaysPage');

    if (pageId === 'today') {
        todayPage.classList.add('activePage');
        fiveDaysPage.classList.remove('activePage');
        btnToday.classList.add('activeBtn');
        btnFiveDays.classList.remove('activeBtn');
    } else if (pageId === '5day') {
        fiveDaysPage.classList.add('activePage');
        todayPage.classList.remove('activePage');
        btnToday.classList.remove('activeBtn');
        btnFiveDays.classList.add('activeBtn');
    }
}
