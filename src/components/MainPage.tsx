import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { Face5, Toc, Whatshot } from '@mui/icons-material';
import Topics from './Topics';
import AboutMe from './AboutMe';
import { NavValue, useNav } from '../context/NavContext';
import ImageDisplay from './ImageDisplay';
import { describeEvents, useEventToTriggerAction } from '../event/useEventToTriggerAction';
import { CLOSE_DRAWER_EVENT, CLOSE_PAYMENT_DRAWER_EVENT, NAVIGATE_TOPICS } from '../event/events';
import Pricing from './PricingPlan';
import PaymentDrawer from '../PaymentDrawer';

export default function MainPage() {
  const [cardIndex, setCardIndex] = React.useState("");
  const { nav, setNav } = useNav();

  const renderComponent = () => {
    switch (nav) {
      case NavValue.Topics:
        return <Topics selectedCard={cardIndex} setSelectedCard={setCardIndex}/>;
      case NavValue.AboutMe:
        return <AboutMe />;
      case NavValue.Pricing:
        return <Pricing />;

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
          <BottomNavigationAction label="Topics" icon={<Toc />}/>
          <BottomNavigationAction label="Pro" icon={<Whatshot />}/>
          <BottomNavigationAction label="About Me" icon={<Face5 />}/>
        </BottomNavigation>
      </Paper>
      <ImageDisplay/>
      <PaymentDrawer/>
    </Box>
  );
}