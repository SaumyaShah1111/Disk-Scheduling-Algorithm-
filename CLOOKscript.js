let input_queries=[];
let head;
let left=[];
let right=[];
let seek_sequence=[];
let direction;
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
        input_queries.push(q);
        document.getElementById("number").value='';
    }
}
document.getElementById('headbtn').onclick=addHead;
function addHead(){
    head=document.getElementById('starting').value;
}
document.getElementById('cal').onclick=CLOOK;
document.getElementById('addDirection').onclick=addDirection;
function addDirection(){
    var dir = document.getElementsByName('direction');  
        for(i = 0; i < dir.length; i++){
            if(dir[i].checked)
                direction=dir[i].value;
        }
}
function CLOOK(){
    for(let i = 0; i < input_queries.length; i++){
        if(parseInt(input_queries[i])<parseInt(head))
            left.push(input_queries[i]);
        if(parseInt(input_queries[i])>parseInt(head))
            right.push(input_queries[i]);
    }
    left.sort(function(a, b){return a - b});
    right.sort(function(a, b){return a - b});
    switch(direction){
        case 'right':   for (let i = 0; i < right.length; i++){
                            cur_track = right[i];
                            seek_sequence.push(cur_track);
                            distance = Math.abs(cur_track - head);
                            seektime += distance;
                            head = cur_track;
                        }
                        console.log("seek sequence after right:",seek_sequence);
                        seektime += Math.abs(head-left[0]);
                        head=left[0];
                        for (let i = 0; i < left.length; i++){
                            cur_track = left[i];
                            seek_sequence.push(cur_track);
                            distance = Math.abs(cur_track - head);
                            seektime += distance;
                            head = cur_track;
                        }
                        break;
        case 'left':    for (let i=left.length-1;i>=0;i--) {
                            cur_track = left[i];
                            seek_sequence.push(cur_track);
                            distance = Math.abs(cur_track - head);
                            seektime += distance;
                            head = cur_track;
                        }
                        seektime += Math.abs(head-right[right.length-1]);
                        head=right[right.length-1];
                        for (let i=right.length-1;i>=0;i--){
                            cur_track = right[i];
                            seek_sequence.push(cur_track);
                            distance = Math.abs(cur_track - head);
                            seektime += distance;
                            head = cur_track;
                        }
                        break;
        default: console.log("Please enter right or left.");
    }
    document.getElementById("output").setAttribute('value',seektime);
    console.log("Seek sequence at the end:",seek_sequence);
}
document.getElementById('diagram').onclick=showGraphClook;
function showGraphClook(){
    let temp=document.getElementById("starting").value;
    var xAxes=seek_sequence;
    var yAxes=[];
    seek_sequence.splice(0,0,temp);
    var j=0;
    for(var i=0;i<seek_sequence.length;++i){
        yAxes[i]=j;
        --j;
    }
    new Chart("CLOOKchart", {
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
        },
        scales: {
            xAxes: [{
                beginAtZero:true
            }]
        }
        }
    });
}