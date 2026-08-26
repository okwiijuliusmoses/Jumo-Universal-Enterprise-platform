import React from "react";
import { Zap, School, BookOpen, GraduationCap, Church, Users } from "lucide-react";
import { JumoMasterManifestRegistry } from "../../core/specification/manifests/masterManifestRegistry";
import { SovereignAppShellBase } from "./shells/SovereignAppShellBase";
import { FintechApplicationShell } from "./shells/FintechApplicationShell";
import { NurseryPrimaryApplicationShell } from "./shells/NurseryPrimaryApplicationShell";
import { SecondarySchoolApplicationShell } from "./shells/SecondarySchoolApplicationShell";
import { UniversityTertiaryApplicationShell } from "./shells/UniversityTertiaryApplicationShell";
import { ChurchFaithApplicationShell } from "./shells/ChurchFaithApplicationShell";
import { AlumniCommunityApplicationShell } from "./shells/AlumniCommunityApplicationShell";

interface SovereignProductDetailRendererProps {
  productId: string;
  onBack: () => void;
  onNavigateToPlatform?: (platformId: string) => void;
}

export function SovereignProductDetailRenderer({
  productId,
  onBack,
  onNavigateToPlatform
}: SovereignProductDetailRendererProps) {
  switch (productId) {
    case "prod-fintech":
    case "fintech":
      return <FintechApplicationShell onBack={onBack} onNavigateToPlatform={onNavigateToPlatform} />;
    case "prod-nursery-primary":
    case "nursery-primary":
      return <NurseryPrimaryApplicationShell onBack={onBack} onNavigateToPlatform={onNavigateToPlatform} />;
    case "prod-secondary-school":
    case "secondary-school":
      return <SecondarySchoolApplicationShell onBack={onBack} onNavigateToPlatform={onNavigateToPlatform} />;
    case "prod-university-tertiary":
    case "university":
      return <UniversityTertiaryApplicationShell onBack={onBack} onNavigateToPlatform={onNavigateToPlatform} />;
    case "prod-church-faith":
    case "church":
      return <ChurchFaithApplicationShell onBack={onBack} onNavigateToPlatform={onNavigateToPlatform} />;
    case "prod-alumni-community":
    case "alumni":
      return <AlumniCommunityApplicationShell onBack={onBack} onNavigateToPlatform={onNavigateToPlatform} />;
    default: {
      const manifest = JumoMasterManifestRegistry.get(productId) || JumoMasterManifestRegistry.getAll()[0];
      return (
        <SovereignAppShellBase
          manifest={manifest}
          productIcon={GraduationCap}
          themeColor="blue"
          onBack={onBack}
          onNavigateToPlatform={onNavigateToPlatform}
        />
      );
    }
  }
}
