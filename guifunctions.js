/**
 * Created by olli on 26.11.2015.
 */

var functions = {};
var feedback = {};

exports.guiButtons  = function (funct, param) {
    try {
        feedback=  functions[funct](param)

    }
    catch(err){
        console.log("Error" + err)


    }
};



functions.setStation=function(station){

    console.log("Station = " + station)
};

functions.Volume=function(parameter){

    console.log("Volume:"+ parameter);
    response="myVolume:"+ parameter;

};

exports.startMpcConnector = function(){

    setTimeout(function(){


    })


};

exports.buildGui=function(socket){


    var guifile = require("./gui.json");

    var state = guifile.state

    console.log("Panel = " + state.activePanel)

    socket.emit('gui',guifile)


    var outputs = guifile.outputs

    for (var output in outputs){


        socket.emit('outputHandler',outputs[output])
        console.log("output=" + outputs[output])
    };



}