// declare module
declare module "gitkitclient" {

  //function GitKitClient(options: any): any;
  class GitKitClient{
    constructor(options:any);

    getAccountByEmail(email: any, cb: any);

    // this will download accounts until there isn't anything left to downloadAccount
    // in other words this will always run until it doesn't return anything
    // callback may be fired multiple times
    downloadAccount(pageSize: number, cb: any);


    verifyGitkitToken(token: string, cb: any);
  }

  export = GitKitClient;
}
