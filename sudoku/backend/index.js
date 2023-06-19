const express = require('express');
const app = express()
const path = require('path')
const port = 3000

app.get('/',(req,res)=>{
    res.sendFile('/HomeComponent/home.html',{root:path.resolve('/node applications/sudoku/frontend')});
});

app.listen(port,()=>{
    console.log(`listening on the port ${port}`);
});

// app.get('./temperature/:location_code',function(request,response){
//     const varlocation=request.params.location_code;
//     weather.current(location,function(error,temp_f){

//     });

// });

// let server = app.listen(port,function(){
//     console.log(`listening on url http://localhost:${port}`)
// })

