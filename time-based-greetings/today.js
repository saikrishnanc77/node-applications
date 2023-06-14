let today=new Date().toLocaleString("en-US", {timeZone: "Australia/Brisbane"});
module.exports.getDate=function(){
    return new Date(today);
};


