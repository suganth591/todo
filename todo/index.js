function add(){
    var task=document.getElementById("task");
    var date=document.getElementById("deadline");
    var xhr=new XMLHttpRequest();
    var data=new FormData();
    data.append("task",task.value);
    data.append("dead",date.value);
    data.append('add','true');
    xhr.open('POST','server.php');
    xhr.send(data);
    xhr.onload=function(){
        render();
    }
    task.value="";
    date.value="";
}
function remove(id){
    var xhr=new XMLHttpRequest();
    var data=new FormData();
    data.append("id",id);
    data.append('delete','true');
    xhr.open('POST','server.php');
    xhr.send(data);
    xhr.onload=function(){
        render();
    }
}
function complete(id){
    var xhr=new XMLHttpRequest();
    var data=new FormData();
    data.append("id",id);
    data.append('complete','true');
    xhr.open('POST','server.php');
    xhr.send(data);
    xhr.onload=function(){
        render();
    }
}
function render(){
var xhr=new XMLHttpRequest();
xhr.open('post','server.php');
var data=new FormData();
data.append("render","true");
xhr.send(data);
var res;
xhr.onload=function (){
    res=JSON.parse(xhr.response);
    var pending=res[0];
    var completed=res[1];
    var insert=document.getElementById('tasks');
    insert.innerHTML="";
    for(let i=0;i<pending.length;i++){
    insert.innerHTML+="<div class='pending'>"+(i+1)+". "+pending[i]['task']+"&nbsp;&nbsp;&nbsp;&nbsp;"+pending[i]['deadline']+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onclick='remove("+pending[i]['id']+")' style='color:red;font-weight:bolder;background:none;border:none;'>&cross;</button><button onclick='complete("+pending[i]['id']+")' style='color:green;font-weight:bolder;background:none;border:none;'>&check;</button></div>";
}
for(let i=0;i<completed.length;i++){
    insert.innerHTML+="<div class='completed'>"+(pending.length+i+1)+". "+completed[i]['task']+"&nbsp;&nbsp;&nbsp;&nbsp;"+completed[i]['deadline']+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onclick='remove("+completed[i]['id']+")' style='color:red;font-weight:bolder;background:none;border:none;'>&cross;</button></div>";
}
if(pending.length==0 && completed.length==0){
    insert.innerHTML="<br><br><p>Add Some Tasks to list here</p>";
}
}

}
