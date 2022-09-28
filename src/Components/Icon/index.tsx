import React from 'react';

import {
  RiAddFill,
  RiArrowDropDownLine,
  RiArrowDropUpLine,
  RiCalendarTodoFill,
  RiChat3Fill,
  RiLogoutBoxLine,
  RiMoneyDollarBoxFill,
  RiNotification3Fill,
  RiSettings4Fill,
} from 'react-icons/ri';

import { IconName } from 'Shared/Types/Icon';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
}

const Icon = ({ name, size = 24, color = '#fff' }: IconProps) => {
  switch (name) {
    case IconName.Add:
      return <RiAddFill size={size} fill={color} />;
    case IconName.Agenda:
      return <RiCalendarTodoFill size={size} fill={color} />;
    case IconName.ArrowDropDown:
      return <RiArrowDropDownLine size={size} fill={color} />;
    case IconName.ArrowDropUp:
      return <RiArrowDropUpLine size={size} fill={color} />;
    case IconName.Chat:
      return <RiChat3Fill size={size} fill={color} />;
    case IconName.Exit:
      return <RiLogoutBoxLine size={size} fill={color} />;
    case IconName.Money:
      return <RiMoneyDollarBoxFill size={size} fill={color} />;
    case IconName.Notification:
      return <RiNotification3Fill size={size} fill={color} />;
    case IconName.Setting:
      return <RiSettings4Fill size={size} fill={color} />;
  }
};

export default Icon;
