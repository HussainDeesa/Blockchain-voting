// const IPFS = require('ipfs-http-client');
// const ipfs = new IPFS({host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
// export default ipfs;


const ipfsClient = require('ipfs-http-client');
// import { create } from 'ipfs-http-client'

const projectId = '2LOf3okYPtPtMKwa6X7Eeh8SX7u';
const projectSecret = '68e597d2c47714afac6363bb77dbd5cf';
const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const ipfs = ipfsClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});
// client.pin.add('QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn').then((res) => {
//     // console.log(res);
// });
export default ipfs;
