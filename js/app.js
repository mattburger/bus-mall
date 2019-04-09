'use strict';

//array of all product names
var picPool = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass'];
//var storedClicks = [];
//var storedViews = [];
//hold all objects of mallProduct
var allProducts = [];
var imgEl;
var lastViewed = ['','',''];

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
function rand(min,max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log('Length of allProducts: ', allProducts.length);
console.log('Random Gen value: ',rand(0, allProducts.length - 1) );
console.table(allProducts);

function checkLastViewed(picName)
{
  lastViewed = [(JSON.parse(sessionStorage.getItem(picName)))];
  console.log('checkLastViewed(): lastViewed =',lastViewed);
  for(var i = 0; i < lastViewed.length; i++)
  {
    if(picName === lastViewed[i])
    {
      return 1;
    }
    else
    {
      return 0;
    }
  }
}
function checkForDuplicate(picName)
{
  for(var i = imgEl.length-1; i >= 0; i--)
  {
    if(picName === imgEl[i].title)
    {
      return 1;
    }
    else
    {
      return 0;
    }
  }
}

function markLastViewed(num, picName)
{
  lastViewed[num] = picName;
  sessionStorage.setItem('lastViewed', JSON.stringify(lastViewed) );
}

/* change this function to clear localStorage
function clearLastViewed()
{
  for(var i = lastViewed.length - 1; i >=0; i--)
  {
    lastViewed.pop();
  }
}*/

function handleClick(event)
{
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
  for(i = 0; i < 3; i++)
  {
    var tmpIndex = imgEl[i].title;
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
imgEl = [prod1,prod2,prod3];
function generateProd()
{
  console.log('Last Viewed: ', lastViewed);
  var index;
  for(var i = 0; i < imgEl.length; i++)
  {
    index = rand(0,allProducts.length - 1);
    console.log('var i: ',i);
    if(i > 0)
    {
      console.log('comparison of: ' + allProducts[index].name + ' and ' + imgEl[i-1].title);
      while( (checkLastViewed(allProducts[index].name) !== 0 ) || (checkForDuplicate(allProducts[index].name) !== 0) )
      {
        console.log('In while loop');
        index = rand(0, allProducts.length - 1);
      }
      markLastViewed(i,allProducts[index].name);
    }
    else
    {
      console.log('First pass');
      while(checkLastViewed(allProducts[index].name) !== 0)
      {
        index = rand(0,allProducts.length - 1);
      }
      markLastViewed(i,allProducts[index].name);
    }

    imgEl[i].src = allProducts[index].url;
    imgEl[i].alt = allProducts[index].alt;
    imgEl[i].title = allProducts[index].title;

  }
  //clearLastViewed();

  /*for(i = 0; i < lastViewed.length; i++)
  {
    markLastViewed(i,imgEl[i].title);
    //console.log('imgEl',imgEl[i].title);
  }*/

  console.log('lastView: ',lastViewed);
  console.log('imEl:', imgEl);
  console.table(allProducts);
  console.log(allProducts[0].clicks);

}
generateProd();
prod1.addEventListener('click',handleClick);
prod2.addEventListener('click',handleClick);
prod3.addEventListener('click',handleClick);
console.log(sessionStorage.getItem(allProducts[0].storKey));
console.log(allProducts[14].storKey);



