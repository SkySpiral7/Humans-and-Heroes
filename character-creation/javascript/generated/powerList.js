'use strict';
/**Updates:
 modifiers
 if (equipment)
 {
     Main.advantageSection.calculateValues();
     Main.advantageSection.generate();
 }
 Main.updateOffense();
 Main.defenseSection.calculateValues();

 Use (this === Main.equipmentSection) instead of checking the sectionName. but sectionName is still needed and passed for document reasons*/

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

var PowerListAgnostic = /*#__PURE__*/function (_React$Component) {
  _inherits(PowerListAgnostic, _React$Component);

  var _super = _createSuper(PowerListAgnostic);

  function PowerListAgnostic(props) {
    var _this;

    _classCallCheck(this, PowerListAgnostic);

    _this = _super.call(this, props); //state isn't allowed to be an array therefore everything is under the prop it
    //main is an external dependency

    _defineProperty(_assertThisInitialized(_this), "getAttackEffectRanks", function () {
      return _this._derivedValues.attackEffectRanks;
    });

    _defineProperty(_assertThisInitialized(_this), "getProtectionRankTotal", function () {
      return _this._derivedValues.protectionRankTotal;
    });

    _defineProperty(_assertThisInitialized(_this), "getSectionName", function () {
      return _this.props.sectionName;
    });

    _defineProperty(_assertThisInitialized(_this), "getState", function () {
      return JSON.clone(_this.state);
    });

    _defineProperty(_assertThisInitialized(_this), "getTotal", function () {
      return _this._derivedValues.total;
    });

    _defineProperty(_assertThisInitialized(_this), "clear", function () {
      _this._rowArray = [];

      _this._prerender();

      _this.setState(function (state) {
        state.it = []; //doesn't change state.main

        return state;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "indexToKey", function (rowIndex) {
      if (rowIndex === _this._rowArray.length) return _this._blankPowerKey;
      return _this._rowArray[rowIndex].getKey();
    });

    _defineProperty(_assertThisInitialized(_this), "indexToPowerAndModifierKey", function (powerIndex, modifierIndex) {
      if (powerIndex === _this._rowArray.length) throw new AssertionError('Blank power row (' + key + ') has no modifiers');

      var powerKey = _this._rowArray[powerIndex].getKey();

      var modifierKey = _this._rowArray[powerIndex].getModifierList().indexToKey(modifierIndex);

      return powerKey + '.' + modifierKey;
    });

    _defineProperty(_assertThisInitialized(_this), "getRowByIndex", function (rowIndex) {
      return _this._rowArray[rowIndex];
    });

    _defineProperty(_assertThisInitialized(_this), "save", function () {
      var json = [];

      for (var i = 0; i < _this._rowArray.length; i++) {
        json.push(_this._rowArray[i].save());
      }

      return json; //might still be empty
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      /*equipment can't be god-like so exclude it
      don't check usingGodhoodPowers because global includes that
      don't call a main method for this because render should be pure.*/
      var generateGodHood = 'equipment' !== _this.props.sectionName && _this.state.main.godhood;

      var elementArray = _this.state.it.map(function (state, powerIndex) {
        var powerRow = _this._rowArray[powerIndex];
        var rowKey = powerRow.getKey(); //getDerivedValues makes a clone

        var rowDerivedValues = powerRow.getDerivedValues(); //TODO: it's stupid that main use has several useless args

        var loadLocation = {
          toString: function toString() {
            throw new AssertionError('Should already be valid.');
          }
        };
        rowDerivedValues.possibleActions = PowerObjectAgnostic._validateAndGetPossibleActions(state, state, state.duration, loadLocation).choices;
        rowDerivedValues.possibleRanges = PowerObjectAgnostic._getPossibleRanges(state, state.action, state.range);
        rowDerivedValues.possibleDurations = PowerObjectAgnostic._validateAndGetPossibleDurations(state, state, state.range, loadLocation).choices;
        return /*#__PURE__*/React.createElement(PowerRowHtml, {
          key: rowKey,
          keyCopy: rowKey,
          state: state,
          derivedValues: rowDerivedValues,
          sectionName: _this.props.sectionName,
          powerRow: powerRow,
          powerSection: _assertThisInitialized(_this),
          generateGodHood: generateGodHood
        });
      });

      elementArray.push( /*#__PURE__*/React.createElement(PowerRowHtml, {
        key: _this._blankPowerKey,
        keyCopy: _this._blankPowerKey,
        state: {},
        derivedValues: undefined,
        sectionName: _this.props.sectionName,
        powerRow: undefined,
        powerSection: _assertThisInitialized(_this),
        generateGodHood: generateGodHood
      }));
      return elementArray;
    });

    _defineProperty(_assertThisInitialized(_this), "setMainState", function (value) {
      /*don't prerender because ad list state isn't updating so we don't need to calculate anything just render.
      plus calling prerender causes a resolvable circle*/
      _this.setState(function (state) {
        state.main.godhood = value;
        return state;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "updateEffectByKey", function (newEffect, updatedKey) {
      var transcendence = Main.getTranscendence();
      var sectionName = _this.props.sectionName;

      if (updatedKey === _this._blankPowerKey) {
        var validState = PowerObjectAgnostic.sanitizeState({
          effect: newEffect
        }, sectionName, _this._rowArray.length, transcendence);

        _this._addRowNoSetState(validState);

        _this._prerender();

        _this.setState(function (state) {
          state.it.push(validState);
          return state;
        });

        return;
      }

      var updatedIndex = _this.getIndexByKey(updatedKey);

      if (!Data.Power.names.contains(newEffect)) {
        _this._removeRow(updatedIndex);
      } else {
        var powerState = PowerObjectAgnostic.sanitizeState({
          effect: newEffect
        }, sectionName, updatedIndex, transcendence);
        _this._rowArray[updatedIndex] = new PowerObjectAgnostic({
          key: _this._rowArray[updatedIndex].getKey(),
          sectionName: _this.props.sectionName,
          powerListParent: _assertThisInitialized(_this),
          state: powerState,
          modifierKeyList: _this._rowArray[updatedIndex].getModifierList().getKeyList()
        });

        _this._prerender();

        _this.setState(function (state) {
          state.it[updatedIndex] = powerState;
          return state;
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "updatePropertyByKey", function (propertyName, newValue, updatedKey) {
      if (updatedKey === _this._blankPowerKey) {
        throw new AssertionError('Can\'t update blank row ' + updatedKey);
      }

      var updatedIndex = _this.getIndexByKey(updatedKey);

      var powerState = _this._rowArray[updatedIndex].getState();

      powerState[propertyName] = newValue;
      var transcendence = Main.getTranscendence();
      powerState = PowerObjectAgnostic.sanitizeState(powerState, _this.props.sectionName, updatedIndex, transcendence); //sanitizeState may have auto added/removed modifiers so adjust key list

      var modifierKeyList = _this._rowArray[updatedIndex].getModifierList().getKeyList(); //grow as needed (>= because blank row has key but no state):


      while (powerState.Modifiers.length >= modifierKeyList.length) {
        modifierKeyList.push(MainObject.generateKey());
      } //shrink as needed (+1 for blank row):


      modifierKeyList.length = powerState.Modifiers.length + 1;
      _this._rowArray[updatedIndex] = new PowerObjectAgnostic({
        key: _this._rowArray[updatedIndex].getKey(),
        sectionName: _this.props.sectionName,
        powerListParent: _assertThisInitialized(_this),
        state: powerState,
        modifierKeyList: modifierKeyList
      });

      _this._prerender();

      _this.setState(function (state) {
        state.it[updatedIndex] = powerState;
        return state;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "updateModifierNameByRow", function (newName, powerRow, updatedModifierRow) {
      var powerIndex = _this.getIndexByKey(powerRow.getKey());

      if (undefined === updatedModifierRow) {
        _this._addModifierRow(powerIndex, newName);

        return;
      }

      var modifierSection = powerRow.getModifierList();
      var modifierIndex = modifierSection.getIndexByKey(updatedModifierRow.getKey()); //TODO: figure out how to handle duplicates

      if (!Data.Modifier.names.contains(newName)) {
        _this._removeModifierRow(powerIndex, modifierIndex);
      } else {
        var transcendence = Main.getTranscendence();
        var sectionName = _this.props.sectionName;

        var newModState = _this._rowArray[powerIndex].getState(); //TODO: most of the time a new name should clear other state


        newModState.Modifiers[modifierIndex].name = newName;
        newModState = PowerObjectAgnostic.sanitizeState(newModState, sectionName, _this._rowArray.length, transcendence);
        _this._rowArray[powerIndex] = new PowerObjectAgnostic({
          key: _this._rowArray[powerIndex].getKey(),
          sectionName: sectionName,
          powerListParent: _assertThisInitialized(_this),
          state: newModState,
          modifierKeyList: _this._rowArray[powerIndex].getModifierList().getKeyList()
        });

        _this._prerender();

        _this.setState(function (state) {
          state.it[powerIndex].Modifiers[modifierIndex] = newModState;
          return state;
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "updateModifierPropertyByRow", function (propertyName, newValue, updatedRow) {
      var powerIndex = _this.getIndexByKey(updatedRow.getPower().getKey());

      var modifierSection = updatedRow.getSection();
      var modifierIndex = modifierSection.getIndexByKey(updatedRow.getKey());

      var newModState = _this._rowArray[powerIndex].getState();

      newModState.Modifiers[modifierIndex][propertyName] = newValue;
      var transcendence = Main.getTranscendence();
      newModState = PowerObjectAgnostic.sanitizeState(newModState, _this.props.sectionName, powerIndex, transcendence);
      _this._rowArray[powerIndex] = new PowerObjectAgnostic({
        key: _this._rowArray[powerIndex].getKey(),
        sectionName: _this.props.sectionName,
        powerListParent: _assertThisInitialized(_this),
        state: newModState,
        modifierKeyList: _this._rowArray[powerIndex].getModifierList().getKeyList()
      });

      _this._prerender();

      _this.setState(function (state) {
        state.it[powerIndex].Modifiers[modifierIndex] = newModState;
        return state;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_addRowNoSetState", function (validState) {
      //the row that was blank no longer is so use the blank key
      //need a new key for each new mod (can be 1+ for load)
      var modifierKeyList = validState.Modifiers.map(function (_) {
        return MainObject.generateKey();
      });
      modifierKeyList.push(MainObject.generateKey()); //for blank

      var powerObject = new PowerObjectAgnostic({
        key: _this._blankPowerKey,
        sectionName: _this.props.sectionName,
        powerListParent: _assertThisInitialized(_this),
        state: validState,
        modifierKeyList: modifierKeyList
      }); //need a new key for the new blank power row

      _this._blankPowerKey = MainObject.generateKey();

      _this._rowArray.push(powerObject);
    });

    _defineProperty(_assertThisInitialized(_this), "_addModifierRow", function (powerIndex, newName) {
      var state = _this._rowArray[powerIndex].getState();

      state.Modifiers.push({
        name: newName
      });
      var transcendence = Main.getTranscendence();
      var sectionName = _this.props.sectionName;
      state = PowerObjectAgnostic.sanitizeState(state, sectionName, powerIndex, transcendence);
      var newModState = state.Modifiers.last();

      var modifierKeyList = _this._rowArray[powerIndex].getModifierList().getKeyList();

      modifierKeyList.push(MainObject.generateKey());
      _this._rowArray[powerIndex] = new PowerObjectAgnostic({
        key: _this._rowArray[powerIndex].getKey(),
        sectionName: _this.props.sectionName,
        powerListParent: _assertThisInitialized(_this),
        state: state,
        modifierKeyList: modifierKeyList
      });

      _this._prerender();

      _this.setState(function (state) {
        state.it[powerIndex].Modifiers.push(newModState);
        return state;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getIndexByKey", function (key) {
      if (key === _this._blankPowerKey) throw new AssertionError('Blank row (' + key + ') has no row index');

      for (var i = 0; i < _this._rowArray.length; i++) {
        if (_this._rowArray[i].getKey() === key) return i;
      }

      throw new AssertionError('No row with id ' + key + ' (rowArray.length=' + _this._rowArray.length + ')');
    });

    _defineProperty(_assertThisInitialized(_this), "_removeRow", function (rowIndex) {
      _this._rowArray.remove(rowIndex);

      _this._prerender();

      _this.setState(function (state) {
        state.it.remove(rowIndex);
        return state;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_removeModifierRow", function (powerIndex, modifierIndex) {
      var state = _this._rowArray[powerIndex].getState();

      state.Modifiers.remove(modifierIndex);

      var modifierKeyList = _this._rowArray[powerIndex].getModifierList().getKeyList();

      modifierKeyList.remove(modifierIndex);
      _this._rowArray[powerIndex] = new PowerObjectAgnostic({
        key: _this._rowArray[powerIndex].getKey(),
        sectionName: _this.props.sectionName,
        powerListParent: _assertThisInitialized(_this),
        state: state,
        modifierKeyList: modifierKeyList
      });

      _this._prerender();

      _this.setState(function (state) {
        state.it[powerIndex].Modifiers.remove(modifierIndex);
        return state;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_prerender", function () {
      //don't update any state
      _this._calculateValues();

      _this._notifyDependent();
    });

    _defineProperty(_assertThisInitialized(_this), "_calculateValues", function () {
      _this._derivedValues.attackEffectRanks.clear();

      _this._derivedValues.protectionRankTotal = 0; //this makes math easier. will be set to null at bottom as needed

      var usingGodhoodPowers = false;
      _this._derivedValues.total = 0;

      for (var i = 0; i < _this._rowArray.length; i++) {
        _this._rowArray[i].calculateValues(); //will calculate rank and total


        var powerEffect = _this._rowArray[i].getEffect();

        var rank = _this._rowArray[i].getRank();

        if (Data.Power[powerEffect].isGodhood) usingGodhoodPowers = true;else if (1 === Main.getActiveRuleset().major && 'Protection' === powerEffect) _this._derivedValues.protectionRankTotal += rank; //protection only stacks in v1
        else if ('Protection' === powerEffect && rank > _this._derivedValues.protectionRankTotal) _this._derivedValues.protectionRankTotal = rank; //TODO: bug? what if there's multiple of same skill? why not just return [] of indexes?

        if (_this._rowArray[i].getName() !== undefined) _this._derivedValues.attackEffectRanks.add(_this._rowArray[i].getSkillUsed(), i);
        _this._derivedValues.total += _this._rowArray[i].getTotal();
      } //rank 0 is impossible. if it doesn't exist then use null instead


      if (0 === _this._derivedValues.protectionRankTotal) _this._derivedValues.protectionRankTotal = null; //equipment is always Godhood false. excluded to avoid messing up power Godhood

      if (undefined !== Main && _assertThisInitialized(_this) !== Main.equipmentSection) Main.setPowerGodhood(usingGodhoodPowers);
    });

    _defineProperty(_assertThisInitialized(_this), "getModifierRowShort", function (powerRowIndex, modifierRowIndex) {
      //TODO: is range check needed?
      if (powerRowIndex >= powerRowIndex.length) return; //range checking of modifierRowIndex will be handled in getRowByIndex

      return _this._rowArray[powerRowIndex].getModifierList().getRowByIndex(modifierRowIndex);
    });

    _defineProperty(_assertThisInitialized(_this), "load", function (jsonSection) {
      //the row array isn't cleared in case some have been auto set
      //Main.clear() is called at the start of Main.load()
      var transcendence = Main.getTranscendence();
      var sectionName = _this.props.sectionName;
      var newState = [];

      for (var powerIndex = 0; powerIndex < jsonSection.length; powerIndex++) {
        var jsonPowerRow = JSON.clone(jsonSection[powerIndex]);
        jsonPowerRow.baseCost = jsonPowerRow.cost;
        delete jsonPowerRow.cost;
        jsonPowerRow.skillUsed = jsonPowerRow.skill;
        delete jsonPowerRow.skill;

        if (undefined !== jsonPowerRow.Modifiers) {
          jsonPowerRow.Modifiers = jsonPowerRow.Modifiers.map(function (jsonModRow) {
            jsonModRow.rank = jsonModRow.applications;
            delete jsonModRow.applications;
            return jsonModRow;
          });
        }

        var validRowState = PowerObjectAgnostic.sanitizeState(jsonPowerRow, sectionName, powerIndex, transcendence);

        if (undefined !== validRowState) {
          //already sent message if invalid
          newState.push(validRowState);

          _this._addRowNoSetState(validRowState);
        }
      }

      _this._prerender();

      _this.setState(function (state) {
        state.it = newState;
        return state;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_notifyDependent", function () {
      if (_assertThisInitialized(_this) === Main.equipmentSection) {
        //always call it even if total is 0 because the row may need to be removed
        Main.advantageSection.calculateEquipmentRank(_this.getTotal());
      }

      Main.updateOffense();
      Main.defenseSection.calculateValues(); //TODO: resolve godhood circle:
      //Main.update();
      //high CP needs to trigger godhood but prerender can't update state
    });

    _this.state = {
      it: [],
      main: {
        godhood: false
      }
    };
    _this._rowArray = [];
    _this._derivedValues = {
      total: 0,
      protectionRankTotal: null,
      attackEffectRanks: new MapDefault({}, 0)
    };
    _this._blankPowerKey = MainObject.generateKey();

    _this._calculateValues();

    props.callback(_assertThisInitialized(_this));
    return _this;
  }

  return PowerListAgnostic;
}(React.Component);

function createPowerList(callback, sectionName) {
  ReactDOM.render( /*#__PURE__*/React.createElement(PowerListAgnostic, {
    callback: callback,
    sectionName: sectionName
  }), document.getElementById(sectionName + '-section'));
}