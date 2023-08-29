
import SanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url"
// vdo:1:49:13


export const client=  SanityClient({
    projectId: import.meta.env.VITE_REACT_APP_SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2022-02-02",
    useCdn: true,
    token: import.meta.env.VITE_REACT_APP_SANITY_TOKEN,
    
});



const builder = imageUrlBuilder(client);

export const urlFor = (source:any) => builder.image(source);