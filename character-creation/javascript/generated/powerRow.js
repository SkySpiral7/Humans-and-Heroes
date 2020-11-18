'use strict';
/**Call List onChange
 Select Power: select();
 Base: changeBaseCost();
 Text: changeText();
 Action: selectAction();
 Range: selectRange();
 Duration: selectDuration();
 Name: changeName();
 Skill Used: changeSkill();
 (see modifier file)
 Rank: changeRank();
 */

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

var PowerObjectAgnostic = /*#__PURE__*/function (_React$Component) {
  _inherits(PowerObjectAgnostic, _React$Component);

  var _super = _createSuper(PowerObjectAgnostic);

  function PowerObjectAgnostic(props) {
    var _this;

    _classCallCheck(this, PowerObjectAgnostic);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "getAction", function () {
      return _this.state.action;
    });

    _defineProperty(_assertThisInitialized(_this), "getBaseCost", function () {
      return _this.state.baseCost;
    });

    _defineProperty(_assertThisInitialized(_this), "getDuration", function () {
      return _this.state.duration;
    });

    _defineProperty(_assertThisInitialized(_this), "getDerivedValues", function () {
      return JSON.clone(_this.derivedValues);
    });

    _defineProperty(_assertThisInitialized(_this), "getEffect", function () {
      return _this.state.effect;
    });

    _defineProperty(_assertThisInitialized(_this), "getKey", function () {
      return _this.props.keyCopy;
    });

    _defineProperty(_assertThisInitialized(_this), "getName", function () {
      return _this.state.name;
    });

    _defineProperty(_assertThisInitialized(_this), "getRange", function () {
      return _this.state.range;
    });

    _defineProperty(_assertThisInitialized(_this), "getRank", function () {
      return _this.state.rank;
    });

    _defineProperty(_assertThisInitialized(_this), "getSectionName", function () {
      return _this.props.sectionName;
    });

    _defineProperty(_assertThisInitialized(_this), "getSkillUsed", function () {
      return _this.state.skillUsed;
    });

    _defineProperty(_assertThisInitialized(_this), "getState", function () {
      return JSON.clone(_this.state);
    });

    _defineProperty(_assertThisInitialized(_this), "getText", function () {
      return _this.state.text;
    });

    _defineProperty(_assertThisInitialized(_this), "getTotal", function () {
      return _this.state.total;
    });

    _defineProperty(_assertThisInitialized(_this), "isBaseCostSettable", function () {
      return _this.derivedValues.canSetBaseCost;
    });

    _defineProperty(_assertThisInitialized(_this), "getSection", function () {
      return _this.props.powerListParent;
    });

    _defineProperty(_assertThisInitialized(_this), "disableValidationForActivationInfo", function () {
      _this.derivedValues.shouldValidateActivationInfo = false;
    });

    _defineProperty(_assertThisInitialized(_this), "getDefaultAction", function () {
      if (_this.isBlank()) return;
      return Data.Power[_this.state.effect].defaultAction;
    });

    _defineProperty(_assertThisInitialized(_this), "getDefaultDuration", function () {
      if (_this.isBlank()) return;
      return Data.Power[_this.state.effect].defaultDuration;
    });

    _defineProperty(_assertThisInitialized(_this), "getDefaultRange", function () {
      if (_this.isBlank()) return;
      return Data.Power[_this.state.effect].defaultRange;
    });

    _defineProperty(_assertThisInitialized(_this), "getUniqueName", function () {
      var modListName = '';
      if (undefined !== _this.modifierSection) modListName = _this.modifierSection.getUniqueName();
      return _this.state.effect + ': ' + _this.state.text + '; ' + modListName; //text might be empty
    });

    _defineProperty(_assertThisInitialized(_this), "hasAutoTotal", function () {
      return _this.modifierSection.hasAutoTotal();
    });

    _defineProperty(_assertThisInitialized(_this), "isBlank", function () {
      return undefined === _this.state.effect;
    });

    _defineProperty(_assertThisInitialized(_this), "setRowIndex", function (indexGiven) {
      _this.state.rowIndex = indexGiven;

      _this.modifierSection.setSectionRowIndex(_this.state.rowIndex);
    });

    _defineProperty(_assertThisInitialized(_this), "select", function () {
      CommonsLibrary.select.call(_assertThisInitialized(_this), _this.setPower, _this.props.sectionName + 'Choices' + _this.state.rowIndex, _this.props.powerListParent);
    });

    _defineProperty(_assertThisInitialized(_this), "changeBaseCost", function () {
      //won't be called if you can't set base cost
      CommonsLibrary.change.call(_assertThisInitialized(_this), _this.setBaseCost, _this.props.sectionName + 'BaseCost' + _this.state.rowIndex, _this.props.powerListParent);
    });

    _defineProperty(_assertThisInitialized(_this), "changeText", function () {
      CommonsLibrary.change.call(_assertThisInitialized(_this), _this.setText, _this.props.sectionName + 'Text' + _this.state.rowIndex, _this.props.powerListParent);
    });

    _defineProperty(_assertThisInitialized(_this), "selectAction", function () {
      //won't be called if SelectAction doesn't exist
      CommonsLibrary.select.call(_assertThisInitialized(_this), _this.setAction, _this.props.sectionName + 'SelectAction' + _this.state.rowIndex, _this.props.powerListParent);
    });

    _defineProperty(_assertThisInitialized(_this), "selectRange", function () {
      CommonsLibrary.select.call(_assertThisInitialized(_this), _this.setRange, _this.props.sectionName + 'SelectRange' + _this.state.rowIndex, _this.props.powerListParent);
    });

    _defineProperty(_assertThisInitialized(_this), "selectDuration", function () {
      CommonsLibrary.select.call(_assertThisInitialized(_this), _this.setDuration, _this.props.sectionName + 'SelectDuration' + _this.state.rowIndex, _this.props.powerListParent);
    });

    _defineProperty(_assertThisInitialized(_this), "changeName", function () {
      CommonsLibrary.change.call(_assertThisInitialized(_this), _this.setName, _this.props.sectionName + 'Name' + _this.state.rowIndex, _this.props.powerListParent);
    });

    _defineProperty(_assertThisInitialized(_this), "changeSkill", function () {
      CommonsLibrary.change.call(_assertThisInitialized(_this), _this.setSkill, _this.props.sectionName + 'Skill' + _this.state.rowIndex, _this.props.powerListParent);
    });

    _defineProperty(_assertThisInitialized(_this), "getModifierList", function () {
      return _this.modifierSection;
    });

    _defineProperty(_assertThisInitialized(_this), "changeRank", function () {
      CommonsLibrary.change.call(_assertThisInitialized(_this), _this.setRank, _this.props.sectionName + 'Rank' + _this.state.rowIndex, _this.props.powerListParent);
    });

    _defineProperty(_assertThisInitialized(_this), "setPower", function (effectNameGiven) {
      if (undefined !== _this.modifierSection) _this.modifierSection.clear(); //always clear them out on select

      if (!Data.Power.names.contains(effectNameGiven)) {
        //TODO: delete this row instead
        _this._resetValues();

        return;
      } //this is only reachable if you select the default value in the drop down


      _this.state.effect = effectNameGiven;
      _this.derivedValues.canSetBaseCost = Data.Power[_this.state.effect].hasInputBaseCost;
      _this.state.baseCost = Data.Power[_this.state.effect].baseCost;
      if (undefined === _this.state.text) _this.state.text = 'Descriptors and other text'; //let the text stay if changing between powers

      _this.state.action = Data.Power[_this.state.effect].defaultAction;
      _this.state.range = Data.Power[_this.state.effect].defaultRange;
      _this.state.duration = Data.Power[_this.state.effect].defaultDuration;
      _this.state.rank = 1; //name = skillUsed = undefined;  //don't clear so that if changing between 2 different attacks these carry over

      _this.generateNameAndSkill();
    });

    _defineProperty(_assertThisInitialized(_this), "setBaseCost", function (baseGiven) {
      if (!_this.derivedValues.canSetBaseCost || _this.isBlank()) return; //only possible when loading bad data

      _this.state.baseCost = sanitizeNumber(baseGiven, 1, Data.Power[_this.state.effect].baseCost); //unique defaults
    });

    _defineProperty(_assertThisInitialized(_this), "setText", function (textGiven) {
      if (_this.isBlank()) return;
      _this.state.text = textGiven;
    });

    _defineProperty(_assertThisInitialized(_this), "setAction", function (newActionName) {
      if (_this.isBlank()) return;
      if (_this.state.action === newActionName) return; //nothing has changed (only possible when loading)

      if (!Data.Power.actions.contains(newActionName)) {
        //if not found (only possible when loading bad data)
        Main.messageUser('PowerObjectAgnostic.setAction.notExist', _this.props.sectionName.toTitleCase() + ' #' + (_this.state.rowIndex + 1) + ': ' + newActionName + ' is not the name of an action.');
        return;
      }

      _this.state.action = newActionName;
      if (!_this.derivedValues.shouldValidateActivationInfo) return; //done

      _this._updateActionModifiers();

      if ('Reaction' === _this.state.action && 'Feature' !== _this.state.effect && 'Luck Control' !== _this.state.effect && Main.getActiveRuleset().isGreaterThanOrEqualTo(3, 4)) _this.setRange('Close');

      _this.generateNameAndSkill();
    });

    _defineProperty(_assertThisInitialized(_this), "setRange", function (newRangeName) {
      if (_this.isBlank()) return;
      if (_this.state.range === newRangeName) return; //nothing has changed (only possible when loading)

      if (!Data.Power.ranges.contains(newRangeName)) {
        //if not found (only possible when loading bad data)
        Main.messageUser('PowerObjectAgnostic.setRange.notExist', _this.props.sectionName.toTitleCase() + ' #' + (_this.state.rowIndex + 1) + ': ' + newRangeName + ' is not the name of a range.');
        return;
      }

      var oldRange = _this.state.range;
      _this.state.range = newRangeName;
      if (!_this.derivedValues.shouldValidateActivationInfo) return; //done
      //TODO: loading should make sure that skillUsed can't be set when Perception range

      _this.generateNameAndSkill();

      if ('Personal' === oldRange && 'Permanent' === _this.state.duration) {
        //changing from personal must change duration to not be permanent
        var defaultDuration = Data.Power[_this.state.effect].defaultDuration;
        if ('Permanent' === defaultDuration) _this.setDuration('Sustained');else _this.setDuration(defaultDuration); //use default duration if possible. otherwise use Sustained
        //either way it will cost 0
      }

      _this._updateRangeModifiers();
    });

    _defineProperty(_assertThisInitialized(_this), "setDuration", function (newDurationName) {
      if (_this.isBlank()) return;
      if (_this.state.duration === newDurationName) return; //nothing has changed (only possible when loading)

      if (!Data.Power.durations.contains(newDurationName)) {
        //if not found (only possible when loading bad data)
        Main.messageUser('PowerObjectAgnostic.setDuration.notExist', _this.props.sectionName.toTitleCase() + ' #' + (_this.state.rowIndex + 1) + ': ' + newDurationName + ' is not the name of a duration.');
        return;
      }

      var oldDuration = _this.state.duration;
      _this.state.duration = newDurationName;
      if (!_this.derivedValues.shouldValidateActivationInfo) return; //done

      var defaultDurationName = Data.Power[_this.state.effect].defaultDuration;
      if ('Permanent' === newDurationName) _this.setAction('None'); //if changing to Permanent
      else if ('Permanent' === oldDuration) //if changing from Permanent
          {
            //then reset action
            if ('Permanent' === defaultDurationName) _this.setAction('Free'); //default action is None so use Free instead
            else _this.setAction(Data.Power[_this.state.effect].defaultAction); //use default action if possible otherwise use Free
            //either way it will cost 0
          }

      _this._updateDurationModifiers();
    });

    _defineProperty(_assertThisInitialized(_this), "setName", function (nameGiven) {
      if (_this.isBlank()) return;
      _this.state.name = nameGiven;
    });

    _defineProperty(_assertThisInitialized(_this), "setSkill", function (skillGiven) {
      if (_this.isBlank()) return;
      _this.state.skillUsed = skillGiven;
    });

    _defineProperty(_assertThisInitialized(_this), "setRank", function (rankGiven) {
      if (_this.isBlank()) return;
      _this.state.rank = sanitizeNumber(rankGiven, 1, 1);
    });

    _defineProperty(_assertThisInitialized(_this), "calculateValues", function () {
      if (undefined === _this.modifierSection) return; //nothing to calculate for before rendering

      _this.modifierSection.calculateValues();

      var costPerRank = _this.state.baseCost + _this.modifierSection.getRankTotal();

      if (Main.getActiveRuleset().isGreaterThanOrEqualTo(3, 5) && 'Variable' === _this.state.effect && costPerRank < 5) costPerRank = 5;else if (costPerRank < -3) costPerRank = -3; //can't be less than 1/5

      _this.derivedValues.costPerRank = costPerRank; //save the non-decimal version

      if (costPerRank < 1) costPerRank = 1 / (2 - costPerRank);
      _this.state.total = Math.ceil(costPerRank * _this.state.rank); //round up

      var flatValue = _this.modifierSection.getFlatTotal();

      if (flatValue < 0 && _this.state.total + flatValue < 1) //flat flaw more than (or equal to) the total cost is not allowed. so adjust the
        // power rank
        {
          _this.state.rank = Math.abs(flatValue) / costPerRank;
          _this.state.rank = Math.floor(_this.state.rank) + 1; //must be higher than for this to work. don't use ceil so that if whole number
          // will still be +1

          _this.state.total = Math.ceil(costPerRank * _this.state.rank); //round up
        }

      _this.derivedValues.flatValue = flatValue;
      _this.state.total += flatValue; //flatValue might be negative

      if ('A God I Am' === _this.state.effect) _this.state.total += 145; //for first ranks
      else if ('Reality Warp' === _this.state.effect) _this.state.total += 75;
      _this.state.total = _this.modifierSection.calculateGrandTotal(_this.state.total); //used to calculate all auto modifiers
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var callback = function callback(newThing) {
        this.modifierSection = newThing;
      };

      _this.derivedValues.possibleActions = _this._validateAndGetPossibleActions();
      _this.derivedValues.possibleRanges = _this._getPossibleRanges();
      _this.derivedValues.possibleDurations = _this._validateAndGetPossibleDurations(); //TODO: pretty sure need different key in which case generate in new()

      return /*#__PURE__*/React.createElement(PowerRowHtml, {
        sectionName: _this.props.sectionName,
        powerRow: _assertThisInitialized(_this),
        state: _this.state,
        derivedValues: _this.derivedValues,
        key: _this.props.keyCopy,
        keyCopy: _this.props.keyCopy,
        modCallback: callback
      });
    });

    _defineProperty(_assertThisInitialized(_this), "generateNameAndSkill", function () {
      return; //TODO: disabled generateNameAndSkill

      if (!Data.Power[_this.state.effect].isAttack && undefined === _this.modifierSection.findRowByName('Attack')) {
        _this.state.name = _this.state.skillUsed = undefined;
        return;
      }

      if (undefined === _this.state.name) _this.state.name = _this.props.sectionName.toTitleCase() + ' ' + (_this.state.rowIndex + 1) + ' ' + _this.state.effect; //for example: "Equipment 1 Damage" the "Equipment 1" is used for uniqueness

      var isAura = Main.getActiveRuleset().isGreaterThanOrEqualTo(3, 4) && 'Reaction' === _this.state.action && 'Luck Control' !== _this.state.effect && 'Feature' !== _this.state.effect;

      if ('Perception' === _this.state.range || isAura) _this.state.skillUsed = undefined;else if (undefined === _this.state.skillUsed) _this.state.skillUsed = 'Skill used for attack';
    });

    _defineProperty(_assertThisInitialized(_this), "save", function () {
      //don't just clone this.state: skill, cost is different
      var json = {};
      json.effect = _this.state.effect;
      if (_this.derivedValues.canSetBaseCost) json.cost = _this.state.baseCost;
      json.text = _this.state.text;
      json.action = _this.state.action;
      json.range = _this.state.range;
      json.duration = _this.state.duration; //checking undefined is redundant but more clear

      if (undefined !== _this.state.name) json.name = _this.state.name; //skill requires name however perception range has name without skill

      if (undefined !== _this.state.skillUsed) json.skill = _this.state.skillUsed;
      json.Modifiers = _this.modifierSection.save();
      json.rank = _this.state.rank;
      return json;
    });

    _defineProperty(_assertThisInitialized(_this), "updateActivationModifiers", function () {
      _this.derivedValues.shouldValidateActivationInfo = true;

      _this._updateActionModifiers();

      _this._updateRangeModifiers();

      _this._updateDurationModifiers();
    });

    _defineProperty(_assertThisInitialized(_this), "validateActivationInfo", function () {
      _this._validatePersonalRange();

      _this._validateAndGetPossibleDurations();

      _this._validateAndGetPossibleActions();
      /*the order is Range, Duration, Action, Range again
      first 3 are required order based on dependencies,
      visit range again so that Reaction can have a more reasonable fallback action*/


      if (Main.getActiveRuleset().isGreaterThanOrEqualTo(3, 4) && 'Luck Control' !== _this.state.effect && 'Feature' !== _this.state.effect && 'Reaction' === _this.state.action && 'Close' !== _this.state.range) {
        Main.messageUser('PowerObjectAgnostic.validateActivationInfo.reactionRequiresClose', _this.props.sectionName.toTitleCase() + ' #' + (_this.state.rowIndex + 1) + ': ' + _this.state.effect + ' has an action of Reaction and therefore must have a range of Close.');
        _this.state.range = 'Close'; //TODO: confusing limitation: in 3 cases Variable is allowed to have Reaction with Personal range
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_getPossibleRanges", function () {
      var possibleRanges = [];
      if ('Feature' === _this.state.effect) possibleRanges.push('Personal');else {
        if (Main.getActiveRuleset().isGreaterThanOrEqualTo(3, 4) && 'Reaction' === _this.state.action && 'Luck Control' !== _this.state.effect) return ['Close'];
        if ('Personal' === _this.state.range) return ['Personal'];
      }
      return possibleRanges.concat(['Close', 'Ranged', 'Perception']);
    });

    _defineProperty(_assertThisInitialized(_this), "_updateActionModifiers", function () {
      if ('Triggered' === _this.state.action) _this.modifierSection.createByNameRank('Selective', 1); //Triggered must also be selective so
      // it auto adds but doesn't remove

      if ('Feature' === _this.state.effect) return; //Feature doesn't change any other modifiers
      //remove all if possible

      _this.modifierSection.removeByName('Faster Action');

      _this.modifierSection.removeByName('Slower Action');

      _this.modifierSection.removeByName('Aura');

      if ('None' === _this.state.action) return; //don't add any modifiers

      var defaultActionName = Data.Power[_this.state.effect].defaultAction;
      if ('None' === defaultActionName) defaultActionName = 'Free'; //calculate distance from free

      var defaultActionIndex = Data.Power.actions.indexOf(defaultActionName);
      var newActionIndex = Data.Power.actions.indexOf(_this.state.action);

      if (Main.getActiveRuleset().isGreaterThanOrEqualTo(3, 4) && 'Reaction' === _this.state.action && 'Luck Control' !== _this.state.effect) {
        newActionIndex = Data.Power.actions.indexOf('Standard'); //calculate distance from Standard

        _this.modifierSection.createByNameRank('Aura', 1);
      }

      var actionDifference = newActionIndex - defaultActionIndex;
      if (actionDifference > 0) _this.modifierSection.createByNameRank('Faster Action', actionDifference);else if (actionDifference < 0) _this.modifierSection.createByNameRank('Slower Action', -actionDifference);
    });

    _defineProperty(_assertThisInitialized(_this), "_updateDurationModifiers", function () {
      if ('Feature' === _this.state.effect) return; //Feature doesn't change modifiers

      var defaultDurationName = Data.Power[_this.state.effect].defaultDuration;
      var defaultDurationIndex = Data.Power.durations.indexOf(defaultDurationName);
      var newDurationIndex = Data.Power.durations.indexOf(_this.state.duration);
      if ('Permanent' === defaultDurationName && 'Personal' !== _this.state.range) defaultDurationIndex = Data.Power.durations.indexOf('Sustained'); //calculate distance from Sustained
      //remove both if possible

      _this.modifierSection.removeByName('Increased Duration');

      _this.modifierSection.removeByName('Decreased Duration');

      var durationDifference = newDurationIndex - defaultDurationIndex;
      if (durationDifference > 0) _this.modifierSection.createByNameRank('Increased Duration', durationDifference);else if (durationDifference < 0) _this.modifierSection.createByNameRank('Decreased Duration', -durationDifference);
    });

    _defineProperty(_assertThisInitialized(_this), "_updateRangeModifiers", function () {
      //when changing to personal nothing else needs to change
      if ('Personal' === _this.state.range) return; //only possible (for feature or) when removing a modifier

      if ('Feature' === _this.state.effect) return; //Feature doesn't change modifiers
      //TODO: refactor so that Feature has a base activation row and a current activation row
      //so that Feature will have the modifiers auto set. This should be less confusing to the user
      //this will also allow and require more edge case testing

      var defaultRangeName = Data.Power[_this.state.effect].defaultRange;
      var defaultRangeIndex = Data.Power.ranges.indexOf(defaultRangeName);
      var newRangeIndex = Data.Power.ranges.indexOf(_this.state.range);
      if ('Personal' === defaultRangeName) defaultRangeIndex = Data.Power.ranges.indexOf('Close'); //calculate distance from close
      //remove both if possible

      _this.modifierSection.removeByName('Increased Range');

      _this.modifierSection.removeByName('Reduced Range');

      var rangeDifference = newRangeIndex - defaultRangeIndex;
      if (rangeDifference > 0) _this.modifierSection.createByNameRank('Increased Range', rangeDifference);else if (rangeDifference < 0) _this.modifierSection.createByNameRank('Reduced Range', -rangeDifference);
    });

    _defineProperty(_assertThisInitialized(_this), "_validateAndGetPossibleActions", function () {
      //feature has the same action as the others (because allowReaction is true)
      if ('Permanent' === _this.state.duration) {
        if ('None' !== _this.state.action) {
          Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleActions.onlyNone', _this.props.sectionName.toTitleCase() + ' #' + (_this.state.rowIndex + 1) + ': ' + _this.state.effect + ' can\'t have an action of ' + _this.state.action + '. It can only be None because the duration is Permanent.');
          _this.state.action = 'None';
        }

        return ['None'];
      } else if ('None' === _this.state.action) //only Permanent duration can have action None
        {
          _this.state.action = Data.Power[_this.state.effect].defaultAction;
          if ('None' === _this.state.action) _this.state.action = 'Free'; //use default action if possible. otherwise use Free
          //either way it will cost 0

          Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleActions.notNone', _this.props.sectionName.toTitleCase() + ' #' + (_this.state.rowIndex + 1) + ': ' + _this.state.effect + ' can\'t have an action of None because it isn\'t Permanent duration (duration is ' + _this.state.duration + '). Using action of ' + _this.state.action + ' instead.');
        }

      var possibleActions = Data.Power.actions.copy();
      possibleActions.removeByValue('None'); //it would have returned above if none is allowed

      var allowMoveAction = Main.getActiveRuleset().isLessThan(3, 4) || !Data.Power[_this.state.effect].isAttack || 'Move Object' === _this.state.effect;

      if (!allowMoveAction) possibleActions.removeByValue('Move');

      if ('Move' === _this.state.action && !allowMoveAction) {
        _this.state.action = Data.Power[_this.state.effect].defaultAction;
        if ('None' === _this.state.action) _this.state.action = 'Free'; //dead code: attacks can't have a default duration of Permanent

        Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleActions.moveNotAllowed', _this.props.sectionName.toTitleCase() + ' #' + (_this.state.rowIndex + 1) + ': ' + _this.state.effect + ' can\'t have an action ' + 'of Move because it is an attack type. Using action of ' + _this.state.action + ' instead.');
      }

      var allowFreeAction = Main.getActiveRuleset().isLessThan(3, 4) || allowMoveAction && !Data.Power[_this.state.effect].isMovement && 'Healing' !== _this.state.effect;

      if (!allowFreeAction) possibleActions.removeByValue('Free');

      if ('Free' === _this.state.action && !allowFreeAction) {
        if (!allowMoveAction) {
          _this.state.action = Data.Power[_this.state.effect].defaultAction;
          if ('None' === _this.state.action) _this.state.action = 'Free'; //dead code: attacks/movement can't have a default duration of
          // Permanent

          Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleActions.freeNotAllowedForAttacks', _this.props.sectionName.toTitleCase() + ' #' + (_this.state.rowIndex + 1) + ': ' + _this.state.effect + ' can\'t have an action of Free because it is an attack type. Using action of ' + _this.state.action + ' instead.');
        } //attacks can't be movements so there's no overlap
        else if (Data.Power[_this.state.effect].isMovement) {
            _this.state.action = Data.Power[_this.state.effect].defaultAction;
            if ('None' === _this.state.action) _this.state.action = 'Free'; //dead code: movements can't have a default duration of Permanent

            Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleActions.freeNotAllowedForMovement', _this.props.sectionName.toTitleCase() + ' #' + (_this.state.rowIndex + 1) + ': ' + _this.state.effect + ' can\'t have an action of Free because it is a movement type. Using action of ' + _this.state.action + ' instead.');
          } //healing is not an attack or movement so there's no overlap
          else //if ('Healing' === this.state.effect)
            {
              _this.state.action = Data.Power[_this.state.effect].defaultAction;
              if ('None' === _this.state.action) _this.state.action = 'Free'; //dead code: Healing doesn't have a default duration of Permanent

              Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleActions.freeNotAllowedForHealing', _this.props.sectionName.toTitleCase() + ' #' + (_this.state.rowIndex + 1) + ': ' + 'Healing can\'t have an action of Free. Using action of ' + _this.state.action + ' instead.');
            }
      }

      var allowReaction = Main.getActiveRuleset().isLessThan(3, 4) || Data.Power[_this.state.effect].allowReaction;

      if (!allowReaction) possibleActions.removeByValue('Reaction');

      if ('Reaction' === _this.state.action && !allowReaction) {
        _this.state.action = Data.Power[_this.state.effect].defaultAction;
        if ('None' === _this.state.action) _this.state.action = 'Free'; //duration is not Permanent here because that was checked above

        Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleActions.reactionNotAllowed', _this.props.sectionName.toTitleCase() + ' #' + (_this.state.rowIndex + 1) + ': ' + _this.state.effect + ' can\'t have an action of Reaction because it isn\'t an attack type. Using action of ' + _this.state.action + ' instead.'); //TODO: confusing limitation: Variable is allowed to have Reaction in 3 cases
      }

      return possibleActions;
    });

    _defineProperty(_assertThisInitialized(_this), "_validateAndGetPossibleDurations", function () {
      var defaultDuration = Data.Power[_this.state.effect].defaultDuration;

      if ('Instant' === defaultDuration) {
        if ('Instant' !== _this.state.duration) {
          Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleDurations.onlyInstant', _this.props.sectionName.toTitleCase() + ' #' + (_this.state.rowIndex + 1) + ': ' + _this.state.effect + ' can\'t have ' + _this.state.duration + ' duration. It can only be Instant.');
          _this.state.duration = 'Instant'; //can't be changed (Feature's defaultDuration is Permanent)
        }

        return ['Instant'];
      }

      var possibleDurations = ['Concentration', 'Sustained', 'Continuous'];
      if ('Personal' === _this.state.range) possibleDurations.push('Permanent'); //even Feature needs Personal range for Permanent duration
      //when loading, range may later change to Close but not Personal so this check is safe
      else if ('Permanent' === _this.state.duration) //only personal range can have Permanent duration
          {
            if ('Permanent' === defaultDuration) _this.state.duration = 'Sustained';else _this.state.duration = defaultDuration; //use default duration if possible. otherwise use Sustained
            //either way it will cost 0

            Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleDurations.notPermanent', _this.props.sectionName.toTitleCase() + ' #' + (_this.state.rowIndex + 1) + ': ' + _this.state.effect + ' can\'t have Permanent duration because it isn\'t Personal range (range is ' + _this.state.range + '). Using duration of ' + _this.state.duration + ' instead.');
          }
      if ('Feature' === _this.state.effect) possibleDurations.push('Instant');else if ('Instant' === _this.state.duration) {
        //only Feature can change to Instant duration. defaultDuration of instant was checked above
        Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleDurations.notInstant', _this.props.sectionName.toTitleCase() + ' #' + (_this.state.rowIndex + 1) + ': ' + _this.state.effect + ' can\'t have Instant duration. Using the default duration of ' + defaultDuration + ' instead.');
        _this.state.duration = defaultDuration;
      }
      return possibleDurations;
    });

    _defineProperty(_assertThisInitialized(_this), "_validatePersonalRange", function () {
      if ('Feature' === _this.state.effect) return; //allow everything

      var defaultRange = Data.Power[_this.state.effect].defaultRange;

      if ('Personal' === _this.state.range && 'Personal' !== defaultRange) {
        Main.messageUser('PowerObjectAgnostic.validatePersonalRange.notPersonal', _this.props.sectionName.toTitleCase() + ' #' + (_this.state.rowIndex + 1) + ': ' + _this.state.effect + ' can\'t have Personal range. Using the default range of ' + defaultRange + ' instead.');
        _this.state.range = defaultRange; //can't change something to personal unless it started out as that (Feature's defaultRange is
        // Personal)
      } else if ('Personal' !== _this.state.range && 'Personal' === defaultRange) {
        var hasNonPersonalMod = _this.modifierSection.isNonPersonalModifierPresent();

        if (!hasNonPersonalMod) {
          Main.messageUser('PowerObjectAgnostic.validatePersonalRange.nonPersonalNotAllowed', _this.props.sectionName.toTitleCase() + ' #' + (_this.state.rowIndex + 1) + ': ' + _this.state.effect + ' with ' + _this.state.range + ' range requires one of the following modifiers: "Affects Others Also", "Affects Others Only", or "Attack". ' + 'Using the default range of Personal instead.');
          _this.state.range = defaultRange; //can't create a mod for you since there are 3 possible
        }
      }
    });

    _this.state = {}; //modifierSection is lazy because it is re-created each render

    _this.derivedValues = {
      shouldValidateActivationInfo: true,
      total: 0
    };
    return _this;
  }

  return PowerObjectAgnostic;
}(React.Component); //TODO: not sure if setting state should be fixed before pulling state up. probably not


function testPowerRow() {
  var key = MainObject.generateKey();
  ReactDOM.render( /*#__PURE__*/React.createElement(PowerObjectAgnostic, {
    sectionName: "power",
    powerListParent: Main.powerSection,
    key: key,
    keyCopy: key
  }), document.getElementById('power-section'));
}
/*
all state:
getAction = () => {return this.state.action;};
getBaseCost = () => {return this.state.baseCost;};
getDuration = () => {return this.state.duration;};
getEffect = () => {return this.state.effect;};
getName = () => {return this.state.name;};
getRange = () => {return this.state.range;};
getRank = () => {return this.state.rank;};
getSkillUsed = () => {return this.state.skillUsed;};
getText = () => {return this.state.text;};
yes total is state for now
getTotal = () => {return this.state.total;};
*/