import { Heading } from 'components/Heading';
import { Link } from 'components/Link';
import { List, ListItem } from 'components/List';
import { Meta } from 'components/Meta';
import { Text } from 'components/Text';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';
import styles from './Uses.module.css';

const Metaball = dynamic(() =>
  import('layouts/Home/Metaball').then(mod => mod.Metaball)
);

const businessSkills = [
  'Stakeholder Management',
  'Strategy',
  'Communication',
  'Agile Project Management',
  'Product Management',
  'Project Planning',
  'Scrum',
];

const technicalSkills = [
  'Data Analysis',
  'Figma & Balsamiq wireframing / prototyping',
  'Confluence',
  'Jira',
  'Python',
  'Microsoft Office (Excel / PowerPoint)',
  'Power BI',
  'Visio',
];

export const Uses = () => (
  <Fragment>
    <Meta
      title="Skills"
      description="The toolkit of skills and tools Adwityaa Jha uses to design, lead, and deliver projects."
    />
    <Metaball />
    <div className={styles.skills}>
      <header className={styles.header}>
        <Heading className={styles.title} level={2} as="h1">
          Skills
        </Heading>
        <Text className={styles.intro} size="l" as="p">
          A carefully curated toolkit of skills and tools I rely on to design, lead, and
          deliver projects — spanning strategy and product through to the day-to-day craft
          of getting things shipped.
        </Text>
      </header>

      <div className={styles.grid}>
        <section className={styles.card}>
          <Heading className={styles.cardTitle} level={4} as="h2">
            Business
          </Heading>
          <List className={styles.list}>
            {businessSkills.map(skill => (
              <ListItem key={skill}>{skill}</ListItem>
            ))}
          </List>
        </section>

        <section className={styles.card}>
          <Heading className={styles.cardTitle} level={4} as="h2">
            Technical &amp; Tools
          </Heading>
          <List className={styles.list}>
            {technicalSkills.map(skill => (
              <ListItem key={skill}>{skill}</ListItem>
            ))}
          </List>
        </section>

        <section className={styles.card}>
          <Heading className={styles.cardTitle} level={4} as="h2">
            Beyond Work
          </Heading>
          <List className={styles.list}>
            <ListItem>
              Written communication — read my{' '}
              <Link href="https://medium.com/@adwitya">Medium blogs</Link>
            </ListItem>
            <ListItem>
              Logo design — see my{' '}
              <Link href="https://www.behance.net/adwityaajha">Behance portfolio</Link>
            </ListItem>
          </List>
        </section>
      </div>
    </div>
  </Fragment>
);
