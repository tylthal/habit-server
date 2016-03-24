// declare module
declare module "gitkitclient" {

  //function GitKitClient(options: any): any;
  class GitKitClient{
    constructor(options:any);

    getAccountByEmail(email: any, cb: any): any;
  }

  export = GitKitClient;
}
