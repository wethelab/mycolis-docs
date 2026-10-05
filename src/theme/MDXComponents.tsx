import MDXComponents from '@theme-original/MDXComponents';
import PlanBadge from '@site/src/components/PlanBadge';
import Screenshot from '@site/src/components/Screenshot';

/**
 * Components registered here are usable in any MDX page without an import.
 * Keep this list short: a shared component is a commitment across every page.
 */
export default {
  ...MDXComponents,
  PlanBadge,
  Screenshot,
};
