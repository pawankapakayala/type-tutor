// Level 9 — Complex punctuation + quote swap
// quoteSwap: true means single ' and double " are swapped intentionally.
// The user presses ' to produce " and vice versa.
const stages = [
  "-This is not a chair.",
  "It is a table.",
  "The vase on the table is made of glass.",
  "The book kept on the table is perfect.",
  "Let's go!",
  "All tall walls fall; during an earthquake.",
  "The ill jill climbed the hill.",
  "My mother has made a big cake; it's yummy.",
  "In each town-Mumbai, Bangalore, and Chennai-we stayed in hotels.",
  " Help! he cried. I can't swim! ",
  "Have you read Harry Potter?",
  "I went to Delhi (my favourite city) and stayed there for three weeks.",
  "I don't often go swimming; I prefer to play cricket.",
  "Ugh! Why are you shouting at me?",
  "I wore a blue-colored, long skirt.",
];

const levelConfig = {
  currentLevel  : "level9",
  nextPage      : "level10.html",
  restartPage   : "level9.html",
  caseSensitive : true,
  quoteSwap     : true,
  hasTimer      : false,
  colorNumbers  : true,
  hasNumberRow  : true,
  useLetterBoxes: false,
};
