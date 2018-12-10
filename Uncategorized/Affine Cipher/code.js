import { Array1DTracer, LogTracer } from 'algorithm-visualizer';

const plainText = 'secret';
const ptTracer = new Array1DTracer('Encryption');
const ctTracer = new Array1DTracer('Decryption');
const logger = new LogTracer();

ptTracer.set(plainText).delay();

/*
 code assumes that plainText contains ONLY LOWER CASE ALPHABETS
 */

Number.prototype.mod = function (n) {
  return ((this % n) + n) % n;
};

const keys = { a: 5, b: 7 };
const N = 26;

function encrypt(plainText) {
  let cypherText = '';

  function cryptAlpha(alpha) {
    const index = alpha.charCodeAt(0) - 'a'.charCodeAt(0);
    let result = ((keys.a * index) + keys.b).mod(N);

    logger.print(`Index of ${alpha} = ${index}`);

    result += 'a'.charCodeAt(0);
    return String.fromCharCode(result);
  }

  logger.print('Beginning Affine Encryption');
  logger.print('Encryption formula: <b>((keys.a * indexOfAlphabet) + keys.b) % N</b>');
  logger.print(`keys.a=${keys.a}, keys.b=${keys.b}, N=${N}`);

  for (const i in plainText) {
    ptTracer.select(i).delay();
    ptTracer.deselect(i);

    cypherText += cryptAlpha(plainText[i]);

    ptTracer.patch(i, cypherText.slice(-1)).delay();
    ptTracer.depatch(i);
  }

  return cypherText;
}

function decrypt(cypherText) {
  let plainText = '';
  const aInverse = ((() => {
    for (let i = 1; i < N; i++) {
      if (((keys.a * i).mod(N)) === 1) {
        return i;
      }
    }
  })());

  logger.print(`a<sup>-1</sup> = ${aInverse}`);

  function decryptAlpha(alpha) {
    const index = alpha.charCodeAt(0) - 'a'.charCodeAt(0);
    let result = (aInverse * (index - keys.b)).mod(N);

    logger.print(`Index of ${alpha} = ${index}`);

    result += 'a'.charCodeAt(0);
    return String.fromCharCode(result);
  }

  logger.print('Beginning Affine Decryption');
  logger.print('Decryption formula: <b>(a<sup>-1</sup> * (index - keys.b)) % N</b>');
  logger.print(`keys.b=${keys.b}, N=${N}`);

  for (const i in cypherText) {
    ctTracer.select(i).delay();
    ctTracer.deselect(i).delay();

    plainText += decryptAlpha(cypherText[i]);

    ctTracer.patch(i, plainText.slice(-1)).delay();
    ctTracer.depatch(i).delay();
  }

  return plainText;
}

const cipherText = encrypt(plainText);
ctTracer.set(cipherText);
decrypt(cipherText);
