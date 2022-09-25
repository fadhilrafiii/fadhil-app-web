import { IconName } from 'Shared/Types/Icon';
import { RouteType } from 'Shared/Types/Route';

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
