// Level 1 — Home row: F D S A J K L ;
const stages = [
  "ffff AAAA dddd ssss",
  "fdsa fdsa fdsa fdsa",
  "asdf asdf ASdF asdf",
  "jjjj kkkk llll ;;;;",
  "jj kk ll ;;",
  "jkl; jkl; jkl; jkl; jkl;",
  ";lkj ;lkj ;lkj ;lkj ;lkj",
  "fad fads lad lads lass alas salad salads dad dads lad lads salads alas",
  "ad add ads adds as ask asks la lad lads lass da dad dada dada sa sad salad",
  "all fall falls alf alfa alfas fad fads salsa ska skald skalds flak flask flasks",
];

const levelConfig = {
  currentLevel  : "level1",
  nextPage      : "level2.html",
  restartPage   : "level1.html",
  caseSensitive : true,
  quoteSwap     : false,
  hasTimer      : false,
  colorNumbers  : false,
  hasNumberRow  : false,
  useLetterBoxes: true,   // level1 only: uses CSS letterBox classes
  introKeys     : ['f','a','d','s','j','k','l',';']
};
