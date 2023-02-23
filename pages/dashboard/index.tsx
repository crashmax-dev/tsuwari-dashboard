import { dashboardConfig } from '@/features/dashboard/dashboard.config'
import { DashboardPage } from '@/features/dashboard/dashboard.page'
import { getServerTranslations } from '@/libs/i18n'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'

interface Props {}

export default function DemoRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
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
