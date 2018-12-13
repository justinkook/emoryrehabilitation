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
    sessionStorage.setItem('locationTag', `ga`);
    location.replace("/search")
});

$('#aqua').on('click', function (e) {
    e.preventDefault();
    let locationTag = $('#locationInput').val();
    sessionStorage.setItem('searchTag', `aquatic`);
    sessionStorage.setItem('locationTag', `ga`);
    location.replace("/search")
});

$('#hand').on('click', function (e) {
    e.preventDefault();
    let locationTag = $('#locationInput').val();
    sessionStorage.setItem('searchTag', `hand`);
    sessionStorage.setItem('locationTag', `ga`);
    location.replace("/search")
});

$('#func').on('click', function (e) {
    e.preventDefault();
    let locationTag = $('#locationInput').val();
    sessionStorage.setItem('searchTag', `functional`);
    sessionStorage.setItem('locationTag', `ga`);
    location.replace("/search")
});

$('#muscle').on('click', function (e) {
    e.preventDefault();
    let locationTag = $('#locationInput').val();
    sessionStorage.setItem('searchTag', `intramuscular`);
    sessionStorage.setItem('locationTag', `ga`);
    location.replace("/search")
});

$('#pelvic').on('click', function (e) {
    e.preventDefault();
    let locationTag = $('#locationInput').val();
    sessionStorage.setItem('searchTag', `pelvic`);
    sessionStorage.setItem('locationTag', `ga`);
    location.replace("/search")
});

$('#vesti').on('click', function (e) {
    e.preventDefault();
    let locationTag = $('#locationInput').val();
    sessionStorage.setItem('searchTag', `vestibular`);
    sessionStorage.setItem('locationTag', `ga`);
    location.replace("/search")
});

$('#women').on('click', function (e) {
    e.preventDefault();
    let locationTag = $('#locationInput').val();
    sessionStorage.setItem('searchTag', `women`);
    sessionStorage.setItem('locationTag', `ga`);
    location.replace("/search")
});

$('#work').on('click', function (e) {
    e.preventDefault();
    let locationTag = $('#locationInput').val();
    sessionStorage.setItem('searchTag', `work`);
    sessionStorage.setItem('locationTag', `ga`);
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
