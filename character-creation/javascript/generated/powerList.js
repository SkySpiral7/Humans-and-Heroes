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

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

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

    _defineProperty(_assertThisInitialized(_this), "getRow", function (rowIndex) {
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
      _this._rowArray = [];

      var elementArray = _this.state.it.map(function (powerState) {
        var callback = function callback(newThing) {
          _this._rowArray.push(newThing);
        };

        var rowKey = MainObject.generateKey();
        return /*#__PURE__*/React.createElement(PowerObjectAgnostic, {
          key: rowKey,
          keyCopy: rowKey,
          sectionName: _this.props.sectionName,
          powerListParent: _assertThisInitialized(_this),
          state: powerState,
          callback: callback
        });
      });

      elementArray.push( /*#__PURE__*/React.createElement(PowerRowHtml, {
        sectionName: _this.props.sectionName,
        state: {},
        key: _this._blankKey,
        keyCopy: _this._blankKey
      }));
      return elementArray;
    });

    _defineProperty(_assertThisInitialized(_this), "_removeRow", function (rowIndex) {
      _this._rowArray.remove(rowIndex);

      _this._prerender();

      _this.setState(function (state) {
        state.it.remove(rowIndex);
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

      for (var i = 0; i < _this._rowArray.length - 1; i++) //the last row is always blank
      {
        _this._rowArray[i].calculateValues(); //will calculate rank and total


        var powerEffect = _this._rowArray[i].getEffect();

        var rank = _this._rowArray[i].getRank();

        if (Data.Power[powerEffect].isGodhood) usingGodhoodPowers = true;else if (1 === Main.getActiveRuleset().major && 'Protection' === powerEffect) _this._derivedValues.protectionRankTotal += rank; //protection only stacks in v1
        else if ('Protection' === powerEffect && rank > _this._derivedValues.protectionRankTotal) _this._derivedValues.protectionRankTotal = rank; //TODO: bug? what if there's multiple of same skill? why not just return [] of indexes?

        if (_this._rowArray[i].getName() !== undefined) _this._derivedValues.attackEffectRanks.add(_this._rowArray[i].getSkillUsed(), i);
        _this._derivedValues.total += _this._rowArray[i].getTotal();
      } //rank 0 is impossible. if it doesn't exist then use null instead


      if (0 === _this._derivedValues.protectionRankTotal) _this._derivedValues.protectionRankTotal = null; //equipment is always Godhood false. excluded to avoid messing up power Godhood

      if (_assertThisInitialized(_this) !== Main.equipmentSection) Main.setPowerGodhood(usingGodhoodPowers);
    });

    _defineProperty(_assertThisInitialized(_this), "getModifierRowShort", function (powerRowIndex, modifierRowIndex) {
      //TODO: is range check needed?
      if (powerRowIndex >= powerRowIndex.length) return; //range checking of modifierRowIndex will be handled in getRowByIndex

      return _this._rowArray[powerRowIndex].getModifierList().getRowByIndex(modifierRowIndex);
    });

    _defineProperty(_assertThisInitialized(_this), "load", function (jsonSection) {
      //the row array isn't cleared in case some have been auto set
      //Main.clear() is called at the start of Main.load()
      for (var i = 0; i < jsonSection.length; i++) {
        var nameToLoad = jsonSection[i].effect;

        if (!Data.Power.names.contains(nameToLoad)) {
          Main.messageUser('PowerListAgnostic.load.notExist', _this.props.sectionName.toTitleCase() + ' #' + (i + 1) + ': ' + nameToLoad + ' is not a power name.');
          continue;
        }

        if (Data.Power[nameToLoad].isGodhood && !Main.canUseGodhood()) {
          Main.messageUser('PowerListAgnostic.load.godhood', _this.props.sectionName.toTitleCase() + ' #' + (i + 1) + ': ' + nameToLoad + ' is not allowed because transcendence is ' + Main.getTranscendence() + '.');
          continue;
        }

        var rowPointer = _this._rowArray.last();

        rowPointer.setPower(nameToLoad); //must be done first

        if (undefined !== jsonSection[i].cost) rowPointer.setBaseCost(jsonSection[i].cost);
        rowPointer.setText(jsonSection[i].text); //they all have text because descriptors

        rowPointer.disableValidationForActivationInfo(); //TODO: turn on loading mod list
        //rowPointer.getModifierList().load(jsonSection[i].Modifiers);
        //modifiers are loaded first so that I can use isNonPersonalModifierPresent and reset the activation modifiers
        //blindly set activation info then validate

        rowPointer.setAction(jsonSection[i].action);
        rowPointer.setRange(jsonSection[i].range);
        rowPointer.setDuration(jsonSection[i].duration); //TODO: turn on these
        //rowPointer.validateActivationInfo();
        //rowPointer.updateActivationModifiers();

        if (undefined !== jsonSection[i].name) rowPointer.setName(jsonSection[i].name);
        if (undefined !== jsonSection[i].skill) rowPointer.setSkill(jsonSection[i].skill); //skill requires name however perception range
        // has name without skill

        rowPointer.generateNameAndSkill(); //TODO: should give warning about removing name and skill

        rowPointer.setRank(jsonSection[i].rank);

        _this.addRow();
      }

      _this.update();
    });

    _defineProperty(_assertThisInitialized(_this), "addRow", function () {
      //TODO: add rows
      _this._rowArray.push(new PowerObjectAgnostic({
        powerListParent: _assertThisInitialized(_this),
        initialRowIndex: _this._rowArray.length,
        sectionName: _this.props.sectionName
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "_notifyDependent", function () {
      if (_assertThisInitialized(_this) === Main.equipmentSection) {
        //always call it even if total is 0 because the row may need to be removed
        Main.advantageSection.calculateEquipmentRank(_this.getTotal());
      }

      Main.updateOffense();
      Main.defenseSection.calculateValues();
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
    _this._blankKey = MainObject.generateKey();
    return _this;
  }

  return PowerListAgnostic;
}(React.Component);