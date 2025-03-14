
import md5 from 'md5';

export const generateMd5Hash = (value) => {
    return md5(value);
};
