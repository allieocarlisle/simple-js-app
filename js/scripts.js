//below is the repository pattern, involving IIFE, to return and add all data
let pokemonRepository = (function() {
  let pokemonList = [
    {
      name: "Bulbasaur",
      height: 7,
      type: [
        "grass","monster"
      ]
    },
    {
      name: "Charmander",
      height: 6,
      type: [
        "dragon","monster"
      ]
    },
    {
      name: "Squirtle",
      height: 5,
      type: [
        "water", "monster"
      ]
    }
  ];

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
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listItemPokemon.appendChild(button);
    myPokemonList.appendChild(listItemPokemon);
  }
  
  return {
    add: add,
    getAll: getAll
    addListItem: addListItem
  };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
// pokemonRepository.getAll().forEach(printArrayDetails);
//end of repository pattern



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
