import ENV from './env';
import './env';
declare global  {
    namespace NodeJS {
        interface Global {
            env: ENV;
        }
    }
    interface Object {
        values: (obj: object) => string[];
    }
}
