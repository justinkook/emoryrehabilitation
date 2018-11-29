
$('#submit').on('click', function (e) {
    e.preventDefault();
    let locationTag = $('#locationInput').val();
    let searchTag = $('#searchInput').val().trim();
    sessionStorage.setItem('searchTag', `${searchTag}`);
    sessionStorage.setItem('locationTag', `${locationTag}`);
    location.replace("/search")
});

$('#spanish').on('click', function (e) {
    e.preventDefault();
    let locationTag = $('#locationInput').val();
    sessionStorage.setItem('searchTag', `spanish`);
    sessionStorage.setItem('locationTag', `${locationTag}`);
    location.replace("/search")
});

$('#aqua').on('click', function (e) {
    e.preventDefault();
    let locationTag = $('#locationInput').val();
    sessionStorage.setItem('searchTag', `aquatic`);
    sessionStorage.setItem('locationTag', `${locationTag}`);
    location.replace("/search")
});

$('#hand').on('click', function (e) {
    e.preventDefault();
    let locationTag = $('#locationInput').val();
    sessionStorage.setItem('searchTag', `hand`);
    sessionStorage.setItem('locationTag', `${locationTag}`);
    location.replace("/search")
});

$('#func').on('click', function (e) {
    e.preventDefault();
    let locationTag = $('#locationInput').val();
    sessionStorage.setItem('searchTag', `functional`);
    sessionStorage.setItem('locationTag', `${locationTag}`);
    location.replace("/search")
});

$('#muscle').on('click', function (e) {
    e.preventDefault();
    let locationTag = $('#locationInput').val();
    sessionStorage.setItem('searchTag', `intramuscular`);
    sessionStorage.setItem('locationTag', `${locationTag}`);
    location.replace("/search")
});

$('#pelvic').on('click', function (e) {
    e.preventDefault();
    let locationTag = $('#locationInput').val();
    sessionStorage.setItem('searchTag', `pelvic`);
    sessionStorage.setItem('locationTag', `${locationTag}`);
    location.replace("/search")
});

$('#vesti').on('click', function (e) {
    e.preventDefault();
    let locationTag = $('#locationInput').val();
    sessionStorage.setItem('searchTag', `vestibular`);
    sessionStorage.setItem('locationTag', `${locationTag}`);
    location.replace("/search")
});

$('#women').on('click', function (e) {
    e.preventDefault();
    let locationTag = $('#locationInput').val();
    sessionStorage.setItem('searchTag', `women`);
    sessionStorage.setItem('locationTag', `${locationTag}`);
    location.replace("/search")
});

$('#work').on('click', function (e) {
    e.preventDefault();
    let locationTag = $('#locationInput').val();
    sessionStorage.setItem('searchTag', `work`);
    sessionStorage.setItem('locationTag', `${locationTag}`);
    location.replace("/search")
});

$('#insurance').on('click', function (e) {
    e.preventDefault();
    location.replace("/insurance")
});



/**
 * Creates random number between 0 and 9. This 
 * is used as an index to reference items 
 * in the database. 
 */
// const bgIndex = Math.floor((Math.random() * 9) + 1);

/**
 * Generates the random background that changes
 * on reload. The styling for the background is 
 * inserted into the html as inline styling. 
 */
// const generate = function () {
//     $.ajax({
//         url: '/api/background',
//         method: 'GET',
//         dataType: 'json',
//     }).then(function (image) {
//         const newBG = image[bgIndex].url;
//         const rgba = "rgba(51, 51, 51, .3)";
//         $('body').css({
//             "background": "linear-gradient("
//                 + rgba + ","
//                 + rgba +
//                 ")" + "," + "url(" + newBG + ")",
//             "background-size": "cover",
//             "background-repeat": "no-repeat",
//             "background-position": "center"
//         });
//     });
// };

/**
 * Runs Generate on each load/reload of 
 * the homepage. 
 */
// window.onload = generate();
