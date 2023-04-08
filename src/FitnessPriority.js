import React from "react";

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const marks = [
  {
    value: 1,
    label: 'low',
  },
  {
    value: 5,
    label: 'moderate',
  },
  {
    value: 9,
    label: 'high',
  }
];


function FitnessPriority({ userFitnessPriority, setUserFitnessPriority }) {
  const onChangeHandler = ({ target: { name, value } }) => {
    setUserFitnessPriority((prevState) => {
      return {
        ...prevState,
        [name]: value
      };
    });
  }
  return (
    <Box>
      <Typography variant="h5" component="div" gutterBottom>
        {"Set Fitness Priorities"}
      </Typography>
      <Table>
        {
          Object.keys(userFitnessPriority).map((currentfitness_key, index) => {
            return (
              <TableRow
                key={index}
              >
                <TableCell sx={{ width: 30 }}>
                  {currentfitness_key}
                </TableCell>
                <TableCell>
                  <Box sx={{ width: 180 }}>
                    <Slider
                      track="inverted"
                      aria-label="Custom marks"
                      defaultValue={5}
                      step={4}
                      valueLabelDisplay="off"
                      marks={marks}
                      min={1}
                      max={9}
                      value={userFitnessPriority[currentfitness_key] || 5}
                      name={currentfitness_key}
                      onChange={onChangeHandler}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            );
          }
          )
        }
      </Table>
    </Box>
  );
}

export default FitnessPriority;