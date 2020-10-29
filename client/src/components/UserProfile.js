import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { profilePage } from '../actions/profile_actions';

const UserProfile = () => {
    const profile = useSelector(state => state.entities.profiles);
    console.log('this is the profile: ', profile)

    const params = useParams(); // use for route params

    const dispatch = useDispatch();
    useEffect(() => {
        console.log(profilePage);
        dispatch(profilePage(params.userId))
    }, [dispatch])


    return (
        <main>
        { profile && (
            <h1>User: {profile.username}</h1>
        )
        }
        </main>
    )
}

export default UserProfile