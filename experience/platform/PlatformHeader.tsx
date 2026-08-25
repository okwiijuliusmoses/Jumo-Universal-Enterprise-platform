/**
 * JUMO UEOS Platform Header
 * Inherits the universal authoritative JUMOEnterpriseHeader component.
 */

import React from 'react';
import { JUMOEnterpriseHeader, JUMOEnterpriseHeaderProps } from '../../src/components/JUMOEnterpriseHeader';

export interface PlatformHeaderProps extends JUMOEnterpriseHeaderProps {}

export const PlatformHeader: React.FC<PlatformHeaderProps> = (props) => {
  return <JUMOEnterpriseHeader {...props} />;
};

export default PlatformHeader;
