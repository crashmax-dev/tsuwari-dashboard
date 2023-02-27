import { useI18n } from 'next-rosetta'
import { useRouter } from 'next/router'
import { Anchor, Flex, Modal, Text } from '@mantine/core'
import { DashboardConfig } from '@/features/dashboard'
import { getI18nProps } from '@/libs/i18n'
import type { GetServerSideProps } from 'next'

const Custom404 = () => {
  const { t } = useI18n()
  const router = useRouter()

  return (
    <Modal
      centered
      opened
      withCloseButton={false}
      onClose={() => {}}
    >
      <Flex
        justify="center"
        align="center"
        direction="column"
      >
        <Text size="lg">{t('layout.error.title')}</Text>
        <Anchor
          href="/"
          onClick={(event) => {
            event.preventDefault()
            router.push('/dashboard')
          }}
        >
          {t('layout.error.leave')}
        </Anchor>
      </Flex>
    </Modal>
  )
}

export const getStaticProps: GetServerSideProps = async (ctx) => {
  return await getI18nProps(ctx, ['dashboard', 'layout'])
}

export default Custom404
