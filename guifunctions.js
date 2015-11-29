/**
 * Created by olli on 26.11.2015.
 */

exports.guiButtons  = function (client, funct, param){


    client.sendCommand(cmd("play "+ param,[]), function(err,msg){
        if(err) throw err;
        console.log(msg);
    })
};