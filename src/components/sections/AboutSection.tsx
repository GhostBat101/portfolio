/**
 * AboutSection: Process, Services, and direct collaboration principles for GhostBat101.
 * Communicates with: AboutSection.module.css, asymmetricRadius.ts, and App.tsx.
 */
import React from 'react';
import { getAsymmetricRadius } from '@/utils/asymmetricRadius';
import styles from './AboutSection.module.css';

interface ProcessStage {
  readonly step: string;
  readonly label: string;
  readonly heading: string;
  readonly copy: readonly string[];
}

interface ServiceItem {
  readonly title: string;
  readonly description: string;
}

const PROCESS_STAGES: readonly ProcessStage[] = [
  {
    step: '01',
    label: 'DISCOVERY',
    heading: 'Define the objective',
    copy: [
      'We begin with your brand, your audience, and what success looks like.',
      'You don\'t need a polished brief—an initial idea is all we need to start.',
    ],
  },
  {
    step: '02',
    label: 'STRATEGY',
    heading: 'Map the architecture',
    copy: [
      'I translate the concept into a concrete blueprint: page hierarchy, content strategy, and tech stack choices.',
      'Before building begins, we both share the exact same vision.',
    ],
  },
  {
    step: '03',
    label: 'WIREFRAMING',
    heading: 'Shape the experience',
    copy: [
      'We test layout flows and key user interactions early.',
      'This resolves foundational structural questions before investing time into visual polish.',
    ],
  },
  {
    step: '04',
    label: 'CONTENT',
    heading: 'Clarify the messaging',
    copy: [
      'Design and copy work as one.',
      'I help sharpen your messaging so visitors immediately understand what you do, why it matters, and how to take action.',
    ],
  },
  {
    step: '05',
    label: 'ART DIRECTION',
    heading: 'Craft the visual identity',
    copy: [
      'Once structure is locked, I develop the visual style.',
      'Typography, tactile colors, responsive layouts, and fluid motion come together to give your website a distinctive voice.',
    ],
  },
  {
    step: '06',
    label: 'ENGINEERING',
    heading: 'Build the application',
    copy: [
      'Clean, modular code built for 60 FPS performance and fast load times.',
      'Engineered for flawless responsiveness across phones, tablets, and desktops.',
    ],
  },
  {
    step: '07',
    label: 'LAUNCH',
    heading: 'Verify and deploy',
    copy: [
      'Comprehensive cross-browser testing, accessibility audits, and performance tuning ensure a smooth, confident release.',
      'Then your project is live and ready to convert.',
    ],
  },
];

const SERVICES: readonly ServiceItem[] = [
  {
    title: 'Brand & Business Websites',
    description: 'Fast, high-conversion digital homes that establish immediate credibility and authority.',
  },
  {
    title: 'E-Commerce & Catalogs',
    description: 'Frictionless shopping experiences with lightning-fast search, serverless edge caching, and seamless checkout.',
  },
  {
    title: 'Interactive 3D & Creative Web',
    description: 'Immersive WebGL, Three.js, and kinetic typography experiences for brands that want to stand apart.',
  },
  {
    title: 'Full-Stack Web Applications',
    description: 'Headless systems, dynamic dashboards, and custom client portals with resilient backend foundations.',
  },
  {
    title: 'Design Systems & Modernization',
    description: 'Transforming sluggish, fragmented websites into lean, maintainable, and accessible digital assets.',
  },
];

const WHY_ME_PARAGRAPHS: readonly string[] = [
  'No account managers, no layers of communication, and no game of telephone. You talk directly with the engineer designing and coding your project.',
  'We brainstorm together, make quick decisions, and adapt seamlessly as the product takes shape.',
  'I prioritize honest technical advice: if a requested feature adds unnecessary cost or complexity without real value, I will tell you upfront.',
];

export const AboutSection: React.FC = () => {
  const whyCardRadius = getAsymmetricRadius('ghostbat-why-card', 'large');
  const fullWidthRadius = getAsymmetricRadius('process-stage-finish', 'large');

  return (
    <div className={styles.sectionWrapper}>
      <section id="process" className={styles.processSection}>
        <span id="workflow" className="sr-only" />
        <div className="container">
          <div className={styles.headerBlock}>
            <span className={styles.kicker}>HOW I WORK</span>
            <h2 className={styles.title}>A disciplined roadmap from concept to deployment.</h2>
            <div className={styles.introBlock}>
              <p className={styles.introLead}>Great websites start with clarity, not guesswork.</p>
              <p className={styles.introText}>
                Before writing a single line of code, we align on your goals, user journeys, and technical scope. From early wireframes to production testing, every stage has a defined purpose.
              </p>
              <p className={styles.introSub}>
                This ensures complete transparency, rapid iteration, and zero unwelcome surprises.
              </p>
            </div>
          </div>

          <div className={styles.stagesGrid}>
            {PROCESS_STAGES.slice(0, 6).map((stage, index) => {
              const cardRadius = getAsymmetricRadius(`process-stage-${index}`, 'medium');

              return (
                <div
                  key={stage.step}
                  className={styles.stageCard}
                  style={{ borderRadius: cardRadius }}
                >
                  <div className={styles.stageCardHeader}>
                    <div className={styles.stepIndicator}>
                      <span className={styles.stepNum}>{stage.step}</span>
                      <span className={styles.stepBadge}>{stage.label}</span>
                    </div>
                  </div>
                  <h3 className={styles.stageTitle}>{stage.heading}</h3>
                  <div className={styles.stageCopyGroup}>
                    {stage.copy.map((p) => (
                      <p key={p} className={styles.stageDescription}>{p}</p>
                    ))}
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
                  <span className={styles.stepNum}>{PROCESS_STAGES[6].step}</span>
                  <span className={styles.stepBadge}>{PROCESS_STAGES[6].label}</span>
                </div>
              </div>
              <div className={styles.fullWidthContent}>
                <div className={styles.fullWidthLeft}>
                  <h3 className={styles.fullWidthTitle}>{PROCESS_STAGES[6].heading}</h3>
                  <div className={styles.stageCopyGroup}>
                    {PROCESS_STAGES[6].copy.map((p) => (
                      <p key={p} className={styles.fullWidthDesc}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className={styles.aboutSection}>
        <div className="container">
          <div className={styles.servicesHeader}>
            <span className={styles.kicker}>WHAT I BUILD</span>
            <h2 className={styles.title}>Capabilities designed around your goals.</h2>
            <p className={styles.servicesIntro}>
              Whether you need a high-impact launch landing page, a modern web store, or a bespoke interactive experience, every project is engineered to perform.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {SERVICES.map((service, index) => {
              const serviceRadius = getAsymmetricRadius(`service-${index}`, 'small');

              return (
                <div
                  key={service.title}
                  className={styles.serviceCard}
                  style={{ borderRadius: serviceRadius }}
                >
                  <span className={styles.serviceNumber}>0{index + 1}</span>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDesc}>{service.description}</p>
                </div>
              );
            })}
          </div>

          <div
            className={styles.whyCard}
            style={{ borderRadius: whyCardRadius }}
          >
            <div className={styles.whyHeader}>
              <span className={styles.kicker}>WHY WORK WITH ME</span>
              <span className={styles.whyBadge}>DIRECT COLLABORATION</span>
            </div>
            <h3 className={styles.whyTitle}>Direct collaboration with the craftsman building your site.</h3>
            <div className={styles.whyCopyGroup}>
              {WHY_ME_PARAGRAPHS.map((para) => (
                <p key={para} className={styles.whyPara}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
