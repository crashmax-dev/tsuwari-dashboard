import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { commandsConfig } from '@/features/commands'
import { CommandsPage } from '@/features/commands'
import { DashboardLayout } from '@/layouts/dashboard'
import { getCookie } from '@/libs/cookie'
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  PageLayoutProps
} from 'next'

interface Props {}

const CommandsRoute: PageLayoutProps<Props> = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return <CommandsPage />
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  return {
    props: {
      apiKey: getCookie('api_key', ctx),
      ...(await serverSideTranslations(
        ctx.locale!,
        commandsConfig.i18nNamespaces
      ))
    }
  }
}

CommandsRoute.getLayout = (page: React.ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default CommandsRoute
