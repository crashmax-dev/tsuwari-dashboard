import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { commandsConfig } from '@/features/dashboard/commands'
import { CommandsPage } from '@/features/dashboard/commands'
import { DashboardLayout } from '@/layouts/dashboard'
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  PageLayoutProps
} from 'next'

interface Props {}

const CustomCommandsRoute: PageLayoutProps<Props> = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return <CommandsPage />
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  // TODO: prefetching data
  const commandsModule = ctx.query.module as string

  return {
    props: {
      ...(await serverSideTranslations(
        ctx.locale!,
        commandsConfig.i18nNamespaces
      ))
    }
  }
}

CustomCommandsRoute.getLayout = (page: React.ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default CustomCommandsRoute
