export class User {
    constructor(
        public userid: string,
        public password: string,
        public phone?: string,
        public teacher?: string,
        public isadmin?: boolean) {}
}