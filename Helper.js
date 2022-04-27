var getTimeStamp = function(){
    const timeStamp = Math.round(new Date().getTime()/ 1000);
    return timeStamp
}
module.exports = {getTimeStamp};