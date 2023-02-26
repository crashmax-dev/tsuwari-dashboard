import {
  cleanNotifications as clean,
  showNotification,
  updateNotification as update
} from '@mantine/notifications'
import { toUpper } from '@/utils/toUpper'
import type { NotificationProps } from '@mantine/notifications'

export const sendNotification = (
  message: string | string[],
  options?: Omit<NotificationProps, 'message'>
): void => {
  const isArray = Array.isArray(message)

  showNotification({
    ...options,
    message: (
      <span>
        {isArray ? message.map((m) => toUpper(m)).join(', ') : message}
      </span>
    )
  })
}

type INotificationProps = Omit<NotificationProps, 'title' | 'color' | 'message'>

export const infoNotification = (
  message: string | string[],
  options?: INotificationProps
): void => {
  sendNotification(message, { ...options, title: 'Info', color: 'blue' })
}

export const warnNotification = (
  message: string | string[],
  options?: INotificationProps
): void => {
  sendNotification(message, { ...options, title: 'Warning', color: 'yellow' })
}

export const errorNotification = (
  message: string | string[],
  options?: INotificationProps
): void => {
  sendNotification(message, { ...options, title: 'Error', color: 'red' })
}

export const updateNotification = (
  options: NotificationProps & { id: string }
) => {
  update(options)
}

export const cleanNotifications = () => {
  clean()
}
