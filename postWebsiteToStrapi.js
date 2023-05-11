import { ApolloClient, InMemoryCache, gql, useMutation } from "@apollo/client";

export default async function postWebsiteToStrapi() {
    try {
        const client = new ApolloClient({
            uri: `${process.env.NEXT_PUBLIC_STRAPI_ROOT}/graphql`,
            cache: new InMemoryCache(),
        });

        const { data } = await client.mutate({
            mutation: gql`
                mutation createWebsite {
                    createWebsite(
                        data: {
                            Root_URL: "https://googlaaaa.com"
                            Web_Vitals_Score: "15"
                        }
                    ) {
                        data {
                            attributes {
                                Root_URL
                            }
                        }
                    }
                }
            `,
        });

        console.log("from postSSs", data);

        // return { props: { data } };
    } catch (e) {
        console.log("error from LOURLs", e);
    }
}
