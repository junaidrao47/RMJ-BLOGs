import conf from "../conf/conf";

import {Client,Databases,ID,Query,Storage } from 'appwrite'

export class Service{

client = new Client();
Databases;
bucket;

constructor(){
    this.client
        .setEndpoint(conf.appwriteurl)
        .setProjectid(conf.projectid)
        this.Databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
}
async createPost({title,slug,content,uniqueId,images,status}){

    try {
        return await this.Databases.createDocument(
            conf.appwritedatabaseid,
            conf.appwritecollectionid,
            {
                title,
                content,
                uniqueId,
                images,
                status
            }
        )
    } catch (error) {
        throw new Error(error);
    }
}
async updatePost(slug,{title,content,images,status}){

    try {
        return await this.Databases.updateDocument(
            conf.appwritedatabaseid,
            conf.appwritecollectionid,
            slug,
            {
                title,
                content,
                images,
                status
            }
        )
    } catch (error) {
        throw new Error(error);
    }   
}
async deletePost({slug}){
    try {
         await this.Databases.deleteDocument(
            conf.appwritedatabaseid,
            conf.appwritecollectionid,
            slug
        )
        return true;    
    } catch (error) {
        console.log('Error Appwrite :: deleting Document', error);
    }

}
async getPost({slug}){
    try {
      return  await this.Databases.getDocument(
            conf.appwritedatabaseid,
            conf.appwritecollectionid,
            slug
        )

    } catch (error) {
        console.log('Error Appwrite :: getting Document', error);
    }
}

async getPosts(queries = [Query.equal("status","active")]){
    try {
        return await this.Databases.listDocuments(
            conf.appwritedatabaseid,
            conf.appwritecollectionid,
            queries,
            
        )
    } catch (error) {
     console.log('Error Appwrite :: getting Documents', error);
     return false;   
    }



}

//file upload service
async uploadFile(file){

    try {
        return await this.bucket.createFile(
            conf.appwritebucketid,
            ID.unique(),
            file,
        );

    } catch (error) {
        console.log('Error Upload File', error);
        
    }
}
async deleteFile(fileId){
    try {
        return await this.bucket.deleteFile(
            conf.appwritebucketid,
            fileId,
        );
    } catch (error) {
        console.log('Error Delete File', error);
        return false;
    }
}

getFilePreview(fileId){
    return  this.bucket.getFilePreview(
        conf.appwritebucketid,
        fileId,
    );
}




}

const service = new Service();
export default service


