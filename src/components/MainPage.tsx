import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { RocketLaunch, VolunteerActivism } from '@mui/icons-material';
import Topics from './Topics';
import { NavValue, useNav } from '../context/NavContext';
import ImageDrawer from './ImageDrawer';
import { describeEvents, useEventToTriggerAction } from '../event/useEventToTriggerAction';
import { CLOSE_DRAWER_EVENT, CLOSE_PAYMENT_DRAWER_EVENT, NAVIGATE_TOPICS } from '../event/events';
import PaymentDrawer from '../PaymentDrawer';
import DonationPage from './DonationPage';

export default function MainPage() {
  const [cardIndex, setCardIndex] = React.useState("");
  const { nav, setNav } = useNav();

  const renderComponent = () => {
    switch (nav) {
      case NavValue.Topics:
        return <Topics selectedCard={cardIndex} setSelectedCard={setCardIndex}/>;
      case NavValue.Donation:
        return <DonationPage />;
      // case NavValue.AboutMe:
      //   return <AboutAuthor />;

      default:
        return null;
    }
  };

  useEventToTriggerAction({
    events: [NAVIGATE_TOPICS],
    triggerFn: () => {
      navigateTo(NavValue.Topics);
    }
  })

  const navigateTo = React.useCallback((nextNav: NavValue) => {
    setNav(nextNav);

    if (nextNav === NavValue.Topics) {
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
            describeEvents([new Event(CLOSE_DRAWER_EVENT), new Event(CLOSE_PAYMENT_DRAWER_EVENT)]);
          }}
        >
          <BottomNavigationAction label="Review?" icon={<RocketLaunch />}/>
          <BottomNavigationAction label="Support This" icon={<VolunteerActivism />}/>
          {/* <BottomNavigationAction label="About Me" icon={<Face5 />}/> */}
        </BottomNavigation>
      </Paper>
      <ImageDrawer/>
      <PaymentDrawer/>
    </Box>
  );
}