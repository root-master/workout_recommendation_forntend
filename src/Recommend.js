import React, { useState } from "react";
import FitnessPriority from "./FitnessPriority";
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";

const initialFitnessPriority = {
  strength: 5,
  // flexibility: 5,
  mobility: 5,
  // endurance: 5,
  cardio: 5,
  agility: 5,
  // stability: 5,
  // core: 5,
}

const workoutRecommendationURL = "https://fathomless-gorge-70191.herokuapp.com/recommend_workout"
function Recommend() {
  const [userFitnessPriority, setUserFitnessPriority] = useState(initialFitnessPriority);
  const [view, setView] = useState("goals");
  const [workout, setWorkout] = useState("");
  console.log(userFitnessPriority);

  const handleRecommendButtonClick = async (e) => {
    e.preventDefault();
    console.log(userFitnessPriority);
    try {
        axios({
            url: workoutRecommendationURL,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: userFitnessPriority,
        }).then((res) => {
            console.log(res);
            setWorkout(res.data)
            setView("recommendation")
        });

    } catch ({
        response: {
            data: { error },
        },
    }) {
      console.log(error);

    }
}

  const handleGoalsButtonClick = () => {
    setView("goals")
  }

  return (
    <Container
      sx={{
        width: '100%', '& > :not(style)':
          { m: 2, width: '35ch' },
      }}>
      {view === "goals" &&
        <FitnessPriority
          userFitnessPriority={userFitnessPriority}
          setUserFitnessPriority={setUserFitnessPriority}
        />
      }
      {view === "recommendation" &&
      <>
        <Typography variant="h1" component="h2">
          {workout}
        </Typography>
        {/* <Typography variant="h2" component="h2">
          20 Mins
        </Typography> */}
        </>
      }

      <Stack spacing={1} direction="row" justifyContent={"center"}>
        {
          <Button variant="outlined" onClick={handleRecommendButtonClick}>Recommend</Button>
        }
        {view === "recommendation" &&
          <Button variant="outlined" onClick={handleGoalsButtonClick}>Goals</Button>
        }
      </Stack>

    </Container>
  );
}

export default Recommend;