import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { profilePage } from '../actions/profile_actions';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FirstAchievement from './achievements/solved/FirstAchievement';
import SecondAchievement from './achievements/solved/SecondAchievement';
import ThirdAchievement from './achievements/solved/ThirdAchievement';
import FourthAchievement from './achievements/solved/FourthAchievement';
import FifthAchievement from './achievements/solved/FifthAchievement';
import SixthAchievement from './achievements/solved/SixthAchievement';
import SeventhAchievement from './achievements/solved/SeventhAchievement';
import EighthAchievement from './achievements/solved/EighthAchievement';
import NinthAchievement from './achievements/solved/NinthAchievement';
import TenthAchievement from './achievements/solved/TenthAchievement';
import EleventhAchievement from './achievements/solved/EleventhAchievement';
import TwelfthAchievement from './achievements/solved/TwelfthAchievement';
import FirstAttemptedAchievement from './achievements/attempted/FirstAttemptedAchievement';
import SecondAttemptedAchievement from './achievements/attempted/SecondAttemptedAchievement';
import ThirdAttemptedAchievement from './achievements/attempted/ThirdAttemptedAchievement';
import FourthAttemptedAchievement from './achievements/attempted/FourthAttemptedAchievement';
import FifthAttemptedAchievement from './achievements/attempted/FifthAttemptedAchievement';
import SixthAttemptedAchievement from './achievements/attempted/SixthAttemptedAchievement';
import SeventhAttemptedAchievement from './achievements/attempted/SeventhAttemptedAchievement';
import EighthAttemptedAchievement from './achievements/attempted/EighthAttemptedAchievement';
import NinthAttemptedAchievement from './achievements/attempted/NinthAttemptedAchievement';
import TenthAttemptedAchievement from './achievements/attempted/TenthAttemptedAchievement';
import EleventhAttemptedAchievement from './achievements/attempted/EleventhAttemptedAchievement';
import TwelfthAttemptedAchievement from './achievements/attempted/TwelfthAttemptedAchievement';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const UserProfile = () => {
    const classes = useStyles();

    const profile = useSelector(state => state.entities.profiles);

    const params = useParams(); // use for route params
    const [solved, setSolved] = useState([])
    const [attempted, setAttempted] = useState([])

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(profilePage(params.userId))
    }, [dispatch])

    useEffect(() => {
        const { solved_problems } = profile

        if (solved_problems >= 1) {
            setSolved([<FirstAchievement />])
        }

        if (solved_problems >=2) {
            setSolved(prevState => [...prevState, <SecondAchievement />])
        }

        if (solved_problems >=3) {
            setSolved(prevState => [...prevState, <ThirdAchievement />])
        }

        if (solved_problems >=4) {
            setSolved(prevState => [...prevState, <FourthAchievement />])
        }

        if (solved_problems >=5) {
            setSolved(prevState => [...prevState, <FifthAchievement />])
        }

        if (solved_problems >=6) {
            setSolved(prevState => [...prevState, <SixthAchievement />])
        }

        if (solved_problems >=7) {
            setSolved(prevState => [...prevState, <SeventhAchievement />])
        }

        if (solved_problems >=8) {
            setSolved(prevState => [...prevState, <EighthAchievement />])
        }

        if (solved_problems >=9) {
            setSolved(prevState => [...prevState, <NinthAchievement />])
        }

        if (solved_problems >= 10) {
            setSolved(prevState => [...prevState, <TenthAchievement />])
        }

        if (solved_problems >= 11) {
            setSolved(prevState => [...prevState, <EleventhAchievement />])
        }

        if (solved_problems >= 12) {
            setSolved(prevState => [...prevState, <TwelfthAchievement />])
        }
    }, [profile])

    function SolvedRow() {
        return (
            <React.Fragment>
                {solved.map(achievement => {
                    return (
                        <Grid item lg={2}>
                            {achievement}
                        </Grid>
                    )
                })}

            </React.Fragment>
        );
    }

    useEffect(() => {
        const { attempted_problems } = profile

        if (attempted_problems >=1) {
            setAttempted([<FirstAttemptedAchievement />])
        }

        if (attempted_problems >= 5) {
            setAttempted(prevState => [...prevState, <SecondAttemptedAchievement />])
        }

        if (attempted_problems >= 10) {
            setAttempted(prevState => [...prevState, <ThirdAttemptedAchievement />])
        }

        if (attempted_problems >= 15) {
            setAttempted(prevState => [...prevState, <FourthAttemptedAchievement />])
        }

        if (attempted_problems >= 20) {
            setAttempted(prevState => [...prevState, <FifthAttemptedAchievement />])
        }

        if (attempted_problems >= 25) {
            setAttempted(prevState => [...prevState, <SixthAttemptedAchievement />])
        }

        if (attempted_problems >= 30) {
            setAttempted(prevState => [...prevState, <SeventhAttemptedAchievement />])
        }

        if (attempted_problems >= 35) {
            setAttempted(prevState => [...prevState, <EighthAttemptedAchievement />])
        }

        if (attempted_problems >= 40) {
            setAttempted(prevState => [...prevState, <NinthAttemptedAchievement />])
        }

        if (attempted_problems >= 45) {
            setAttempted(prevState => [...prevState, <TenthAttemptedAchievement />])
        }

        if (attempted_problems >= 50) {
            setAttempted(prevState => [...prevState, <EleventhAttemptedAchievement />])
        }

        if (attempted_problems >= 55) {
            setAttempted(prevState => [...prevState, <TwelfthAttemptedAchievement />])
        }
    }, [profile])

    function AttemptedRow() {
        return (
            <React.Fragment>
                {attempted.map(achievement => {
                    return (
                        <Grid item lg={2}>
                            {achievement}
                        </Grid>
                    )
                })}

            </React.Fragment>
        );
    }

    return (
        <main>
        { profile && (
            <div className={classes.root}>
                <div style={{ textAlign: 'center' }}>
                    <h1>{profile.username}'s achievements 🏆</h1>
                    <h2>Problems Solved:</h2>
                </div>
                <Grid container spacing={1}>
                    <Grid container item lg={12} spacing={3}>
                        <SolvedRow />
                    </Grid>
                </Grid>
                <div style={{ textAlign: 'center' }}>
                    <h2>Attempts Made:</h2>
                </div>
                <Grid container spacing={1}>
                    <Grid container item lg={12} spacing={3}>
                        <AttemptedRow />
                    </Grid>
                </Grid>
                
            </div>
            )
        }
        </main>
    )
}

export default UserProfile