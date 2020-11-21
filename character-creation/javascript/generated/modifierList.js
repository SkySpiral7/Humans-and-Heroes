'use strict';

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

var ModifierList = /*#__PURE__*/function (_React$Component) {
  _inherits(ModifierList, _React$Component);

  var _super = _createSuper(ModifierList);

  /**props: callback, powerRowParent, sectionName, state*/
  function ModifierList(props) {
    var _this;

    _classCallCheck(this, ModifierList);

    _this = _super.call(this, props); //state as custom objects

    _defineProperty(_assertThisInitialized(_this), "getFlatTotal", function () {
      return _this._derivedValues.flatTotal;
    });

    _defineProperty(_assertThisInitialized(_this), "getRankTotal", function () {
      return _this._derivedValues.rankTotal;
    });

    _defineProperty(_assertThisInitialized(_this), "getPower", function () {
      return _this.props.powerRowParent;
    });

    _defineProperty(_assertThisInitialized(_this), "getState", function () {
      return JSON.clone(_this.props.state);
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

    _defineProperty(_assertThisInitialized(_this), "save", function () {
      var json = [];

      for (var i = 0; i < _this._rowArray.length; i++) {
        json.push(_this._rowArray[i].save());
      }

      return json; //might still be empty
    });

    _defineProperty(_assertThisInitialized(_this), "calculateGrandTotal", function (powerRowRawTotal) {
      //Alternate Effect in ruleset 1.0 forced the power to be worth a total of 1 (or 2 for Dynamic). the flaw cost is all but 1
      //technically 1.0 Alternate Effect was an extra to spent 1 point on a whole other sub-power
      if (_this._derivedValues.autoModifierNameSet.contains('Dynamic Alternate Effect')) {
        //only exists in ruleset 1.0
        powerRowRawTotal = 2; //cost ignores current total
      } else if (_this._derivedValues.autoModifierNameSet.contains('Alternate Effect')) {
        if (1 === Main.getActiveRuleset().major) {
          powerRowRawTotal = 1; //cost ignores current total
        } else {
          powerRowRawTotal += -Math.floor(powerRowRawTotal / 2);
        }
      } //removable is applied secondly after alt effect (it stacks)


      if (_this._derivedValues.autoModifierNameSet.contains('Easily Removable')) {
        powerRowRawTotal += -Math.floor(powerRowRawTotal * 2 / 5);
      } else if (_this._derivedValues.autoModifierNameSet.contains('Removable')) {
        powerRowRawTotal += -Math.floor(powerRowRawTotal / 5);
      }

      return powerRowRawTotal;
    });

    _defineProperty(_assertThisInitialized(_this), "calculateValues", function () {
      //this._sanitizeRows();
      //TODO: fix sort/indexing
      //this._rowArray.sort(this._sortOrder);
      //this._reindex();
      _this._derivedValues.autoModifierNameSet = [];
      _this._derivedValues.rankTotal = 0;
      _this._derivedValues.flatTotal = 0;

      for (var i = 0; i < _this._rowArray.length; i++) {
        if (Data.Modifier[_this._rowArray[i].getName()].hasAutoTotal) _this._derivedValues.autoModifierNameSet.push(_this._rowArray[i].getName());
        if (_this._rowArray[i].isRank()) _this._derivedValues.rankTotal += _this._rowArray[i].getRawTotal();else _this._derivedValues.flatTotal += _this._rowArray[i].getRawTotal(); //could be flat or free. if free the total will be 0
      }
    });

    _defineProperty(_assertThisInitialized(_this), "findRowByName", function (rowName) {
      for (var i = 0; i < _this._rowArray.length; i++) {
        if (_this._rowArray[i].getName() === rowName) return i;
      } //found it
      //else return undefined

    });

    _defineProperty(_assertThisInitialized(_this), "getUniqueName", function () {
      var nameArray = [];

      for (var i = 0; i < _this._rowArray.length; i++) {
        nameArray.push(_this._rowArray[i].getUniqueName(true));
      }

      nameArray.sort(); //must be sorted because order doesn't matter when considering uniqueness
      //note that the rows are not sorted only this name array
      //the sort order is by ascii but that doesn't matter as long as the same sort is used each time

      return nameArray;
    });

    _defineProperty(_assertThisInitialized(_this), "hasAutoTotal", function () {
      for (var i = 0; i < _this._rowArray.length; i++) {
        if (_this._rowArray[i].doesHaveAutoTotal()) return true;
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_this), "isNonPersonalModifierPresent", function () {
      for (var i = 0; i < _this._rowArray.length; ++i) {
        if ('Attack' === _this._rowArray[i].getName() || 'Affects Others Also' === _this._rowArray[i].getName() || 'Affects Others Only' === _this._rowArray[i].getName()) return true;
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var elementArray = _this._rowArray.map(function (modifierObject) {
        return /*#__PURE__*/React.createElement(ModifierRowHtml, {
          key: modifierObject.getKey(),
          keyCopy: modifierObject.getKey(),
          powerRow: _this.props.powerRowParent,
          modifierRow: modifierObject
        });
      });

      elementArray.push( /*#__PURE__*/React.createElement(ModifierRowHtml, {
        key: _this._blankKey,
        keyCopy: _this._blankKey,
        powerRow: _this.props.powerRowParent,
        modifierRow: undefined
      }));
      return elementArray;
    });

    _this._rowArray = props.state.map(function (state) {
      new ModifierObject({
        key: _this._blankKey,
        powerRowParent: props.powerRowParent,
        modifierListParent: _assertThisInitialized(_this),
        sectionName: props.sectionName,
        state: state
      });
    });
    _this._derivedValues = {
      autoModifierNameSet: [],
      rankTotal: 0,
      flatTotal: 0
    };
    _this._blankKey = MainObject.generateKey();
    props.callback(_assertThisInitialized(_this));

    _this.calculateValues();

    return _this;
  } //region basic getter

  /**This total will be the sum of all flat modifiers*/
  //endregion 'private' functions section. Although all public none of these should be called from outside of this object


  return ModifierList;
}(React.Component);
/*TODO: next:
figure out architecture:
   * in the end main has all state
   * power list (really main) needs the state of mod in order to re-render power total
   * power row (react) uses power html: pass down everything as props, use callback prop to save a reference to mod list
   * mod list delegate to power list (really main) for state mutation
   * mod list make an immutable mod row list from props
pull power row state up to list
hook up power html
   onChange
hook up more for mod/power
   setState
   replace sanitizeRows with duplicate check
   sort mods on add
test all
there's lots of tasks
*/