import { dashboardConfig } from '@/features/dashboard/dashboard.config'
import { DashboardPage } from '@/features/dashboard/dashboard.page'
import { DashboardLayout } from '@/layouts/dashboard'
import { getServerTranslations } from '@/libs/i18n'
import type { Page } from '@/types/next'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'

interface Props {}

const DashboardRoute: Page<Props> = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  return <DashboardPage />
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  return {
    props: {
      ...(await getServerTranslations(
        ctx.locale!,
        dashboardConfig.i18nNamespaces
      ))
    }
  }
}

DashboardRoute.getLayout = (page: React.ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default DashboardRoute
