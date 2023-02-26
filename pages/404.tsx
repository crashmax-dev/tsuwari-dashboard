import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { Anchor, Flex, Modal, Text } from '@mantine/core'
import type { GetServerSideProps } from 'next'

const Custom404 = () => {
  const { t } = useTranslation(['layout'])
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
        <Text size="lg">{t('layout:error.title')}</Text>
        <Anchor
          href="/"
          onClick={(event) => {
            event.preventDefault()
            router.push('/')
          }}
        >
          {t('layout:error.leave')}
        </Anchor>
      </Flex>
    </Modal>
  )
}

export const getStaticProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale!, ['layout']))
    }
  }
}

export default Custom404
