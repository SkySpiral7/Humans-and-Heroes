'use strict';
/**Updates:
Main.updateInitiative();
Main.updateOffense();
Main.defenseSection.calculateValues();
*/

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AdvantageList = function (_React$Component) {
   _inherits(AdvantageList, _React$Component);

   function AdvantageList(props) {
      _classCallCheck(this, AdvantageList);

      //state isn't allowed to be an array therefore everything is under the prop it
      var _this = _possibleConstructorReturn(this, (AdvantageList.__proto__ || Object.getPrototypeOf(AdvantageList)).call(this, props));

      _this.hasGodhoodAdvantages = function () {
         return _this.usingGodhoodAdvantages;
      };

      _this.isUsingPettyRules = function () {
         return _this.pettyRulesApply;
      };

      _this.getEquipmentMaxTotal = function () {
         return _this.equipmentMaxTotal;
      };

      _this.getRankMap = function () {
         return _this.rankMap;
      };

      _this.getTotal = function () {
         return _this.total;
      };

      _this.clear = function () {
         _this.rowArray = [];
         _this.setState(function () {
            return { it: [] };
         });
      };

      _this.getRow = function (rowIndex) {
         return CommonsLibrary.getRow(_this.rowArray, rowIndex);
      };

      _this.getRowById = function (rowId) {
         return _this.rowArray[_this.getIndexById(rowId)];
      };

      _this.getIndexById = function (rowId) {
         if (rowId === _this.blankKey) {
            throw new Error('Can\'t get blank row ' + rowId);
         }
         //TODO: could speed up with a map<uuid, index> that reindexes on equipment and remove
         for (var i = 0; i < _this.rowArray.length; i++) {
            if (_this.rowArray[i].getKey() === rowId) return i;
         }
         throw new Error('No row with id ' + rowId + ' (rowArray.length=' + _this.rowArray.length + ')');
      };

      _this.save = function () {
         return CommonsLibrary.saveRows(_this.rowArray);
      };

      _this.updateByKey = function (updatedKey) {
         if (updatedKey === _this.blankKey) {
            throw new Error('Can\'t update blank row ' + updatedKey);
         }

         var updatedIndex = _this.getIndexById(updatedKey);
         var newStateRow = _this.rowArray[updatedIndex].getState();
         _this.setState(function (state) {
            //TODO: race conditions? merge issues? can this replace the others?
            state.it[updatedIndex] = newStateRow;
            return state;
         });
      };

      _this.updateNameByKey = function (updatedKey) {
         if (updatedKey === _this.blankKey) {
            throw new Error('Can\'t update name of blank row ' + updatedKey);
         }

         var updatedIndex = _this.getIndexById(updatedKey);
         var newName = _this.rowArray[updatedIndex].getName();

         if (undefined === newName || _this.isDuplicate()) {
            _this.removeRow(updatedIndex);
         } else {
            _this.setState(function (state) {
               state.it[updatedIndex].name = newName;
               return state;
            });
         }
      };

      _this.updateRankByKey = function (updatedKey) {
         if (updatedKey === _this.blankKey) {
            throw new Error('Can\'t update blank row ' + updatedKey);
         }

         var updatedIndex = _this.getIndexById(updatedKey);
         var newRank = _this.rowArray[updatedIndex].getRank();
         _this.setState(function (state) {
            state.it[updatedIndex].rank = newRank;
            return state;
         });
      };

      _this.updateTextByKey = function (updatedKey) {
         if (updatedKey === _this.blankKey) {
            throw new Error('Can\'t update blank row ' + updatedKey);
         }

         var updatedIndex = _this.getIndexById(updatedKey);
         var newText = _this.rowArray[updatedIndex].getText();
         if (_this.isDuplicate()) {
            _this.removeRow(updatedIndex);
         } else {
            _this.setState(function (state) {
               state.it[updatedIndex].text = newText;
               return state;
            });
         }
      };

      _this.render = function () {
         _this.calculateValues();
         _this.notifyDependent();

         var elementArray = _this.rowArray.map(function (advantageObject) {
            return React.createElement(AdvantageRowHtml, { key: advantageObject.getKey(), myKey: advantageObject.getKey(),
               state: advantageObject.getState(), derivedValues: advantageObject.getDerivedValues() });
         });
         elementArray.push(React.createElement(AdvantageRowHtml, { key: _this.blankKey, myKey: _this.blankKey, state: {} }));
         return (
            //TODO: does this div show?
            React.createElement(
               'div',
               null,
               elementArray
            )
         );
      };

      _this.removeRow = function (rowIndex) {
         _this.rowArray.remove(rowIndex);
         _this.setState(function (state) {
            state.it.remove(rowIndex);
            return state;
         });
      };

      _this.isDuplicate = function () {
         return _this.rowArray.map(function (item) {
            return item.getUniqueName();
         }).some(function (val, id, array) {
            return array.indexOf(val) !== id;
         });
      };

      _this.calculateValues = function () {
         _this.rankMap.clear();
         _this.usingGodhoodAdvantages = false;
         _this.pettyRulesApply = true;
         _this.total = 0; //reset all these then recount them

         for (var i = 0; i < _this.rowArray.length; i++) {
            var advantageName = _this.rowArray[i].getName();
            if (Data.Advantage[advantageName].isGodhood) _this.usingGodhoodAdvantages = true;
            //do not connected with else since Petty Rules are godhood
            if (advantageName === 'Your Petty Rules Don\'t Apply to Me') _this.pettyRulesApply = false;
            //this needs to be tracked because it changes minimum possible power level
            if (Data.Advantage.mapThese.contains(advantageName)) _this.rankMap.add(_this.rowArray[i].getUniqueName(), _this.rowArray[i].getRank());
            //add instead of set these since map is empty and there are no redundant rows (using unique name)
            _this.total += _this.rowArray[i].getTotal();
         }
      };

      _this.load = function (jsonSection) {
         //rowArray=[new AdvantageObject(0)];  //not needed since Main.load calls Main.clear. and shouldn't be here in case equipment caused an advantage
         for (var i = 0; i < jsonSection.length; i++) {
            var nameToLoad = jsonSection[i].name;
            if (!Data.Advantage.names.contains(nameToLoad)) {
               Main.messageUser('AdvantageList.load.notExist', 'Advantage #' + (i + 1) + ': ' + nameToLoad + ' is not an advantage name.');continue;
            }
            if (Data.Advantage[nameToLoad].isGodhood && !Main.canUseGodhood()) {
               Main.messageUser('AdvantageList.load.godhood', 'Advantage #' + (i + 1) + ': ' + nameToLoad + ' is not allowed because transcendence is ' + Main.getTranscendence() + '.');continue;
            }
            var rowPointer = _this.rowArray.last();
            rowPointer.setAdvantage(nameToLoad);
            if (undefined !== jsonSection[i].rank) rowPointer.setRank(jsonSection[i].rank);
            if (undefined !== jsonSection[i].text) rowPointer.setText(jsonSection[i].text);
            //TODO: setState in load
         }
      };

      _this.addRow = function () {
         //the row that was blank no longer is so use the blank key
         var advantageObject = new AdvantageObject(_this.blankKey);
         advantageObject.setAdvantage(SelectUtil.getTextById('advantageChoices' + _this.blankKey));
         //need a new key for the new blank row
         _this.blankKey = MainObject.generateKey();

         _this.rowArray.push(advantageObject);
         if (_this.isDuplicate()) //requires duplicate to be in this.rowArray
            {
               _this.rowArray.pop();
               _this.forceUpdate(); //to undo the DOM value
            } else {
            _this.setState(function (state) {
               state.it.push(advantageObject.getState());
               return state;
            });
         }

         if (false && _this.isDuplicate()) {
            //TODO: is setState twice better than forceUpdate? is there a way to store a complex state using redux etc?
            _this.rowArray.pop();
            _this.setState(function (state) {
               state.it.pop();
               return state;
            });
         }
      };

      _this.calculateEquipmentRank = function (equipTotal) {
         var equipmentIndex = 0; //due to sorting it is always first
         if (_this.rowArray.isEmpty() || 'Equipment' !== _this.rowArray[equipmentIndex].getName()) //if there is no equipment advantage
            {
               if (0 === equipTotal) {
                  _this.equipmentMaxTotal = 0;return;
               } //I don't need to add a row

               //TODO: make DRY with addRow
               //the row that was blank no longer is so use the blank key
               var advantageObject = new AdvantageObject(_this.blankKey);
               advantageObject.setAdvantage('Equipment');
               //need a new key for the new blank row
               _this.blankKey = MainObject.generateKey();

               //unshift = addFirst
               _this.rowArray.unshift(advantageObject);
               _this.setState(function (state) {
                  state.it.unshift(advantageObject.getState());
                  return state;
               });
            } else if (0 === equipTotal) _this.removeRow(equipmentIndex); //don't need the row any more

         var newEquipmentRank = Math.ceil(equipTotal / 5);
         _this.equipmentMaxTotal = newEquipmentRank * 5; //rounded up to nearest 5

         _this.rowArray[equipmentIndex].setRank(newEquipmentRank);
         _this.setState(function (state) {
            state.it[equipmentIndex].rank = newEquipmentRank;
            return state;
         });
      };

      _this.notifyDependent = function () {
         if (typeof Main !== 'undefined') //happens during main's creation
            {
               Main.updateInitiative();
               Main.updateOffense(); //some 1.0 advantages might affect this so it needs to be updated
               Main.defenseSection.calculateValues();
               Main.update(); //updates totals and power level
            }
      };

      _this.state = { it: [] };
      //TODO: move all this junk into derivedValues
      _this.equipmentMaxTotal = 0;
      _this.usingGodhoodAdvantages = false;
      _this.total = 0;
      _this.pettyRulesApply = true;
      _this.rankMap = new MapDefault({}, 0);
      _this.rowArray = [];
      props.callback(_this);
      _this.blankKey = MainObject.generateKey();
      return _this;
   }

   //Single line function section

   //TODO: upgrade to babel 7 to get real private by using # (although IDE doesn't support it?)
   //TODO: do I ever care about hasGodhoodAdvantages?
   /**Returns false if the advantage "Your Petty Rules Don't Apply to Me" exists and true otherwise*/


   //public common section
   /**Removes all rows then updates*/

   /**Returns the row object or nothing if the index is out of range. Used by tests and debugging*/
   //TODO: rename to getRowByIndex

   /**Returns the row object or throws if the index is out of range. Used in order to call each onChange*/

   /**Returns an array of json objects for this section's data*/


   //'private' commons section. Although all public none of these should be called from outside of this object

   /**Removes the row from the array and updates the index of all others in the list.*/

   /**@returns true if 2+ rows in rowArray have the same UniqueName*/


   //public functions section
   /**Counts totals etc. All values that are not user set or final are created by this method*/

   /**Sets data from a json object given then updates.*/


   //'private' functions section. Although all public none of these should be called from outside of this object
   /**Creates a new row at the end of the array*/

   /**This calculates the required rank of the equipment advantage and adds or removes the advantage row accordingly*/

   /**Updates other sections which depend on advantage section*/


   return AdvantageList;
}(React.Component);

//TODO: test

function createAdvantageList(callback) {
   ReactDOM.render(React.createElement(AdvantageList, { callback: callback }), document.getElementById('advantage-section'));
}