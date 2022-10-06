import React from "react";
import Head from "next/head";
import * as d3 from "d3";
import { keyBy } from "lodash";

import EmbedOkresyMap from "../../embed/components/EmbedOkresyMap";
import { usePostMessageWithHeight } from "../../embed/hooks";
import {
  useCapacitiesData,
  useKrajeData,
  useOkresyData,
} from "../../data/hooks";
import styles from "../../pages_styles/Embed.module.scss";

export default function EmbedDetiMimoMs({ baseUrl }) {
  const okresyData = useOkresyData(baseUrl);
  const krajeData = useKrajeData(baseUrl);
  const capacitiesData = useCapacitiesData(baseUrl);
  const { containerRef } = usePostMessageWithHeight(
    "paq_ua-kapacity-zari-2022_deti-mimo-ms"
  );

  const [selectedOkresId, setSelectedOkresId] = React.useState(null);

  const categories = [
    { label: "0 dětí", color: "#FEF0D9" },
    { label: "0–25", color: "#F5CAC1" },
    { label: "25–50", color: "#DF8B97" },
    { label: "50–75", color: "#C0516E" },
    { label: "75 a více dětí", color: "#990F44" },
  ];

  const fillByOkresId = React.useMemo(() => {
    if (!capacitiesData) {
      return {};
    }

    const color = d3
      .scaleThreshold()
      .domain([0.1, 25, 50, 75, 100000])
      .range(["#FEF0D9", "#F5CAC1", "#DF8B97", "#C0516E", "#990F44"]);

    return capacitiesData.reduce((carry, okresCapacities) => {
      return {
        ...carry,
        [okresCapacities.id]: color(okresCapacities.deti_mimo_ms),
      };
    }, {});
  }, [capacitiesData]);

  const okresCapacitiesById = React.useMemo(
    () => keyBy(capacitiesData, "id"),
    [capacitiesData]
  );

  if (!okresyData || !krajeData || !capacitiesData) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Kolik dětí bude mimo MŠ?</title>
      </Head>

      <main className={styles.container} ref={containerRef}>
        <h1>Kolik dětí bude mimo MŠ?</h1>

        <div className={styles.legend}>
          {categories.map((category) => (
            <div key={category.color} className="legend-item">
              <span
                className="dot"
                style={{ backgroundColor: category.color }}
              ></span>
              {category.label}
            </div>
          ))}
        </div>

        <div className={styles.mapWrapper}>
          <EmbedOkresyMap
            okresyData={okresyData}
            krajeData={krajeData}
            selectedOkresId={selectedOkresId}
            setSelectedOkresId={setSelectedOkresId}
            fillByOkresId={fillByOkresId}
            renderTooltipContent={(okresId, feature) => (
              <div className={styles.tooltipContent}>
                <div className="tooltip-orp">
                  <div className="tooltip-orp-name">
                    {feature.properties.NAZEV}
                  </div>
                  <div className="tooltip-region">
                    {feature.properties.VUSC_NAZEV}
                  </div>
                </div>

                <div className="main-value-line">
                  <strong>
                    {okresCapacitiesById[okresId].deti_mimo_ms.toLocaleString(
                      "cs-CZ"
                    )}
                  </strong>{" "}
                  dětí bude mimo MŠ
                </div>
              </div>
            )}
          />
        </div>

        <div className={styles.footer}>
          <div className="footer-item">
            Zdroj dat:{" "}
            <a
              href="https://www.paqresearch.cz/"
              target="_blank"
              rel="noreferrer"
            >
              PAQ&nbsp;Research
            </a>
            ,{" "}
            <a
              href="https://geoportal.cuzk.cz/Default.aspx?lng=CZ&mode=TextMeta&side=dsady_RUIAN_vse&metadataID=CZ-00025712-CUZK_SERIES-MD_RUIAN-STATY-SHP"
              target="_blank"
              rel="noreferrer"
            >
              ČÚZK (CC-BY)
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

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
