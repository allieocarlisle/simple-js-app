//below is the repository pattern, involving IIFE, to return and add all data
let pokemonRepository = (() => {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let myPokemonList = $('.pokemon-list');

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  //create button for each pokemon
  function addListItem(pokemon) {
    let listItemPokemon = $('<li class="list-group-item"></li>');
    let button = $(
      '<button class="pokemon-button btn btn-info" data-target="#pokemonModal" data-toggle="modal">' +
        pokemon.name +
        '</button>'
    );

    listItemPokemon.append(button);
    myPokemonList.append(listItemPokemon);

    button.on('click', function () {
      showDetails(pokemon);
    });
  }

  // get the name and url for pokemon via API
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // get more info on individual pokemon via API URL
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.imageBackUrl = details.sprites.back_default;
        item.height = details.height;
        item.types = details.types.map((types) => types.type.name);
        item.abilities = details.abilities.map(
          (abilities) => abilities.ability.name
        );
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $('<h3>' + pokemon.name + '</h3>');
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr('src', pokemon.imageUrl);
    let imageElementBack = $('<img class="modal-img-back" style="width:50%">');
    imageElementBack.attr('src', pokemon.imageBackUrl);
    let heightElement = $('<p>' + 'Height: ' + pokemon.height + 'm' + '</p>');
    let typesElement = $('<p>' + 'Types: ' + pokemon.types + '</p>');
    let abilitiesElement = $(
      '<p>' + 'Abilities: ' + pokemon.abilities + '</p>'
    );

    modalTitle.append(imageElementFront);
    modalTitle.append(imageElementBack);
    modalBody.append(nameElement);
    modalBody.append(heightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});