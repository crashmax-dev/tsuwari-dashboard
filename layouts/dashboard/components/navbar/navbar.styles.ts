import { createStyles } from '@mantine/core'

export const useNavbarStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%'
  },
  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none'
    }
  },
  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none'
    }
  }
}))
