import AWS from "aws-sdk";

const s3 = new AWS.S3();

const getFromStorage = async (key: string) => {
    const params = {
        Bucket: 'diary-plus-storage',
        Key: `uploads/${key}`,
        Expires: 60 * 5,
    };

    try {
        const url = await s3.getSignedUrlPromise('getObject', params);
        console.log('Signed URL:', url);
        return url;
    } catch (error) {
        console.error('Error generating signed URL:', error);
        throw error;
    }
}

export default getFromStorage;