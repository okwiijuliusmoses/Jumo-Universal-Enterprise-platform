import React from "react";
import { Zap } from "lucide-react";
import { JumoMasterManifestRegistry } from "../../../core/specification/manifests/masterManifestRegistry";
import { SovereignAppShellBase } from "./SovereignAppShellBase";

interface FintechApplicationShellProps {
  onBack: () => void;
  onNavigateToPlatform?: (platformId: string) => void;
}

export function FintechApplicationShell({ onBack, onNavigateToPlatform }: FintechApplicationShellProps) {
  const manifest = JumoMasterManifestRegistry.get("prod-fintech") || JumoMasterManifestRegistry.getAll()[0];

  return (
    <SovereignAppShellBase
      manifest={manifest}
      productIcon={Zap}
      themeColor="amber"
      onBack={onBack}
      onNavigateToPlatform={onNavigateToPlatform}
    />
  );
}
