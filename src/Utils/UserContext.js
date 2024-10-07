import { createContext } from 'react';

const UserContext = createContext({
    userId: null,   // 로그인된 사용자의 ID
    token: null,    // 로그인한 사용자의 Access Token
});

export default UserContext;
