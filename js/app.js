'use strict';

//array of all product names
var picPool = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass'];
var chartColors = ['bisque','darkgray','burlywood','lightblue','navy','maroon','brown','red','orange','yellow','beige','mint','lavender','apricot','cyan','green','brown','gray','olive','teal'/*,'black','navy','white','blue','lime'*/];
var storedClicks = [];
var storedViews = [];
var productName = [];
//hold all objects of mallProduct
var allProducts = [];
var lastViewedArr = [];
var randArr = [];
var busMallChart;

/*--------------constructor stuff--------------*/
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
/*----------------end of constructor stuff----------------*/


function rand(number)
{
  return (Math.floor(Math.random() * Math.floor(number)));
}

function genRandArr()
{
  var arr = [];
  for(var i = 0; i < 3; i++)
  {
    arr.push(rand(20));
  }
  //console.log(arr);
  return arr;
}


/*thanks to @Raynos with Stackoverflow */
function xorSwapHalf(array)
{
  var i = null;
  var r = null;
  var length = array.length;
  for (i = 0; i < length / 2; i += 1)
  {
    r = length - 1 - i;
    var left = array[i];
    var right = array[r];
    left ^= right;
    right ^= left;
    left ^= right;
    array[i] = left;
    array[r] = right;
  }
  return array;
}



function checkDupLastView(rArr,lastArr)
{
  var someKey = null;
  var rArr2 = rArr;
  xorSwapHalf(rArr2);
  for(var i = 0; i < rArr.length;i++)
  {
    if((rArr[i] === rArr2[i]) || rArr.includes(lastArr[i]))
    {
      someKey = i;
      return 1;
    }
  }
  return 0,someKey;
}

var prod1 = document.getElementById('prod1');
var prod2 = document.getElementById('prod2');
var prod3 = document.getElementById('prod3');
var prodArr = [prod1,prod2,prod3];
//console.table(allProducts);


/*----------------values for generating random pics----------------*/

function generateProd()
{
  var counter = 0;
  randArr = genRandArr();
  var codes = checkDupLastView(randArr,lastViewedArr);
  while(codes[0] === 1)
  {
    randArr[codes[1]] = rand(20);
    codes = checkDupLastView(randArr,lastViewedArr);
    counter += 1;
    console.log(codes[1]);
    console.log('in while',randArr);
    if(counter > 120)
    {
      console.log('ewww this is stupid');
      console.log('in while counter',counter);
      return 'ARRRRGHHHHHH';
    }
  }
  counter = 0;
  //console.log('after while',randArr);
  for(i = 0; i < prodArr.length;i++)
  {
    //console.log(randArr);
    prodArr[i].src = allProducts[randArr[i]].url;
    prodArr[i].alt = allProducts[randArr[i]].alt;
    prodArr[i].title = allProducts[randArr[i]].title;
  }
  lastViewedArr = randArr;
  randArr = [];
  //storedClicks = createClicksArr();
}

/*----------------end of generating random pics----------------*/

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
  storedClicks = createClicksArr();
}
function checkClicks()
{
  var tmpTotal = 0;
  for(var i = 0; i < allProducts.length; i++)
  {
    tmpTotal+=allProducts[i].clicks;
  }
  return tmpTotal;
}
function createClicksArr()
{
  var arr = [];
  for(var i = 0; i < allProducts.length;i++)
  {
    arr.push(allProducts[i].clicks);
  }
  return arr;
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
      allProducts[i].clicks += 1;
      localStorage.setItem(allProducts[i].storKeyClick, allProducts[i].clicks);
      //console.log('getItem from local storage', localStorage.getItem(allProducts[i].storKeyClick));
    }
  }
  for(i = 0; i < prodArr.length; i++)
  {
    if(prodArr[i].title === allProducts[i].name)
    {
      allProducts[i].views += 1;
      localStorage.setItem(allProducts[i].storKeyView, allProducts[i].views);
    }
  }
  clearProd();
  generateProd();

  if(checkClicks()>=25)
  {
    makeChart();
    document.getElementById('pickpic').removeEventListener('click',_listener);

  }
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
  //data[0].data = createClicksArr();
  var ctx = document.getElementById('busmall-chart').getContext('2d');
  busMallChart = new Chart(ctx,{
    type: 'bar',
    data: data,
    label: 'Bus Mall Metrics',
    hidden: true
  });

  //hideDaChart();

}

if(localStorage.length > 0)
{
  for(i = 0; i < allProducts.length; i++)
  {
    if(localStorage.getItem(allProducts[i].storKeyClick))
    {
      allProducts[i].clicks = JSON.parse(localStorage.getItem(allProducts[i].storKeyClick));
      storedClicks[i] = allProducts[i].clicks;
      if(localStorage.getItem(allProducts[i].storKeyView))
      {
        allProducts[i].views = JSON.parse(localStorage.getItem(allProducts[i].storKeyView));
      }
      else
      {
        allProducts[i].views = 0;
      }
    }
    else
    {
      allProducts[i].clicks = 0;
      allProducts[i].views = 0;
    }
  }
}

prepChartData();
generateProd();

var _listener = function(event){
  if(event.target.id !== 'pickpic')
  {
    handleClick(event.target.id);
  }
};
document.getElementById('pickpic').addEventListener('click',_listener);

/*
console.log(sessionStorage.getItem(allProducts[0].storKey));
console.log(allProducts[14].storKey);
*/
