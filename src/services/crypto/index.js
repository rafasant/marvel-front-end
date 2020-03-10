import crypto from 'crypto';

export const Key = ((crypto) => {
    const pub = {};
    const privateKey = 'c68020b7ad6b7634dd2bee70672765997f161aca';
    const publicKey = '3d19572643d5f2764ac8d2681c065cd9';
    const ts = Date.now().toString();
    const hash = crypto.createHash('md5');

    pub.publicKey = publicKey;
    pub.ts = ts;
    pub.hash = hash.update(ts + privateKey + publicKey).digest('hex');

    return pub
})(crypto);