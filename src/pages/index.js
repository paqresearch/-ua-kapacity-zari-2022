import React from "react";

import styles from "../pages_styles/IndexPage.module.scss";

export default function IndexPage({ baseUrl }) {
  return (
    <main className={styles.container}>
      <h1>Kapacity pro ukrajinské uprchlíky</h1>

      <div
        dangerouslySetInnerHTML={{
          __html: createEmbedCode(absorpcniKapacitaCelkemMapConfig, baseUrl),
        }}
        style={{ margin: "60px 0 0 0" }}
      ></div>
      <h3>Kód k vložení do vlastních stránek</h3>
      <pre className={styles.pre}>
        <code>
          {createEmbedCode(absorpcniKapacitaCelkemMapConfig, baseUrl).trim()}
        </code>
      </pre>

      <div
        dangerouslySetInnerHTML={{
          __html: createEmbedCode(absorpcniKapacitaBydleniMapConfig, baseUrl),
        }}
        style={{ margin: "120px 0 0 0" }}
      ></div>
      <h3>Kód k vložení do vlastních stránek</h3>
      <pre className={styles.pre}>
        <code>
          {createEmbedCode(absorpcniKapacitaBydleniMapConfig, baseUrl).trim()}
        </code>
      </pre>

      <div
        dangerouslySetInnerHTML={{
          __html: createEmbedCode(absorpcniKapacitaZsMapConfig, baseUrl),
        }}
        style={{ margin: "120px 0 0 0" }}
      ></div>
      <h3>Kód k vložení do vlastních stránek</h3>
      <pre className={styles.pre}>
        <code>
          {createEmbedCode(absorpcniKapacitaZsMapConfig, baseUrl).trim()}
        </code>
      </pre>

      <div
        dangerouslySetInnerHTML={{
          __html: createEmbedCode(
            pomerAbsorpcnichKapacitBydleniZsMapConfig,
            baseUrl
          ),
        }}
        style={{ margin: "120px 0 0 0" }}
      ></div>
      <h3>Kód k vložení do vlastních stránek</h3>
      <pre className={styles.pre}>
        <code>
          {createEmbedCode(
            pomerAbsorpcnichKapacitBydleniZsMapConfig,
            baseUrl
          ).trim()}
        </code>
      </pre>

      <div
        dangerouslySetInnerHTML={{
          __html: createEmbedCode(moznostNavyseniUprchlikuMapConfig, baseUrl),
        }}
        style={{ margin: "120px 0 0 0" }}
      ></div>
      <h3>Kód k vložení do vlastních stránek</h3>
      <pre className={styles.pre}>
        <code>
          {createEmbedCode(moznostNavyseniUprchlikuMapConfig, baseUrl).trim()}
        </code>
      </pre>

      <div
        dangerouslySetInnerHTML={{
          __html: createEmbedCode(detiMimoMsMapConfig, baseUrl),
        }}
        style={{ margin: "120px 0 0 0" }}
      ></div>
      <h3>Kód k vložení do vlastních stránek</h3>
      <pre className={styles.pre}>
        <code>{createEmbedCode(detiMimoMsMapConfig, baseUrl).trim()}</code>
      </pre>

      {/* TODO: */}
      {/* <h2>Ke stažení</h2>

      <ul className={styles.downloads}>
        <li>
          <a
            href={`${baseUrl}/Previs_podstav kapacit ZS pro ukrajinske uprchliky v zari 2022.png`}
            download
            className={styles.link}
          >
            Previs_podstav kapacit ZS pro ukrajinske uprchliky v zari 2022.png
          </a>
        </li>
        <li>
          <a
            href={`${baseUrl}/Previs_podstav kapacit na 1. stupni ZS pro ukrajinske uprchliky v zari 2022.png`}
            download
            className={styles.link}
          >
            Previs_podstav kapacit na 1. stupni ZS pro ukrajinske uprchliky v
            zari 2022.png
          </a>
        </li>
        <li>
          <a
            href={`${baseUrl}/Previs_podstav kapacit na 2. stupni ZS pro ukrajinske uprchliky v zari 2022.png`}
            download
            className={styles.link}
          >
            Previs_podstav kapacit na 2. stupni ZS pro ukrajinske uprchliky v
            zari 2022.png
          </a>
        </li>
        <li>
          <a
            href={`${baseUrl}/Podil jiz zapsanych na ZS z nahlasenych 6-14letych ukrajinskych uprchliku.png`}
            download
            className={styles.link}
          >
            Podil jiz zapsanych na ZS z nahlasenych 6-14letych ukrajinskych
            uprchliku.png
          </a>
        </li>
        <li>
          <a
            href={`${baseUrl}/Ukrajinsti zaci aktualne zapsani na ZS.png`}
            download
            className={styles.link}
          >
            Ukrajinsti zaci aktualne zapsani na ZS.png
          </a>
        </li>
        <li>
          <a
            href={`${baseUrl}/Previs_podstav kapacit MS pro ukrajinske uprchliky v zari 2022.png`}
            download
            className={styles.link}
          >
            Previs_podstav kapacit MS pro ukrajinske uprchliky v zari 2022.png
          </a>
        </li>
        <li>
          <a
            href={`${baseUrl}/Podil jiz zapsanych na MS z nahlasenych 3-5letych ukrajinskych uprchliku.png`}
            download
            className={styles.link}
          >
            Podil jiz zapsanych na MS z nahlasenych 3-5letych ukrajinskych
            uprchliku.png
          </a>
        </li>
        <li>
          <a
            href={`${baseUrl}/Ukrajinske deti aktualne zapsane na MS.png`}
            download
            className={styles.link}
          >
            Ukrajinske deti aktualne zapsane na MS.png
          </a>
        </li>
      </ul> */}
    </main>
  );
}

