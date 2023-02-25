import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Error = () => {
  return <div>Not found</div>
}

export const getStaticProps: GetStaticProps = async (ctx) => ({
  props: {
    ...(await serverSideTranslations(ctx.locale!, ['common', 'layout']))
  }
})

export default Error
