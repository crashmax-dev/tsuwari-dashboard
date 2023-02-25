import { showNotification } from '@mantine/notifications'
import { toUpper } from '@/utils/toUpper'
import type { NotificationProps } from '@mantine/notifications'

export const sendNotification = (
  message: string | string[],
  options: NotificationProps
): void => {
  const isArray = Array.isArray(message)

  showNotification({
    ...options,
    message: (
      <div>{isArray ? message.map((m) => toUpper(m)).join(', ') : message}</div>
    )
  })
}

type INotificationProps = Omit<NotificationProps, 'title' | 'color'>

export const infoNotification = (
  message: string | string[],
  options: INotificationProps
): void => {
  sendNotification(message, { ...options, title: 'Info', color: 'blue' })
}

export const warnNotification = (
  message: string | string[],
  options: INotificationProps
): void => {
  sendNotification(message, { ...options, title: 'Warning', color: 'yellow' })
}

export const errorNotification = (
  message: string | string[],
  options: INotificationProps
): void => {
  sendNotification(message, { ...options, title: 'Error', color: 'red' })
}
