import React from "react";
import { Users } from "lucide-react";
import { JumoMasterManifestRegistry } from "../../../core/specification/manifests/masterManifestRegistry";
import { SovereignAppShellBase } from "./SovereignAppShellBase";

interface AlumniCommunityApplicationShellProps {
  onBack: () => void;
  onNavigateToPlatform?: (platformId: string) => void;
}

export function AlumniCommunityApplicationShell({ onBack, onNavigateToPlatform }: AlumniCommunityApplicationShellProps) {
  const manifest = JumoMasterManifestRegistry.get("prod-alumni-community") || JumoMasterManifestRegistry.getAll()[0];

  return (
    <SovereignAppShellBase
      manifest={manifest}
      productIcon={Users}
      themeColor="cyan"
      onBack={onBack}
      onNavigateToPlatform={onNavigateToPlatform}
    />
  );
}
