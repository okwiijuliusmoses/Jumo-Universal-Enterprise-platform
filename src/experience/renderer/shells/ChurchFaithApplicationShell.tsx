import React from "react";
import { Church } from "lucide-react";
import { JumoMasterManifestRegistry } from "../../../core/specification/manifests/masterManifestRegistry";
import { SovereignAppShellBase } from "./SovereignAppShellBase";

interface ChurchFaithApplicationShellProps {
  onBack: () => void;
  onNavigateToPlatform?: (platformId: string) => void;
}

export function ChurchFaithApplicationShell({ onBack, onNavigateToPlatform }: ChurchFaithApplicationShellProps) {
  const manifest = JumoMasterManifestRegistry.get("prod-church-faith") || JumoMasterManifestRegistry.getAll()[0];

  return (
    <SovereignAppShellBase
      manifest={manifest}
      productIcon={Church}
      themeColor="rose"
      onBack={onBack}
      onNavigateToPlatform={onNavigateToPlatform}
    />
  );
}
