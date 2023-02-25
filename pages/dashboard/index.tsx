import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { dashboardConfig } from '@/features/dashboard'
import { DashboardPage } from '@/features/dashboard'
import { DashboardLayout } from '@/layouts/dashboard'
import type { PageLayoutProps } from 'next'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'

interface Props {}

const DashboardRoute: PageLayoutProps<Props> = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  return <DashboardPage />
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(
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
