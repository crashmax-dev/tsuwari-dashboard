import { CommandsPage } from '@/features/commands'
import { getI18nProps } from '@/libs/i18n'
import type { GetStaticPaths, GetStaticProps, InferGetServerSidePropsType } from 'next'

interface Props {}

export default function CommandsRoute(
  props: InferGetServerSidePropsType<typeof getStaticProps>
) {
  return <CommandsPage />
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      {
        locale: 'ru',
        params: {
          module: 'custom'
        },
      },
      {
        locale: 'en',
        params: {
          module: 'custom'
        }
      }
    ],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  return {
    props: {
      ...(await getI18nProps(ctx, ['commands']))
    }
  }
}
