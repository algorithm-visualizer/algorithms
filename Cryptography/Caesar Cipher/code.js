var string = 'hello! how are you doing?';
var rotation = 5;
var alphabet = 'abcdefghijklmnopqrstuvwxyz';
// create a map of char -> position to improve run time
// otherwise we would have to search the alphabet each 
// time to find the character position
var alphabetMap = alphabet.split('').reduce(function(map, curr, idx) {
  map[curr] = idx;
  return map;
}, {});

var encryptTracer = new Array1DTracer('Encryption');
var decryptTracer = new Array1DTracer('Decryption');
var logger = new LogTracer();

encryptTracer.set(string);

function getPosUp(pos) {
  return (pos === alphabet.length - 1) ? 0 : pos + 1;
}

function getPosDown(pos) {
  return (pos === 0) ? alphabet.length - 1 : pos - 1;
}

function getNextChar(currChar, direction) {
  var pos = alphabetMap[currChar];
  var nextPos = direction === 'up' ? getPosUp(pos) : getPosDown(pos);
  var nextChar = alphabet.charAt(nextPos);

  logger.print(currChar + ' -> ' + nextChar);
  return nextChar;
}

function cipher(str, rotation, direction, cipherTracer) {
  if (!str) return '';

  for (var i = 0; i < str.length; i++) {

    cipherTracer.wait();

    var currChar = str.charAt(i);
    if (typeof alphabetMap[currChar] === 'number') { // don't encrpt/decrypt characters not in  alphabetMap
      var r = rotation;

      logger.print('Rotating ' + currChar + ' ' + direction + ' ' + rotation + ' times');
      cipherTracer.select(i).wait();

      // perform given amount of rotations in the given direction
      while (r-- > 0) {
        currChar = getNextChar(currChar, direction);
        cipherTracer.notify(i, currChar).wait();
      }
    } else {
      logger.print('Ignore this character');
    }
    str = str.substring(0, i) + currChar + str.substring(i + 1);
    logger.print('Current result: ' + str);
  }

  return str;
}

function encrypt(str, rotation) {
  logger.print('Encrypting: ' + str);
  return cipher(str, rotation, 'up', encryptTracer);
}

function decrypt(str, rotation) {
  logger.print('Decrypting: ' + str);
  return cipher(str, rotation, 'down', decryptTracer);
}

var encrypted = encrypt(string, rotation);
logger.print('Encrypted result: ' + encrypted);

decryptTracer.set(encrypted);
var decrypted = decrypt(encrypted, rotation);
logger.print('Decrypted result: ' + decrypted);
