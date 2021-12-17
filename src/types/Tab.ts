import React from 'react';

export interface ITabPanel {
  children?: React.ReactNode,
  index: number,
  value: number
}

export interface ITab {
  id: number,
  name: string,
  subTabs: ISubTab[]
}

export interface ISubTab {
  name: string,
  url: string,
  icon: React.ReactNode,
  selected: boolean
}
 