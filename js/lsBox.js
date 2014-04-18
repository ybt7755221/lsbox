function LsSuccess()
{
    Information(1,'');
}

function LsError()
{
    Information(0,'');
}

function LsMessage(num,txt)
{
    if(!num)
        num = '0';
    if(!txt)
        txt = '通知内容不能为空';
    Information(num,txt);
}

function LsImage(imgName)
{
   if (!imgName)
   {
        LsMessage(0,'图片不能为空!');
   }
   else
   {
       createMask();
       var maskDiv = document.getElementById('ls_maskDiv');
       var imgObj = new Image();
	   maskDiv.innerHTML = '<div id="ls_imageDiv" onclick="closeMask()" class="waiting"></div>';
       imgObj.src = imgName;
       if (imgObj.complete)
       {
				maskDiv.innerHTML = '<div id="ls_imageDiv"><div id="bgDiv"  onclick="closeMask()"  style="padding:10px;"><a href="javascript:closeMask();" class="ls_closeImg"></a><img id="imgUrl" src="' + imgName + '" style="background:#fff; padding:10px;"/></div></div>'; 
                imgCenter(parseInt(imgObj.width)+20,parseInt(imgObj.height)+20);
       }
       else
       {
            imgObj.onload = function(){
				maskDiv.innerHTML = '<div id="ls_imageDiv"><div id="bgDiv"  onclick="closeMask()"  style="padding:10px;"><a href="javascript:closeMask();" class="ls_closeImg"></a><img id="imgUrl" src="' + imgName + '" style="background:#fff; padding:10px;"/></div></div>'; 
				imgCenter(parseInt(imgObj.width)+20,parseInt(imgObj.height)+20);
            };
       }
   }
}

function imgCenter(imgWidth,imgHeight)
{
    var maskDiv = document.getElementById('ls_maskDiv');
    var imgDiv = document.getElementById('ls_imageDiv');
	var img = document.getElementById('imgUrl');
    var maxHeight = parseInt(maskDiv.offsetHeight)-40;
	var maxWidth = parseInt(maskDiv.offsetWidth)-40;
	var imgPoint = imgWidth/imgHeight;
	var maxPoint = maxWidth/maxHeight;
	if(maxPoint > imgPoint)
	{
		if (imgHeight > maxHeight)
		{
			img.setAttribute('height',maxHeight + 'px');
			var newWidth = maxHeight*imgPoint;
			img.setAttribute('width',newWidth + 'px');
			imgDiv.style.marginLeft = '-' + newWidth/2 + 'px';
			imgDiv.style.marginTop = '-' + (maxHeight/2+15) + 'px'; 
		}
		else
		{
			imgDiv.style.marginLeft = '-' + imgWidth/2 + 'px';
			imgDiv.style.marginTop = '-' + (imgHeight/2+15) + 'px';
			img.setAttribute('width',imgWidth + 'px');
		}
	}
	if(maxPoint < imgPoint)
	{
		if (imgWidth > maxWidth)
		{
			img.setAttribute('width',maxWidth + 'px');
			var newHeight = maxHeight/imgPoint;
			img.setAttribute('height',newHeight + 'px');
			imgDiv.style.marginTop = '-' + (newHeight/2+15) + 'px';
			imgDiv.style.marginLeft = '-' + (maxWidth/2+22) + 'px'; 
		}
		else
		{
			imgDiv.style.marginLeft = '-' + imgWidth/2 + 'px';
			imgDiv.style.marginTop = '-' + (imgHeight/2+15) + 'px';
			img.setAttribute('width',imgWidth + 'px');
		}
	}
}

function LsAjax(page,title)
{
    if(!page)
    {
        LsMessage(0,'引入页面不能为空!');
    }
    else
    {
        if (!title)
            title = "弹出表单";
        createMask();
        var maskDiv = document.getElementById('ls_maskDiv');
        maskDiv.innerHTML = '<div id="ls_form"><div class="ls_formTit">' + title + '<a class="ls_closeForm" href="javascript:closeMask();"></a></div><div id="ls_formDiv"></div></div>';
        ajaxLoadHtml('ls_formDiv', page);
        var formDiv = document.getElementById('ls_form');
        var formWidth = parseInt(formDiv.offsetWidth);
        var formHeight = parseInt(formDiv.offsetHeight); 
        formDiv.style.marginLeft = '-' + formWidth/2 + 'px';
        formDiv.style.marginTop = '-' + formHeight/2 + 'px';
    }
}

