import React from 'react';
import Timbre from './Timbre';
import Vocoder from './Vocoder';
import Effects from './Effects';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styles from './Timbre.module.css';

export default function TimbreSwitcher(props) {
  return (
    <div className={styles.tabs}>
      <Tabs
        className={styles.tabs}
        defaultIndex="0"
        selectedTabClassName={styles.selected}
        selectedTabPanelClassName={styles.tabPanel}
      >
        <TabList className={styles.tabList}>
          <Tab className={styles.tab}>Timbre 1</Tab>
          <Tab className={styles.tab}>Timbre 2</Tab>
          <Tab className={styles.tab}>Vocoder</Tab>
          <Tab className={styles.tab}>Effects</Tab>
          <Tab className={styles.tab}>Arpeggio</Tab>
        </TabList>

        <TabPanel>
          <Timbre id="timbre1" />
        </TabPanel>
        <TabPanel>
          <Timbre id="timbre2" />
        </TabPanel>
        <TabPanel>
          <Vocoder id="vocoder" />
        </TabPanel>
        <TabPanel>
          <Effects id="effects" />
        </TabPanel>
      </Tabs>
    </div>
  );
}
