import profileImg from 'assets/profile-large.jpeg';
import profileImgPlaceholder from 'assets/profile-placeholder.jpg';
import { Button } from 'components/Button';
import { DecoderText } from 'components/DecoderText';
import { Heading } from 'components/Heading';
import { Image } from 'components/Image';
import { Link } from 'components/Link';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { Transition } from 'components/Transition';
import { Fragment, useState } from 'react';
import { classes, media } from 'utils/style';
import styles from './Profile.module.css';

const ProfileText = ({ visible, titleId }) => (
  <Fragment>
    <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
      <DecoderText text="Hi there" start={visible} delay={500} />
    </Heading>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      I am Adwityaa Jha, who has a passion for technology, and finance and a penchant for problem-solving, my journey in the corporate world has been shaped by diverse experiences and impactful projects. My personal project is called Atrasa which supports women empowerment. For further details about my skillsets check out my
      <Link href="/uses"> skills page</Link>.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      I am always looking to hear about new projects, and connect with new people so feel free to drop me a line.
    </Text>
  </Fragment>
);

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {visible => (
          <div className={styles.content}>
            <div className={classes(styles.column, styles.card)}>
              <ProfileText visible={visible} titleId={titleId} />
              {/* Make correct email address here */}
              <Button
                className={styles.button}
                data-visible={visible}
                href="mailto:ajha3110@gmail.com"
                icon="send"
              >
                Drop me an email
              </Button>
            </div>
            <div className={styles.column}>
              <div className={styles.tag} aria-hidden>
                <div className={styles.tagText} data-visible={visible}>
                  About Me
                </div>
              </div>
              <div className={styles.image}>
                <Image
                  reveal
                  delay={100}
                  placeholder={profileImgPlaceholder}
                  srcSet={[profileImg]}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  alt="Adwityaa Jha"
                />
                <svg
                  aria-hidden="true"
                  width="135"
                  height="765"
                  viewBox="0 0 135 765"
                  className={styles.svg}
                  data-visible={visible}
                >
                </svg>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
