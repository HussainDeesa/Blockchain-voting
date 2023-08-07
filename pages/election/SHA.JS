

const crypto = require('crypto');
const secret = 'abcfg';
let hash = crypto.createHash('sha256', secret)
                   .update('123456789012-06-2001100020003000')
                   .digest('hex');
console.log(hash);
const salt = "10pqxls38849sncoqukslp389enxk89s";
let j = 0;
const hashArray = hash.split(""); 
for (let i = 1; i < hashArray.length; i += 2) {
  hashArray[i] = salt[j];
  j++;
}
const modifiedHash = hashArray.join(""); 
console.log(modifiedHash);
let finalhash = crypto.createHash('sha256', secret)
                   .update(modifiedHash)
                   .digest('hex');
console.log(finalhash);
