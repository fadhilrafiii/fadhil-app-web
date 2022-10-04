import React from 'react';

import { BsExclamationCircleFill } from '@react-icons/all-files/bs/BsExclamationCircleFill';
import { RiAddFill } from '@react-icons/all-files/ri/RiAddFill';
import { RiArrowDownSLine } from '@react-icons/all-files/ri/RiArrowDownSLine';
import { RiArrowLeftSLine } from '@react-icons/all-files/ri/RiArrowLeftSLine';
import { RiArrowRightSLine } from '@react-icons/all-files/ri/RiArrowRightSLine';
import { RiArrowUpSLine } from '@react-icons/all-files/ri/RiArrowUpSLine';
import { RiCalendarTodoFill } from '@react-icons/all-files/ri/RiCalendarTodoFill';
import { RiChat3Fill } from '@react-icons/all-files/ri/RiChat3Fill';
import { RiCloseFill } from '@react-icons/all-files/ri/RiCloseFill';
import { RiFilter2Fill } from '@react-icons/all-files/ri/RiFilter2Fill';
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
    case IconName.ArrowDown:
      return <RiArrowDownSLine size={size} fill={color} />;
    case IconName.ArrowLeft:
      return <RiArrowLeftSLine size={size} fill={color} />;
    case IconName.ArrowRight:
      return <RiArrowRightSLine size={size} fill={color} />;
    case IconName.ArrowUp:
      return <RiArrowUpSLine size={size} fill={color} />;
    case IconName.Chat:
      return <RiChat3Fill size={size} fill={color} />;
    case IconName.Close:
      return <RiCloseFill size={size} fill={color} />;
    case IconName.Exit:
      return <RiLogoutBoxLine size={size} fill={color} />;
    case IconName.Exclamation:
      return <BsExclamationCircleFill size={size} fill={color} />;
    case IconName.Filter:
      return <RiFilter2Fill size={size} fill={color} />;
    case IconName.Money:
      return <RiMoneyDollarBoxFill size={size} fill={color} />;
    case IconName.Notification:
      return <RiNotification3Fill size={size} fill={color} />;
    case IconName.Setting:
      return <RiSettings4Fill size={size} fill={color} />;
  }
};

export default Icon;
