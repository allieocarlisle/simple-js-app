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

//start loop for pokemonList array:
for (let i=0; i < pokemonList.length; i++){
  document.write('<p>' + pokemonList[i].name + ': (height: ' + pokemonList[i].height + ') </p>')
//below is height conditional:
  if (pokemonList[i].height > 6){
  document.write('Wow, ' + pokemonList[i].name + ' is a big pokemon!')
}
}
