/**
 * AboutSection: Editorial workflow section detailing GhostBat101 design and full-stack methodology.
 * Communicates with: AboutSection.module.css, asymmetricRadius.ts, and App.tsx.
 */
import React from 'react';
import { getAsymmetricRadius } from '@/utils/asymmetricRadius';
import styles from './AboutSection.module.css';

interface WorkflowStage {
  readonly step: string;
  readonly title: string;
  readonly badge: string;
  readonly description: string;
  readonly artifact: string;
}

const WORKFLOW_STAGES: readonly WorkflowStage[] = [
  {
    step: '01',
    title: 'Pen & Paper Blocking',
    badge: 'ANALOG FIRST',
    description: 'Every project initiates with tactile drawing and physical composition. Blocking out structural layout and hierarchy on paper eliminates digital noise and grounds the spatial narrative before touching software.',
    artifact: 'PHYSICAL SKETCHBOOK // GRAPHITE BLOCKING',
  },
  {
    step: '02',
    title: 'Lean Spec Sheet & Alignment',
    badge: 'PRD + ARCHITECTURE',
    description: 'Synthesizing paper findings into an accessible v1 spec sheet containing PRD scope, system architecture, and core design tokens. Direct alignment with the client verifies intent before investing in pixel work.',
    artifact: 'V1 SPECIFICATION // CLIENT ALIGNMENT',
  },
  {
    step: '03',
    title: 'Structural Wireframe & Typeframe',
    badge: 'LAYOUT & CADENCE',
    description: 'Constructing clean wireframes to establish information architecture. In parallel, crafting a dedicated typeframe to determine typographic scales, line-height cadence, and optical reading comfort.',
    artifact: 'WIREFRAME SCHEMATICS // TYPEFRAME SCALE',
  },
  {
    step: '04',
    title: 'Editorial Copywriting',
    badge: 'VOICE & CLARITY',
    description: 'Drafting targeted copy and microcopy to shape the interface around authentic language. Eliminating placeholder lorem ipsum ensures components and reading rhythms are engineered for real message delivery.',
    artifact: 'CONTENT HIERARCHY // INTERACTION COPY',
  },
  {
    step: '05',
    title: 'Stitch Previews into Figma',
    badge: 'RAPID PROTOTYPE',
    description: 'Deploying Stitch to generate rough visual previews, then importing assets into Figma for rigorous refinement. Polishing responsive component states, color token mappings, and mechanical micro-interactions.',
    artifact: 'STITCH MOCKUPS // FIGMA COMPONENT SYSTEM',
  },
  {
    step: '06',
    title: 'Frontend Implementation First',
    badge: 'REACT & TYPESCRIPT',
    description: 'Translating Figma vectors, typeframes, and wireframe rules directly into production code. Engineering component architectures with responsive fluidity, custom shaders, and strict frame-budget discipline.',
    artifact: 'PRODUCTION FRONTEND // ZERO COMPROMISE',
  },
  {
    step: '07',
    title: 'Backend & Database Architecture',
    badge: 'FULL STACK COMMISSION',
    description: 'When project scope demands full-stack engineering, architecture expands to server services and database persistence. Designing typed APIs, PostgreSQL schemas, and PL/pgSQL routines for durable end-to-end performance.',
    artifact: 'POSTGRESQL RELATIONAL DATA // EDGE APIS',
  },
];

