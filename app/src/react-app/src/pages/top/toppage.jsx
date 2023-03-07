import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from "@aws-amplify/ui-react";

const TOP = () => {
    const navigate = useNavigate();
    return (
    <>
    <div>
        <Button onClick={() => navigate('/talk')}>とりあえずやってみる</Button>
    </div>
    <div>
        <Button onClick={() => navigate('/home')}>ログインしてやってみる</Button>
    </div>
    </>
    )
}

export default TOP