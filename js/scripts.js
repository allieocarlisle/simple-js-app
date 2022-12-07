//below is the repository pattern, involving IIFE, to return and add all data
let pokemonRepository = (() => {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon){
    let myPokemonList = document.querySelector('.pokemon-list');
    let listItemPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.addEventListener('click', function (button) {
      showDetails(pokemon);
    })
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listItemPokemon.appendChild(button);
    myPokemonList.appendChild(listItemPokemon);
  }

  function showDetails(pokemon){
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

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

  function loadDetails(item){
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

//Create Modal for each Pokemon
  (function() {

    let modalContainer = document.querySelector('#modal-container');

    function showModal(image, name, height) {
      modalContainer.innerHTML= '';
      let modal = document.createElement('div');
      modal.classList.add('modal');

      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);

      let imageElement = document.createElement('img');
      imageElement.innerText = image;

      let nameElement = document.createElement('h1');
      nameElement.innerText = name;

      let heightElement = document.createElement('p');
      heightElement.innerText = height;

      modal.appendChild(closeButtonElement);
      modal.appendChild(imageElement);
      modal.appendChild(nameElement);
      modal.appendChild(heightElement);
      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');
    }

    function hideModal() {
      modalContainer.classList.remove('is-visible') {
        hideModal();
      }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });

    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });

    document.querySelector('.pokemon-list').addEventListener('click', () => {
      showModal('Pokemon Image', 'pokemon name', 'pokemon height');
    });

    }

  })(); 

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});



// below is historical code - keeping for reference
//start loop for pokemonList array:
// for (let i=0; i < pokemonList.length; i++){
//   document.write('<p>' + pokemonList[i].name + ': (height: ' + pokemonList[i].height + ') </p>')
// //below is height conditional:
//   if (pokemonList[i].height > 6){
//   document.write('Wow, ' + pokemonList[i].name + ' is a big pokemon!')
// }
// }

//the code below uses the forEach() function to iterate over the Pokemon in my pokemonList.
// function printArrayDetails(pokemon) {
//   document.write('<p>' + pokemon.name + ' is ' + pokemon.height + ' m tall.</p>');
//   if (pokemon.height > 6) {
//     document.write('Wow - that\'s a big pokemon!')
//   }
// }
