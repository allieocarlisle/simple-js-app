//below is the repository pattern, involving IIFE, to return and add all data
let pokemonRepository = (() => {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let myPokemonList = $('pokemon-list');


  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  //create button for each pokemon
  function addListItem(pokemon){
    let listItemPokemon = $('<li class="list-group-item"></li>');
    let button = $('<button class="pokemon-button btn btn-info" data-target="#pokemonModal" data-toggle="modal">' + pokemon.name + '</button>');

    listItemPokemon.append(button);
    myPokemonList.append(listItemPokemon);

    button.on('click', function() {
      showDetails(pokemon);
    });
  }

  // get the name and url for pokemon via API
  function loadList(){
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  // get more info on individual pokemon via API URL
  function loadDetails(item){
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      item.abilities = details.abilities.map(abilities => abilities.ability.name);
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon){
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }
  
  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    // let $modalContainer = $("#modal-container");
    
    modalTitle.empty();
    modalBody.empty();
 
    let nameElement = $("<h1>" + pokemon.name + "</h1>");
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", pokemon.imageUrl);
    let heightElement = $("<p>" + "height : " + pokemon.height + "</p>");
    let typesElement = $("<p>" + "types : " + pokemon.types + "</p>");
    let abilitiesElement = $("<p>" + "abilities : " + pokemon.abilities + "</p>");
 
    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(heightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  // KEEP 112 - 127 & Add showDetailsModal: showDetailsModal below showDetails //
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal
  };

})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// below is historical Modal before Bootstrap was used 
// //Create Modal for each Pokemon
//     let modalContainer = document.querySelector('#modal-container');

  // let imageElement = document.createElement('img');
  // imageElement.classList.add('modal-image');
  // imageElement.setAttribute('src', image);

  // let nameElement = document.createElement('h1');
  // nameElement.innerText = name;

  // let heightElement = document.createElement('p');
  // heightElement.innerText = height;


//     function showModal(image, name, height) {
//       modalContainer.innerHTML= '';
//       let modal = document.createElement('div');
//       modal.classList.add('modal');

//       let closeButtonElement = document.createElement('button');
//       closeButtonElement.classList.add('modal-close');
//       closeButtonElement.innerText = 'Close';
//       closeButtonElement.addEventListener('click', hideModal);


//       modal.appendChild(closeButtonElement);
//       modal.appendChild(imageElement);
//       modal.appendChild(nameElement);
//       modal.appendChild(heightElement);
//       modalContainer.appendChild(modal);

//       modalContainer.classList.add('is-visible');
//     }

    // function hideModal() {
    //   modalContainer.classList.remove('is-visible');
    //   }

    // window.addEventListener('keydown', (e) => {
    //   if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    //     hideModal();
    //   }
    // });

    // modalContainer.addEventListener('click', (e) => {
    //   let target = e.target;
    //   if (target === modalContainer) {
    //     hideModal();
    //   }
    // });