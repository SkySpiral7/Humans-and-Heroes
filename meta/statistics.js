//math for stats (requires my Dice library)

Draw.precalculated = function(name, stats, secondColumn)
{
   var out = '<b>Roll:</b> ' + name + '<br />\n';
   out += GenerateHtml.aggregates(Statistics.calculateAggregates(stats));
   out += GenerateHtml.statistics(stats, secondColumn);
   document.getElementById('graphResults').innerHTML = out;
};

function singleFudgePoolGraph()
{
   Draw.diceBellCurve(new DicePool('3dF')); //just manually convert the +/-3 to 4
}

/**runs very fast (less than 10 ms)*/
function contestedRoll()
{
   var singleFudge = [-1, 0, 1];
   var raw3dF = Combination.cartesianProduct([JSON.clone(singleFudge), JSON.clone(singleFudge), JSON.clone(singleFudge)]);
   var rawContest = Combination.cartesianProduct([JSON.clone(raw3dF), JSON.clone(raw3dF)]);

   var contestCounts = {}, i;
   for (i = 0; i < rawContest.length; ++i)
   {
      var mySum = sumDice(rawContest[i][0]);
      var hisSum = sumDice(rawContest[i][1]);
      var ourSum = mySum - hisSum;
      if(undefined === contestCounts[ourSum]) contestCounts[ourSum] = 1;
      else ++contestCounts[ourSum];
   }

   var stats = [];
   var contestKeyList = Object.keys(contestCounts);
   for (i = 0; i < contestKeyList.length; ++i)
   {
      var sum = Number.parseInt(contestKeyList[i]);
      stats.push({result: sum,  frequency: contestCounts[sum]});
   }
   stats.sort(Statistics.resultAscending);
   Statistics.determineProbability(stats);
   Draw.precalculated('Damage Roll', stats);

   var averageDamage = [];
   for (var toughnessDiff=-8; toughnessDiff <= 9; ++toughnessDiff)
   {
      var thisSum = 0;
      for (i=0; i < stats.length; ++i)
      {
         var wouldBeDamage = (stats[i].result - toughnessDiff);
         wouldBeDamage *= stats[i].probability;
         thisSum += Math.max(0, wouldBeDamage);
      }
      averageDamage.push(thisSum.toFixed(3));
   }
   writeln(JSON.stringify(averageDamage));

   function sumDice(single3dfResult)
   {
      var result = single3dfResult[0] + single3dfResult[1] + single3dfResult[2];
      if (3 === result) return 4;
      else if (-3 === result) return -4;
      return result;
   }
}

/**runs in 200 ms*/
function confirmAverageDamage()
{
   var defenderStat = 2;
   var rollData = [];
   var fudgePool = new DicePool('3df');
   for (var i = 0; i < 100000; ++i)  //100k
   {
      var attackerResult = fudgePool.sumRoll();
      if (3 === attackerResult) ++attackerResult;
      else if (-3 === attackerResult) --attackerResult;
      var defenderResult = fudgePool.sumRoll();
      if (3 === defenderResult) ++defenderResult;
      else if (-3 === defenderResult) --defenderResult;
      defenderResult -= defenderStat;

      var hpLost = Math.max(0, (attackerResult - defenderResult));
      if(undefined === rollData[hpLost]) rollData[hpLost] = 1;
      else ++rollData[hpLost];
   }
   var results = [];
   for (var i = 0; i < rollData.length; ++i)
   {
      results.push({result: i, frequency: undefined === rollData[i] ? 0 : rollData[i]});
   }
   Draw.precalculated('Damage Roll', results, '<=');
}

/**runs in 800 ms*/
function averageNumberOfTurns()
{
   var defenderStat = 0;
   var rollData = [];
   var fudgePool = new DicePool('3df');
   for (var i = 0; i < 100000; ++i)  //100k
   {
      var defenderHealth = 6;
      var attackCount = 0;

      while (defenderHealth >= 0) {
         ++attackCount;
         var attackerResult = fudgePool.sumRoll();
         if (3 === attackerResult) ++attackerResult;
         else if (-3 === attackerResult) --attackerResult;
         var defenderResult = fudgePool.sumRoll();
         if (3 === defenderResult) ++defenderResult;
         else if (-3 === defenderResult) --defenderResult;
         defenderResult += defenderStat;

         if (attackerResult >= defenderResult) --defenderStat;
         if (attackerResult > defenderResult) defenderHealth -= (attackerResult - defenderResult);
      }
      if (undefined === rollData[attackCount]) rollData[attackCount] = 1;
      else ++rollData[attackCount];
   }
   var results = [];
   for (var i = 0; i < rollData.length; ++i) {
      results.push({result: i, frequency: undefined === rollData[i] ? 0 : rollData[i]});
   }
   Draw.precalculated('Turn count', results, '<=');
   /*results:
   defenderStat=0: 83.825% 6 turns or less. average 4 turns at 24.677% exact (43.393% 4 turns or less)
   defenderStat=1: 90.649% 10 turns or less. average 6 turns at 17.742% exact (48.253% 6 or less)
   defenderStat=2: 91.979% 17 turns or less. average 9 turns at 10.820% exact (45.549% 9 or less)
   */
}
