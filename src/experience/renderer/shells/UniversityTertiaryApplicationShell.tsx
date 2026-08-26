import React from "react";
import { GraduationCap } from "lucide-react";
import { JumoMasterManifestRegistry } from "../../../core/specification/manifests/masterManifestRegistry";
import { SovereignAppShellBase } from "./SovereignAppShellBase";

interface UniversityTertiaryApplicationShellProps {
  onBack: () => void;
  onNavigateToPlatform?: (platformId: string) => void;
}

export function UniversityTertiaryApplicationShell({ onBack, onNavigateToPlatform }: UniversityTertiaryApplicationShellProps) {
  const manifest = JumoMasterManifestRegistry.get("prod-university-tertiary") || JumoMasterManifestRegistry.getAll()[0];

  return (
    <SovereignAppShellBase
      manifest={manifest}
      productIcon={GraduationCap}
      themeColor="purple"
      onBack={onBack}
      onNavigateToPlatform={onNavigateToPlatform}
    />
  );
}
