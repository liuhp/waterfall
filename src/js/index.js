
// ajax('get','http://127.0.0.1:5500/waterfall/src/js/data.txt',addDom,'cpage=1',true);
// function addDom(data){
//         var datalist = JSON.parse(data);
//         console.log(datalist);
//     }

(function(){
    var oLi = document.getElementsByClassName('box');
    var flag = false,
        num = 1;
    function getdata(){
        if(!flag){
            flag = true;
            ajax('get','http://127.0.0.1:5500/waterfall/src/js/data.txt',addDom,'cpage='+num,true);
            num++;
        }

    }
    getdata();
    function addDom(data){
        var datalist = JSON.parse(data);
        console.log(datalist);
        datalist.forEach(function(ele,index){
            var minIndex = getMinList(oLi);
            var oItem = document.createElement('div'),
            oImg = new Image(),
            oP = document.createElement('p');

            oItem.className = "item";
            oImg.src = ele.preview;
            oImg.height = ele.height*initWidth/ele.width;
            oP.innerText = ele.title; 

            oItem.appendChild(oImg);
            oItem.appendChild(oP);
            oLi[minIndex].appendChild(oItem);

        });  
        flag = false; 
    }
    function getMinList(dom){
        var minHeight = dom[0].offsetHeight,
            i = 1,
            len = dom.length,
            index = 0;
            for(var i = 1;i<len;i++){
                if(dom[i].offsetHeight<minHeight){
                    minHeight = dom[i].offsetHeight;
                    index = i;
                }
            }
            return index;
    }
    window.onscroll = function(){
        var scrollHeight = document.documentElement.scrollTop||document.body.scrollTop;
        var clientHeight = document.document.clientHeight||document.body.clientHeight;
        var pageHeight =oLi[getMinList(oLi)].offsetHeight;
        if(scroolHeight + clientHeight>pageHeight){
            getdata();
        } 
    }

}())


