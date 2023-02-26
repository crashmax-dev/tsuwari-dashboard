import { Avatar, Loader, Menu } from '@mantine/core'
import { IconLogout } from '@tabler/icons'
import { useProfile } from '@/hooks/useProfile'

export const Profile = () => {
  const { profile, logout } = useProfile()

  if (profile.state === 'loading' || profile.state === 'hasError') {
    return <Loader />
  }

  return (
    <Menu
      transition="pop"
      shadow="md"
      withArrow
      width={200}
    >
      <Menu.Target>
        <Avatar
          size={34}
          radius="xs"
          style={{ cursor: 'pointer' }}
          src={profile.data?.profile_image_url}
          alt={profile.data?.display_name}
        />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Logged in as {profile.data?.display_name}</Menu.Label>
        <Menu.Divider />
        <Menu.Item
          color="red"
          icon={<IconLogout size={14} />}
          onClick={() => logout()}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
