import { NotificationsProvider as MantineNotifications } from '@mantine/notifications'

export function NotificationsProvider({ children }: React.PropsWithChildren) {
  return <MantineNotifications>{children}</MantineNotifications>
}
