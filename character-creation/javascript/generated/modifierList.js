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

  /**props: callback, powerRowParent, sectionName*/
  function ModifierList(props) {
    var _this;

    _classCallCheck(this, ModifierList);

    _this = _super.call(this, props); //state isn't allowed to be an array therefore everything is under the prop it

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
      return JSON.clone(_this.state);
    });

    _defineProperty(_assertThisInitialized(_this), "clear", function () {
      _this._rowArray = [];

      _this._prerender();

      _this.setState(function (state) {
        state.it = [];
        return state;
      });
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
      if (_this._derivedValues.autoModifierNameToRowIndex.get('Dynamic Alternate Effect') !== undefined) //TODO: is AutoRank state?
        powerRowRawTotal = _this._rowArray[_this._derivedValues.autoModifierNameToRowIndex.get('Dynamic Alternate Effect')].setAutoRank(powerRowRawTotal);else if (_this._derivedValues.autoModifierNameToRowIndex.get('Alternate Effect') !== undefined) powerRowRawTotal = _this._rowArray[_this._derivedValues.autoModifierNameToRowIndex.get('Alternate Effect')].setAutoRank(powerRowRawTotal); //removable is applied secondly after alt effect

      if (_this._derivedValues.autoModifierNameToRowIndex.get('Easily Removable') !== undefined) powerRowRawTotal = _this._rowArray[_this._derivedValues.autoModifierNameToRowIndex.get('Easily Removable')].setAutoRank(powerRowRawTotal);else if (_this._derivedValues.autoModifierNameToRowIndex.get('Removable') !== undefined) powerRowRawTotal = _this._rowArray[_this._derivedValues.autoModifierNameToRowIndex.get('Removable')].setAutoRank(powerRowRawTotal);
      return powerRowRawTotal;
    });

    _defineProperty(_assertThisInitialized(_this), "calculateValues", function () {
      //this._sanitizeRows();
      //TODO: fix sort/indexing
      //this._rowArray.sort(this._sortOrder);
      //this._reindex();
      _this._derivedValues.autoModifierNameToRowIndex.clear();

      _this._derivedValues.rankTotal = 0;
      _this._derivedValues.flatTotal = 0;

      for (var i = 0; i < _this._rowArray.length; i++) {
        if (Data.Modifier[_this._rowArray[i].getName()].hasAutoTotal) _this._derivedValues.autoModifierNameToRowIndex.add(_this._rowArray[i].getName(), i);
        if (_this._rowArray[i].isRank()) _this._derivedValues.rankTotal += _this._rowArray[i].getRawTotal();else _this._derivedValues.flatTotal += _this._rowArray[i].getRawTotal(); //could be flat or free. if free the total will be 0
      }
    });

    _defineProperty(_assertThisInitialized(_this), "createByNameRank", function (rowName, rowRank) {
      var rowIndex = _this.findRowByName(rowName);

      if (rowIndex === undefined) {
        rowIndex = _this._rowArray.length; //becomes the last row if doesn't exist yet

        _this.addRow(rowName);
      }

      _this._rowArray[rowIndex].setRank(rowRank);

      _this.setState(function (state) {
        state.it[rowIndex].rank = rowRank;
        return state;
      });
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

    _defineProperty(_assertThisInitialized(_this), "load", function (jsonSection) {
      if (_this.props.powerRowParent.isBlank()) return; //the row array isn't cleared in case some have been auto set
      //Main.clear() is called at the start of Main.load()

      var newState = [];
      var duplicateCheck = [];

      for (var i = 0; i < jsonSection.length; i++) {
        var nameToLoad = jsonSection[i].name; //TODO: call a fun to get current power index

        var loadLocation = _this.props.sectionName.toTitleCase() + ' #' + (_this.state.sectionRowIndex + 1) + ' Modifier #' + (i + 1);

        if (!Data.Modifier.names.contains(nameToLoad)) {
          Main.messageUser('ModifierList.load.notExist', loadLocation + ': ' + nameToLoad + ' is not a modifier name. Did you mean "Other" with text?');
          continue;
        }

        var modifierObject = _this._addRowNoPush(nameToLoad);

        if (undefined !== jsonSection[i].applications) modifierObject.setRank(jsonSection[i].applications);
        if (undefined !== jsonSection[i].text) modifierObject.setText(jsonSection[i].text); //duplicateCheck after setting all values for the sake of getUniqueName

        if (duplicateCheck.contains(modifierObject.getUniqueName())) {
          Main.messageUser('ModifierList.load.duplicate', loadLocation + ': ' + nameToLoad + ' is not allowed because the modifier already exists. Increase the rank instead or use different text.');
          continue;
        }

        _this._rowArray.push(modifierObject);

        duplicateCheck.push(modifierObject.getUniqueName());
        newState.push(modifierObject.getState());
      }

      _this._prerender();

      _this.setState(function (state) {
        state.it = newState;
        return state;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "removeByName", function (rowName) {
      var rowIndex = _this.findRowByName(rowName);

      if (rowIndex !== undefined) _this._removeRow(rowIndex);
    });

    _defineProperty(_assertThisInitialized(_this), "updateNameByRow", function (newName, modifierRow) {
      if (undefined === modifierRow) {
        _this.addRow(newName);

        return;
      }

      var updatedIndex = _this.getIndexByKey(modifierRow.getKey());

      if (!Data.Modifier.names.contains(newName) || _this._hasDuplicate()) {
        _this._removeRow(updatedIndex);
      } else {
        modifierRow.setModifier(newName);

        _this._prerender();

        _this.setState(function (state) {
          state.it[updatedIndex].name = newName;
          return state;
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "updateRankByKey", function (newRank, updatedKey) {
      if (updatedKey === _this._blankKey) {
        throw new AssertionError('Can\'t update blank row ' + updatedKey);
      }

      var updatedIndex = _this.getIndexByKey(updatedKey);

      _this._rowArray[updatedIndex].setRank(newRank);

      _this._prerender();

      _this.setState(function (state) {
        state.it[updatedIndex].rank = newRank;
        return state;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "updateTextByKey", function (newText, updatedKey) {
      if (updatedKey === _this._blankKey) {
        throw new AssertionError('Can\'t update blank row ' + updatedKey);
      }

      var updatedIndex = _this.getIndexByKey(updatedKey);

      _this._rowArray[updatedIndex].setText(newText);

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

    _defineProperty(_assertThisInitialized(_this), "addRow", function (newName) {
      var modifierObject = _this._addRowNoPush(newName);

      _this._rowArray.push(modifierObject);

      _this._prerender();

      _this.setState(function (state) {
        state.it.push(modifierObject.getState());
        return state;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_addRowNoPush", function (newName) {
      //the row that was blank no longer is so use the blank key
      var modifierObject = new ModifierObject({
        key: _this._blankKey,
        powerRowParent: _this.props.powerRowParent,
        modifierListParent: _assertThisInitialized(_this),
        sectionName: _this.props.sectionName
      });
      modifierObject.setModifier(newName); //need a new key for the new blank row

      _this._blankKey = MainObject.generateKey();
      return modifierObject;
    });

    _defineProperty(_assertThisInitialized(_this), "_hasDuplicate", function () {
      //can't change this to take an arg because update name/text will already be in state
      return _this._rowArray.map(function (item) {
        return item.getUniqueName();
      }).some(function (val, id, array) {
        return array.indexOf(val) !== id;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_prerender", function () {
      //don't update any state in render
      _this.calculateValues();

      _this.props.powerRowParent.getSection().update();
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var elementArray = _this._rowArray.map(function (modifierObject) {
        return /*#__PURE__*/React.createElement(ModifierRowHtml, {
          key: modifierObject.getKey(),
          keyCopy: modifierObject.getKey(),
          powerRow: _this.props.powerRowParent,
          modifierRow: modifierObject
        });
      }); //derivedValues is undefined and unused for blank


      elementArray.push( /*#__PURE__*/React.createElement(ModifierRowHtml, {
        key: _this._blankKey,
        keyCopy: _this._blankKey,
        powerRow: _this.props.powerRowParent,
        modifierRow: undefined
      }));
      return elementArray;
    });

    _defineProperty(_assertThisInitialized(_this), "_sanitizeRows", function () {
      var namesSoFar = [];
      var canHaveAttack = true;
      if (_this.props.powerRowParent.getDefaultRange() !== 'Personal') canHaveAttack = false; //feature has a default range of Personal

      for (var i = 0; i < _this._rowArray.length; i++) {
        if (_this._rowArray[i].isBlank() && i < _this._rowArray.length) {
          _this._removeRow(i);

          i--;
          continue;
        } //remove blank row that isn't last
        else if (_this._rowArray[i].isBlank()) continue; //do nothing if last row is blank


        if (_this.props.powerRowParent.getSection() === Main.equipmentSection && (_this._rowArray[i].getName() === 'Removable' || _this._rowArray[i].getName() === 'Easily Removable')) {
          _this._removeRow(i);

          i--;
          continue;
        } //equipment has removable built in and can't have the modifiers


        var modifierName = _this._rowArray[i].getUniqueName(false);

        if (namesSoFar.contains(modifierName)) {
          _this._removeRow(i);

          i--;
          continue;
        } //redundant modifier


        if (modifierName === 'Attack' || modifierName === 'Affects Others') //Affects Others Also and Affects Others Only return same name
          {
            if (!canHaveAttack) {
              _this._removeRow(i);

              i--;
              continue;
            } //redundant or invalid modifier


            canHaveAttack = false;
          }

        namesSoFar.push(modifierName);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_sortOrder", function (a, b) {
      var aFirst = -1;
      var bFirst = 1;
      if ('Faster Action' === a.getName() || 'Slower Action' === a.getName()) return aFirst;
      if ('Faster Action' === b.getName() || 'Slower Action' === b.getName()) return bFirst; //Triggered requires Selective started between 2.0 and 2.5. Triggered isn't an action in 1.0. Triggered and Aura can't both exist

      if ('Aura' === a.getName() || 'Selective' === a.getName() && 'Triggered' === _this.props.powerRowParent.getAction()) return aFirst;
      if ('Aura' === b.getName() || 'Selective' === b.getName() && 'Triggered' === _this.props.powerRowParent.getAction()) return bFirst;
      if ('Increased Range' === a.getName() || 'Reduced Range' === a.getName()) return aFirst;
      if ('Increased Range' === b.getName() || 'Reduced Range' === b.getName()) return bFirst;
      if ('Increased Duration' === a.getName() || 'Decreased Duration' === a.getName()) return aFirst;
      if ('Increased Duration' === b.getName() || 'Decreased Duration' === b.getName()) return bFirst; //else maintain the current order
      //using rowIndex to force sort to be stable (since it might not be)

      if (a.getModifierRowIndex() < b.getModifierRowIndex()) return aFirst;
      return bFirst;
    });

    _defineProperty(_assertThisInitialized(_this), "_testSortStability", function () {
      unstableSort(_this._rowArray, _this._sortOrder);
    });

    _defineProperty(_assertThisInitialized(_this), "_removeRow", function (rowIndexToRemove) {
      _this._rowArray.remove(rowIndexToRemove);

      _this.setState(function (state) {
        state.it.remove(rowIndexToRemove);
        return state;
      });
    });

    _this.state = {
      it: []
    };
    _this._rowArray = []; //state.it as custom objects

    _this._derivedValues = {
      //this could be just {} but I don't want this to be the only non-JSON place using objects as a map
      autoModifierNameToRowIndex: new MapDefault({}, undefined),
      rankTotal: 0,
      flatTotal: 0
    };
    _this._blankKey = MainObject.generateKey();
    props.callback(_assertThisInitialized(_this));
    return _this;
  } //region basic getter

  /**This total will be the sum of all flat modifiers*/
  //endregion 'private' functions section. Although all public none of these should be called from outside of this object


  return ModifierList;
}(React.Component);
/*TODO: next:
figure out architecture:
   * in the end main has all state
   * power row (really main) needs the state of mod in order to re-render power total
   * power row (react) uses power html: pass down everything as props, use callback prop to save a reference to mod list
   * mod list delegate to power row (really main) for state mutation
   * mod list make an immutable mod row list from props
make mod list immutable (pull state up)
convert power list (can't test alone?)
hook up power html
   onChange
convert mod list
   replace sanitizeRows with duplicate check
   sort on add?
test all
there's lots of tasks
*/