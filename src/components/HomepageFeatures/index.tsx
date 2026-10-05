import type {ReactNode} from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: ReactNode;
  description: ReactNode;
};

// Three arguments, each limited to what the app does today.
const FeatureList: FeatureItem[] = [
  {
    title: (
      <Translate id="homepage.features.labels.title">
        Étiquettes depuis la commande
      </Translate>
    ),
    description: (
      <Translate id="homepage.features.labels.description">
        Créez l'étiquette depuis la fiche commande ou pour cinquante commandes à
        la fois, avec votre contrat Colissimo. La commande est marquée expédiée
        avec son numéro de colis.
      </Translate>
    ),
  },
  {
    title: (
      <Translate id="homepage.features.relay.title">Points relais</Translate>
    ),
    description: (
      <Translate id="homepage.features.relay.description">
        Le client choisit son point au checkout sur Shopify Plus, ou après la
        commande sur tous les plans. Vous pouvez aussi le choisir depuis la
        commande.
      </Translate>
    ),
  },
  {
    title: (
      <Translate id="homepage.features.international.title">
        International et douane
      </Translate>
    ),
    description: (
      <Translate id="homepage.features.international.description">
        La zone et le service se déduisent de l'adresse, la CN23 se remplit à
        partir de vos fiches produits, et les envois vers les États-Unis partent
        avec ou sans DDP.
      </Translate>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.glassCard}>
          <div className="row">
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
