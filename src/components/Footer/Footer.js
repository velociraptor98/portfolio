import { Icon } from 'components/Icon';
import { Text } from 'components/Text';
import { classes } from 'utils/style';
import { socialLinks } from 'components/Navbar/navData';
import styles from './Footer.module.css';

export const Footer = ({ className }) => (
  <footer className={classes(styles.footer, className)}>
    <div className={styles.social}>
      {socialLinks.map(({ label, url, icon }) => (
        <a
          key={label}
          className={styles.socialLink}
          aria-label={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon className={styles.socialIcon} icon={icon} />
        </a>
      ))}
    </div>
    <Text size="s" align="center">
      <span className={styles.date}>
        {`© ${new Date().getFullYear()} Adwityaa Jha. Adapted from the design of Hamish Williams.`}
      </span>
    </Text>
  </footer>
);
