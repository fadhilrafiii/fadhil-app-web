import React from 'react';

import { BsExclamationCircleFill } from '@react-icons/all-files/bs/BsExclamationCircleFill';
import { RiAddFill } from '@react-icons/all-files/ri/RiAddFill';
import { RiArrowDropDownLine } from '@react-icons/all-files/ri/RiArrowDropDownLine';
import { RiArrowDropUpLine } from '@react-icons/all-files/ri/RiArrowDropUpLine';
import { RiCalendarTodoFill } from '@react-icons/all-files/ri/RiCalendarTodoFill';
import { RiChat3Fill } from '@react-icons/all-files/ri/RiChat3Fill';
import { RiCloseFill } from '@react-icons/all-files/ri/RiCloseFill';
import { RiLogoutBoxLine } from '@react-icons/all-files/ri/RiLogoutBoxLine';
import { RiMoneyDollarBoxFill } from '@react-icons/all-files/ri/RiMoneyDollarBoxFill';
import { RiNotification3Fill } from '@react-icons/all-files/ri/RiNotification3Fill';
import { RiSettings4Fill } from '@react-icons/all-files/ri/RiSettings4Fill';

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
    case IconName.Close:
      return <RiCloseFill size={size} fill={color} />;
    case IconName.Exit:
      return <RiLogoutBoxLine size={size} fill={color} />;
    case IconName.Exclamation:
      return <BsExclamationCircleFill size={size} fill={color} />;
    case IconName.Money:
      return <RiMoneyDollarBoxFill size={size} fill={color} />;
    case IconName.Notification:
      return <RiNotification3Fill size={size} fill={color} />;
    case IconName.Setting:
      return <RiSettings4Fill size={size} fill={color} />;
  }
};

export default Icon;
