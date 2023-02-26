import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { dashboardConfig } from '@/features/dashboard'
import { DashboardPage } from '@/features/dashboard'
import { DashboardLayout } from '@/layouts/dashboard'
import { getCookie } from '@/libs/cookie'
import type { GetServerSideProps, PageLayoutProps } from 'next'
import type { InferGetStaticPropsType } from 'next'

interface Props {}

const DashboardRoute: PageLayoutProps<Props> = (
  props: InferGetStaticPropsType<typeof getServerSideProps>
) => {
  return <DashboardPage />
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  return {
    props: {
      apiKey: getCookie('api_key', ctx),
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
