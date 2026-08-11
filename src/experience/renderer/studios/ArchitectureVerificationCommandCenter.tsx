import React, { useMemo } from "react";
import {
  ShieldCheck,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Settings2,
  Network
} from "lucide-react";

export interface ArchitectureVerificationCommandCenterProps {
  onOpenLayer?: (layerId: string) => void;
  onOpenStudio?: (studioId: string) => void;
}

export function ArchitectureVerificationCommandCenter({
  layers = [],
  onOpenLayer,
  onOpenStudio
}: ArchitectureVerificationCommandCenterProps & { layers?: any[] }) {

  const families = useMemo(
    () => [...new Set(layers.map((l: any) => l.family))],
    [layers]
  );

  const activeLayers = useMemo(
    () => layers.filter((l: any) => l.status === 'ACTIVE' || l.status === 'FOUNDATION' || l.status === 'GOVERNED'),
    [layers]
  );

  const executableLayers = useMemo(
    () => layers.filter((l: any) => l.executable),
    [layers]
  );

  const humanFacingLayers = useMemo(
    () => layers.filter((l: any) => l.humanFacing),
    [layers]
  );

  const dependencyValidation = useMemo(() => {
    const layerIds = new Set(layers.map((l: any) => l.id));
    for (const layer of layers) {
      for (const depId of layer.dependencies) {
        if (!layerIds.has(depId)) return false;
      }
    }
    return true;
  }, [layers]);

  const familyCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    for (const layer of layers) {
      counts[layer.family] = (counts[layer.family] ?? 0) + 1;
    }

    return counts;
  }, [layers]);

  return (
    <section
      data-jumo-studio="architecture-verification-command-center"
      className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
    >
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

          <div className="flex items-start gap-3">
            <div className="h-11 w-11 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Architecture Verification Command Center
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Dynamic verification and architecture control surface for
                the JUMO Digital Hybrid Platform.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">

            <Metric
              icon={<Layers className="h-4 w-4" />}
              label="Layers"
              value={layers.length}
            />

            <Metric
              icon={<Network className="h-4 w-4" />}
              label="Families"
              value={families.length}
            />

            <Metric
              icon={<Activity className="h-4 w-4" />}
              label="Active"
              value={activeLayers.length}
            />

            <Metric
              icon={<CheckCircle2 className="h-4 w-4" />}
              label="Executable"
              value={executableLayers.length}
            />

          </div>
        </div>
      </div>

      <div className="p-6">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">

          <StatusCard
            title="Human-facing"
            value={humanFacingLayers.length}
            icon={<Activity className="h-4 w-4" />}
          />

          <StatusCard
            title="Dependency validation"
            value={
              dependencyValidation
                ? "PASS"
                : "REVIEW"
            }
            icon={
              dependencyValidation
                ? <CheckCircle2 className="h-4 w-4" />
                : <AlertTriangle className="h-4 w-4" />
            }
          />

          <StatusCard
            title="Registration"
            value="Dynamic"
            icon={<Settings2 className="h-4 w-4" />}
          />

          <StatusCard
            title="Layer limit"
            value="Open"
            icon={<Layers className="h-4 w-4" />}
          />

        </div>

        <div className="mb-6 rounded-xl border border-slate-200 overflow-hidden">

          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Architecture Families
                </h3>

                <p className="text-xs text-slate-500 mt-0.5">
                  Automatically derived from the registered layers.
                </p>
              </div>

              <span className="text-xs font-semibold text-slate-500">
                {families.length} families
              </span>
            </div>
          </div>

          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">

            {families.map((family) => (

              <div
                key={family}
                className="rounded-lg border border-slate-200 p-4 hover:border-slate-300 transition"
              >
                <div className="flex items-center justify-between gap-3">

                  <div>
                    <div className="text-sm font-semibold text-slate-800">
                      {family}
                    </div>

                    <div className="text-xs text-slate-500 mt-1">
                      {familyCounts[family] ?? 0} registered layers
                    </div>
                  </div>

                  <Layers className="h-4 w-4 text-slate-400" />

                </div>
              </div>

            ))}

          </div>
        </div>

        <div className="rounded-xl border border-slate-200 overflow-hidden">

          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
            <div className="flex items-center justify-between">

              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Registered Architecture Layers
                </h3>

                <p className="text-xs text-slate-500 mt-0.5">
                  No fixed 130-layer ceiling. The registry determines the
                  current total.
                </p>
              </div>

              <span className="px-2 py-1 rounded-md bg-slate-900 text-white text-xs font-semibold">
                {layers.length}
              </span>

            </div>
          </div>

          <div className="max-h-[520px] overflow-y-auto divide-y divide-slate-100">

            {layers.map((layer) => (

              <button
                type="button"
                key={layer.id}
                onClick={() => onOpenLayer?.(layer.id)}
                className="w-full text-left px-4 py-3 hover:bg-slate-50 transition"
              >

                <div className="flex items-start gap-3">

                  <div className="mt-0.5 h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <Layers className="h-4 w-4 text-slate-600" />
                  </div>

                  <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap items-center gap-2">

                      <span className="font-mono text-xs text-slate-400">
                        {layer.id}
                      </span>

                      <span className="font-semibold text-sm text-slate-800">
                        {layer.name}
                      </span>

                      <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                        {layer.status}
                      </span>

                    </div>

                    <p className="mt-1 text-xs text-slate-500">
                      {layer.responsibility}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-1.5">

                      <span className="text-[10px] px-2 py-1 rounded bg-slate-100 text-slate-500">
                        {layer.family}
                      </span>

                      <span className="text-[10px] px-2 py-1 rounded bg-slate-100 text-slate-500">
                        {layer.studio}
                      </span>

                      {layer.executable && (
                        <span className="text-[10px] px-2 py-1 rounded bg-emerald-50 text-emerald-700">
                          Executable
                        </span>
                      )}

                      {layer.humanFacing && (
                        <span className="text-[10px] px-2 py-1 rounded bg-blue-50 text-blue-700">
                          Human-facing
                        </span>
                      )}

                    </div>

                  </div>

                </div>

              </button>

            ))}

          </div>
        </div>

      </div>
    </section>
  );
}

function Metric({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="px-3 py-2 rounded-lg bg-white border border-slate-200 min-w-[90px]">
      <div className="flex items-center gap-1.5 text-slate-400">
        {icon}
        <span className="text-[10px] uppercase tracking-wide">
          {label}
        </span>
      </div>

      <div className="mt-1 text-lg font-bold text-slate-900">
        {value}
      </div>
    </div>
  );
}

function StatusCard({
  title,
  value,
  icon
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="flex items-center gap-2 text-slate-400">
        {icon}
        <span className="text-xs font-medium">
          {title}
        </span>
      </div>

      <div className="mt-2 text-lg font-bold text-slate-900">
        {value}
      </div>
    </div>
  );
}

export default ArchitectureVerificationCommandCenter;
