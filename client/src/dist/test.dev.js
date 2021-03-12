"use strict";

var _data = _interopRequireDefault(require("./data.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var loadData = function loadData() {
  //Difficulties
  var difficulties = _data["default"].difficulties.map(function (difficulty, index) {
    var id = difficulty.id,
        level = difficulty.level;
    var difficultyObject = {
      id: id,
      level: level,
      selected: false
    };
    index === 0 ? difficultyObject.selected = true : difficultyObject.selected = false;
    return difficultyObject;
  });

  var languageReducer = 'ro'; //Languages
  // const languages = data.languages.map((language) => {
  //   const { id, code, name } = language;
  //   return {
  //     id,
  //     code,
  //     name,
  //   };
  // });
  // const language = 'en';
  // const phrases = [];
  // const categories = data.languages
  //   .filter((lang) => lang.code == language)
  //   .map((lang) => {
  //     return [
  //       ...lang.categories.map((cat, index) => {
  //         const { id, name } = cat;
  //         const category = {
  //           id,
  //           name,
  //           selected: index == 0,
  //         };
  //         cat.phrases.map((phrase) => phrases.push(phrase));
  //         return category;
  //       }),
  //     ];
  //   })
  //   .flat();
  // console.log(phrases);
  //Categories
  // const categoriesArray = data.languages.map((language) => {
  //   const { categories, code } = language;
  //   const category = categories.map((cat, index) => {
  //     const { id, name } = cat;
  //     const object = {
  //       languageCode: code,
  //       id,
  //       name,
  //       selected: false,
  //     };
  //     index === 0 ? (object.selected = true) : (object.selected = true);
  //     return object;
  //   });
  //   return category;
  // });
  // const categories = [].concat.apply([], categoriesArray);
  // const allPhrases = [];
  // data.languages.map((language) => {
  //   const { categories, id } = language;
  //   categories.map((cat) => {
  //     const categoryId = cat.id;
  //     const { phrases } = cat;
  //     phrases.map((phrase) => {
  //       const object = {
  //         ...phrase,
  //         categoryId,
  //         languageId: id,
  //       };
  //       allPhrases.push(object);
  //     });
  //   });
  // });

  var phrases = _data["default"].languages.find(function (lang) {
    return lang.code == language;
  }) // .categories.filter((cat) => cat.selected == true)
  .categories.filter(function (category) {
    return categories.filter(function (cat) {
      return cat.selected === true;
    }).map(function (cat) {
      return cat.id;
    }).includes(category.id);
  });

  console.log(phrases); // console.log(categories.map((cat) => cat.id));
  // .filter((category) => categories.map((cat) => cat.id).includes(category.id))
  // .map((cat) => cat.words);
  // .filter(word=> word.difficultyId == difficulties.find(difficulty => difficulty.selected = true).map(difficulty => {return {difficulty.id}}))
};

loadData(); // selectedWords: Phrase [],
// difficulties:[{id:0,level:1,selected:true},,{id:0,level:2}]
// // selectedCategories: Category[] = [{id: 0, name: 'animale'}, {id:1, name: 'obiecte'}]
// categories=[{id: 0, name: 'animale', selected: true}, {id:1, name: 'obiecte'}]
//selectedWrods ['masina','bata'] = categori = obiecte
//categori animale
//categorie
// limba joculu ro / en =
// cuvinte ro / chineza =
// filter [limbi de pe server ()]
// v1.29(51/w)
// v1.29(52/w)
// 10 Category
// 2 limbi
// 3 difalculty
// allWords = {
//   {
//     phrase:"masina",
//     language:'romana',
//     lavel:1,
//     categorie:"animal"
//   }