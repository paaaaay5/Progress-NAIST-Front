import React from 'react'
import { useNavigate } from 'react-router-dom';
import {useAuthenticator, Button} from "@aws-amplify/ui-react";

const HOME = () => {
    const {signOut,user} = useAuthenticator((context) => [
        context.user,
        context.signOut,
    ]);
    const navigate = useNavigate();

    return (
    <>
        <h1>HOME</h1>
        <h2>ようこそ{user.username}さん</h2>
        <Button onClick={() => navigate('/torophy')}>実績</Button>
        <div>
            <Button onClick={() => navigate('/talk',{level:0})}>イージー</Button>
            <Button onClick={() => navigate('/talk',{level:1})}>ノーマル</Button>
            <Button onClick={() => navigate('/talk',{level:2})}>ハード</Button>
        </div>
        <Button onClick={signOut}>サインアウト</Button>
    </>
    )
}
export default HOME