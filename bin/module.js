var util = require('util');

var Module = function Constructor(bot) {
	this.keyWords = [];
	this.bot = bot;
	this.data = null;
}

Module.prototype = {

	isMessageForMe: function(){

		var isForMe = false;
		var keysLength = this.keyWords.length;

		for(var i = 0; i < keysLength; i++){
			if(this.data.text.indexOf(this.keyWords[i]) > -1){
				isForMe = true;
				break;
			}
		}
		
		return isForMe;
	},

	getAnswer: function(){},

	manage: function(){
		if(this.isMessageForMe() === true){
			this.getAnswer();
		}
	},

	setData: function(data){
		this.data = data;
	}
};

module.exports = Module;