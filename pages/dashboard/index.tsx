import { DashboardPage } from '@/features/dashboard'
import { getI18nProps } from '@/libs/i18n'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'

interface Props {}

export default function DashboardRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return <DashboardPage />
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  return {
    props: {
      ...(await getI18nProps(ctx, ['dashboard']))
    }
  }
}
