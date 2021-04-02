import React from 'react';
import Timbre from './Timbre';
import Vocoder from './Vocoder';
import Effects from './Effects';
import Arpeggio from './Arpeggio';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useSelector } from 'react-redux';

export default function TimbreSwitcher() {
  const index = useSelector((state) => state.parameters.tabIndex);
  return (
    <div>
      <Tabs selectedIndex={index} onSelect={() => {}}>
        <TabList>
          <Tab>Timbre 1</Tab>
          <Tab>Timbre 2</Tab>
          <Tab>Vocoder</Tab>
          <Tab>Effects</Tab>
          <Tab>Arpeggio</Tab>
        </TabList>

        <TabPanel>
          <Timbre id='timbre1' />
        </TabPanel>
        <TabPanel>
          <Timbre id='timbre2' />
        </TabPanel>
        <TabPanel>
          <Vocoder id='vocoder' />
        </TabPanel>
        <TabPanel>
          <Effects id='effects' />
        </TabPanel>
        <TabPanel>
          <Arpeggio id='arpeggio' />
        </TabPanel>
      </Tabs>
    </div>
  );
}
