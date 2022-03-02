let arr=[];
let head=0;
document.getElementById('output').disabled=true;
document.getElementById('add').onclick=inputQueries;
function inputQueries(){
    let val=document.getElementById("number").value;
    arr.push(val);
    document.getElementById("number").value='';
}
document.getElementById('headbtn').onclick=addHead;
document.getElementById('cal').onclick=FCFS;
function addHead(){
    head=document.getElementById('starting').value;
}
function FCFS(){
    var distance,current;
    var seekCount=0;
    for(var i=0;i<arr.length;i++){
        current=arr[i];
        distance=Math.abs(current-head);
        seekCount+=distance;
        head=current;
    }
    document.getElementById("output").setAttribute('value',seekCount);
}
document.getElementById('diagram').onclick=showGraphFCFS;
function showGraphFCFS(){
    head=document.getElementById('starting').value;
    var newarray=arr;
    newarray.splice(0,0,head);
    console.log("The array is: ",newarray);
    var xAxes=newarray;
    var yAxes=[];
    var j=0;
    for(var i=0;i<arr.length;++i){
        yAxes[i]=j;
        --j;
    }
    new Chart("FCFSchart", {
        type: "line",
        
        data: {
          labels: yAxes,
          datasets: [{
              label:'Disk graph',
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