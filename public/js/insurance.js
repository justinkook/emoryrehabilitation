const state = {
  insuranceList: [{
      name: 'Aetna Workers’ Comp Access, LLC',
    },
    {
      name: 'Aetna',
    },
    {
      name: 'Align Network',
    },
    {
      name: 'Ambetter',
    },
    {
      name: 'BCBS HMO',
    },
    {
      name: 'BCBS POS',
    },
    {
      name: 'BCBS Blue Choice PPO',
    },
    {
      name: 'BCBS of GA PPO and Indemnity',
    },
    {
      name: 'BCBS Prudent Buyer Program',
    },
    {
      name: 'Blue Cross Blue Shield (HMO)',
    },
    {
      name: 'Care IQ',
    },
    {
      name: 'Choice Care PPO-Humana',
    },
    {
      name: 'Cigna (HMO/POS, GPPO, PPO)',
    },
    {
      name: 'Corvel Corporation',
    },
    {
      name: 'Coventry',
    },
    {
      name: 'Department of Labor',
    },
    {
      name: 'Emory-Walmart ACO',
    },
    {
      name: 'First Health',
    },
    {
      name: 'Galaxy Health Network',
    },
    {
      name: 'Global Medical Management',
    },
    {
      name: 'Harken Healthcare',
    },
    {
      name: 'Heartland',
    },
    {
      name: 'Humana',
    },
    {
      name: 'Humana Military Healthcare-Tricare',
    },
    {
      name: 'Kaiser',
    },
    {
      name: 'LifeWell Health Partners PPO',
    },
    {
      name: 'Mail Handlers',
    },
    {
      name: 'Medicare',
    },
    {
      name: 'Medrisk',
    },
    {
      name: 'Multiplan',
    },
    {
      name: 'Network Synergy Group',
    },
    {
      name: 'NovaNet',
    },
    {
      name: 'Private Healthcare Systems (PHCS)',
    },
    {
      name: 'SPNet',
    },
    {
      name: 'TriCare',
    },
    {
      name: 'United Healthcare',
    },
    {
      name: 'USA Managed Care Organization',
    }
  ],

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
      let containList = state.insuranceList.filter(e => e.name.toLowerCase().includes(inputFilter.toLowerCase()));
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