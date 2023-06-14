const today=require('./today');
const http= require('http');

const requestListener = function(request,response){
    response.writeHead(200);
    let date=today.getDate();
    let hrs=date.getHours();
    let greetings='';
    if(hrs>=0 && hrs<12)
        greetings='Good Morning!';
    else if(hrs>=12 && hrs<14){
        greetings='Good Afternoon!';

    }
    else if(hrs>=14 && hrs<18){
        greetings='Good Evening!';
    }
    else{
        greetings='Good Night!';
    }

    response.end(`Hello ${greetings}`);
};

const port=8080;
const server=http.createServer(requestListener);
console.log(`server listening on port ${port}`);
server.listen(port);


