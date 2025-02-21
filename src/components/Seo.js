import Head from "next/head";

export function Seo(props) {
  const { 
    title = "Anita Gonzalez Gallery",
    description = "New Art Gallery for Anita Gonzalez Delgado new digital age"
  } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="art gallery, original paintings, digital prints, Anita Gonzalez" />
      <meta name="author" content="Anita Gonzalez" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Open Graph para redes sociales */}
      <meta property="og:title" content="Anita Gonzalez Gallery" />
      <meta property="og:description" content="Discover stunning paintings and digital prints by Anita Gonzalez." />
      <meta property="og:image" content="https://www.anaibisgonzalez.com/images/anaibis_fuego.jpg" />
      <meta property="og:url" content="https://www.anaibisgonzalez.com" />
      <meta property="og:type" content="website" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Anita Gonzalez Gallery" />
      <meta name="twitter:description" content="Discover stunning paintings and digital prints by Anita Gonzalez." />
      <meta name="twitter:image" content="https://www.anaibisgonzalez.com/images/anaibis_fuego.jpg" />

      {/* Otros meta tags */}
      <link rel="canonical" href="https://www.anaibisgonzalez.com" />
    </Head>
  );
}
