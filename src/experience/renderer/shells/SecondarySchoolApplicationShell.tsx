import React from "react";
import { BookOpen } from "lucide-react";
import { JumoMasterManifestRegistry } from "../../../core/specification/manifests/masterManifestRegistry";
import { SovereignAppShellBase } from "./SovereignAppShellBase";

interface SecondarySchoolApplicationShellProps {
  onBack: () => void;
  onNavigateToPlatform?: (platformId: string) => void;
}

export function SecondarySchoolApplicationShell({ onBack, onNavigateToPlatform }: SecondarySchoolApplicationShellProps) {
  const manifest = JumoMasterManifestRegistry.get("prod-secondary-school") || JumoMasterManifestRegistry.getAll()[0];

  return (
    <SovereignAppShellBase
      manifest={manifest}
      productIcon={BookOpen}
      themeColor="blue"
      onBack={onBack}
      onNavigateToPlatform={onNavigateToPlatform}
    />
  );
}
