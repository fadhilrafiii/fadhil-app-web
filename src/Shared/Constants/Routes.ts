import { IconName } from 'Shared/Types/Icon';
import { RouteType } from 'Shared/Types/Route';

export const HIDE_SIDEBAR_ROUTES: string[] = ['/', '/register'];
export const HIDE_NAVBAR_ROUTES: string[] = ['/', '/register'];

export const ROUTES: RouteType[] = [
  {
    path: '/to-do',
    name: 'To Do',
    icon: IconName.Agenda,
  },
  {
    path: '/finance',
    name: 'Finance',
    icon: IconName.Money,
  },
  {
    path: '/chats',
    name: 'Chats',
    icon: IconName.Chat,
  },
];
