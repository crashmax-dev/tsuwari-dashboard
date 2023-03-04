import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { Anchor, Flex, Modal, Text } from '@mantine/core'
import { getI18nProps } from '@/libs/i18n'
import type { GetStaticProps } from 'next'

export default function Custom404() {
  const t = useTranslations('layout')
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
        <Text size="lg">{t('error.title')}</Text>
        <Anchor
          href="/"
          onClick={(event) => {
            event.preventDefault()
            router.push('/dashboard')
          }}
        >
          {t('error.leave')}
        </Anchor>
      </Flex>
    </Modal>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {
      ...(await getI18nProps(ctx, ['dashboard']))
    }
  }
}
