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

  /**props: callback, powerRowParent, sectionName, sectionRowIndex*/
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

    _defineProperty(_assertThisInitialized(_this), "clear", function () {
      _this._rowArray = [];

      _this._prerender();

      _this.setState(function (state) {
        state.it = []; //doesn't change state.sectionRowIndex

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

    _defineProperty(_assertThisInitialized(_this), "calculateGrandTotal", function (powerRowRawTotal) {
      if (_this._derivedValues.autoModifierNameToRowIndex.get('Dynamic Alternate Effect') !== undefined) powerRowRawTotal = _this._rowArray[_this._derivedValues.autoModifierNameToRowIndex.get('Dynamic Alternate Effect')].setAutoRank(powerRowRawTotal);else if (_this._derivedValues.autoModifierNameToRowIndex.get('Alternate Effect') !== undefined) powerRowRawTotal = _this._rowArray[_this._derivedValues.autoModifierNameToRowIndex.get('Alternate Effect')].setAutoRank(powerRowRawTotal); //removable is applied secondly after alt effect

      if (_this._derivedValues.autoModifierNameToRowIndex.get('Easily Removable') !== undefined) powerRowRawTotal = _this._rowArray[_this._derivedValues.autoModifierNameToRowIndex.get('Easily Removable')].setAutoRank(powerRowRawTotal);else if (_this._derivedValues.autoModifierNameToRowIndex.get('Removable') !== undefined) powerRowRawTotal = _this._rowArray[_this._derivedValues.autoModifierNameToRowIndex.get('Removable')].setAutoRank(powerRowRawTotal);
      return powerRowRawTotal;
    });

    _defineProperty(_assertThisInitialized(_this), "calculateValues", function () {
      _this._sanitizeRows();

      _this._rowArray.sort(_this._sortOrder);

      _this._reindex();

      _this._derivedValues.autoModifierNameToRowIndex.clear();

      _this._derivedValues.rankTotal = 0;
      _this._derivedValues.flatTotal = 0;

      for (var i = 0; i < _this._rowArray.length - 1; i++) //the last row is always blank
      {
        if (Data.Modifier[_this._rowArray[i].getName()].hasAutoTotal) _this._derivedValues.autoModifierNameToRowIndex.add(_this._rowArray[i].getName(), i);
        if (_this._rowArray[i].isRank()) _this._derivedValues.rankTotal += _this._rowArray[i].getRawTotal();else _this._derivedValues.flatTotal += _this._rowArray[i].getRawTotal(); //could be flat or free. if free the total will be 0
      }
    });

    _defineProperty(_assertThisInitialized(_this), "createByNameRank", function (rowName, rowRank) {
      var rowIndex = _this.findRowByName(rowName);

      if (rowIndex === undefined) {
        rowIndex = _this._rowArray.length - 1; //becomes the last row if doesn't exist yet

        _this._rowArray[rowIndex].setModifier(rowName); //set the last row (which is blank) to become the new modifier


        _this._addRow(); //add a new blank row so that this method can be called twice in a row

      }

      _this._rowArray[rowIndex].setRank(rowRank);
    });

    _defineProperty(_assertThisInitialized(_this), "findRowByName", function (rowName) {
      for (var i = 0; i < _this._rowArray.length; i++) //no -1 because the last row isn't blank while it is being created
      {
        if (_this._rowArray[i].getName() === rowName) return i;
      } //found it
      //else return undefined

    });

    _defineProperty(_assertThisInitialized(_this), "generate", function () {
      var allModifierRows = '';

      for (var i = 0; i < _this._rowArray.length; i++) //last row is always blank but needs to be generated
      {
        allModifierRows += _this._rowArray[i].generate();
      }

      return allModifierRows;
    });

    _defineProperty(_assertThisInitialized(_this), "getUniqueName", function () {
      var nameArray = [];

      for (var i = 0; i < _this._rowArray.length - 1; i++) {
        nameArray.push(_this._rowArray[i].getUniqueName(true));
      }

      nameArray.sort(); //must be sorted because order doesn't matter when considering uniqueness
      //note that the rows are not sorted only this name array
      //the sort order is by ascii but that doesn't matter as long as the same sort is used each time

      return nameArray;
    });

    _defineProperty(_assertThisInitialized(_this), "hasAutoTotal", function () {
      for (var i = 0; i < _this._rowArray.length - 1; i++) {
        if (_this._rowArray[i].doesHaveAutoTotal()) return true;
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_this), "isNonPersonalModifierPresent", function () {
      for (var i = 0; i < _this._rowArray.length; ++i) //no -1 because the last row isn't blank while it is being created
      {
        if ('Attack' === _this._rowArray[i].getName() || 'Affects Others Also' === _this._rowArray[i].getName() || 'Affects Others Only' === _this._rowArray[i].getName()) return true;
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_this), "load", function (jsonSection) {
      if (_this.props.powerRowParent.isBlank()) return; //the row array isn't cleared in case some have been auto set
      //Main.clear() is called at the start of Main.load()

      for (var i = 0; i < jsonSection.length; i++) {
        var newName = jsonSection[i].name;

        if (!Data.Modifier.names.contains(newName)) {
          Main.messageUser('ModifierList.load.notExist', _this.props.sectionName.toTitleCase() + ' #' + (_this.state.sectionRowIndex + 1) + ' Modifier #' + (i + 1) + ': ' + newName + ' is not a modifier name. Did you mean "Other" with text?');
          continue;
        }

        _this._rowArray.last().setModifier(newName);

        if (undefined !== jsonSection[i].applications) _this._rowArray.last().setRank(jsonSection[i].applications);
        if (undefined !== jsonSection[i].text) _this._rowArray.last().setText(jsonSection[i].text);

        _this._addRow();
      } //doesn't call update. Power must do that

    });

    _defineProperty(_assertThisInitialized(_this), "removeByName", function (rowName) {
      var rowIndex = _this.findRowByName(rowName);

      if (rowIndex !== undefined) _this._removeRow(rowIndex);
    });

    _defineProperty(_assertThisInitialized(_this), "setSectionRowIndex", function (sectionRowIndexGiven) {
      _this.setState(function (state) {
        state.sectionRowIndex = sectionRowIndexGiven;
        return state;
      });

      for (var i = 0; i < _this._rowArray.length; i++) //even blank row
      {
        _this._rowArray[i].setPowerRowIndex(_this.state.sectionRowIndex);
      } //correct all indexing. ModifierRowIndex is still correct

    });

    _defineProperty(_assertThisInitialized(_this), "update", function () {
      _this.calculateValues(); //TODO: test


      _this.props.powerRowParent.getSection().update();
    });

    _defineProperty(_assertThisInitialized(_this), "_addRow", function () {
      _this._rowArray.push(new ModifierObject({
        powerRowParent: _this.props.powerRowParent,
        modifierListParent: _assertThisInitialized(_this),
        initialPowerRowIndex: _this.state.sectionRowIndex,
        initialModifierRowIndex: _this._rowArray.length,
        sectionName: _this.props.sectionName
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "_prerender", function () {
      //don't update any state in render
      _this.calculateValues();
    });

    _defineProperty(_assertThisInitialized(_this), "_sanitizeRows", function () {
      var namesSoFar = [];
      var canHaveAttack = true;
      if (_this.props.powerRowParent.getDefaultRange() !== 'Personal') canHaveAttack = false; //feature has a default range of Personal

      for (var i = 0; i < _this._rowArray.length; i++) //last row might not be blank
      {
        if (_this._rowArray[i].isBlank() && i < _this._rowArray.length - 1) {
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

      if (_this._rowArray.isEmpty() || !_this._rowArray.last().isBlank()) _this._addRow(); //if last row isn't blank add one
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

    _defineProperty(_assertThisInitialized(_this), "_reindex", function () {
      for (var i = 0; i < _this._rowArray.length; i++) //even blank row
      {
        _this._rowArray[i].setModifierRowIndex(i);
      } //correct all indexing. PowerRowIndex is still correct

    });

    _defineProperty(_assertThisInitialized(_this), "_removeRow", function (rowIndexToRemove) {
      _this._rowArray.remove(rowIndexToRemove);

      _this._reindex();
    });

    _this.state = {
      it: [],
      sectionRowIndex: props.sectionRowIndex
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
  } //region Single line function

  /**This total will be the sum of all flat modifiers*/
  //endregion 'private' functions section. Although all public none of these should be called from outside of this object


  return ModifierList;
}(React.Component);

function createModifierList(callback, powerRowParent, sectionName, sectionRowIndex) {
  ReactDOM.render( /*#__PURE__*/React.createElement(ModifierList, {
    callback: callback,
    powerRowParent: powerRowParent,
    sectionName: sectionName,
    sectionRowIndex: sectionRowIndex
  }), //TODO: if sectionRowIndex updates the whole thing will die
  //also won't currently render because it needs the div from generate
  document.getElementById(sectionName + 'ModifierSection' + sectionRowIndex));
}
/*next:
convert mod list
   row array +1
   html?
   replace sanitizeRows with duplicate check
   sort on add?
   test all
convert power row
convert power list
*/