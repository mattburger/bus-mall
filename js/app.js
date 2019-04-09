'use strict';

//array of all product names
var picPool = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass'];
//var storedClicks = [];
//var storedViews = [];
//hold all objects of mallProduct
var allProducts = [];
var randArr;

function MallProduct(name)
{
  this.name = name;
  this.storKey = name + 'key';
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
function rand(max)
{
  var rArr = [];
  for(var i = 0; i < 6; i++)
  {
    rArr.push(Math.floor(Math.random() * max));
  }
  return rArr;
}

function handleClick(event)
{
  console.log('In evenHandler');
  var tmpName = event.target.title;
  for(var i = 0; i < allProducts.length; i++)
  {

    if(tmpName === allProducts[i].name)
    {
      var tmpData = sessionStorage.getItem(allProducts[i].storKey);
      tmpData++;
      sessionStorage.setItem(allProducts[i].storKey, tmpData);
      console.log('getItem from session storage', sessionStorage.getItem(allProducts[i].storKey));
    }
  }
  for(i = 0; i < prodArr.length; i++)
  {
    var tmpIndex = prodArr[i].title;
    if(tmpIndex === allProducts[i].name)
    {
      var tmpData2 = sessionStorage.getItem(tmpIndex+'key');
      tmpData2++;
      sessionStorage.setItem(allProducts[i].storKey, tmpData2);
    }
  }
  document.location.reload();
  // event.preventDefault();

}

var prod1 = document.getElementById('prod1');
var prod2 = document.getElementById('prod2');
var prod3 = document.getElementById('prod3');
var prodArr = [prod1,prod2,prod3];
console.table(allProducts);
function generateProd()
{
  randArr = rand(0,allProducts.length-1);
  for(var i = 0; i < randArr.length; i++)
  {
    for(var j = 0; j<randArr.length;j++)
    {
      if(randArr[i] === randArr[j])
      {
        randArr[i] = Math.floor(Math.random() * allProducts.length);
      }
    }
  }
  if(randArr === [])
  {
    randArr = rand();
  }
  prod1.src = allProducts[ randArr[randArr.length-1] ].url;
  prod1.alt = allProducts[ randArr[randArr.length-1] ].alt;
  prod1.title = allProducts[ randArr[randArr.length-1] ].title;
  randArr.pop();

  prod2.src = allProducts[ randArr[randArr.length-1] ].url;
  prod2.alt = allProducts[ randArr[randArr.length-1] ].alt;
  prod2.title = allProducts[ randArr[randArr.length-1] ].title;
  randArr.pop();

  prod3.src = allProducts[ randArr[randArr.length-1] ].url;
  prod3.alt = allProducts[ randArr[randArr.length-1] ].alt;
  prod3.title = allProducts[ randArr[randArr.length-1] ].title;
  randArr.pop();

}

generateProd();
prod1.addEventListener('click',handleClick);
//prod1.removeEventListener('click',handleClick);
prod2.addEventListener('click',handleClick);
//prod2.removeEventListener('click',handleClick);
prod3.addEventListener('click',handleClick);
//prod3.removeEventListener('click',handleClick);


console.log(sessionStorage.getItem(allProducts[0].storKey));
console.log(allProducts[14].storKey);



