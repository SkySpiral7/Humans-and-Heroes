function UpdateDispatch()
{
   var dataQueue = [], dataSet = {};
   var displayQueue = [], displaySet = {};

   this.addDataCallback=function(callback, callbackName)
   {
      if(undefined !== dataSet[callbackName]) return;  //already exists
      dataSet[callbackName] = true;
      dataQueue.push({name: callbackName, callback: callback});
   };
   this.addDisplayCallback=function(callback, callbackName)
   {
      if(undefined !== displaySet[callbackName]) return;  //already exists
      displaySet[callbackName] = true;
      displayQueue.push({name: callbackName, callback: callback});
   };
   this.run=function()
   {
      while (!dataQueue.isEmpty() || !displayQueue.isEmpty())
      {
         this._next();
      }
   };
   this._next=function()
   {
      //data then display
      if(!dataQueue.isEmpty()) this._nextData();
      //if(!displayQueue.isEmpty());
      else this._nextDisplay();
   };
   this._nextData=function()
   {
      var dataToRun = dataQueue.shift();  //remove first
      delete dataSet[dataToRun.name];  //remove from set
      dataToRun.callback();
   };
   this._nextDisplay=function()
   {
      var displayToRun = displayQueue.shift();  //remove first
      delete displaySet[displayToRun.name];  //remove from set
      displayToRun.callback();
   };
}
/*
Main.updater=new UpdateDispatch();
Main clear button onchange: OnChangeFacade(Main.clear)
OnChangeFacade(callback)
{
   callback();
   Main.updater.run();
}
Main.clear:
{
   ...
   this.abilitySection.clear();
      ...
      this.update()
         Main.updater.addDisplayCallback(this.calculateValues, 'Main.abilitySection.calculateValues');
         Main.updater.addDisplayCallback(Main.skillSection.calculateValues, 'Main.skillSection.calculateValues');
         Main.updater.addDisplayCallback(Main.updateInitiative, 'Main.updateInitiative');
   ...
}
even then though one display triggers another so it doesn't completely work
and power/mod data update are still complex and don't have a single method call
*/
