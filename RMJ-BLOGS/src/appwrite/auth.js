import conf from "../conf/conf";

import {Client,Account,ID } from 'appwrite'

export class AuthService {
    const Client = new Client();
    Account;

    constructor(){
        this.Client
        .setEndpoint(conf.appwriteurl)
        .setProjectid(conf.projectid)
        this.Account=new Account(this.Client);

    }

async createAccount ({email, password,name}){
    try {
        const useraccount = await this.Account.create(ID.unique(),email,password,name);
        if (useraccount) {
          return  this.login({email,password});
        } else {
            return useraccount;
        }

    } catch (error) {
        throw new Error(error);
    }
}
async login({email, password}){
    try {
        return await this.Account.createEmailPasswordSession(email,password);
        
}
catch (error) {
    throw new Error(error);
}

}

async getCurentUser(){
    try {
        return await this.Account.get();
        
    } catch (error) {
        throw new Error(error);
    }
return null; 

}

async logout(){
    try {
        return await this.Account.deleteSessions();
    } catch (error) {
        throw new Error(error);
    }
}


}

const auth = new AuthService();

export default auth;