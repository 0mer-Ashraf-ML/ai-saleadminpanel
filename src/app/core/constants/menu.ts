import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Admin',
      separator: false,
      items: [
        {
          // icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Dashboard',
          route: '/dashboard/admin',
          icon: 'assets/icons/heroicons/outline/dashboard.svg', 
          // children: [
          //   { label: 'Nfts', route: '/dashboard/nfts' },
          //   // { label: 'Podcast', route: '/dashboard/podcast' },
          // ],
        },
        { label: 'Tasks', route: '/components/tasks', icon: 'assets/icons/heroicons/outline/tasks.svg', },
        { label: 'Users', route: '/components/users', icon: 'assets/icons/heroicons/outline/users.svg' },
        { label: 'Projects', route: '/components/projects', icon: 'assets/icons/heroicons/outline/projects.svg' },
        { label: 'Leads', route: '/components/leads', icon: 'assets/icons/heroicons/outline/leads.svg' },
        { label: 'Payment', route: '/components/payments', icon: 'assets/icons/heroicons/outline/payment.svg' },
        { label: 'Notification', route: '/components/notifications', icon: 'assets/icons/heroicons/outline/notification.svg' },
        { label: 'Team', route: '/components/teams', icon: 'assets/icons/heroicons/outline/team.svg' },
    //     {
    //       icon: 'assets/icons/heroicons/outline/lock-closed.svg',
    //       label: 'Auth',
    //       route: '/auth',
    //       children: [
    //         { label: 'Sign up', route: '/auth/sign-up' },
    //         { label: 'Sign in', route: '/auth/sign-in' },
    //         { label: 'Forgot Password', route: '/auth/forgot-password' },
    //         { label: 'New Password', route: '/auth/new-password' },
    //         { label: 'Two Steps', route: '/auth/two-steps' },
    //       ],
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/exclamation-triangle.svg',
    //       label: 'Errors',
    //       route: '/errors',
    //       children: [
    //         { label: '404', route: '/errors/404' },
    //         { label: '500', route: '/errors/500' },
    //       ],
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/cube.svg',
    //       label: 'Components',
    //       route: '/components',
    //       children: [{ label: 'Table', route: '/components/table' }],
    //     },
    //   ],
    // },
    // {
    //   group: 'Collaboration',
    //   separator: true,
    //   items: [
    //     {
    //       icon: 'assets/icons/heroicons/outline/download.svg',
    //       label: 'Download',
    //       route: '/download',
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/gift.svg',
    //       label: 'Gift Card',
    //       route: '/gift',
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/users.svg',
    //       label: 'Users',
    //       route: '/users',
    //     },
    //   ],
    // },
    // {
    //   group: 'Config',
    //   separator: false,
    //   items: [
    //     {
    //       icon: 'assets/icons/heroicons/outline/cog.svg',
    //       label: 'Settings',
    //       route: '/settings',
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/bell.svg',
    //       label: 'Notifications',
    //       route: '/gift',
    //     },
    //     {
    //       icon: 'assets/icons/heroicons/outline/folder.svg',
    //       label: 'Folders',
    //       route: '/folders',
    //       children: [
    //         { label: 'Current Files', route: '/folders/current-files' },
    //         { label: 'Downloads', route: '/folders/download' },
    //         { label: 'Trash', route: '/folders/trash' },
    //       ],
    //     },
      ],
    },
  ];
}
