var util = require('util');

var Module = function Constructor(bot,data) {
	this.keyWords = [];
	this.data = data;
	this.bot = bot;
}

Module.prototype.isMessageForMe = function(){

	var isForMe = false;
	var keysLength = this.keyWords.length;

	for(var i = 0; i < keysLength; i++){
		if(this.data.text.indexOf(this.keyWords[i]) > -1){
			isForMe = true;
		}
	}
	
	return isForMe;
};

Module.prototype.getAnswer = function(){
};

Module.prototype.manage = function(){

	if(this.isMessageForMe() === true){
		this.getAnswer();
	}
};

module.exports = Module;