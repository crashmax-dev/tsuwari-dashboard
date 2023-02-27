import { DashboardPage } from '@/features/dashboard'
import { DashboardLayout } from '@/layouts/dashboard'
import type { GetServerSideProps, PageLayoutProps } from 'next'
import type { InferGetStaticPropsType } from 'next'
import { getI18nProps } from '@/libs/i18n'

interface Props {}

const DashboardRoute: PageLayoutProps<Props> = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  return <DashboardPage />
}

export const getStaticProps: GetServerSideProps = async (ctx) => {
  return await getI18nProps(ctx, ['dashboard', 'layout'])
}

DashboardRoute.getLayout = (page: React.ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default DashboardRoute
