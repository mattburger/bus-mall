'use strict';

//array of all product names
var picPool = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass'];
var chartColors = ['bisque','darkgray','burlywood','lightblue','navy','maroon','brown','red','orange','yellow','beige','mint','lavender','apricot','cyan','green','brown','gray','olive','teal'/*,'black','navy','white','blue','lime'*/];
var randArrData = [];
var dupTracker = [];
var lastViewTracker = [];
var storedClicks = [];
var storedViews = [];
var productName = [];
//hold all objects of mallProduct
var allProducts = [];
var lastViewedArr = [];
var randArr = [];
var busMallChart;

function fillRandArrData(arr)
{
  for(var i = 0; i < 20; i++)
  {
    arr.push(i);
  }
}

fillRandArrData(randArrData);

var funcUseArr = randArrData;
console.log('copied to funcUseArr',funcUseArr);

function MallProduct(name)
{
  this.name = name;
  this.storKeyClick = name + 'ClickKey';
  this.storKeyView = name + 'ViewKey';
  this.url = './pictures/' + name + '.jpg';
  this.alt = name;
  this.title = name;
  this.views = 0;
  this.clicks = 0;

  allProducts.push(this);
}
for(var i = 0; i < picPool.length; i++)
{
  new MallProduct(picPool[i]);
}
//var toLs = JSON.stringify(allProducts);
//localStorage.setItem('allProducts',toLs);

function rand(arr)
{
  return (Math.floor(Math.random() * arr.length));
}

function genRandArr(arr)
{
  while(arr.length < 3)
  {
    for(var i = 0; i < 3;i++)
    {
      arr.push(rand(allProducts));
    }
  }
  console.log(arr);
}


function dupFixer(rArr,dupTrack,rArrData)
{

  if(rArrData.length < allProducts.length)
  {
    console.log('dupfixer randArrData passed in:',rArrData);
    for(var i = 0; i < dupTrack.length;i++)
    {
      rArr[dupTrack[i]] = rArrData[rand(rArrData.length)];
    }
    dupTrack = [];
    rArrData = [];

  }

}


function lastViewedFixer(rArr,lvTrack,rArrData)
{

  for(var i = 0; i < lvTrack.length;i++)
  {
    rArr[lvTrack[i]] = rArrData[rand(rArrData)];
  }
  lvTrack = [];
  rArrData = [];

}


function lastViewed(arr)
{
  for(var k = 0; k < funcUseArr.length;k++)
  {
    if(arr[k] === funcUseArr[k])
    {
      funcUseArr.splice(k,1);
    }
  }

  for(var i = 0; i < lastViewedArr.length;i++)
  {
    for(var j = 0; j < arr.length; j++)
    {

      if(lastViewedArr[i] === arr[j])
      {
        lastViewTracker.push(lastViewedArr[i]);
      }
    }
  }
  lastViewedFixer(randArr,lastViewTracker,randArrData);
}

function dupCheck(arr)
{

  for(var i = 0; i < arr.length;i++)
  {
    for(var j = 0; j < arr.legth; j++)
    {
      if(i !== j)
      {
        if(arr[i] === arr[j])
        {
          randArrData.splice(arr[i],1);
          console.log('splicy splicy',funcUseArr.splice(arr[i],1));
          dupTracker.push(arr[i]);

        }
      }
    }
  }

  dupFixer(randArr,dupTracker,randArrData);
}

var prod1 = document.getElementById('prod1');
var prod2 = document.getElementById('prod2');
var prod3 = document.getElementById('prod3');
var prodArr = [prod1,prod2,prod3];
//console.table(allProducts);

function generateProd()
{
  genRandArr(randArr);
  /*need to tweak these two functions. possibility of clashing*/
  dupCheck(randArr);
  lastViewed(randArr);

  for(var i = 0; i < prodArr.length;i++)
  {
    prodArr[i].src = allProducts[randArr[i]].url;
    prodArr[i].alt = allProducts[randArr[i]].alt;
    prodArr[i].title = allProducts[randArr[i]].title;
  }
  lastViewedArr = randArr;
  randArr = [];
}
function clearProd()
{
  for(var i = 0; i < prodArr.length; i++)
  {
    prodArr[i].src = '';
    prodArr[i].alt = '';
    prodArr[i].title = '';
  }
}
function prepChartData()
{
  for(var i = 0; i < allProducts.length; i++)
  {
    productName.push(allProducts[i].title);
    storedClicks.push(0);
    storedViews.push(0);
  }
}
function checkClicks()
{
  var tmpTotal = 0;
  for(var i = 0; i < storedClicks.length; i++)
  {
    tmpTotal+=storedClicks[i];
  }
  return tmpTotal;
}
function handleClick(id)
{
  console.log('In evenHandler');
  var tmpName;
  for(var i = 0; i < allProducts.length; i++)
  {
    tmpName = document.getElementById(id).title;

    if(tmpName === allProducts[i].name)
    {
      var tmpData = localStorage.getItem(allProducts[i].storKeyClick);
      tmpData++;
      allProducts[i].clicks = tmpData++;
      localStorage.setItem(allProducts[i].storKeyClick, tmpData);
      storedClicks[i] = tmpData;

      console.log('getItem from local storage', localStorage.getItem(allProducts[i].storKeyClick));
    }
  }
  for(i = 0; i < prodArr.length; i++)
  {
    var tmpIndex = prodArr[i].title;
    if(tmpIndex === allProducts[i].name)
    {
      var tmpData2 = localStorage.getItem(tmpIndex + 'ViewKey');
      tmpData2++;
      allProducts[i].views = tmpData2;
      localStorage.setItem(allProducts[i].storKey, tmpData2);
      storedViews[i] = tmpData2;
    }
  }
  clearProd();
  generateProd();
  makeChart();
}

//http://www.chartjs.org/ 

var data =
{
  labels: productName,
  datasets:
  [{
    data: storedClicks,
    backgroundColor: chartColors,
    /*hoverBackGroundColor:
    [
      'purple',
      'purple',
      'purple',
      'purple',
      'purple'
    ]
    */
  }]
};

function makeChart()
{
  var ctx = document.getElementById('busmall-chart').getContext('2d');
  busMallChart = new Chart(ctx,{
    type: 'bar',
    data: data,
    label: 'Bus Mall Metrics',
    hidden: true,
  });
  /*
  while(checkClicks() > 25)
  {
    busMallChart.hidden = false;
  }
  */
}

/*function checkClick()
{
  if(localStorage)
  {
    makeChart();
  }
  else
  {
    prepChartData();
    generateProd();
  }
}
prepChartData();
generateProd();
*/

document.getElementById('pickpic').addEventListener('click',function(event)
{
  if(event.target.id !== 'pickpic')
  {
    handleClick(event.target.id);
  }
});
document.getElementById('pickpic').removeEventListener('click',function(event)
{
  if(event.target.id !== 'pickpic')
  {
    handleClick(event.target.id);
  }
});

/*
console.log(sessionStorage.getItem(allProducts[0].storKey));
console.log(allProducts[14].storKey);
*/
