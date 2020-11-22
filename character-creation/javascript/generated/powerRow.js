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

  function PowerObjectAgnostic(_props) {
    var _this;

    _classCallCheck(this, PowerObjectAgnostic);

    _this = _super.call(this, _props);

    _defineProperty(_assertThisInitialized(_this), "getAction", function () {
      return _this.props.state.action;
    });

    _defineProperty(_assertThisInitialized(_this), "getBaseCost", function () {
      return _this.props.state.baseCost;
    });

    _defineProperty(_assertThisInitialized(_this), "getDuration", function () {
      return _this.props.state.duration;
    });

    _defineProperty(_assertThisInitialized(_this), "getDerivedValues", function () {
      return JSON.clone(_this._derivedValues);
    });

    _defineProperty(_assertThisInitialized(_this), "getEffect", function () {
      return _this.props.state.effect;
    });

    _defineProperty(_assertThisInitialized(_this), "getKey", function () {
      return _this.props.keyCopy;
    });

    _defineProperty(_assertThisInitialized(_this), "getName", function () {
      return _this.props.state.name;
    });

    _defineProperty(_assertThisInitialized(_this), "getRange", function () {
      return _this.props.state.range;
    });

    _defineProperty(_assertThisInitialized(_this), "getRank", function () {
      return _this.props.state.rank;
    });

    _defineProperty(_assertThisInitialized(_this), "getSectionName", function () {
      return _this.props.sectionName;
    });

    _defineProperty(_assertThisInitialized(_this), "getSkillUsed", function () {
      return _this.props.state.skillUsed;
    });

    _defineProperty(_assertThisInitialized(_this), "getState", function () {
      return JSON.clone(_this.props.state);
    });

    _defineProperty(_assertThisInitialized(_this), "getText", function () {
      return _this.props.state.text;
    });

    _defineProperty(_assertThisInitialized(_this), "getTotal", function () {
      return _this._derivedValues.total;
    });

    _defineProperty(_assertThisInitialized(_this), "isBaseCostSettable", function () {
      return _this._derivedValues.canSetBaseCost;
    });

    _defineProperty(_assertThisInitialized(_this), "getSection", function () {
      return _this.props.powerListParent;
    });

    _defineProperty(_assertThisInitialized(_this), "disableValidationForActivationInfo", function () {
      _this._derivedValues.shouldValidateActivationInfo = false;
    });

    _defineProperty(_assertThisInitialized(_this), "getDefaultAction", function () {
      return Data.Power[_this.props.state.effect].defaultAction;
    });

    _defineProperty(_assertThisInitialized(_this), "getDefaultDuration", function () {
      return Data.Power[_this.props.state.effect].defaultDuration;
    });

    _defineProperty(_assertThisInitialized(_this), "getDefaultRange", function () {
      return Data.Power[_this.props.state.effect].defaultRange;
    });

    _defineProperty(_assertThisInitialized(_this), "getUniqueName", function () {
      var modListName = '';
      if (undefined !== _this.modifierSection) modListName = _this.modifierSection.getUniqueName();
      return _this.props.state.effect + ': ' + _this.props.state.text + '; ' + modListName; //text might be empty
    });

    _defineProperty(_assertThisInitialized(_this), "hasAutoTotal", function () {
      return _this.modifierSection.hasAutoTotal();
    });

    _defineProperty(_assertThisInitialized(_this), "select", function () {
      CommonsLibrary.select.call(_assertThisInitialized(_this), _this.setPower, _this.props.sectionName + 'Choices' + _this.props.state.rowIndex, _this.props.powerListParent);
    });

    _defineProperty(_assertThisInitialized(_this), "changeBaseCost", function () {
      //won't be called if you can't set base cost
      CommonsLibrary.change.call(_assertThisInitialized(_this), _this.setBaseCost, _this.props.sectionName + 'BaseCost' + _this.props.state.rowIndex, _this.props.powerListParent);
    });

    _defineProperty(_assertThisInitialized(_this), "changeText", function () {
      CommonsLibrary.change.call(_assertThisInitialized(_this), _this.setText, _this.props.sectionName + 'Text' + _this.props.state.rowIndex, _this.props.powerListParent);
    });

    _defineProperty(_assertThisInitialized(_this), "selectAction", function () {
      //won't be called if SelectAction doesn't exist
      CommonsLibrary.select.call(_assertThisInitialized(_this), _this.setAction, _this.props.sectionName + 'SelectAction' + _this.props.state.rowIndex, _this.props.powerListParent);
    });

    _defineProperty(_assertThisInitialized(_this), "selectRange", function () {
      CommonsLibrary.select.call(_assertThisInitialized(_this), _this.setRange, _this.props.sectionName + 'SelectRange' + _this.props.state.rowIndex, _this.props.powerListParent);
    });

    _defineProperty(_assertThisInitialized(_this), "selectDuration", function () {
      CommonsLibrary.select.call(_assertThisInitialized(_this), _this.setDuration, _this.props.sectionName + 'SelectDuration' + _this.props.state.rowIndex, _this.props.powerListParent);
    });

    _defineProperty(_assertThisInitialized(_this), "changeName", function () {
      CommonsLibrary.change.call(_assertThisInitialized(_this), _this.setName, _this.props.sectionName + 'Name' + _this.props.state.rowIndex, _this.props.powerListParent);
    });

    _defineProperty(_assertThisInitialized(_this), "changeSkill", function () {
      CommonsLibrary.change.call(_assertThisInitialized(_this), _this.setSkill, _this.props.sectionName + 'Skill' + _this.props.state.rowIndex, _this.props.powerListParent);
    });

    _defineProperty(_assertThisInitialized(_this), "getModifierList", function () {
      return _this.modifierSection;
    });

    _defineProperty(_assertThisInitialized(_this), "changeRank", function () {
      CommonsLibrary.change.call(_assertThisInitialized(_this), _this.setRank, _this.props.sectionName + 'Rank' + _this.props.state.rowIndex, _this.props.powerListParent);
    });

    _defineProperty(_assertThisInitialized(_this), "setPower", function (effectNameGiven) {
      //TODO: only set _derivedValues in each. move defaults to specific
      _this.state.action = Data.Power[_this.state.effect].defaultAction;
      _this.state.range = Data.Power[_this.state.effect].defaultRange;
      _this.state.duration = Data.Power[_this.state.effect].defaultDuration;
      _this.state.rank = 1; //name = skillUsed = undefined;  //don't clear so that if changing between 2 different attacks these carry over

      _this.generateNameAndSkill();
    });

    _defineProperty(_assertThisInitialized(_this), "setBaseCost", function (baseGiven) {
      _this._derivedValues.canSetBaseCost = Data.Power[_this.state.effect].hasInputBaseCost;
      _this.state.baseCost = Data.Power[_this.state.effect].baseCost;
      if (!_this._derivedValues.canSetBaseCost) return; //only possible when loading bad data

      _this.state.baseCost = sanitizeNumber(baseGiven, 1, Data.Power[_this.state.effect].baseCost); //unique defaults
    });

    _defineProperty(_assertThisInitialized(_this), "setText", function (textGiven) {
      if (undefined === _this.state.text) _this.state.text = 'Descriptors and other text'; //let the text stay if changing between powers

      _this.state.text = textGiven;
    });

    _defineProperty(_assertThisInitialized(_this), "setAction", function (newActionName) {
      if (_this.state.action === newActionName) return; //nothing has changed (only possible when loading)

      if (!Data.Power.actions.contains(newActionName)) {
        //if not found (only possible when loading bad data)
        Main.messageUser('PowerObjectAgnostic.setAction.notExist', _this.props.sectionName.toTitleCase() + ' #' + (_this.state.rowIndex + 1) + ': ' + newActionName + ' is not the name of an action.');
        return;
      }

      _this.state.action = newActionName;
      if (!_this._derivedValues.shouldValidateActivationInfo) return; //done

      _this._updateActionModifiers();

      if ('Reaction' === _this.state.action && 'Feature' !== _this.state.effect && 'Luck Control' !== _this.state.effect && Main.getActiveRuleset().isGreaterThanOrEqualTo(3, 4)) _this.setRange('Close');

      _this.generateNameAndSkill();
    });

    _defineProperty(_assertThisInitialized(_this), "setRange", function (newRangeName) {
      if (_this.state.range === newRangeName) return; //nothing has changed (only possible when loading)

      if (!Data.Power.ranges.contains(newRangeName)) {
        //if not found (only possible when loading bad data)
        Main.messageUser('PowerObjectAgnostic.setRange.notExist', _this.props.sectionName.toTitleCase() + ' #' + (_this.state.rowIndex + 1) + ': ' + newRangeName + ' is not the name of a range.');
        return;
      }

      var oldRange = _this.state.range;
      _this.state.range = newRangeName;
      if (!_this._derivedValues.shouldValidateActivationInfo) return; //done
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
      if (_this.state.duration === newDurationName) return; //nothing has changed (only possible when loading)

      if (!Data.Power.durations.contains(newDurationName)) {
        //if not found (only possible when loading bad data)
        Main.messageUser('PowerObjectAgnostic.setDuration.notExist', _this.props.sectionName.toTitleCase() + ' #' + (_this.state.rowIndex + 1) + ': ' + newDurationName + ' is not the name of a duration.');
        return;
      }

      var oldDuration = _this.state.duration;
      _this.state.duration = newDurationName;
      if (!_this._derivedValues.shouldValidateActivationInfo) return; //done

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
      _this.state.name = nameGiven;
    });

    _defineProperty(_assertThisInitialized(_this), "setSkill", function (skillGiven) {
      _this.state.skillUsed = skillGiven;
    });

    _defineProperty(_assertThisInitialized(_this), "setRank", function (rankGiven) {
      _this.state.rank = sanitizeNumber(rankGiven, 1, 1);
    });

    _defineProperty(_assertThisInitialized(_this), "calculateValues", function () {
      if (undefined === _this.modifierSection) return; //nothing to calculate for before rendering

      _this.modifierSection.calculateValues();

      var costPerRank = _this.props.state.baseCost + _this.modifierSection.getRankTotal();

      if (Main.getActiveRuleset().isGreaterThanOrEqualTo(3, 5) && 'Variable' === _this.props.state.effect && costPerRank < 5) costPerRank = 5;else if (costPerRank < -3) costPerRank = -3; //can't be less than 1/5

      _this._derivedValues.costPerRank = costPerRank; //save the non-decimal version

      if (costPerRank < 1) costPerRank = 1 / (2 - costPerRank);
      _this._derivedValues.total = Math.ceil(costPerRank * _this.props.state.rank); //round up

      var flatValue = _this.modifierSection.getFlatTotal();

      if (flatValue < 0 && _this._derivedValues.total + flatValue < 1) //flat flaw more than (or equal to) the total cost is not allowed. so adjust the
        // power rank
        {
          _this.props.state.rank = Math.abs(flatValue) / costPerRank;
          _this.props.state.rank = Math.floor(_this.props.state.rank) + 1; //must be higher than for this to work. don't use ceil so that if whole number
          // will still be +1

          _this._derivedValues.total = Math.ceil(costPerRank * _this.props.state.rank); //round up
        }

      _this._derivedValues.flatValue = flatValue;
      _this._derivedValues.total += flatValue; //flatValue might be negative

      if ('A God I Am' === _this.props.state.effect) _this._derivedValues.total += 145; //for first ranks
      else if ('Reality Warp' === _this.props.state.effect) _this._derivedValues.total += 75;
      _this._derivedValues.total = _this.modifierSection.calculateGrandTotal(_this._derivedValues.total); //used to calculate all auto modifiers
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var callback = function callback(newThing) {
        _this.modifierSection = newThing;
      };

      _this._derivedValues.possibleActions = _this._validateAndGetPossibleActions();
      _this._derivedValues.possibleRanges = _this._getPossibleRanges();
      _this._derivedValues.possibleDurations = _this._validateAndGetPossibleDurations(); //TODO: pretty sure need different key in which case generate in new()

      return /*#__PURE__*/React.createElement(PowerRowHtml, {
        sectionName: _this.props.sectionName,
        powerRow: _assertThisInitialized(_this),
        state: _this.props.state,
        derivedValues: _this._derivedValues,
        key: _this.props.keyCopy,
        keyCopy: _this.props.keyCopy,
        modCallback: callback,
        modState: _this.props.state.Modifiers
      });
    });

    _defineProperty(_assertThisInitialized(_this), "generateNameAndSkill", function () {
      return; //TODO: disabled generateNameAndSkill

      if (!Data.Power[_this.props.state.effect].isAttack && undefined === _this.modifierSection.findRowByName('Attack')) {
        _this.props.state.name = _this.props.state.skillUsed = undefined;
        return;
      }

      if (undefined === _this.props.state.name) _this.props.state.name = _this.props.sectionName.toTitleCase() + ' ' + (_this.props.state.rowIndex + 1) + ' ' + _this.props.state.effect; //for example: "Equipment 1 Damage" the "Equipment 1" is used for uniqueness

      var isAura = Main.getActiveRuleset().isGreaterThanOrEqualTo(3, 4) && 'Reaction' === _this.props.state.action && 'Luck Control' !== _this.props.state.effect && 'Feature' !== _this.props.state.effect;

      if ('Perception' === _this.props.state.range || isAura) _this.props.state.skillUsed = undefined;else if (undefined === _this.props.state.skillUsed) _this.props.state.skillUsed = 'Skill used for attack';
    });

    _defineProperty(_assertThisInitialized(_this), "save", function () {
      //don't just clone this.state: skill, cost is different
      var json = {};
      json.effect = _this.props.state.effect;
      if (_this._derivedValues.canSetBaseCost) json.cost = _this.props.state.baseCost;
      json.text = _this.props.state.text;
      json.action = _this.props.state.action;
      json.range = _this.props.state.range;
      json.duration = _this.props.state.duration; //checking undefined is redundant but more clear

      if (undefined !== _this.props.state.name) json.name = _this.props.state.name; //skill requires name however perception range has name without skill

      if (undefined !== _this.props.state.skillUsed) json.skill = _this.props.state.skillUsed;
      json.Modifiers = _this.modifierSection.save();
      json.rank = _this.props.state.rank;
      return json;
    });

    _defineProperty(_assertThisInitialized(_this), "updateActivationModifiers", function () {
      _this._derivedValues.shouldValidateActivationInfo = true;

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


      if (Main.getActiveRuleset().isGreaterThanOrEqualTo(3, 4) && 'Luck Control' !== _this.props.state.effect && 'Feature' !== _this.props.state.effect && 'Reaction' === _this.props.state.action && 'Close' !== _this.props.state.range) {
        Main.messageUser('PowerObjectAgnostic.validateActivationInfo.reactionRequiresClose', _this.props.sectionName.toTitleCase() + ' #' + (_this.props.state.rowIndex + 1) + ': ' + _this.props.state.effect + ' has an action of Reaction and therefore must have a range of Close.');
        _this.props.state.range = 'Close'; //TODO: confusing limitation: in 3 cases Variable is allowed to have Reaction with Personal range
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_getPossibleRanges", function () {
      var possibleRanges = [];
      if ('Feature' === _this.props.state.effect) possibleRanges.push('Personal');else {
        if (Main.getActiveRuleset().isGreaterThanOrEqualTo(3, 4) && 'Reaction' === _this.props.state.action && 'Luck Control' !== _this.props.state.effect) return ['Close'];
        if ('Personal' === _this.props.state.range) return ['Personal'];
      }
      return possibleRanges.concat(['Close', 'Ranged', 'Perception']);
    });

    _defineProperty(_assertThisInitialized(_this), "_updateActionModifiers", function () {
      if ('Triggered' === _this.props.state.action) _this.modifierSection.createByNameRank('Selective', 1); //Triggered must also be selective so
      // it auto adds but doesn't remove

      if ('Feature' === _this.props.state.effect) return; //Feature doesn't change any other modifiers
      //remove all if possible

      _this.modifierSection.removeByName('Faster Action');

      _this.modifierSection.removeByName('Slower Action');

      _this.modifierSection.removeByName('Aura');

      if ('None' === _this.props.state.action) return; //don't add any modifiers

      var defaultActionName = Data.Power[_this.props.state.effect].defaultAction;
      if ('None' === defaultActionName) defaultActionName = 'Free'; //calculate distance from free

      var defaultActionIndex = Data.Power.actions.indexOf(defaultActionName);
      var newActionIndex = Data.Power.actions.indexOf(_this.props.state.action);

      if (Main.getActiveRuleset().isGreaterThanOrEqualTo(3, 4) && 'Reaction' === _this.props.state.action && 'Luck Control' !== _this.props.state.effect) {
        newActionIndex = Data.Power.actions.indexOf('Standard'); //calculate distance from Standard

        _this.modifierSection.createByNameRank('Aura', 1);
      }

      var actionDifference = newActionIndex - defaultActionIndex;
      if (actionDifference > 0) _this.modifierSection.createByNameRank('Faster Action', actionDifference);else if (actionDifference < 0) _this.modifierSection.createByNameRank('Slower Action', -actionDifference);
    });

    _defineProperty(_assertThisInitialized(_this), "_updateDurationModifiers", function () {
      if ('Feature' === _this.props.state.effect) return; //Feature doesn't change modifiers

      var defaultDurationName = Data.Power[_this.props.state.effect].defaultDuration;
      var defaultDurationIndex = Data.Power.durations.indexOf(defaultDurationName);
      var newDurationIndex = Data.Power.durations.indexOf(_this.props.state.duration);
      if ('Permanent' === defaultDurationName && 'Personal' !== _this.props.state.range) defaultDurationIndex = Data.Power.durations.indexOf('Sustained'); //calculate distance from Sustained
      //remove both if possible

      _this.modifierSection.removeByName('Increased Duration');

      _this.modifierSection.removeByName('Decreased Duration');

      var durationDifference = newDurationIndex - defaultDurationIndex;
      if (durationDifference > 0) _this.modifierSection.createByNameRank('Increased Duration', durationDifference);else if (durationDifference < 0) _this.modifierSection.createByNameRank('Decreased Duration', -durationDifference);
    });

    _defineProperty(_assertThisInitialized(_this), "_updateRangeModifiers", function () {
      //when changing to personal nothing else needs to change
      if ('Personal' === _this.props.state.range) return; //only possible (for feature or) when removing a modifier

      if ('Feature' === _this.props.state.effect) return; //Feature doesn't change modifiers
      //TODO: refactor so that Feature has a base activation row and a current activation row
      //so that Feature will have the modifiers auto set. This should be less confusing to the user
      //this will also allow and require more edge case testing

      var defaultRangeName = Data.Power[_this.props.state.effect].defaultRange;
      var defaultRangeIndex = Data.Power.ranges.indexOf(defaultRangeName);
      var newRangeIndex = Data.Power.ranges.indexOf(_this.props.state.range);
      if ('Personal' === defaultRangeName) defaultRangeIndex = Data.Power.ranges.indexOf('Close'); //calculate distance from close
      //remove both if possible

      _this.modifierSection.removeByName('Increased Range');

      _this.modifierSection.removeByName('Reduced Range');

      var rangeDifference = newRangeIndex - defaultRangeIndex;
      if (rangeDifference > 0) _this.modifierSection.createByNameRank('Increased Range', rangeDifference);else if (rangeDifference < 0) _this.modifierSection.createByNameRank('Reduced Range', -rangeDifference);
    });

    _defineProperty(_assertThisInitialized(_this), "_validateAndGetPossibleActions", function () {
      //feature has the same action as the others (because allowReaction is true)
      if ('Permanent' === _this.props.state.duration) {
        if ('None' !== _this.props.state.action) {
          Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleActions.onlyNone', _this.props.sectionName.toTitleCase() + ' #' + (_this.props.state.rowIndex + 1) + ': ' + _this.props.state.effect + ' can\'t have an action of ' + _this.props.state.action + '. It can only be None because the duration is Permanent.');
          _this.props.state.action = 'None';
        }

        return ['None'];
      } else if ('None' === _this.props.state.action) //only Permanent duration can have action None
        {
          _this.props.state.action = Data.Power[_this.props.state.effect].defaultAction;
          if ('None' === _this.props.state.action) _this.props.state.action = 'Free'; //use default action if possible. otherwise use Free
          //either way it will cost 0

          Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleActions.notNone', _this.props.sectionName.toTitleCase() + ' #' + (_this.props.state.rowIndex + 1) + ': ' + _this.props.state.effect + ' can\'t have an action of None because it isn\'t Permanent duration (duration is ' + _this.props.state.duration + '). Using action of ' + _this.props.state.action + ' instead.');
        }

      var possibleActions = Data.Power.actions.copy();
      possibleActions.removeByValue('None'); //it would have returned above if none is allowed

      var allowMoveAction = Main.getActiveRuleset().isLessThan(3, 4) || !Data.Power[_this.props.state.effect].isAttack || 'Move Object' === _this.props.state.effect;

      if (!allowMoveAction) possibleActions.removeByValue('Move');

      if ('Move' === _this.props.state.action && !allowMoveAction) {
        _this.props.state.action = Data.Power[_this.props.state.effect].defaultAction;
        if ('None' === _this.props.state.action) _this.props.state.action = 'Free'; //dead code: attacks can't have a default duration of Permanent

        Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleActions.moveNotAllowed', _this.props.sectionName.toTitleCase() + ' #' + (_this.props.state.rowIndex + 1) + ': ' + _this.props.state.effect + ' can\'t have an action ' + 'of Move because it is an attack type. Using action of ' + _this.props.state.action + ' instead.');
      }

      var allowFreeAction = Main.getActiveRuleset().isLessThan(3, 4) || allowMoveAction && !Data.Power[_this.props.state.effect].isMovement && 'Healing' !== _this.props.state.effect;

      if (!allowFreeAction) possibleActions.removeByValue('Free');

      if ('Free' === _this.props.state.action && !allowFreeAction) {
        if (!allowMoveAction) {
          _this.props.state.action = Data.Power[_this.props.state.effect].defaultAction;
          if ('None' === _this.props.state.action) _this.props.state.action = 'Free'; //dead code: attacks/movement can't have a default duration of
          // Permanent

          Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleActions.freeNotAllowedForAttacks', _this.props.sectionName.toTitleCase() + ' #' + (_this.props.state.rowIndex + 1) + ': ' + _this.props.state.effect + ' can\'t have an action of Free because it is an attack type. Using action of ' + _this.props.state.action + ' instead.');
        } //attacks can't be movements so there's no overlap
        else if (Data.Power[_this.props.state.effect].isMovement) {
            _this.props.state.action = Data.Power[_this.props.state.effect].defaultAction;
            if ('None' === _this.props.state.action) _this.props.state.action = 'Free'; //dead code: movements can't have a default duration of Permanent

            Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleActions.freeNotAllowedForMovement', _this.props.sectionName.toTitleCase() + ' #' + (_this.props.state.rowIndex + 1) + ': ' + _this.props.state.effect + ' can\'t have an action of Free because it is a movement type. Using action of ' + _this.props.state.action + ' instead.');
          } //healing is not an attack or movement so there's no overlap
          else //if ('Healing' === this.props.state.effect)
            {
              _this.props.state.action = Data.Power[_this.props.state.effect].defaultAction;
              if ('None' === _this.props.state.action) _this.props.state.action = 'Free'; //dead code: Healing doesn't have a default duration of Permanent

              Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleActions.freeNotAllowedForHealing', _this.props.sectionName.toTitleCase() + ' #' + (_this.props.state.rowIndex + 1) + ': ' + 'Healing can\'t have an action of Free. Using action of ' + _this.props.state.action + ' instead.');
            }
      }

      var allowReaction = Main.getActiveRuleset().isLessThan(3, 4) || Data.Power[_this.props.state.effect].allowReaction;

      if (!allowReaction) possibleActions.removeByValue('Reaction');

      if ('Reaction' === _this.props.state.action && !allowReaction) {
        _this.props.state.action = Data.Power[_this.props.state.effect].defaultAction;
        if ('None' === _this.props.state.action) _this.props.state.action = 'Free'; //duration is not Permanent here because that was checked above

        Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleActions.reactionNotAllowed', _this.props.sectionName.toTitleCase() + ' #' + (_this.props.state.rowIndex + 1) + ': ' + _this.props.state.effect + ' can\'t have an action of Reaction because it isn\'t an attack type. Using action of ' + _this.props.state.action + ' instead.'); //TODO: confusing limitation: Variable is allowed to have Reaction in 3 cases
      }

      return possibleActions;
    });

    _defineProperty(_assertThisInitialized(_this), "_validateAndGetPossibleDurations", function () {
      var defaultDuration = Data.Power[_this.props.state.effect].defaultDuration;

      if ('Instant' === defaultDuration) {
        if ('Instant' !== _this.props.state.duration) {
          Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleDurations.onlyInstant', _this.props.sectionName.toTitleCase() + ' #' + (_this.props.state.rowIndex + 1) + ': ' + _this.props.state.effect + ' can\'t have ' + _this.props.state.duration + ' duration. It can only be Instant.');
          _this.props.state.duration = 'Instant'; //can't be changed (Feature's defaultDuration is Permanent)
        }

        return ['Instant'];
      }

      var possibleDurations = ['Concentration', 'Sustained', 'Continuous'];
      if ('Personal' === _this.props.state.range) possibleDurations.push('Permanent'); //even Feature needs Personal range for Permanent duration
      //when loading, range may later change to Close but not Personal so this check is safe
      else if ('Permanent' === _this.props.state.duration) //only personal range can have Permanent duration
          {
            if ('Permanent' === defaultDuration) _this.props.state.duration = 'Sustained';else _this.props.state.duration = defaultDuration; //use default duration if possible. otherwise use Sustained
            //either way it will cost 0

            Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleDurations.notPermanent', _this.props.sectionName.toTitleCase() + ' #' + (_this.props.state.rowIndex + 1) + ': ' + _this.props.state.effect + ' can\'t have Permanent duration because it isn\'t Personal range (range is ' + _this.props.state.range + '). Using duration of ' + _this.props.state.duration + ' instead.');
          }
      if ('Feature' === _this.props.state.effect) possibleDurations.push('Instant');else if ('Instant' === _this.props.state.duration) {
        //only Feature can change to Instant duration. defaultDuration of instant was checked above
        Main.messageUser('PowerObjectAgnostic.validateAndGetPossibleDurations.notInstant', _this.props.sectionName.toTitleCase() + ' #' + (_this.props.state.rowIndex + 1) + ': ' + _this.props.state.effect + ' can\'t have Instant duration. Using the default duration of ' + defaultDuration + ' instead.');
        _this.props.state.duration = defaultDuration;
      }
      return possibleDurations;
    });

    _defineProperty(_assertThisInitialized(_this), "_validatePersonalRange", function () {
      if ('Feature' === _this.props.state.effect) return; //allow everything

      var defaultRange = Data.Power[_this.props.state.effect].defaultRange;

      if ('Personal' === _this.props.state.range && 'Personal' !== defaultRange) {
        Main.messageUser('PowerObjectAgnostic.validatePersonalRange.notPersonal', _this.props.sectionName.toTitleCase() + ' #' + (_this.props.state.rowIndex + 1) + ': ' + _this.props.state.effect + ' can\'t have Personal range. Using the default range of ' + defaultRange + ' instead.');
        _this.props.state.range = defaultRange; //can't change something to personal unless it started out as that (Feature's defaultRange is
        // Personal)
      } else if ('Personal' !== _this.props.state.range && 'Personal' === defaultRange) {
        var hasNonPersonalMod = _this.modifierSection.isNonPersonalModifierPresent();

        if (!hasNonPersonalMod) {
          Main.messageUser('PowerObjectAgnostic.validatePersonalRange.nonPersonalNotAllowed', _this.props.sectionName.toTitleCase() + ' #' + (_this.props.state.rowIndex + 1) + ': ' + _this.props.state.effect + ' with ' + _this.props.state.range + ' range requires one of the following modifiers: "Affects Others Also", "Affects Others Only", or "Attack". ' + 'Using the default range of Personal instead.');
          _this.props.state.range = defaultRange; //can't create a mod for you since there are 3 possible
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "createByNameRank", function (rowName, rowRank) {
      var rowIndex = _this.modifierSection.findRowByName(rowName);

      if (undefined === rowIndex) {
        _this.state.Modifiers.push({
          name: rowName,
          rank: rowRank
        });
      } else {
        _this.state.Modifiers[rowIndex].rank = rowRank;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "removeByName", function (rowName) {
      var rowIndex = _this.findRowByName(rowName);

      if (undefined !== rowIndex) _this.state.Modifiers.remove(rowIndex);
    });

    _defineProperty(_assertThisInitialized(_this), "load", function (jsonSection) {
      //the row array isn't cleared in case some have been auto set
      //Main.clear() is called at the start of Main.load()
      var newState = [];
      var duplicateCheck = [];

      for (var i = 0; i < jsonSection.length; i++) {
        var nameToLoad = jsonSection[i].name; //TODO: call a fun to get current power index

        var loadLocation = _this.props.sectionName.toTitleCase() + ' #' + (_this.props.state.sectionRowIndex + 1) + ' Modifier #' + (i + 1);

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

    _defineProperty(_assertThisInitialized(_this), "updateNameByRow", function (newName, modifierRow) {
      //TODO: no reason for this to be by row and others by key
      if (undefined === modifierRow) {
        _this.addRow(newName);

        return;
      }

      var updatedIndex = _this.getIndexByKey(modifierRow.getKey());

      if (!Data.Modifier.names.contains(newName) || _this._hasDuplicate()) {
        _this._removeRow(updatedIndex);
      } else {
        var rowState = modifierRow.getState();
        rowState.name = newName;
        _this._rowArray[updatedIndex] = new ModifierObject({
          key: _this._blankKey,
          powerRowParent: _this.props.powerRowParent,
          modifierListParent: _assertThisInitialized(_this),
          sectionName: _this.props.sectionName,
          state: rowState
        });

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

      var rowState = _this._rowArray[updatedIndex].getState();

      rowState.rank = newRank;
      _this._rowArray[updatedIndex] = new ModifierObject({
        key: _this._blankKey,
        powerRowParent: _this.props.powerRowParent,
        modifierListParent: _assertThisInitialized(_this),
        sectionName: _this.props.sectionName,
        state: rowState
      });

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

      var rowState = _this._rowArray[updatedIndex].getState();

      rowState.text = newText;
      _this._rowArray[updatedIndex] = new ModifierObject({
        key: _this._blankKey,
        powerRowParent: _this.props.powerRowParent,
        modifierListParent: _assertThisInitialized(_this),
        sectionName: _this.props.sectionName,
        state: rowState
      });

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
      //TODO: move this up. was in mod row
      if (false) {
        var wasAttack = 'Attack' === state.name || 'Affects Others Only' === state.name || 'Affects Others Also' === state.name; //TODO: remove these modifiers from GUI for non-personal powers. Those would need to be Enhanced trait attack

        if (wasAttack && 'Feature' !== props.powerRowParent.getEffect()) props.powerRowParent.setRange('Personal');

        if (!Data.Modifier.names.contains(nameGiven)) //if row is removed, ie: 'Select Modifier'
          {
            _this._resetValues();

            if (wasAttack) props.powerRowParent.generateNameAndSkill(); //technically only necessary if 'Attack' === state.name

            return;
          }

        if (('Attack' === state.name || 'Affects Others Only' === state.name || 'Affects Others Also' === state.name) && 'Personal' === props.powerRowParent.getRange()) props.powerRowParent.setRange('Close'); //when loading this value is redundantly set then later overridden by load's setRange

        if (wasAttack || 'Attack' === state.name) props.powerRowParent.generateNameAndSkill(); //create or destroy as needed
      } //the row that was blank no longer is so use the blank key


      var modifierObject = new ModifierObject({
        key: _this._blankKey,
        powerRowParent: _this.props.powerRowParent,
        modifierListParent: _assertThisInitialized(_this),
        sectionName: _this.props.sectionName,
        state: {
          name: newName
        } //rest are defaulted

      }); //need a new key for the new blank row

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
      //don't update any state
      _this.calculateValues();
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

    _this.state = {}; //modifierSection is lazy because it is re-created each render

    _this._derivedValues = {
      shouldValidateActivationInfo: true,
      total: 0
    };

    _this.setPower(_props.state.effect);

    _this.setBaseCost(_props.state.cost);

    _this.setText(_props.state.text); //they all have text because descriptors


    _this.disableValidationForActivationInfo(); //TODO: turn on loading mod list
    //this.getModifierList().load(props.state.Modifiers);
    //modifiers are loaded first so that I can use isNonPersonalModifierPresent and reset the activation modifiers
    //blindly set activation info then validate


    _this.setAction(_props.state.action);

    _this.setRange(_props.state.range);

    _this.setDuration(_props.state.duration); //TODO: turn on these
    //this.validateActivationInfo();
    //this.updateActivationModifiers();


    _this.setName(_props.state.name);

    _this.setSkill(_props.state.skill);

    _this.generateNameAndSkill();

    _this.setRank(_props.state.rank);

    _this._prerender();

    _props.callback(_assertThisInitialized(_this));

    return _this;
  } //throws if unstableSort doesn't exist


  return PowerObjectAgnostic;
}(React.Component); //TODO: not sure if setting state should be fixed before pulling state up. probably not


_defineProperty(PowerObjectAgnostic, "sanitizeState", function (inputState) {
  ;
});

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
*/