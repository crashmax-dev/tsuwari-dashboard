import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { LoadingOverlay, Modal, PasswordInput } from '@mantine/core'
import { IconKey } from '@tabler/icons'
import { useAtom } from 'jotai'
import { apiKeyAtom, useProfile } from '@/hooks/useProfile'
import { getCookie, setCookie } from '@/libs/cookie'
import { infoNotification } from '@/libs/notification'
import type { GetServerSideProps } from 'next'

const IndexRoute = () => {
  const router = useRouter()
  const [apiKey, setApiKey] = useAtom(apiKeyAtom)
  const { profile } = useProfile()
  const { t } = useTranslation(['layout'])

  useEffect(() => {
    if (profile.state === 'hasData' && profile.data?.apiKey === apiKey) {
      infoNotification(
        t('layout:dev.api_key_valid', { user: profile.data.display_name })
      )
      setCookie('api_key', apiKey)
      setCookie('dashboard_id', profile.data.id)
      router.push('/dashboard')
    }
  }, [profile])

  return (
    <Modal
      centered
      opened
      withCloseButton={false}
      onClose={() => {}}
      title={t('layout:dev.api_key')}
      radius="sm"
    >
      <LoadingOverlay
        radius="sm"
        overlayBlur={1}
        visible={profile.state === 'loading'}
      />
      <form
        onSubmit={(event) => {
          event.preventDefault()
          const formData = new FormData(event.currentTarget)
          setApiKey(formData.get('apiKey') as string)
        }}
      >
        <PasswordInput
          defaultValue={apiKey}
          name="apiKey"
          icon={<IconKey size={16} />}
          placeholder="1df382be-4ff6-43c8-b613-3ddd3c2411cb"
          size="md"
        />
      </form>
    </Modal>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      apiKey: getCookie('api_key', ctx),
      ...(await serverSideTranslations(ctx.locale!, ['layout']))
    }
  }
}

export default IndexRoute
