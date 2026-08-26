import React from "react";
import { School } from "lucide-react";
import { JumoMasterManifestRegistry } from "../../../core/specification/manifests/masterManifestRegistry";
import { SovereignAppShellBase } from "./SovereignAppShellBase";

interface NurseryPrimaryApplicationShellProps {
  onBack: () => void;
  onNavigateToPlatform?: (platformId: string) => void;
}

export function NurseryPrimaryApplicationShell({ onBack, onNavigateToPlatform }: NurseryPrimaryApplicationShellProps) {
  const manifest = JumoMasterManifestRegistry.get("prod-nursery-primary") || JumoMasterManifestRegistry.getAll()[0];

  return (
    <SovereignAppShellBase
      manifest={manifest}
      productIcon={School}
      themeColor="emerald"
      onBack={onBack}
      onNavigateToPlatform={onNavigateToPlatform}
    />
  );
}
