'use strict';
/**Updates:
 Main.updateInitiative();
 Main.updateOffense();
 Main.defenseSection.calculateValues();
 Main.update();
 */

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AdvantageList = /*#__PURE__*/function (_React$Component) {
  _inherits(AdvantageList, _React$Component);

  var _super = _createSuper(AdvantageList);

  function AdvantageList(props) {
    var _this;

    _classCallCheck(this, AdvantageList);

    _this = _super.call(this, props); //state isn't allowed to be an array therefore everything is under the prop it
    //main is an external dependency

    _defineProperty(_assertThisInitialized(_this), "hasGodhoodAdvantages", function () {
      return _this._derivedValues.usingGodhoodAdvantages;
    });

    _defineProperty(_assertThisInitialized(_this), "hasSeizeInitiative", function () {
      return _this._derivedValues.rankMap.containsKey('Seize Initiative');
    });

    _defineProperty(_assertThisInitialized(_this), "isUsingPettyRules", function () {
      return _this._derivedValues.pettyRulesApply;
    });

    _defineProperty(_assertThisInitialized(_this), "getDerivedValues", function () {
      return JSON.clone(_this._derivedValues);
    });

    _defineProperty(_assertThisInitialized(_this), "getEquipmentMaxTotal", function () {
      return _this._derivedValues.equipmentMaxTotal;
    });

    _defineProperty(_assertThisInitialized(_this), "getRankFromMap", function (uniqueName) {
      return _this._derivedValues.rankMap.get(uniqueName);
    });

    _defineProperty(_assertThisInitialized(_this), "getRankMap", function () {
      return _this._derivedValues.rankMap;
    });

    _defineProperty(_assertThisInitialized(_this), "getTotal", function () {
      return _this._derivedValues.total;
    });

    _defineProperty(_assertThisInitialized(_this), "getState", function () {
      return JSON.clone(_this.state);
    });

    _defineProperty(_assertThisInitialized(_this), "addRow", function (newName) {
      //if coming from blank row's onChange then grab the added name from UI
      if (undefined === newName) newName = SelectUtil.getTextById('advantageChoices' + _this._blankKey);

      var advantageObject = _this._addRowNoPush(newName);

      _this._rowArray.push(advantageObject);

      if (_this._hasDuplicate()) //requires duplicate to be in this.rowArray
        {
          _this._rowArray.pop();

          _this.forceUpdate(); //to undo the DOM value

        } else {
        _this._prerender();

        _this.setState(function (state) {
          state.it.push(advantageObject.getState());
          return state;
        });
      }

      if (false && _this._hasDuplicate()) {
        //TODO: is setState twice better than forceUpdate? is there a way to store a complex state using redux etc?
        _this._rowArray.pop();

        _this._prerender();

        _this.setState(function (state) {
          state.it.pop();
          return state;
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "calculateEquipmentRank", function (equipTotal) {
      var equipmentIndex = 0; //due to sorting it is always first

      var newEquipmentRank = Math.ceil(equipTotal / 5);
      _this._derivedValues.equipmentMaxTotal = newEquipmentRank * 5; //rounded up to nearest 5

      var equipAdvDoesExists = !_this._rowArray.isEmpty() && 'Equipment' === _this._rowArray[equipmentIndex].getName();

      var equipAdvShouldExist = 0 !== newEquipmentRank;

      if (equipAdvDoesExists && equipAdvShouldExist) {
        /*update the rank is the only thing to do
        if rank is already correct don't trigger an update
        this happens when equipment updates something that doesn't change the rank*/
        if (_this._rowArray[equipmentIndex].getRank() === newEquipmentRank) return;

        _this._rowArray[equipmentIndex].setRank(newEquipmentRank);

        _this._prerender();

        _this.setState(function (state) {
          state.it[equipmentIndex].rank = newEquipmentRank;
          return state;
        });
      } else if (equipAdvDoesExists && !equipAdvShouldExist) {
        _this._removeRow(equipmentIndex);
      } else if (!equipAdvDoesExists && equipAdvShouldExist) {
        //doesn't use addRow because unshift instead of push and already did duplicate check
        var advantageObject = _this._addRowNoPush('Equipment'); //unshift = addFirst


        _this._rowArray.unshift(advantageObject);

        advantageObject.setRank(newEquipmentRank);

        _this._prerender();

        _this.setState(function (state) {
          state.it.unshift(advantageObject.getState());
          return state;
        });
      }
      /*else if(!equipAdvDoesExists && !equipAdvShouldExist)
      equipment section was empty and an update was triggered but nothing changed
      so do nothing because there's nothing to do.
      power list clear does this for now (react should fix)*/

    });

    _defineProperty(_assertThisInitialized(_this), "clear", function () {
      var equipmentIndex = 0; //due to sorting it is always first

      var equipAdvDoesExists = !_this._rowArray.isEmpty() && 'Equipment' === _this._rowArray[equipmentIndex].getName();

      if (equipAdvDoesExists) {
        //slice makes an array with only Equipment
        _this._rowArray = _this._rowArray.slice(equipmentIndex, 1);

        _this._prerender();

        _this.setState(function (state) {
          state.it = state.it.slice(equipmentIndex, 1); //doesn't change state.main

          return state;
        });
      } else {
        _this._rowArray = [];

        _this._prerender();

        _this.setState(function (state) {
          state.it = []; //doesn't change state.main

          return state;
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getIndexByKey", function (key) {
      if (key === _this._blankKey) throw new AssertionError('Blank row (' + key + ') has no row index');

      for (var i = 0; i < _this._rowArray.length; i++) {
        if (_this._rowArray[i].getKey() === key) return i;
      }

      throw new AssertionError('No row with id ' + key + ' (rowArray.length=' + _this._rowArray.length + ')');
    });

    _defineProperty(_assertThisInitialized(_this), "getRowByIndex", function (rowIndex) {
      return _this._rowArray[rowIndex];
    });

    _defineProperty(_assertThisInitialized(_this), "getRowByKey", function (key) {
      return _this._rowArray[_this.getIndexByKey(key)];
    });

    _defineProperty(_assertThisInitialized(_this), "indexToKey", function (rowIndex) {
      if (rowIndex === _this._rowArray.length) return _this._blankKey;
      return _this._rowArray[rowIndex].getKey();
    });

    _defineProperty(_assertThisInitialized(_this), "load", function (jsonSection) {
      //rowArray=[];  //not needed since Main.load calls Main.clear. and shouldn't be here in case equipment caused an advantage
      if (_this._rowArray.length > 1 || _this.state.it.length > 1) throw new AssertionError('Should\'ve cleared first');
      var newState = [];
      var duplicateCheck = [];
      /*keep the Equipment advantage if it exists
      if equipment section was loaded first then it would've created Equipment advantage so keep it
      if equipment section was loaded second then it will add/remove Equipment advantage next*/

      if (1 === _this.state.it.length) newState.push(_this._rowArray[0].getState());

      for (var i = 0; i < jsonSection.length; i++) {
        var nameToLoad = jsonSection[i].name;

        if (!Data.Advantage.names.contains(nameToLoad)) {
          Main.messageUser('AdvantageList.load.notExist', 'Advantage #' + (i + 1) + ': ' + nameToLoad + ' is not an advantage name.');
          continue;
        }

        if (Data.Advantage[nameToLoad].isGodhood && !Main.canUseGodhood()) {
          Main.messageUser('AdvantageList.load.godhood', 'Advantage #' + (i + 1) + ': ' + nameToLoad + ' is not allowed because transcendence is ' + Main.getTranscendence() + '.');
          continue;
        }

        if ('Equipment' === nameToLoad) continue; //allowed but ignored since it's always regenerated
        //doesn't use addRow for sake of bulk state change

        var advantageObject = _this._addRowNoPush(nameToLoad); //leave value as default if not in json. advantageObject will make sure the value is valid


        if (undefined !== jsonSection[i].rank) advantageObject.setRank(jsonSection[i].rank);
        if (undefined !== jsonSection[i].text) advantageObject.setText(jsonSection[i].text); //duplicateCheck after setting all values for the sake of getUniqueName

        if (duplicateCheck.contains(advantageObject.getUniqueName())) {
          Main.messageUser('AdvantageList.load.duplicate', 'Advantage #' + (i + 1) + ': ' + nameToLoad + ' is not allowed because the advantage already exists. Increase the rank instead or use different text.');
          continue;
        }

        _this._rowArray.push(advantageObject);

        duplicateCheck.push(advantageObject.getUniqueName());
        newState.push(advantageObject.getState());
      }

      _this._prerender();

      _this.setState(function (state) {
        state.it = newState;
        return state;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "save", function () {
      var json = [];

      for (var i = 0; i < _this._rowArray.length; i++) {
        json.push(_this._rowArray[i].save());
      }

      return json; //might still be empty
    });

    _defineProperty(_assertThisInitialized(_this), "setMainState", function (value) {
      /*don't prerender because ad list state isn't updating so we don't need to calculate anything just render
      plus calling prerender causes a resolvable circle*/
      _this.setState(function (state) {
        state.main.godhood = value;
        return state;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "updateByKey", function (updatedKey) {
      if (updatedKey === _this._blankKey) {
        throw new AssertionError('Can\'t update blank row ' + updatedKey);
      }

      var updatedIndex = _this.getIndexByKey(updatedKey);

      var newStateRow = _this._rowArray[updatedIndex].getState();

      _this._prerender();

      _this.setState(function (state) {
        //TODO: race conditions? merge issues? can this replace the others?
        state.it[updatedIndex] = newStateRow;
        return state;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "updateNameByKey", function (updatedKey) {
      if (updatedKey === _this._blankKey) {
        throw new AssertionError('Can\'t update name of blank row ' + updatedKey);
      }

      var updatedIndex = _this.getIndexByKey(updatedKey);

      var newName = _this._rowArray[updatedIndex].getName();

      if (undefined === newName || _this._hasDuplicate()) {
        _this._removeRow(updatedIndex);
      } else {
        _this._prerender();

        _this.setState(function (state) {
          state.it[updatedIndex].name = newName;
          return state;
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "updateRankByKey", function (updatedKey) {
      if (updatedKey === _this._blankKey) {
        throw new AssertionError('Can\'t update blank row ' + updatedKey);
      }

      var updatedIndex = _this.getIndexByKey(updatedKey);

      var newRank = _this._rowArray[updatedIndex].getRank();

      _this._prerender();

      _this.setState(function (state) {
        state.it[updatedIndex].rank = newRank;
        return state;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "updateTextByKey", function (updatedKey) {
      if (updatedKey === _this._blankKey) {
        throw new AssertionError('Can\'t update blank row ' + updatedKey);
      }

      var updatedIndex = _this.getIndexByKey(updatedKey);

      var newText = _this._rowArray[updatedIndex].getText();

      if (_this._hasDuplicate()) {
        _this._removeRow(updatedIndex);
      } else {
        _this._prerender();

        _this.setState(function (state) {
          state.it[updatedIndex].text = newText;
          return state;
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_addRowNoPush", function (newName) {
      //the row that was blank no longer is so use the blank key
      var advantageObject = new AdvantageObject(_this._blankKey);
      advantageObject.setAdvantage(newName); //need a new key for the new blank row

      _this._blankKey = MainObject.generateKey();
      return advantageObject;
    });

    _defineProperty(_assertThisInitialized(_this), "_calculateValues", function () {
      _this._derivedValues.rankMap.clear();

      _this._derivedValues.usingGodhoodAdvantages = false;
      _this._derivedValues.pettyRulesApply = true;
      _this._derivedValues.total = 0; //reset all these then recount them

      for (var i = 0; i < _this._rowArray.length; i++) {
        var advantageName = _this._rowArray[i].getName();

        if (Data.Advantage[advantageName].isGodhood) _this._derivedValues.usingGodhoodAdvantages = true; //do not connected with else since Petty Rules are godhood
        //petty rules needs to be tracked because it changes minimum possible power level

        if ('Your Petty Rules Don\'t Apply to Me' === advantageName) _this._derivedValues.pettyRulesApply = false;

        if (Data.Advantage.mapThese.contains(advantageName)) {
          //add instead of set these since map was empty and there are no redundant rows (using unique name)
          _this._derivedValues.rankMap.add(_this._rowArray[i].getUniqueName(), _this._rowArray[i].getRank());
        }

        _this._derivedValues.total += _this._rowArray[i].getTotal();
      }

      Main.setAdvantageGodhood(_this._derivedValues.usingGodhoodAdvantages);
    });

    _defineProperty(_assertThisInitialized(_this), "_hasDuplicate", function () {
      //can't change this to take an arg because update name/text will already be in state
      return _this._rowArray.map(function (item) {
        return item.getUniqueName();
      }).some(function (val, id, array) {
        return array.indexOf(val) !== id;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_notifyDependent", function () {
      if (typeof Main !== 'undefined') //happens during main's creation
        {
          Main.updateInitiative(); //Improved/Seize Initiative

          Main.updateOffense(); //some 1.0 advantages affect this so it needs to be updated

          Main.defenseSection.calculateValues(); //Defensive Roll

          Main.update(); //updates totals and power level
        }
    });

    _defineProperty(_assertThisInitialized(_this), "_prerender", function () {
      //don't update any state
      _this._calculateValues();

      _this._notifyDependent();
    });

    _defineProperty(_assertThisInitialized(_this), "_removeRow", function (rowIndex) {
      _this._rowArray.remove(rowIndex);

      _this._prerender();

      _this.setState(function (state) {
        state.it.remove(rowIndex);
        return state;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      /*don't check this.hasGodhoodAdvantages because global includes that
      don't call a main method for this because render should be pure*/
      var generateGodHood = _this.state.main.godhood;

      var elementArray = _this._rowArray.map(function (advantageObject) {
        return /*#__PURE__*/React.createElement(AdvantageRowHtml, {
          key: advantageObject.getKey(),
          keyCopy: advantageObject.getKey(),
          state: advantageObject.getState(),
          derivedValues: advantageObject.getDerivedValues(),
          generateGodHood: generateGodHood
        });
      }); //derivedValues is undefined and unused for blank


      elementArray.push( /*#__PURE__*/React.createElement(AdvantageRowHtml, {
        key: _this._blankKey,
        keyCopy: _this._blankKey,
        state: {},
        generateGodHood: generateGodHood
      }));
      return elementArray;
    });

    _this.state = {
      it: [],
      main: {
        godhood: false
      }
    };
    _this._rowArray = []; //state.it as custom objects

    _this._derivedValues = {
      equipmentMaxTotal: 0,
      usingGodhoodAdvantages: false,
      total: 0,
      pettyRulesApply: true,
      rankMap: new MapDefault({}, 0) //this has toJSON defined

    };
    _this._blankKey = MainObject.generateKey();
    props.callback(_assertThisInitialized(_this));
    return _this;
  } //region Single line function
  //endregion private functions


  return AdvantageList;
}(React.Component);

function createAdvantageList(callback) {
  ReactDOM.render( /*#__PURE__*/React.createElement(AdvantageList, {
    callback: callback
  }), document.getElementById('advantage-section'));
}