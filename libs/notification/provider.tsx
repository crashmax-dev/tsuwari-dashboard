import { NotificationsProvider as MantineNotifications } from '@mantine/notifications'

export const NotificationsProvider = ({
  children
}: React.PropsWithChildren) => {
  return (
    <MantineNotifications
      position="top-center"
      limit={3}
    >
      {children}
    </MantineNotifications>
  )
}