function LsIframe(page,formWidth,formHeight,iframeTit)
{
    if(!page)
    {
        LsMessage(0,'引入页面不能为空!');
    }
    else
    {
        if (!formWidth)
            formWidth = '500';
        if (!formHeight)
            formHeight = '300';
        if (!iframeTit)
            iframeTit = 'iframe弹出窗';
        createMask();
        var maskDiv = document.getElementById('ls_maskDiv');
        maskDiv.innerHTML = '<div id="ls_form"><div class="ls_formTit">'+iframeTit+'<a class="ls_closeForm" href="javascript:closeMask();"></a></div><iframe id="ls_iframe" scrolling=yes;" frameborder="0" src="' + page + '"></iframe></div>';
        var formDiv = document.getElementById('ls_form');
        formDiv.style.width = formWidth + "px";
        formDiv.style.height =  formHeight + 'px';
        formDiv.style.marginLeft = '-' + formWidth/2 + 'px';
        formDiv.style.marginTop = '-' + formHeight/2 + 'px';
        var iframe = document.getElementById('ls_iframe');
        iframe.setAttribute('width',formWidth + 'px');
        iframe.setAttribute('height',formHeight - 20 + 'px');
    }
}

function ajaxLoadHtml(id,page){
    createXMLHttpRequest();
    xmlHttp.onreadystatechange = function(){if(xmlHttp.readyState==4){
        if(xmlHttp.status==200 || xmlHttp.status==0){
            document.getElementById(id).innerHTML = xmlHttp.responseText;
        }
    }};
    xmlHttp.open("POST", page, false);
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp.send(null); 
} 

function createXMLHttpRequest(){
    if(window.ActiveXObject){
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else if(window.XMLHttpRequest){
        xmlHttp = new XMLHttpRequest();
    }
}

function Information(num,txt)
{
    createMask();
    var info = document.getElementById('ls_maskDiv');
    if (num == 1)
    {
        if(!txt)
            txt = '操作成功!';
        info.innerHTML = '<div id="ls_information" class="LsSuc">' + txt + '</div>';
    }
    else if(num == 0)
    {
        if(!txt)
            txt = '操作失败!';
        info.innerHTML = '<div id="ls_information" class="LsErr">' + txt + '</div>';
    }
    var mask = document.getElementById('ls_information');
    var width = parseInt(mask.offsetWidth);
    mask.style.marginLeft = '-' + width/2 + 'px';
    setTimeout(closeMask,'2000');
}


function createMask()
{
    var mask = document.createElement('div');
    mask.setAttribute('id','ls_mask');
    document.body.appendChild(mask);
    var maskDiv = document.createElement('div');
    maskDiv.setAttribute('id','ls_maskDiv');
    document.body.appendChild(maskDiv);
}

function closeMask()
{
    var mask = document.getElementById('ls_mask');
    var maskDiv = document.getElementById('ls_maskDiv');
    document.body.removeChild(maskDiv);
    document.body.removeChild(mask);
}

window.onscroll=function()
{
    var top=document.documentElement.scrollTop||document.body.scrollTop;
    var toTop=document.getElementById("toTop");
    if(top>100)
    {
        toTop.style.display="inline";
    }
    else
    {
        toTop.style.display="none";
    }
};
var toTop=new function()
{
    var Timer=null;
    function $id(id){return typeof id=="string"?document.getElementById(id):id;};
    this.goto=function(objName)
    {
    $id(objName).onclick=function()
    {
        var top=document.documentElement.scrollTop||document.body.scrollTop;
        startNove();
        return false;
    };
    var startNove=function()
    {
        if(Timer)clearInterval(Timer);
        Timer=setInterval(doMove,30);
    };
    var doMove=function()
    {
        var iSpeed=0;
        var top=document.documentElement.scrollTop||document.body.scrollTop;
        iSpeed=(0-top)/5;
        iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
        if(Math.abs(iSpeed)<1&&Math.abs(0-top)<1)
        {
            clearInterval(Timer);
            Timer=null;
        }
        window.scrollTo(0,(top+iSpeed));
    };
    };
};