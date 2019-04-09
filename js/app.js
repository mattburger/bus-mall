'use strict';

//array of all product names
var picPool = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass'];
var storedClicks = [];
var storedViews = [];
//hold all objects of mallProduct
var allProducts = [];
var lastViewedArr;
var randArr = [];

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
  sessionStorage.setItem(this.storKey,this.clicks);
  sessionStorage.setItem(this.storKey,this.views);

  allProducts.push(this);
}
for(var i = 0; i < picPool.length; i++)
{
  new MallProduct(picPool[i]);
}
function rand()
{
  return (Math.floor(Math.random() * allProducts.length));
}

var prod1 = document.getElementById('prod1');
var prod2 = document.getElementById('prod2');
var prod3 = document.getElementById('prod3');
var prodArr = [prod1,prod2,prod3];
console.table(allProducts);

function generateProd()
{
  //document.getElementById('pickpic').removeEventListener()
  for(var i = 0; i < prodArr.length;i++)
  {
    randArr.push(rand());

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
function handleClick(id)
{
  console.log('In evenHandler');
  var tmpName;
  for(var i = 0; i < allProducts.length; i++)
  {
    tmpName = document.getElementById(id).title;

    if(tmpName === allProducts[i].name)
    {
      var tmpData = sessionStorage.getItem(allProducts[i].storKeyClick);
      tmpData++;
      sessionStorage.setItem(allProducts[i].storKeyClick, tmpData);
      storedClicks.push(tmpData);
      console.log('getItem from session storage', sessionStorage.getItem(allProducts[i].storKeyClick));
    }
  }
  for(i = 0; i < prodArr.length; i++)
  {
    var tmpIndex = prodArr[i].title;
    if(tmpIndex === allProducts[i].name)
    {
      var tmpData2 = sessionStorage.getItem(tmpIndex + 'ViewKey');
      tmpData2++;
      sessionStorage.setItem(allProducts[i].storKey, tmpData2);
      storedViews.push(tmpData2);
    }
  }
  clearProd();
  generateProd();
}

generateProd();
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


