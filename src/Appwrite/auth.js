import { Account, Client, ID } from "appwrite";
import conf from "../conf/conf.js";

export class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({email,password,name}){
        try{
            
            
            const userAccount = await this.account.create(ID.unique(),email,password,name);
                       
            
            if(userAccount){
                return this.login({email,password});
            }else{
                return userAccount
            }
            
        }catch(error){
            //throw error;
            console.log(`CreateAccountError::Auth.js::${error.message}`)
        }
    }
    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,password);
        }catch(error){
            console.log(`LoginError::Auth.js::${error.message}`)
        }
    }
    async logout(){
        try{
            return this.account.deleteSessions();
        }catch(error){
            console.log(`Log-outError::Auth.js::${error.message}`)
        }
    }
    async getCurrentLoginUser(){
        try{
            return this.account.get();
        }catch(error){  
            console.log(`getCurrentUserError::Auth.js::${error.message}`)
        }
    }

}
// console.log(`CreateAccountError::Auth.js::${error.message}`)
const authService = new AuthService();
export default authService;