import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { Face5, Feedback, Timer10Select, Toc } from '@mui/icons-material';
import Topics from './Topics';
import AboutMe from './AboutMe';
import Feedbacks from './Feedbacks';
import Review from './Review';

export default function MainPage() {
  const [value, setValue] = React.useState(0);
  const [cardIndex, setCardIndex] = React.useState(-1);

  const renderComponent = () => {
    switch (value) {
      case 0:
        return <Topics selectedCard={cardIndex} setSelectedCard={setCardIndex}/>; // Render the Topic component
      case 1:
        return <Review />; // Render the Topic component
      case 2:
        return <AboutMe />; // Render the AboutMe component
      case 3:
        return <Feedbacks />; // Render the Feedback component
      default:
        return null;
    }
  };

  return (
    <Box sx={{ pb: 7}}>
      {renderComponent()}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(_event, newValue) => {
            setValue(newValue);
            if (newValue === 0) {
              setCardIndex(-1); // Reset cardIndex when navigating to Topics
            }

          }}
        >
          <BottomNavigationAction label="Topics" icon={<Toc />} />
          <BottomNavigationAction label="Review" icon={<Timer10Select />} />
          <BottomNavigationAction label="About Me" icon={<Face5 />} />
          <BottomNavigationAction label="Feedback" icon={<Feedback />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}