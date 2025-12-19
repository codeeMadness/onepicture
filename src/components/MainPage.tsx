import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { Face5, Feedback, Toc } from '@mui/icons-material';
import Topics from './Topics';
import AboutMe from './AboutMe';
import Feedbacks from './Feedbacks';
import { useNav } from '../context/NavContext';

export default function MainPage() {
  const [cardIndex, setCardIndex] = React.useState("");
  const { nav, setNav } = useNav();

  const renderComponent = () => {
    switch (nav) {
      case "topics":
        return <Topics selectedCard={cardIndex} setSelectedCard={setCardIndex}/>; // Render the Topic component
      // case 1:
      //   return <Review />; // Render the Topic component
      case "about":
        return <AboutMe />; // Render the AboutMe component
      case "feedback":
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
          value={nav}
          onChange={(_event, newValue) => {
            setNav(newValue);
            if (newValue === 0) {
              setCardIndex(""); // Reset cardIndex when navigating to Topics
            }

          }}
        >
          <BottomNavigationAction label="Topics" icon={<Toc />} value="topics"/>
          {/* <BottomNavigationAction label="Review" icon={<Bolt />} /> */}
          <BottomNavigationAction label="About Me" icon={<Face5 />} value="about"/>
          <BottomNavigationAction label="Feedback" icon={<Feedback />} value="feedback"/>
        </BottomNavigation>
      </Paper>
    </Box>
  );
}