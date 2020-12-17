import { FC } from 'react';
import { DiscussionEmbed } from 'disqus-react';

import useTranslation from 'next-translate/useTranslation';

interface Disqus {
  url: string;
  id: string;
  title: string;
}

const Disqus: FC<Disqus> = ({ url, id, title }) => {
  const { lang } = useTranslation();

  const disqusShortname = 'peakseekers';
  const disqusConfig = {
    url,
    identifier: id,
    title: title,
    language: lang === 'pt' ? 'pt_BR' : 'en_US'
  }

  return (
    <DiscussionEmbed
      shortname={disqusShortname}
      config={disqusConfig}
    />
  )
}

export default Disqus;