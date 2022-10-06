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

export default function EmbedAbsorpcniKapacitaZs({ baseUrl }) {
  const okresyData = useOkresyData(baseUrl);
  const krajeData = useKrajeData(baseUrl);
  const capacitiesData = useCapacitiesData(baseUrl);
  const { containerRef } = usePostMessageWithHeight(
    "paq_ua-kapacity-zari-2022_absorpcni-kapacita-zs"
  );

  const [selectedOkresId, setSelectedOkresId] = React.useState(null);

  const categories = [
    { label: "2000 a méně", color: "#FEF0D9" },
    { label: "2000–4000", color: "#C4D3C9" },
    { label: "4000–6000", color: "#79ABB0" },
    { label: "6000–8000", color: "#288893" },
    { label: "8000 a více", color: "#005B6E" },
  ];

  const fillByOkresId = React.useMemo(() => {
    if (!capacitiesData) {
      return {};
    }

    const color = d3
      .scaleThreshold()
      .domain([2000, 4000, 6000, 8000, 100000])
      .range(["#FEF0D9", "#C4D3C9", "#79ABB0", "#288893", "#005B6E"]);

    return capacitiesData.reduce((carry, okresCapacities) => {
      return {
        ...carry,
        [okresCapacities.id]: color(okresCapacities.zs_absorpcni_kapacita),
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
        <title>
          Absorbční kapacita přes ZŠ (kolik uprchlíků lze přijmout, aby 100%
          chodilo do ZŠ)
        </title>
      </Head>

      <main className={styles.container} ref={containerRef}>
        <h1>
          Absorbční kapacita přes ZŠ (kolik uprchlíků lze přijmout, aby 100%
          chodilo do ZŠ)
        </h1>

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
                    {okresCapacitiesById[
                      okresId
                    ].zs_absorpcni_kapacita.toLocaleString("cs-CZ")}
                  </strong>{" "}
                  uprchlíků lze přijmout, aby 100% chodilo do ZŠ
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
