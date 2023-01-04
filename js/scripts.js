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

  //create button for each pokemon
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
      showModal(pokemon.imageUrl, pokemon.name, pokemon.height, pokemon.types, pokemon.abilities);
    });
  }

  // get the name and url for pokemon
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

  // get more info on individual pokemon via api URL
  function loadDetails(item){
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      item.abilities = details.abilities.map(abilities) => abilities.ability.name);
    }).catch(function (e) {
      console.error(e);
    });
  }

  let imageElement = document.createElement('img');
  imageElement.classList.add('modal-image');
  imageElement.setAttribute('src', image);

  let nameElement = document.createElement('h1');
  nameElement.innerText = name;

  let heightElement = document.createElement('p');
  heightElement.innerText = height;

  function showModal(item) {
    //first thing is to create modal variables, these will basically a selector 
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");
    // let $modalContainer = $("#modal-container");
    
    // clear existing content of the modal - to start fresh every time you open a new pokemon
    // modalHeader.empty();
    
    modalTitle.empty();
    modalBody.empty();
 
    //creating element for name in modal content
    let nameElement = $("<h1>" + item.name + "</h1>");
    // // creating img in modal content 
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", item.imageUrl);
    // // creating element for height in modal content
    let heightElement = $("<p>" + "height : " + item.height + "</p>");
    // // creating element for weight in modal content
    let typesElement = $("<p>" + "types : " + item.types + "</p>");
    // // creating element for abilities in modal content
    let abilitiesElement = $("<p>" + "abilities : " + item.abilities + "</p>");
 
    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
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
