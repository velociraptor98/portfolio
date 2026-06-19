import { Button } from 'components/Button';
import { DecoderText } from 'components/DecoderText';
import { Heading } from 'components/Heading';
import { Meta } from 'components/Meta';
import { Text } from 'components/Text';
import { Transition } from 'components/Transition';
import dynamic from 'next/dynamic';
import styles from './404.module.css';

const Metaball = dynamic(() =>
  import('layouts/Home/Metaball').then(mod => mod.Metaball)
);

export function Page404() {
  return (
    <section className={styles.page}>
      <Meta
        title="404 Not Found"
        description="404 page not found. This page doesn't exist"
      />
      <Metaball />
      <Transition in>
        {visible => (
          <div className={styles.card}>
            <Heading
              className={styles.title}
              data-visible={visible}
              level={0}
              weight="bold"
            >
              404
            </Heading>
            <Heading
              aria-hidden
              className={styles.subheading}
              data-visible={visible}
              as="h2"
              level={3}
            >
              <DecoderText text="Error: Redacted" start={visible} delay={300} />
            </Heading>
            <Text className={styles.description} data-visible={visible} as="p">
              This page could not be found. It either doesn’t exist or was deleted. Or
              perhaps you don’t exist.
            </Text>
            <Button
              iconHoverShift
              className={styles.button}
              data-visible={visible}
              href="/"
              icon="chevronRight"
            >
              Back to homepage
            </Button>
          </div>
        )}
      </Transition>
    </section>
  );
}
