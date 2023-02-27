import type { GetServerSidePropsContext } from 'next'

export const getI18nProps = async (
  ctx: GetServerSidePropsContext,
  namespaces: string[]
) => {
  const locale = ctx.locale || ctx.defaultLocale;
  const locales: Record<string, any> = {}
  for (const namespace of namespaces) {
    const { default: data } = await import(`../../locales/${locale}/${namespace}.json`);
    locales[namespace] = data
  }
  return { props: { i18n: locales } };
};
