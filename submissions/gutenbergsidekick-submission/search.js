var express = require('express');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var app = express();

app.use('/', express.static(__dirname + "/"));
var http = require('http').Server(app);
var io = require('socket.io')(http);

/* Custom user-input */
var customFrequency = 1;

var title;
var properNouns = [];
var paragraph;
var sentence;
var word_obj;
var priorityNouns = [];
var pronounsPrepositions = {
A: ['A','ABOUT','AFTER','AS','AT', 'ALL','ANY', 'AND', 'ARE'],
B: ['B','BEFORE','BE', 'BY', 'BUT','BOTH'],
C: ['C', 'CAN'],
D: ['D','DOWN'],
E: ['E','EXCEPT', 'EACH', 'EITHER', 'EVERY'],
F: ['F', 'FOR', 'FROM', 'FEW'],
G: ['G', 'GUTENBERG MUSEUM', 'GUTENBERG'],
H: ['H','HE', 'HER', 'HERS', 'HERSELF', 'HIM', 'HIMSELF', 'HIS'],
I: ['I', 'IT', 'ITS', 'IT\'S', 'INTO', 'IN','IF'],
J: ['J'],
K: ['K'],
L: ['L','LIKE'],
M: ['M','MANY', 'ME', 'MINE', 'MORE', 'MOST', 'MUCH', 'MY'],
N: ['N', 'NONE', 'NOTHING', 'NOBODY', 'NEW', 'NOW'],
O: ['O', 'ONE', 'OTHER', 'ONES', 'OUR', 'OURS', 'OF', 'OFF', 'ON', 'ONTO', 'OVER', 'OR', 'OH'],
P: ['P', 'PER','PLUS', 'PROJECT', 'PROJECT GUTENBERGTM'],
Q: ['Q'],
R: ['R'],
S: ['S', 'SINCE', 'SHE', 'SO'],
T: ['T', 'TO', 'THE', 'THEM', 'THAT\'S', 'THERE', 'THEIR', 'THERE\'S','THEIRS', 'THESE', 'THEY','THIS', 'THOSE', 'THEN'],
U: ['U', 'US', 'UP', 'UNTIL'],
V: ['V', 'VERY'],
W: ['W', 'WITH', 'WITHIN', 'WE', 'WHAT', 'WHAT\'S','WHO', 'WHOSE', 'WHY', 'WHEN'],
X: ['X'],
Y: ['Y', 'YOU', 'YOUR', 'YOURS'],
Z: ['Z']
};
var letterPronouns = [];

io.on('connection', function(socket){
    socket.on('send-url-request', function(data){
        console.log("received request from front end");
        properNouns = [];
        priorityNouns = [];
        letterPronouns = [];
        customFrequency = parseInt(data.frequency);
        getHttp(data.url, socket);
    });
});

app.get('/', function(req, res){
    res.SendFile(__dirname);
});

function getHttp(url, socket){

    request(url, function(err, resp, body){
        if(err){
            console.log(err);
        } else {
            if (url.indexOf('http://www.gutenberg.org/') >= 0) {
              var raw = body.toString();
              raw = raw.replace(/[/|&;$%@"<>()+,:*-]/g, "");
              title = raw.substring(raw.indexOf('Title'), raw.indexOf('Author'));
              getProperNoun(raw, socket);
            } else {
              /* alert wring url format */
              socket.emit('wrong-url-format');
            }

        }
    });
}

/* creates a word object with attribute */
function word(name, frequency)
{
   this.name  = name;
   this.frequency = frequency;
}

function getProperNoun(stringContent, socket) {
  var rules = new RegExp("^[A-Z]");
  paragraph = stringContent.split(".");
  sentence;
  for (var s = 0; s < paragraph.length; s++) {
    sentence = paragraph[s];
    sentence = sentence.trim();
    sentence = sentence.replace(/\r\n/g, " ");

    sentence = sentence.split(" ");

    for (var i = 1; i < sentence.length - 1; i++) {
      var current_word = sentence[i];
      word_obj = new word(current_word, 0);

      if (current_word.indexOf('\'') < 0 && current_word.indexOf('’') < 0 && current_word.indexOf('”') < 0) {
        if(rules.test(word_obj.name) && !containDuplicate(word_obj) && !isAPronoun(word_obj)) {
          if (!rules.test(current_word.charAt(1))) {
            var next_word = sentence[i+1];
            var counter = i + 1;
            while (next_word !== null && rules.test(next_word)) {
                current_word += " " + next_word;
                counter += 1;
                next_word = sentence[counter];
            }
            //console.log(current_word, ' ==> properNouns');
            properNouns.push(word_obj);
          }
        }
      } else {
        //console.log("CONTAIN APOSTROPHE: " + current_word);
      }

      /* check the last word */
      var last_word = sentence[sentence.length-1];
      if (rules.test(word_obj.name) && !containDuplicate(word_obj) && !isAPronoun(word_obj))
        properNouns.push(word_obj);

    }
  }
  properNouns.sort();
  prioritizeNouns(properNouns, socket);
}

/* returns true if the array has the current search word */
function containDuplicate(word) {
  if (properNouns.length > 0) {
      for (var k = 0; k < properNouns.length; k++) {
      var currentWord = properNouns[k];
      var exp_word = new RegExp(word_obj.name);
      if ( word_obj.name.toUpperCase() === currentWord.name.toUpperCase()) {
         currentWord.frequency = currentWord.frequency +1;
         return true;
      }

    }
  }

  return false;
}

function isAPronoun(word_obj)
{
  var firstChar = word_obj.name.charAt(0);
  letterPronouns = pronounsPrepositions[firstChar];

  for(var n = 0; n < letterPronouns.length; n++)
  {
    if (word_obj.name.toUpperCase() === letterPronouns[n])
    {
      return true;
    }
  }

  return false;
}

/*Uses frequency to chose most common proper nouns*/
function prioritizeNouns(properNouns, socket)
{
  properNouns.sort(function(a, b){
    return b.frequency - a.frequency;
  });

  for( var l = 0; l < properNouns.length; l++)
  {
      if (properNouns[l].frequency >= customFrequency){
         priorityNouns.push(properNouns[l].name);
      }
  }

  console.log("The best nouns are: " + priorityNouns);
  socket.emit('term-result', {'termList': priorityNouns, 'title': title});
}


http.listen(3000, function(){
     console.log('listening on *:3000');
});
