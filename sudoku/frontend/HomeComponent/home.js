var x = document.getElementById("s-table");
var y = document.getElementById("solve");
for(var i=0;i<9;i++){
    var row=x.insertRow(-1);
    for(var j=0;j<9;j++){
        var cell=row.insertCell(-1);
        var ip=document.createElement('input');
        ip.type = 'number';
        ip.min=1;
        ip.max=9;
        // inputElement.name = 'myInput';
        // inputElement.placeholder = 'Enter value';
        ip.addEventListener('input',validateInput);
        ip.id=i+'_'+j;


        cell.appendChild(ip);
        
        // cell.innerHTML=0;
        
    }
}
y.addEventListener('click',solvePuzzle);

function validateInput(event){
    const val=event.target.value;
    if(val<=0){
        event.target.value='';
        // return;
    }
    if(val.length>1){
        event.target.value=val.slice(0,1);
        // return;
    }
    const uid=event.target.id;
    // console.log(uid);
    const row=parseInt(uid[0]);
    const col=parseInt(uid[2]);
    var rcount=0;
    // console.log(row,col);
    for(var i=0;i<9;i++){

        var txt=parseInt(document.getElementById(i+'_'+col).value);
        // console.log(txt,'----');
        if(txt==parseInt(event.target.value)){
            rcount+=1;
            if(rcount>1){
                event.target.value='';
                // return;
            }
        }
    }
    var ccount=0;
    for(var i=0;i<9;i++){
        var txt=parseInt(document.getElementById(row+'_'+i).value);
        if(txt==parseInt(event.target.value)){
            ccount+=1;
            if(ccount>1){
                event.target.value='';
                // return;
            }
        }
    }
    var rbx=Math.floor(row/3),cbx=Math.floor(col/3);
    // console.log(rbx,cbx);
    var bcount=0;
    for(var i=rbx*3;i<rbx*3+3;i++){
        for(var j=cbx*3;j<cbx*3+3;j++){
            var txt=parseInt(document.getElementById(i+'_'+j).value);
            if(txt==parseInt(event.target.value)){
                bcount+=1;
                if(bcount>1){
                    event.target.value='';
                    // return;
                }
            }
        }
    }


}

function solvePuzzle(){
    // let ar=new Int8Array(9)
    let t=[];
    for(var i=0;i<9;i++)
    t.push(new Int16Array(9));
    for(var i=0;i<9;i++){
        for(var j=0;j<9;j++){
            var temp=parseInt(document.getElementById(i+'_'+j).value);
            if(temp)
            t[i][j]=temp;
        }
    }  
    console.log(t);

}

function generatePuzzle(){
    let t=[];
    for(var i=0;i<9;i++)
    t.push(new Int16Array(9));
}