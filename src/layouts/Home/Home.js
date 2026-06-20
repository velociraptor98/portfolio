import { Heading } from 'components/Heading';
import { Meta } from 'components/Meta';
import { Intro } from 'layouts/Home/Intro';
import { Profile } from 'layouts/Home/Profile';
import { ProjectSummary } from 'layouts/Home/ProjectSummary';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';

const Metaball = dynamic(() =>
  import('layouts/Home/Metaball').then(mod => mod.Metaball)
);

const disciplines = ['Project', 'Product', 'Design'];

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Metaball />
      <Meta
        title="Business Strategy & Project Management"
        description="Portfolio of Adwityaa Jha — business strategy, product, and project management. Selected experiences, skills, and a way to get in touch."
      />
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <section className={styles.experiences} id="experiences">
        <Heading className={styles.sectionHeading} level={2} align="center">
          Experience
        </Heading>
        <div className={styles.experiencesRow}>
          <ProjectSummary
            inline
            id="project-3"
            sectionRef={projectThree}
            visible={visibleSections.includes(projectThree.current)}
            index={1}
            title="Total Business Hotties"
            description="Founding and scaling a women-focused professional networking community — driving engagement, events, partnerships, and content strategy that grew its audience, reach, and brand."
          />
          <ProjectSummary
            inline
            id="project-1"
            sectionRef={projectOne}
            visible={visibleSections.includes(projectOne.current)}
            index={2}
            title="Deutsche Bank"
            description="Implementing Agile methodologies in the investment banking sector while harnessing the inevitability of change rather than resisting it."
          />
          <ProjectSummary
            inline
            id="project-2"
            sectionRef={projectTwo}
            visible={visibleSections.includes(projectTwo.current)}
            index={3}
            title="Atrasa"
            description="Developing a platform for connecting underprivileged South Asian women artisans to the world."
          />
        </div>
      </section>
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
    </div>
  );
};
