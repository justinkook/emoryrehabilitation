let insuranceList;

$.get('/api/insurance')
  .then(function(data) {
    insuranceList = data;
    state.runCommand.render(insuranceList);
  });

const state = {

  runCommand: {
    emptify: () => {
      $('#listArea').empty();
    },
    render: (array) => {
      array.forEach(e => {
        $('#listArea').append(`<tbody><tr><td>${e.name}</td></tr></tbody>`);
      });
    },
    containfy: (e) => {
      e.preventDefault();
      state.runCommand.emptify();
      const inputFilter = $('#inputCont').val().trim();
      let containList = insuranceList.filter(e => e.name.toLowerCase().includes(inputFilter.toLowerCase()));
      state.runCommand.render(containList);
      $('#inputCont').val(null);
    },
  },
};


//on submit button with id click, runs callback function
$('#contains').on('click', state.runCommand.containfy);
$('form').on('submit', state.runCommand.containfy);
$('#home').on('click', function () {
  location.replace("/")
})