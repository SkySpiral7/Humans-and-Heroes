'use strict';
/**Call List onChange
Select Advantage: select();
Rank: changeRank();
Text: changeText();
*/
class AdvantageObject extends React.Component
{
   state;
   //TODO: upgrade to babel 7 to get real private by using # (although IDE doesn't support it?)
   _derivedValues;
   _key;

   constructor(props)
   {
      super(props);
      this._key=props.callbackId;
      props.instanceCallBack(this);
      this._resetValues();
   }

   //region single line functions (most Basic getters)
   getState=()=>{return JSON.clone(this.state);};  //defensive copy is important to prevent tamper
   getDerivedValues=()=>{return JSON.clone(this._derivedValues);};  //clone is for tests
   getKey=()=>{return this._key;};
   doesHaveRank=()=>{return this._derivedValues.hasRank;};
   doesHaveText=()=>{return this._derivedValues.hasText;};
   getCostPerRank=()=>{return this._derivedValues.costPerRank;};
   getMaxRank=()=>{return this._derivedValues.maxRank;};
   getName=()=>{return this.state.name;};
   getRank=()=>{return this.state.rank;};
   getText=()=>{return this.state.text;};
   getTotal=()=>{return this._derivedValues.total;};
   isBlank=()=>{return (this.state.name === undefined);};
   //endregion single line functions (most Basic getters)

   //Onchange section
   /**Onchange function for selecting an advantage*/
   select=()=>{CommonsLibrary.select.call(this, this.setAdvantage, ('advantageChoices'+this._key), Main.advantageSection);};
   /**Onchange function for changing the rank*/
   changeRank=()=>{CommonsLibrary.change.call(this, this.setRank, ('advantageRank'+this._key), Main.advantageSection);};
   /**Onchange function for changing the text*/
   changeText=()=>{CommonsLibrary.change.call(this, this.setText, ('advantageText'+this._key), Main.advantageSection);};

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
   setAdvantage=(nameGiven)=>
   {
       if(!Data.Advantage.names.contains(nameGiven)){this._resetValues(); return;}
       var useNewData = !((this.state.name === 'Minion' && nameGiven === 'Sidekick') || (this.state.name === 'Sidekick' && nameGiven === 'Minion'));
          //if switching between 'Minion' and 'Sidekick' then keep the data, otherwise clear it out
       this.state.name = nameGiven;
       this._derivedValues.maxRank = Data.Advantage[this.state.name].maxRank;
       this._derivedValues.hasRank = (1 !== this._derivedValues.maxRank);  //if max rank is 1 then there are no ranks
       if(useNewData) this.state.rank = 1;
       this._derivedValues.costPerRank = Data.Advantage[this.state.name].costPerRank;
       this._derivedValues.total = this._derivedValues.costPerRank * this.state.rank;
       this._derivedValues.hasText = Data.Advantage[this.state.name].hasText;
       if(this._derivedValues.hasText && useNewData) this.state.text = Data.Advantage[this.state.name].defaultText;
       //!derivedValues.hasText && useNewData (useNewData always true when !hasText):
       else if(useNewData) this.state.text = undefined;  //needs to be explicit so that the previous data is destroyed
       //else (!useNewData which always hasText) keep using the current text
   };
   /**Used to set data independent of the document and without calling update*/
   setRank=(rankGiven)=>
   {
       if(this.isBlank()) return;
       if(!this._derivedValues.hasRank) return;  //can only happen when loading
       this.state.rank = sanitizeNumber(rankGiven, 1, 1);
       if(this.state.rank > this._derivedValues.maxRank) this.state.rank = this._derivedValues.maxRank;
       this._derivedValues.total=this._derivedValues.costPerRank*this.state.rank;
   };
   /**Used to set data independent of the document and without calling update*/
   setText=(textGiven)=>
   {
       if(this.isBlank()) return;  //TODO: looks like cargo cult
       if(!this._derivedValues.hasText) return;  //can only happen when loading
       this.state.text = textGiven.trim();  //trimmed in case it needs to match up with something else
   };

