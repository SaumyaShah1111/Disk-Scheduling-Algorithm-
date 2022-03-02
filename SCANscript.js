let queries=[];
let seek_seq=[];
let head,temp;
let right=[];
let left=[];
let disk_size=200;
let current,distance=0,seektime=0;
document.getElementById('output').disabled=true;
document.getElementById('add').onclick=inputQueries;
function inputQueries(){
    let q=document.getElementById("number").value;
    if(parseInt(q)<0){
        alert("Queries cannot be negative.");
        document.getElementById("number").value='';
    }
    else{
        queries.push(q);
        document.getElementById("number").value='';
    }
}
document.getElementById('headbtn').onclick=addHead;
document.getElementById('cal').onclick=SCAN;
function addHead(){
    head=document.getElementById('starting').value;
}
document.getElementById('addDirection').onclick=addDirection;
function addDirection(){
    var dir = document.getElementsByName('direction');  
        for(i = 0; i < dir.length; i++){
            if(dir[i].checked)
                direction=dir[i].value;
        }
}
function SCAN(){
    if(direction=='right')
        queries.push(disk_size);
    else if(direction=='left')
        queries.push(0);
    for(let i=0;i<queries.length;++i){
        if(parseInt(queries[i])<parseInt(head))
            left.push(queries[i]);
        else if(parseInt(queries[i])>parseInt(head))
            right.push(queries[i]);
    }
    left.sort(function(a, b){return a - b});
    right.sort(function(a, b){return a - b});
    console.log("Right array:",right);
    console.log("Left array:",left);
    for(var x=2;x>0;--x){
        if(direction=='right'){
            for(var i=0;i<right.length;++i){
                current=right[i];
                seek_seq.push(current);
                distance=Math.abs(current-head);
                seektime=seektime+distance;
                head=current;
            }
            direction='left';
        }
        else if(direction=='left'){
            for(var i=left.length-1;i>=0;--i){
                current=left[i];
                seek_seq.push(current);
                distance=Math.abs(current-head);
                seektime=seektime+distance;
                head=current;
            }
            direction='right';
        }
    }
    document.getElementById("output").setAttribute('value',seektime);
}

document.getElementById('diagram').onclick=showGraph;
function showGraph(){
    head=document.getElementById('starting').value;
    seek_seq.splice(0,0,head);
    var xAxes=seek_seq;
    var yAxes=[];
    var j=0;
    for(var i=0;i<seek_seq.length;++i){
        yAxes[i]=j;
        --j;
    }
    new Chart("SCANchart", {
        type: "line",
        
        data: {
          labels: yAxes,
          datasets: [{
            backgroundColor: "rgba(0,0,0,1.0)",
            borderColor: "rgb(255,0,0)",
            data: xAxes
          }]
        },
        options:{
          legend: {display: false},
          plugins: {
            legend: {
                display: false
            }
        }
        }
    });
}