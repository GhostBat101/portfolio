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
    label: 'START HERE',
    heading: 'Understand the idea',
    copy: [
      'We start with your business, your audience, and what you want the website to achieve.',
      'You do not need a finished plan. If you only have an idea, that\'s enough to start.',
    ],
  },
  {
    step: '02',
    label: 'GET CLEAR',
    heading: 'Plan the website',
    copy: [
      'I turn the idea into a clear plan for the pages, content, features, and overall structure.',
      'Before anything gets built, we should both know what we\'re making.',
    ],
  },
  {
    step: '03',
    label: 'FIND THE SHAPE',
    heading: 'Work out the layout',
    copy: [
      'I sketch the important parts of the website and work out how people will move through it.',
      'This is where we solve the big problems before spending time on small details.',
    ],
  },
  {
    step: '04',
    label: 'MAKE IT CLEAR',
    heading: 'Write the content',
    copy: [
      'Good design needs good words.',
      'I help shape the text so visitors can understand what you offer, what makes it useful, and what they should do next.',
    ],
  },
  {
    step: '05',
    label: 'BUILD THE LOOK',
    heading: 'Bring it together',
    copy: [
      'Once the structure is clear, I develop the visual style.',
      'This is where the colours, type, images, movement, and small details come together to give the website its own character.',
    ],
  },
  {
    step: '06',
    label: 'MAKE IT REAL',
    heading: 'Build the website',
    copy: [
      'Then I turn the approved design into a working website.',
      'I make sure it works across different screen sizes, interactions feel natural, and the important parts work as expected.',
    ],
  },
  {
    step: '07',
    label: 'READY TO GO',
    heading: 'Test and launch',
    copy: [
      'Before launch, I check the website, fix problems, and make the final adjustments.',
      'Then it is ready to go live.',
    ],
  },
];

const SERVICES: readonly ServiceItem[] = [
  {
    title: 'Business websites',
    description: 'A clear and professional website for your company, service, or personal brand.',
  },
  {
    title: 'Online stores',
    description: 'Product websites that make it easy for customers to browse, learn, and buy.',
  },
  {
    title: 'Custom websites',
    description: 'Something more specific? I can build a website around your idea instead of forcing it into a ready-made template.',
  },
  {
    title: 'Interactive websites',
    description: 'For projects where the experience matters as much as the information, I can add animation, 3D, and other interactive elements.',
  },
  {
    title: 'Web applications',
    description: 'When a website needs more than pages and forms, I can build the features and systems behind it too.',
  },
];

const WHY_ME_PARAGRAPHS: readonly string[] = [
  'There is no large team between you and the person doing the work.',
  'We can talk through the idea, make decisions together, and adjust things as the project takes shape.',
  'I also prefer being honest about what a project actually needs. If something adds cost without adding much value, I will tell you.',
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
            <h2 className={styles.title}>A clear process from idea to launch.</h2>
            <div className={styles.introBlock}>
              <p className={styles.introLead}>I don't like jumping straight into code.</p>
              <p className={styles.introText}>
                First, I need to understand what you are trying to achieve. Then I work through the structure, design, and details before building the final website.
              </p>
              <p className={styles.introSub}>
                This keeps the project clear and gives us fewer surprises later.
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
            <h2 className={styles.title}>What can I build for you?</h2>
            <p className={styles.servicesIntro}>
              The right website depends on what you need. I can help with projects ranging from straightforward business sites to more involved web applications.
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
            <h3 className={styles.whyTitle}>You work directly with the person building your website.</h3>
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
