import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf";

export class Service{
    client=new Client();
    database;
    bucket; // STORAGE
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({slug,title,content,featuredImage,status,userID}){
        try{
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    userID,
                    status
                }

            )
        }catch(error){
            console.log(`CreatePostError::config.js::${error.message}`);
            
        }
    }
    async deletePost(slug){
        try{
            return await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        }catch(error){
            console.log(`DeletePostError::config.js::${error.message}`);
            
        }
    }
    async getPost(slug){
        try{
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug

            )
        }catch(error){
            console.log(`GetPostError::config.js::${error.message}`);
        }
    }
    async getAllPost(queries = [Query.equal("status","active")]){
        try{
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,  
                queries
                
            )
        }catch(error){
            console.log(`GetAllPostError::config.js::${error.message}`);
        }
    }
    async updatePost(slug,{title,content,featuredImage,status}){
        try{
            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        }catch(error){
            console.log(`UpdatePostError::config.js::${error.message}`);
            
        }

    }
    // FILE BUCKET SERVICES
    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        }catch(error){
            console.log(`UploadFileError::config.js::${error.message}`);
            
        }
    }

    async deleteFile(fileId){
        try{
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        }catch(error){
            console.log(`DeleteFileError::config.js::${error.message}`);
            
        }
    }
    async getFilePreview(fileId){
        try{
            return await this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId,

            )
        }catch(error){
            console.log(`GetFilePreviewError::config.js::${error.message}`);
            
        }
    }
}

const appwriteService = new Service();

export default appwriteService