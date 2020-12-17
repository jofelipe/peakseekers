import algoliasearch from 'algoliasearch';

const searchClient = algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_APP_KEY
);

export { searchClient };
