import AWS from "aws-sdk";

const s3 = new AWS.S3();

const uploadToStorage = async (file: File, key: string, prevUrl?: string) => {
    const bucketName = 'diary-plus-storage';

    // Delete if exists previous file
    if(prevUrl) {
        const checkParams = {
            Bucket: bucketName,
            Key: prevUrl,
        };

        try {
            await s3.deleteObject(checkParams).promise();
        } catch (e) {
            console.error('Error deleting existing file:', e);
            throw e;
        }
    }

    const uploadParams = {
        Bucket: bucketName,
        Key: key,
        Body: file,
        ContentType: file.type,
        ACL: 'public-read',
    };

    try {
        const data = await s3.upload(uploadParams).promise();
        console.log('File uploaded successfully:', data.Location);
        return data.Location;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};

export default uploadToStorage;