const absorpcniKapacitaCelkemMapConfig = {
  embedSrc: "/embed/absorpcni-kapacita-celkem",
  embedId: "paq_ua-kapacity-zari-2022_absorpcni-kapacita-celkem",
};

const absorpcniKapacitaBydleniMapConfig = {
  embedSrc: "/embed/absorpcni-kapacita-bydleni",
  embedId: "paq_ua-kapacity-zari-2022_absorpcni-kapacita-bydleni",
};

const absorpcniKapacitaZsMapConfig = {
  embedSrc: "/embed/absorpcni-kapacita-zs",
  embedId: "paq_ua-kapacity-zari-2022_absorpcni-kapacita-zs",
};

const pomerAbsorpcnichKapacitBydleniZsMapConfig = {
  embedSrc: "/embed/pomer-absorpcnich-kapacit-bydleni-zs",
  embedId: "paq_ua-kapacity-zari-2022_pomer-absorpcnich-kapacit-bydleni-zs",
};

const moznostNavyseniUprchlikuMapConfig = {
  embedSrc: "/embed/moznost-navyseni-uprchliku",
  embedId: "paq_ua-kapacity-zari-2022_moznost-navyseni-uprchliku",
};

const detiMimoMsMapConfig = {
  embedSrc: "/embed/deti-mimo-ms",
  embedId: "paq_ua-kapacity-zari-2022_deti-mimo-ms",
};

const createEmbedCode = (mapConfig, baseUrl) => {
  const iframeSrc = baseUrl + mapConfig.embedSrc;

  return `
<iframe src="${iframeSrc}" scrolling="no" frameborder="0" allowtransparency="true" style="width: 0; min-width: 100% !important;" height="550" id="${mapConfig.embedId}"></iframe>
<script type="text/javascript">window.addEventListener("message",function(a){if(void 0!==a.data["paq-embed-height"])for(var e in a.data["paq-embed-height"])if("${mapConfig.embedId}"==e){var d=document.querySelector("#${mapConfig.embedId}");d&&(d.style.height=a.data["paq-embed-height"][e]+"px")}});</script>
  `;
};

export async function getStaticProps() {
  return {
    props: {
      baseUrl:
        process.env.NODE_ENV === "production"
          ? "https://paqresearch.github.io/ua-kapacity-zari-2022"
          : "",
    },
  };
}
