$('#submit-icon').on('click', function (e) {
    e.preventDefault();
    let locationTag = $('#locationInput').val().trim();
    let searchTag = $('#searchInput').val().trim();
    sessionStorage.setItem('searchTag', searchTag);
    sessionStorage.setItem('locationTag', locationTag);
    location.replace("/search")
});

$('form').on('submit', function (e) {
    e.preventDefault();
    let locationTag = $('#locationInput').val().trim();
    let searchTag = $('#searchInput').val().trim();
    sessionStorage.setItem('searchTag', searchTag);
    sessionStorage.setItem('locationTag', locationTag);
    location.replace("/search")
});

$('#spanish').on('click', function (e) {
    e.preventDefault();
    let locationTag = $('#locationInput').val();
    sessionStorage.setItem('searchTag', `spanish`);
    sessionStorage.setItem('locationTag', locationTag);
    location.replace("/search")
});

$('#aqua').on('click', function (e) {
    e.preventDefault();
    let locationTag = $('#locationInput').val();
    sessionStorage.setItem('searchTag', `aquatic`);
    sessionStorage.setItem('locationTag', locationTag);
    location.replace("/search")
});

$('#hand').on('click', function (e) {
    e.preventDefault();
    let locationTag = $('#locationInput').val();
    sessionStorage.setItem('searchTag', `hand`);
    sessionStorage.setItem('locationTag', locationTag);
    location.replace("/search")
});

$('#func').on('click', function (e) {
    e.preventDefault();
    let locationTag = $('#locationInput').val();
    sessionStorage.setItem('searchTag', `functional`);
    sessionStorage.setItem('locationTag', locationTag);
    location.replace("/search")
});

$('#muscle').on('click', function (e) {
    e.preventDefault();
    let locationTag = $('#locationInput').val();
    sessionStorage.setItem('searchTag', `intramuscular`);
    sessionStorage.setItem('locationTag', locationTag);
    location.replace("/search")
});

$('#pelvic').on('click', function (e) {
    e.preventDefault();
    let locationTag = $('#locationInput').val();
    sessionStorage.setItem('searchTag', `pelvic`);
    sessionStorage.setItem('locationTag', locationTag);
    location.replace("/search")
});

$('#vesti').on('click', function (e) {
    e.preventDefault();
    let locationTag = $('#locationInput').val();
    sessionStorage.setItem('searchTag', `vestibular`);
    sessionStorage.setItem('locationTag', locationTag);
    location.replace("/search")
});

$('#women').on('click', function (e) {
    e.preventDefault();
    let locationTag = $('#locationInput').val();
    sessionStorage.setItem('searchTag', `women`);
    sessionStorage.setItem('locationTag', locationTag);
    location.replace("/search")
});

$('#work').on('click', function (e) {
    e.preventDefault();
    let locationTag = $('#locationInput').val();
    sessionStorage.setItem('searchTag', `work`);
    sessionStorage.setItem('locationTag', locationTag);
    location.replace("/search")
});

$('#insurance').on('click', function (e) {
    e.preventDefault();
    location.replace("/insurance")
});

$('#specdrop').on('click', function(e) {
    $('#spec-content').toggleClass('show');
});

$('#langdrop').on('click', function(e) {
    $('#lang-content').toggleClass('show');
});
