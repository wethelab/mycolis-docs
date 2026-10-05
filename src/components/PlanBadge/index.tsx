import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {translate} from '@docusaurus/Translate';
import styles from './styles.module.css';

/**
 * Shopify plans a feature runs on. myColis has no plans of its own yet: the
 * badge states a Shopify limit, for the few features Shopify restricts by
 * plan (checkout UI extensions in the information, shipping and payment
 * steps are Shopify Plus only).
 */
export type PlanId = 'plus' | 'tous';

function planLabel(plan: PlanId): string {
  switch (plan) {
    case 'plus':
      return translate({
        id: 'planBadge.plus',
        message: 'Shopify Plus',
        description: 'Badge next to a feature that needs Shopify Plus',
      });
    case 'tous':
      return translate({
        id: 'planBadge.all',
        message: 'Tous les plans Shopify',
        description: 'Badge next to a feature available on every Shopify plan',
      });
  }
}

export interface PlanBadgeProps {
  /** Shopify plans the feature the badge sits next to runs on. */
  plan: PlanId;
  /** Overrides the generated label. Use only when the default is wrong. */
  children?: ReactNode;
}

/**
 * Pill stating which Shopify plans a feature runs on.
 *
 * The source of truth is the app itself: the checkout block and its rule
 * only work on Shopify Plus (and development stores), the thank-you and
 * order status blocks on every plan. See CONTRIBUTING.md.
 */
export default function PlanBadge({plan, children}: PlanBadgeProps): ReactNode {
  return (
    <span className={clsx(styles.badge, styles[plan])} data-plan={plan}>
      {children ?? planLabel(plan)}
    </span>
  );
}
