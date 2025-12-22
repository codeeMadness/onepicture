import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { Face5, Toc } from '@mui/icons-material';
import Topics from './Topics';
import AboutMe from './AboutMe';
import { NavValue, useNav } from '../context/NavContext';
import ImageDisplay from './ImageDisplay';
import { useEventToTriggerAction } from '../event/useEventToTriggerAction';
import { NAVIGATE_TOPICS } from '../event/events';

export default function MainPage() {
  const [cardIndex, setCardIndex] = React.useState("");
  const { nav, setNav } = useNav();

  const renderComponent = () => {
    switch (nav) {
      case 0:
        return <Topics selectedCard={cardIndex} setSelectedCard={setCardIndex}/>; // Render the Topic component
      // case 1:
      //   return <Review />; // Render the Topic component
      case 1:
        return <AboutMe />; // Render the AboutMe component

      default:
        return null;
    }
  };

  useEventToTriggerAction({
    events: [NAVIGATE_TOPICS],
    triggerFn: () => {
      navigateTo(0);
    }
  })

  const navigateTo = React.useCallback((nextNav: NavValue) => {
    setNav(nextNav);

    if (nextNav === 0) {
      setCardIndex(""); // always reset when going to Topics
    }
  }, [setNav]);

  return (
    <Box sx={{ pb: 7}}>
      {renderComponent()}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={nav}
          onChange={(_event, newValue) => {
            navigateTo(newValue);
          }}
        >
          <BottomNavigationAction label="Topics" icon={<Toc />}/>
          {/* <BottomNavigationAction label="Review" icon={<Bolt />} /> */}
          <BottomNavigationAction label="About Me" icon={<Face5 />}/>
        </BottomNavigation>
      </Paper>
      <ImageDisplay/>
    </Box>
  );
}