export const AboutSection: React.FC = () => {
  const craftPlateRadius = getAsymmetricRadius('ghostbat-craft-plate', 'large');
  const fullWidthRadius = getAsymmetricRadius('workflow-stage-full-stack', 'large');

  return (
    <section id="workflow" className={styles.about}>
      <div id="about" className={styles.anchorOffset} aria-hidden="true" />
      <div className="container">
        <div className={styles.mastheadGrid}>
          <div className={styles.leadCol}>
            <span className={styles.kicker}>METHODOLOGY // PRODUCTION ARCHITECTURE</span>
            <h2 className={styles.title}>My Workflow</h2>
            <p className={styles.statement}>
              Specialized primarily in UI/UX web design and bespoke frontend engineering, with comprehensive full-stack capability for complete product architectures. From tactile pen-and-paper blocking to production-grade deployment, every site is crafted with deliberate mechanical precision.
            </p>
          </div>

          <div className={styles.craftCard} style={{ borderRadius: craftPlateRadius }}>
            <div className={styles.craftHeader}>
              <span className={styles.craftLabel}>CRAFT DISCIPLINE</span>
              <span className={styles.craftBadge}>DUAL COMPETENCY</span>
            </div>
            <div className={styles.craftGrid}>
              <div className={styles.craftBox}>
                <span className={styles.craftBoxTag}>PRIMARY SPECIALIZATION</span>
                <h3 className={styles.craftBoxTitle}>UI/UX Web Design & Creative Frontends</h3>
                <p className={styles.craftBoxDesc}>
                  Bespoke visual identity, spatial interaction, custom WebGL shaders, and high-craft responsive web experiences.
                </p>
              </div>
              <div className={styles.craftBox}>
                <span className={styles.craftBoxTag}>SYSTEMS ARCHITECTURE</span>
                <h3 className={styles.craftBoxTitle}>Full-Stack & Functional Systems</h3>
                <p className={styles.craftBoxDesc}>
                  Typed API engineering, PostgreSQL relational database schemas, edge worker routing, and dependable performance.
                </p>
              </div>
            </div>
            <div className={styles.craftFooter}>
              <span className={styles.craftFooterLabel}>EXECUTION STANDARD</span>
              <span className={styles.craftFooterValue}>TACTILE FIRST // ZERO GENERIC TEMPLATES</span>
            </div>
          </div>
        </div>

        <div className={styles.stagesGrid}>
          {WORKFLOW_STAGES.slice(0, 6).map((stage, index) => {
            const cardRadius = getAsymmetricRadius(`workflow-stage-${index}`, 'medium');

            return (
              <div
                key={stage.step}
                className={styles.stageCard}
                style={{ borderRadius: cardRadius }}
              >
                <div className={styles.stageCardHeader}>
                  <div className={styles.stepIndicator}>
                    <span className={styles.stepNum}>{stage.step}</span>
                    <span className={styles.stepBadge}>{stage.badge}</span>
                  </div>
                </div>
                <h3 className={styles.stageTitle}>{stage.title}</h3>
                <p className={styles.stageDescription}>{stage.description}</p>
                <div className={styles.stageArtifact}>
                  <span className={styles.artifactIcon}>&gt;</span>
                  <span className={styles.artifactText}>{stage.artifact}</span>
                </div>
              </div>
            );
          })}

          <div
            className={styles.fullWidthCard}
            style={{ borderRadius: fullWidthRadius }}
          >
            <div className={styles.fullWidthHeader}>
              <div className={styles.stepIndicator}>
                <span className={styles.stepNum}>{WORKFLOW_STAGES[6].step}</span>
                <span className={styles.stepBadge}>{WORKFLOW_STAGES[6].badge}</span>
              </div>
              <span className={styles.fullWidthStatus}>SCOPE // FULL PRODUCT LIFECYCLE</span>
            </div>
            <div className={styles.fullWidthContent}>
              <div className={styles.fullWidthLeft}>
                <h3 className={styles.fullWidthTitle}>{WORKFLOW_STAGES[6].title}</h3>
                <p className={styles.fullWidthDesc}>{WORKFLOW_STAGES[6].description}</p>
              </div>
              <div className={styles.fullWidthRight}>
                <div className={styles.fullWidthTagBox}>
                  <span className={styles.fullWidthTagLabel}>TECHNICAL DOMAINS</span>
                  <div className={styles.pillList}>
                    <span className={styles.pillItem}>POSTGRESQL SCHEMAS</span>
                    <span className={styles.pillItem}>PL/PGSQL FUNCTIONS</span>
                    <span className={styles.pillItem}>SERVERLESS EDGE APIS</span>
                    <span className={styles.pillItem}>TYPED DATA CONTRACTS</span>
                  </div>
                </div>
                <div className={styles.stageArtifact}>
                  <span className={styles.artifactIcon}>&gt;</span>
                  <span className={styles.artifactText}>{WORKFLOW_STAGES[6].artifact}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
