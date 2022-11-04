let pokemonRepository = (function() {
  let pokemonList = [];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }
  
  return {
    add: add,
    getAll: getAll
  };
})();

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

// //start loop for pokemonList array:
// for (let i=0; i < pokemonList.length; i++){
//   document.write('<p>' + pokemonList[i].name + ': (height: ' + pokemonList[i].height + ') </p>')
// //below is height conditional:
//   if (pokemonList[i].height > 6){
//   document.write('Wow, ' + pokemonList[i].name + ' is a big pokemon!')
// }
// }

//the code below uses the forEach() function to iterate over the Pokemon in my pokemonList.
function printArrayDetails(pokemon) {
  document.write('<p>' + pokemon.name + ' is ' + pokemon.height + ' m tall.</p>');
  if (pokemon.height > 6) {
    document.write('Wow - that\'s a big pokemon!')
  }
}
pokemonList.forEach(printArrayDetails);