   //public function section
   /**This creates the page's html (for the row). called by advantage section only*/
   render=()=>
   {
      /*
      values used:
      state: {name, rank, text};
      derivedValues: {hasRank, costPerRank, total};
      key
      */
      let nameElement = null;
      let costElement = null;
      let textElement = null;
      let costPerRankElement = null;

      if (this.state.name === 'Equipment') nameElement = <div className="col-6 col-lg-4 col-xl-auto"><b>Equipment</b></div>;
      else
      {
         const displayGodhood = (undefined !== Main && (Main.advantageSection.hasGodhoodAdvantages() || Main.canUseGodhood()));
         //must check both hasGodhoodAdvantages and canUseGodhood since they are not yet in sync
         const options = Data.Advantage.names
         .filter((name) => 'Equipment' !== name && (displayGodhood || !Data.Advantage[name].isGodhood))
         .map((name) =>
            <option key={name}>{name}</option>
         );
         options.unshift(<option key="Select Advantage">Select Advantage</option>);

         nameElement = (<div className="col-12 col-sm-6 col-lg-4 col-xl-auto">
               <select id={'advantageChoices' + this._key} onChange={()=>{Main.advantageSection.getRowById(this._key).select();}}
                       value={this.state.name}>
                  {options}
               </select></div>
         );
      }
      if (undefined !== this.state.name)  //done for blank
      {
         if (this.state.name === 'Equipment') costElement =
            <div className="col-6 col-sm-3 col-lg-2 col-xl-auto">Cost {' ' + this.state.rank}</div>;
         //state.rank is always defined but only show this if max rank is > 1
         else if (this._derivedValues.hasRank) costElement = <label className="col-5 col-sm-3 col-lg-2 col-xl-auto">Rank {' '}
            <input type="text" size="1" id={'advantageRank' + this._key}
                   onChange={()=>{Main.advantageSection.getRowById(this._key).changeRank();}} value={this.state.rank} /></label>;

         if (undefined !== this.state.text)
         {
            textElement = (<div className="col-12 col-sm-6">
               <input type="text" style="width: 100%" id={'advantageText' + this._key}
                      onChange={()=>{Main.advantageSection.getRowById(this._key).changeText();}} value={this.state.text} /></div>);
         }
         if (this._derivedValues.costPerRank > 1) costPerRankElement = <div className="col-auto">=&nbsp; {this._derivedValues.total}</div>;
      }

      return (<div className="row">
         {nameElement}{costElement}{textElement}{costPerRankElement}
      </div>);
   };
   /**Get the name of the advantage appended with text to determine redundancy*/
   getUniqueName=()=>
   {
       if(this.isBlank()) return;  //never hit
       if(this.state.name === 'Minion' || this.state.name === 'Sidekick') return ('Helper: '+this.state.text);  //you can't have the same character be a minion and sidekick
       if(this._derivedValues.hasText) return (this.state.name+': '+this.state.text);
       return this.state.name;
   };
   /**Returns a json object of this row's data*/
   save=()=>
   {
      //don't just clone state: rank is different
      var json = {};
      json.name = this.state.name;
      //don't include rank if there's only 1 possible rank
      if (this._derivedValues.hasRank) json.rank = this.state.rank;
      //checking hasText is redundant but more clear
      if (this._derivedValues.hasText) json.text = this.state.text;
      return json;
   };

   _resetValues=()=>
   {
      this.state = {};
      this._derivedValues = {total: 0};
   };
}

function createAdvantageObject()
{
   const key = MainObject.generateKey();
   let instance = null;
   let element = <AdvantageObject key={key} callbackId={key} instanceCallBack={(newInstance)=>{instance=newInstance;}} />;
   //TODO: how to manage instance?
   //doesn't work doc: https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html
   //need to pull state up 1 and steal list instance. make row pure component that edits parent state
   //alt: render, sanitize, render
   return {instance, element};
}

function renderAdvantageArray(rowArray)
{
   ReactDOM.render(
      rowArray,
      document.getElementById('advantage-section')
   );
}
//TODO: test
