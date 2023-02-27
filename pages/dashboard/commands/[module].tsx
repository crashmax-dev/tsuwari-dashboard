import { CommandsPage } from '@/features/commands'
import { DashboardLayout } from '@/layouts/dashboard'
import type {
  GetServerSideProps,
  GetStaticPaths,
  InferGetServerSidePropsType,
  PageLayoutProps
} from 'next'
import { getI18nProps } from '@/libs/i18n'

interface Props {}

const CommandsRoute: PageLayoutProps<Props> = (
  props: InferGetServerSidePropsType<typeof getStaticProps>
) => {
  return <CommandsPage />
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      {
        params: {
          module: 'custom',
          locale: 'ru'
        }
      },
      {
        params: {
          module: 'custom',
          locale: 'en'
        }
      }
    ],
    fallback: true
  }
}

export const getStaticProps: GetServerSideProps = async (ctx) => {
  return await getI18nProps(ctx, ['commands', 'layout'])
}

CommandsRoute.getLayout = (page: React.ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default CommandsRoute
