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
var sessionClicks = 0;

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


/*thanks to @Raynos with Stackoverflow */

var prod1 = document.getElementById('prod1');
var prod2 = document.getElementById('prod2');
var prod3 = document.getElementById('prod3');
var prodArr = [prod1,prod2,prod3];



/*----------------values for generating random pics----------------*/

function generateProd()
{
  while(randArr.length < 3)
  {
    var randArrVariable = rand(20);
    if(!randArr.includes(randArrVariable) && !lastViewedArr.includes(randArrVariable))
    {
      randArr.push(randArrVariable);
    }

  }

  for(i = 0; i < prodArr.length;i++)
  {

    prodArr[i].src = allProducts[randArr[i]].url;
    prodArr[i].alt = allProducts[randArr[i]].alt;
    prodArr[i].title = allProducts[randArr[i]].title;
  }
  lastViewedArr = randArr;
  randArr = [];
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
      storedClicks[i] += 1;
    }
  }
  for(i = 0; i < prodArr.length; i++)
  {
    if(prodArr[i].title === allProducts[i].name)
    {
      allProducts[i].views += 1;
      localStorage.setItem(allProducts[i].storKeyView, allProducts[i].views);
      storedViews[i] += 1;
    }
  }
  clearProd();
  generateProd();
  /*ADD AN ELSEIF TO ACCOUNT FOR PREV LOCAL STORAGE */

  if(sessionClicks>=24)
  {
    //prepChartData();
    makeChart();
    document.getElementById('pickpic').removeEventListener('click',_listener);

  }
  else
  {
    sessionClicks++;
  }
}

//http://www.chartjs.org/ 

//console.log('YAYAYAYAYAYYA', storedClicks);
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
