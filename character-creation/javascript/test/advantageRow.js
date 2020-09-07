'use strict';
TestSuite.advantageRow={};
TestSuite.advantageRow.setAdvantage=function(testState={})
{
   TestRunner.clearResults(testState);
   var assertions = [], expected;

   assertions.push({
      Expected: true,
      Actual: Main.advantageSection.getRow(0)
      .isBlank(),
      Description: 'Blank'
   });

   SelectUtil.changeText('advantageChoices0', 'Lucky');
   expected = {
      rowIndex: 0,
      name: 'Lucky',
      rank: 1
   };
   assertions.push({
      Expected: expected,
      Actual: Main.advantageSection.getRow(0)
      .getState(),
      Description: 'Lucky: state'
   });
   expected = {
      maxRank: 3,
      hasRank: true,
      costPerRank: 5,
      total: 5,
      hasText: false
   };
   assertions.push({
      Expected: expected,
      Actual: Main.advantageSection.getRow(0)
      .getDerivedValues(),
      Description: 'Lucky: derivedValues'
   });

   DomUtil.changeValue('advantageRank0', 2);
   assertions.push({
      Expected: false,
      Actual: Main.advantageSection.getRow(0)
      .isBlank(),
      Description: 'isBlank'
   });
   assertions.push({
      Expected: 2,
      Actual: Main.advantageSection.getRow(0)
      .getRank(),
      Description: 'getRank pre-reset'
   });
   SelectUtil.changeText('advantageChoices0', 'Select Advantage');
   assertions.push({
      Expected: true,
      Actual: Main.advantageSection.getRow(0)
      .isBlank(),
      Description: 'reset'
   });
   assertions.push({
      Expected: undefined,
      Actual: Main.advantageSection.getRow(0)
      .getRank(),
      Description: 'getRank post-reset'
   });

   Main.advantageSection.clear();
   SelectUtil.changeText('advantageChoices0', 'Sidekick');
   expected = {
      rowIndex: 0,
      name: 'Sidekick',
      rank: 1,
      text: 'Helper Name'
   };
   assertions.push({
      Expected: expected,
      Actual: Main.advantageSection.getRow(0)
      .getState(),
      Description: 'Sidekick: state'
   });
   DomUtil.changeValue('advantageRank0', 2);
   DomUtil.changeValue('advantageText0', 'I help');
   SelectUtil.changeText('advantageChoices0', 'Minion');
   expected = {
      rowIndex: 0,
      name: 'Minion',
      rank: 2,
      text: 'I help'
   };
   assertions.push({
      Expected: expected,
      Actual: Main.advantageSection.getRow(0)
      .getState(),
      Description: 'Sidekick to Minion keeps rank, text'
   });

   Main.advantageSection.clear();
   SelectUtil.changeText('advantageChoices0', 'Minion');
   DomUtil.changeValue('advantageRank0', 3);
   DomUtil.changeValue('advantageText0', 'I can help');
   SelectUtil.changeText('advantageChoices0', 'Sidekick');
   expected = {
      rowIndex: 0,
      name: 'Sidekick',
      rank: 3,
      text: 'I can help'
   };
   assertions.push({
      Expected: expected,
      Actual: Main.advantageSection.getRow(0)
      .getState(),
      Description: 'Minion to Sidekick keeps rank, text'
   });

   Main.advantageSection.clear();
   SelectUtil.changeText('advantageChoices0', 'Minion');
   DomUtil.changeValue('advantageRank0', 4);
   DomUtil.changeValue('advantageText0', 'helping');
   SelectUtil.changeText('advantageChoices0', 'Benefit');
   expected = {
      rowIndex: 0,
      name: 'Benefit',
      rank: 1,
      text: 'Advantage Subtype'
   };
   assertions.push({
      Expected: expected,
      Actual: Main.advantageSection.getRow(0)
      .getState(),
      Description: 'Minion to Benefit clears rank, text'
   });

   Main.advantageSection.clear();
   SelectUtil.changeText('advantageChoices0', 'Benefit');
   DomUtil.changeValue('advantageRank0', 2);
   DomUtil.changeValue('advantageText0', 'benny');
   SelectUtil.changeText('advantageChoices0', 'Minion');
   expected = {
      rowIndex: 0,
      name: 'Minion',
      rank: 1,
      text: 'Helper Name'
   };
   assertions.push({
      Expected: expected,
      Actual: Main.advantageSection.getRow(0)
      .getState(),
      Description: 'Benefit to Minion clears rank, text'
   });

   Main.advantageSection.clear();
   SelectUtil.changeText('advantageChoices0', 'Sidekick');
   DomUtil.changeValue('advantageRank0', 4);
   DomUtil.changeValue('advantageText0', 'helping');
   SelectUtil.changeText('advantageChoices0', 'Benefit');
   expected = {
      rowIndex: 0,
      name: 'Benefit',
      rank: 1,
      text: 'Advantage Subtype'
   };
   assertions.push({
      Expected: expected,
      Actual: Main.advantageSection.getRow(0)
      .getState(),
      Description: 'Sidekick to Benefit clears rank, text'
   });

   Main.advantageSection.clear();
   SelectUtil.changeText('advantageChoices0', 'Benefit');
   DomUtil.changeValue('advantageRank0', 2);
   DomUtil.changeValue('advantageText0', 'benny');
   SelectUtil.changeText('advantageChoices0', 'Sidekick');
   expected = {
      rowIndex: 0,
      name: 'Sidekick',
      rank: 1,
      text: 'Helper Name'
   };
   assertions.push({
      Expected: expected,
      Actual: Main.advantageSection.getRow(0)
      .getState(),
      Description: 'Benefit to Sidekick clears rank, text'
   });

   SelectUtil.changeText('advantageChoices0', 'Diehard');
   assertions.push({
      Expected: false,
      Actual: Main.advantageSection.getRow(0)
      .doesHaveRank(),
      Description: 'Diehard hasRank'
   });

   Main.advantageSection.clear();
   SelectUtil.changeText('advantageChoices0', 'Sidekick');
   DomUtil.changeValue('advantageRank0', 2);
   DomUtil.changeValue('advantageText0', 'side');
   SelectUtil.changeText('advantageChoices0', 'Diehard');
   expected = {
      rowIndex: 0,
      name: 'Diehard',
      rank: 1
   };
   assertions.push({
      Expected: expected,
      Actual: Main.advantageSection.getRow(0)
      .getState(),
      Description: 'Sidekick to Diehard no text'
   });

   Main.advantageSection.clear();
   SelectUtil.changeText('advantageChoices0', 'Diehard');
   SelectUtil.changeText('advantageChoices0', 'Sidekick');
   expected = {
      rowIndex: 0,
      name: 'Sidekick',
      rank: 1,
      text: 'Helper Name'
   };
   assertions.push({
      Expected: expected,
      Actual: Main.advantageSection.getRow(0)
      .getState(),
      Description: 'Diehard to Sidekick default text'
   });

   return TestRunner.displayResults('TestSuite.advantageRow.setAdvantage', assertions, testState);
};
TestSuite.advantageRow.setRank=function(testState={})
{
    TestRunner.clearResults(testState);

    var dataToLoad;
    var assertions=[];

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Advantages.push({name: 'Benefit', rank: 123456});
    Loader.sendData(dataToLoad);

    assertions.push({Expected: true, Actual: Main.advantageSection.getRow(1).isBlank(), Description: 'Load Benefit: no other rows'});
    assertions.push({Expected: 'Benefit', Actual: Main.advantageSection.getRow(0).getName(), Description: 'Load Benefit: the advantage'});
    assertions.push({Expected: true, Actual: Main.advantageSection.getRow(0).doesHaveRank(), Description: 'Load Benefit: doesHaveRank'});
    assertions.push({Expected: 123456, Actual: Main.advantageSection.getRow(0).getRank(), Description: 'Load Benefit: rank set'});
    } catch(e){assertions.push({Error: e, Description: 'Load Benefit'});}

    try{
    DomUtil.changeValue('advantageRank0', 5);
    assertions.push({Expected: 5, Actual: Main.advantageSection.getRow(0).getRank(), Description: 'Change Benefit rank'});
    } catch(e){assertions.push({Error: e, Description: 'Change Benefit rank'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Advantages.push({name: 'Seize Initiative', rank: 5});
    Loader.sendData(dataToLoad);

    assertions.push({Expected: true, Actual: Main.advantageSection.getRow(1).isBlank(), Description: 'Load Seize Initiative: no other rows'});
    assertions.push({Expected: 'Seize Initiative', Actual: Main.advantageSection.getRow(0).getName(), Description: 'Load Seize Initiative: the advantage'});
    assertions.push({Expected: false, Actual: Main.advantageSection.getRow(0).doesHaveRank(), Description: 'Load Seize Initiative: doesHaveRank'});
    assertions.push({Expected: 1, Actual: Main.advantageSection.getRow(0).getRank(), Description: 'Load Seize Initiative: Rank ignored'});
    //if you have the advantage then it is rank 1 not undefined
    } catch(e){assertions.push({Error: e, Description: 'Load Seize Initiative'});}

    try{
    SelectUtil.changeText('advantageChoices0', 'Lucky');
    assertions.push({Expected: 'Lucky', Actual: Main.advantageSection.getRow(0).getName(), Description: 'Change to Lucky'});
    assertions.push({Expected: 3, Actual: Main.advantageSection.getRow(0).getMaxRank(), Description: 'Lucky getMaxRank'});

    DomUtil.changeValue('advantageRank0', 5);
    assertions.push({Expected: 3, Actual: Main.advantageSection.getRow(0).getRank(), Description: 'Lucky max rank enforced'});

    DomUtil.changeValue('advantageRank0', -5);
    assertions.push({Expected: 1, Actual: Main.advantageSection.getRow(0).getRank(), Description: 'Lucky min rank enforced'});

    DomUtil.changeValue('advantageRank0', 2);
    DomUtil.changeValue('advantageRank0', 'invalid');
    assertions.push({Expected: 1, Actual: Main.advantageSection.getRow(0).getRank(), Description: 'Lucky rank defaults to 1'});

    DomUtil.changeValue('advantageRank0', 2);
    assertions.push({Expected: 5, Actual: Main.advantageSection.getRow(0).getCostPerRank(), Description: 'Lucky getCostPerRank'});
    assertions.push({Expected: 10, Actual: Main.advantageSection.getRow(0).getTotal(), Description: 'Lucky total cost'});
    } catch(e){assertions.push({Error: e, Description: 'Lucky'});}

    return TestRunner.displayResults('TestSuite.advantageRow.setRank', assertions, testState);
};
TestSuite.advantageRow.setText=function(testState={})
{
    TestRunner.clearResults(testState);

    var dataToLoad;
    var assertions=[];

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Advantages.push({name: 'Benefit', text: '\thas text: also trimmed  \n'});
    Loader.sendData(dataToLoad);

    assertions.push({Expected: true, Actual: Main.advantageSection.getRow(1).isBlank(), Description: 'Load Benefit: no other rows'});
    assertions.push({Expected: 'Benefit', Actual: Main.advantageSection.getRow(0).getName(), Description: 'Load Benefit: the advantage'});
    assertions.push({Expected: true, Actual: Main.advantageSection.getRow(0).doesHaveText(), Description: 'Load Benefit: doesHaveText'});
    assertions.push({Expected: 'has text: also trimmed', Actual: Main.advantageSection.getRow(0).getText(), Description: 'Load Benefit: text set'});
    } catch(e){assertions.push({Error: e, Description: 'Load Benefit'});}

    try{
    DomUtil.changeValue('advantageText0', '\tchanged text: trimmed \n');
    assertions.push({Expected: 'changed text: trimmed', Actual: Main.advantageSection.getRow(0).getText(), Description: 'Change Benefit text'});
    } catch(e){assertions.push({Error: e, Description: 'Change Benefit text'});}

    try{
    dataToLoad = Loader.resetData();
    dataToLoad.Advantages.push({name: 'Lucky', text: 'can\'t have text'});
    Loader.sendData(dataToLoad);

    assertions.push({Expected: true, Actual: Main.advantageSection.getRow(1).isBlank(), Description: 'Load Lucky: no other rows'});
    assertions.push({Expected: 'Lucky', Actual: Main.advantageSection.getRow(0).getName(), Description: 'Load Lucky: the advantage'});
    assertions.push({Expected: false, Actual: Main.advantageSection.getRow(0).doesHaveText(), Description: 'Load Lucky: doesHaveText'});
    assertions.push({Expected: undefined, Actual: Main.advantageSection.getRow(0).getText(), Description: 'Load Lucky: Text not set'});
    } catch(e){assertions.push({Error: e, Description: 'Load Lucky'});}

    return TestRunner.displayResults('TestSuite.advantageRow.setText', assertions, testState);
};
