let queries=[];
let querysequence=[];
let head=0;
document.getElementById('output').disabled=true;
document.getElementById('add').onclick=inputQueries;
function inputQueries(){
    let val=document.getElementById("number").value;
    queries.push(val);
    document.getElementById("number").value='';
}
document.getElementById('headbtn').onclick=addHead;
function addHead(){
    head=document.getElementById('starting').value;
}
document.getElementById('cal').onclick=SSTF;
function SSTF(){
    queries.push(head);
    queries.sort(function(a,b){return a-b});
    console.log("The initial array is:",queries);
    let distance=0,seektime=0,current=head;
    let temp=0;
    while(1){
        if(current-queries[queries.indexOf(current)-1]<=queries[queries.indexOf(current)+1]-current){
            
            distance=current-queries[queries.indexOf(current)-1];
            seektime=seektime+distance;
            querysequence.push(current);
            temp=queries[queries.indexOf(current)-1];
            queries.splice(queries.indexOf(current),1);
            current=temp;
            if(queries.indexOf(current)==0){
                for(var j=1;j<queries.length;++j){
                    distance=queries[j]-current;
                    seektime=seektime+distance;
                    querysequence.push(current);
                    current=queries[j];
                }
                break;
            }
        }
        else if(current-queries[queries.indexOf(current)-1]>=queries[queries.indexOf(current)+1]-current){
            distance=queries[queries.indexOf(current)+1]-current;
            seektime=seektime+distance;
            querysequence.push(current);
            temp=queries[queries.indexOf(current)+1];
            queries.splice(queries.indexOf(current),1);
            current=temp;
            if(queries.indexOf(current)==queries.length-1){
                for(var j=queries.length-1;j>0;--j){
                    distance=current-queries[j];
                    seektime=seektime+distance;
                    querysequence.push(current);
                    current=queries[j];
                }
                break;
            }
        }
    }
    document.getElementById("output").setAttribute('value',seektime);
}
console.log("The query sequence is:",querysequence);
document.getElementById('diagram').onclick=showGraph;
function showGraph(){
    var xAxes=querysequence;
    var yAxes=[];
    var j=0;
    for(var i=0;i<querysequence.length;++i){
        yAxes[i]=j;
        --j;
    }
    new Chart("SSTFchart", {
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