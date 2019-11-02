//import * as tf from '@tensorflow/tfjs';

var model13 = 0;
var idx2char = 0;
var char2idx = 0;

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
    idx2char = JSON.parse(this.responseText);
    }
};
xmlhttp.open("GET", 'i2c.json', true);
xmlhttp.send();

var xmlhttp2 = new XMLHttpRequest();
xmlhttp2.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
    char2idx = JSON.parse(this.responseText);
    }
};
xmlhttp2.open("GET", 'c2i.json', true);
xmlhttp2.send();


function sample(probs, T) {
  return tf.tidy(() => {
    const temp = parseFloat(T);
    const logits = tf.div(probs, Math.max(temp, 1e-6));
    const isNormalized = false;
    const seed = null;
    const generatedIndices = tf.multinomial(logits, 1, seed, isNormalized).dataSync();
    return generatedIndices[generatedIndices.length - 1];
  });
}

async function generate() {
  if (model13===0){
    model13 = await tf.loadLayersModel('tfjs_model_13/model.json');
  }


  var starting_string = document.getElementById('starting_words').value;
  var seedSentenceIndices = [];
  for (var i=0;i<starting_string.length;i++){
  	seedSentenceIndices.push(char2idx[starting_string[i]])
  }
  var input_eval = tf.expandDims(seedSentenceIndices, 0);

  var temperature = document.getElementById('temperature').value;
  var num_generate = document.getElementById('word_count').value;


  var text_generated = starting_string;
  model13.resetStates();

  for (var i=0;i<num_generate;i++){
      var predictions = model13.predict(input_eval);
      const sampledIndex = sample(tf.squeeze(predictions), temperature);
      const sampledChar = idx2char[sampledIndex];
      seedSentenceIndices = seedSentenceIndices.slice(1);
      seedSentenceIndices.push(sampledIndex);
      input_eval = tf.expandDims(seedSentenceIndices, 0);
      text_generated += sampledChar;
  }

  document.getElementById('generated_text').innerHTML = text_generated;
}

document.getElementById('start_generating').addEventListener('click', generate);