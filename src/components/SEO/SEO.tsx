import { NextSeo } from 'next-seo';

export default function SEO({
  title = 'Parsec exercise',
  description = 'Parsec fullstack exercise',
  URL = '',
}: {
  title?: string;
  description?: string;
  URL?: string;
}) {
  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        url: URL,
        title: title,
        description: description,
        locale: 'en_EN',
      }}
      additionalLinkTags={[
        {
          rel: 'icon',
          href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔭</text></svg>",
        },
      ]}
    />
  );
}
