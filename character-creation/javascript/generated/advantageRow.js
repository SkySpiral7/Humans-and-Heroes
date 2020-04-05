'use strict';
/**Call List onChange
Select Advantage: select();
Rank: changeRank();
Text: changeText();
*/

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AdvantageObject = function (_React$Component) {
   _inherits(AdvantageObject, _React$Component);

   function AdvantageObject(props) {
      _classCallCheck(this, AdvantageObject);

      var _this = _possibleConstructorReturn(this, (AdvantageObject.__proto__ || Object.getPrototypeOf(AdvantageObject)).call(this, props));

      _this.getState = function () {
         return JSON.clone(_this.state);
      };

      _this.getDerivedValues = function () {
         return JSON.clone(_this._derivedValues);
      };

      _this.getKey = function () {
         return _this._key;
      };

      _this.doesHaveRank = function () {
         return _this._derivedValues.hasRank;
      };

      _this.doesHaveText = function () {
         return _this._derivedValues.hasText;
      };

      _this.getCostPerRank = function () {
         return _this._derivedValues.costPerRank;
      };

      _this.getMaxRank = function () {
         return _this._derivedValues.maxRank;
      };

      _this.getName = function () {
         return _this.state.name;
      };

      _this.getRank = function () {
         return _this.state.rank;
      };

      _this.getText = function () {
         return _this.state.text;
      };

      _this.getTotal = function () {
         return _this._derivedValues.total;
      };

      _this.isBlank = function () {
         return _this.state.name === undefined;
      };

      _this.select = function () {
         CommonsLibrary.select.call(_this, _this.setAdvantage, 'advantageChoices' + _this._key, Main.advantageSection);
      };

      _this.changeRank = function () {
         CommonsLibrary.change.call(_this, _this.setRank, 'advantageRank' + _this._key, Main.advantageSection);
      };

      _this.changeText = function () {
         CommonsLibrary.change.call(_this, _this.setText, 'advantageText' + _this._key, Main.advantageSection);
      };

      _this.setAdvantage = function (nameGiven) {
         if (!Data.Advantage.names.contains(nameGiven)) {
            _this._resetValues();return;
         }
         var useNewData = !(_this.state.name === 'Minion' && nameGiven === 'Sidekick' || _this.state.name === 'Sidekick' && nameGiven === 'Minion');
         //if switching between 'Minion' and 'Sidekick' then keep the data, otherwise clear it out
         _this.state.name = nameGiven;
         _this._derivedValues.maxRank = Data.Advantage[_this.state.name].maxRank;
         _this._derivedValues.hasRank = 1 !== _this._derivedValues.maxRank; //if max rank is 1 then there are no ranks
         if (useNewData) _this.state.rank = 1;
         _this._derivedValues.costPerRank = Data.Advantage[_this.state.name].costPerRank;
         _this._derivedValues.total = _this._derivedValues.costPerRank * _this.state.rank;
         _this._derivedValues.hasText = Data.Advantage[_this.state.name].hasText;
         if (_this._derivedValues.hasText && useNewData) _this.state.text = Data.Advantage[_this.state.name].defaultText;
         //!derivedValues.hasText && useNewData (useNewData always true when !hasText):
         else if (useNewData) _this.state.text = undefined; //needs to be explicit so that the previous data is destroyed
         //else (!useNewData which always hasText) keep using the current text
      };

      _this.setRank = function (rankGiven) {
         if (_this.isBlank()) return;
         if (!_this._derivedValues.hasRank) return; //can only happen when loading
         _this.state.rank = sanitizeNumber(rankGiven, 1, 1);
         if (_this.state.rank > _this._derivedValues.maxRank) _this.state.rank = _this._derivedValues.maxRank;
         _this._derivedValues.total = _this._derivedValues.costPerRank * _this.state.rank;
      };

      _this.setText = function (textGiven) {
         if (_this.isBlank()) return; //TODO: looks like cargo cult
         if (!_this._derivedValues.hasText) return; //can only happen when loading
         _this.state.text = textGiven.trim(); //trimmed in case it needs to match up with something else
      };

      _this.render = function () {
         /*
         values used:
         state: {name, rank, text};
         derivedValues: {hasRank, costPerRank, total};
         key
         */
         var nameElement = null;
         var costElement = null;
         var textElement = null;
         var costPerRankElement = null;

         if (_this.state.name === 'Equipment') nameElement = React.createElement(
            'div',
            { className: 'col-6 col-lg-4 col-xl-auto' },
            React.createElement(
               'b',
               null,
               'Equipment'
            )
         );else {
            var displayGodhood = undefined !== Main && (Main.advantageSection.hasGodhoodAdvantages() || Main.canUseGodhood());
            //must check both hasGodhoodAdvantages and canUseGodhood since they are not yet in sync
            var options = Data.Advantage.names.filter(function (name) {
               return 'Equipment' !== name && (displayGodhood || !Data.Advantage[name].isGodhood);
            }).map(function (name) {
               return React.createElement(
                  'option',
                  { key: name },
                  name
               );
            });
            options.unshift(React.createElement(
               'option',
               { key: 'Select Advantage' },
               'Select Advantage'
            ));

            nameElement = React.createElement(
               'div',
               { className: 'col-12 col-sm-6 col-lg-4 col-xl-auto' },
               React.createElement(
                  'select',
                  { id: 'advantageChoices' + _this._key, onChange: function onChange() {
                        Main.advantageSection.getRowById(_this._key).select();
                     },
                     value: _this.state.name },
                  options
               )
            );
         }
         if (undefined !== _this.state.name) //done for blank
            {
               if (_this.state.name === 'Equipment') costElement = React.createElement(
                  'div',
                  { className: 'col-6 col-sm-3 col-lg-2 col-xl-auto' },
                  'Cost ',
                  ' ' + _this.state.rank
               );
               //state.rank is always defined but only show this if max rank is > 1
               else if (_this._derivedValues.hasRank) costElement = React.createElement(
                     'label',
                     { className: 'col-5 col-sm-3 col-lg-2 col-xl-auto' },
                     'Rank ',
                     ' ',
                     React.createElement('input', { type: 'text', size: '1', id: 'advantageRank' + _this._key,
                        onChange: function onChange() {
                           Main.advantageSection.getRowById(_this._key).changeRank();
                        }, value: _this.state.rank })
                  );

               if (undefined !== _this.state.text) {
                  textElement = React.createElement(
                     'div',
                     { className: 'col-12 col-sm-6' },
                     React.createElement('input', { type: 'text', style: 'width: 100%', id: 'advantageText' + _this._key,
                        onChange: function onChange() {
                           Main.advantageSection.getRowById(_this._key).changeText();
                        }, value: _this.state.text })
                  );
               }
               if (_this._derivedValues.costPerRank > 1) costPerRankElement = React.createElement(
                  'div',
                  { className: 'col-auto' },
                  '=\xA0 ',
                  _this._derivedValues.total
               );
            }

         return React.createElement(
            'div',
            { className: 'row' },
            nameElement,
            costElement,
            textElement,
            costPerRankElement
         );
      };

      _this.getUniqueName = function () {
         if (_this.isBlank()) return; //never hit
         if (_this.state.name === 'Minion' || _this.state.name === 'Sidekick') return 'Helper: ' + _this.state.text; //you can't have the same character be a minion and sidekick
         if (_this._derivedValues.hasText) return _this.state.name + ': ' + _this.state.text;
         return _this.state.name;
      };

      _this.save = function () {
         //don't just clone state: rank is different
         var json = {};
         json.name = _this.state.name;
         //don't include rank if there's only 1 possible rank
         if (_this._derivedValues.hasRank) json.rank = _this.state.rank;
         //checking hasText is redundant but more clear
         if (_this._derivedValues.hasText) json.text = _this.state.text;
         return json;
      };

      _this._resetValues = function () {
         _this.state = {};
         _this._derivedValues = { total: 0 };
      };

      _this._key = props.callbackId;
      props.instanceCallBack(_this);
      _this._resetValues();
      return _this;
   }

   //region single line functions (most Basic getters)
   //defensive copy is important to prevent tamper
   //clone is for tests

   //endregion single line functions (most Basic getters)

   //Onchange section
   /**Onchange function for selecting an advantage*/

   /**Onchange function for changing the rank*/

   /**Onchange function for changing the text*/


   /*TODO: all state changes must be setState:
   this.setState((state) =>
      {
         state.equipment.removeByValue(oldName);
         return state;
      });
   */

   //Value setting section
   /**Populates data of the advantage by using the name (which is validated).
   This must be called before any other data of this row is set.
   The data set is independent of the document and doesn't call update.*/

   /**Used to set data independent of the document and without calling update*/

   /**Used to set data independent of the document and without calling update*/


   //public function section
   /**This creates the page's html (for the row). called by advantage section only*/

   /**Get the name of the advantage appended with text to determine redundancy*/

   /**Returns a json object of this row's data*/


   return AdvantageObject;
}(React.Component);

function createAdvantageObject() {
   var key = MainObject.generateKey();
   var instance = null;
   var element = React.createElement(AdvantageObject, { key: key, callbackId: key, instanceCallBack: function instanceCallBack(newInstance) {
         instance = newInstance;
      } });
   return { instance: instance, element: element };
}

function renderAdvantageArray(rowArray) {
   ReactDOM.render(rowArray, document.getElementById('advantage-section'));
}
//TODO: test